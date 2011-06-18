---
layout: post
categories: [Clojure, sound]
title: Sound Synthesis & Playback in Clojure
---

This tutorial covers generating simple, clean sounds of desired
frequency (sines) and accessing Java Sound API. There's a big and
in-depth tutorial made by Sun, but as it turns out you don't need to
know that much :) (and there's nothing about Clojure there too).

Entry level: *know where your repl is*

## Fast Facts About Sound

Making some noise is in fact moving particles of air and the speaker
moves them. And we will move the speaker. From perspective of a
programmer playing some sound is changing speaker's position over
time. Because on computers nothing is continuous, we can manage it's
position in concrete moments only. These *moments* come at constant
rate. So we can imagine that playing a sound is actually feeding our
speaker with it's position values regularly.

About those **moments**: Speaker can move back and forth. Its position
is relative to some starting position to which we will refer as
position *zero*. Moving speaker forward is increasing it's position
and moving backward is decreasing it's position. So, speaker position
is a number and it's called a **sample**.

## Technicalia of Sound

Sample has fixed size and it's usually 16 bits. Sample size is
limiting our minimum and maximum value. We don't have to bother about
what these value are (wait for code, you'll see why).

Pace at which samples come to sound system is usually 48000 Hz (Hz
[Hertz] means "ticks/samples per second") or 44100 Hz (on older
computers, it's so-called "Audio CD" quality) and it's called sample
rate. Yes, we need to feed our speaker that fast ;).

## Know Your Math

Because this tut is about generating sines I have to tell what sine
actually is. Sine is the cleanest type of sound possible. It also
looks like a sine on a graph ;)

! SINE GRAPH WITHOUT SCALES !

Someone said that every sound can be torn to several sines. So once we
can generate one sine we can synthesize any sound. In this tut we'll
generate just one ;)

Every sine played over time has it's frequency *f*. It's measured just
like sample rate, in Hz. Frequency is a weird number, because it's
just inverted period (also called *term* and abbreviated *T*: time
after it repeats itself):

<p style="text-align: center; font-style: italic;">
f = 1 / T<br />
T = 1 / f
</p>

It means that sine of 1 Hz frequency have 1s period and sine of 2 Hz
frequency have 0.5s period and so on.

! SINE GRAPH WITH TWO SINES with only time scale !

Period is important because we will generate data only for one pass of
sine and play it in a loop (without any loop involved -- it's Clojure!
;) ).

## Some Code At Last!

Now we'll jump right into some code. As a basis of generating sine
we'll use `Math/sin` function. It generates sine for period of 2*&pi;*
so we have to scale it to desired period.

{% highlight clojure %}
(defn sine [sample-rate freq]
  (let [term (/ 1 freq)
        samples (* term sample-rate)      ;1
        factor (/ (* 2 Math/PI) samples)] ;2
    (map #(Math/sin (* % factor))         ;3
         (range samples))))
{% endhighlight %}

`sine` function creates collection of numbers which are values of
speaker position over time (succesive samples). Explanation for
numbered lines:

1.  Amount of samples depends directly on term and sample rate. Sample
    rate tells how many samples corresponds to 1 sec. So if we take
    product of term and sample rate we will get amount of samples for
    this frequency.

2.  To scale 2*&pi;* period to our sample count we will multiply every
    number from `(range samples)` by this `factor`.

3.  Actual collection generation using `Math/sin` function.

Every number in returned collection will be from range [-1..1]. We can
check that by just invoking `sine` (tip: test only with large values
of frequencies because small frequencies results in very long
sequences):

{% highlight clojure %}
user> (sine 48000 5000)
(0.0 0.6087614290087207 0.9659258262890683 0.9238795325112867
 0.49999999999999994 -0.13052619222005177 -0.7071067811865475
 -0.9914448613738104 -0.8660254037844386 -0.38268343236508956)
{% endhighlight %}

Now we get the idea of generating a sine. Rest of this tutorial is
actually just technical stuff, but it's essential to get things
working.

## Audio Formats

To tell the sound system what we want to play we need to agree on some
kind of contract on how our sound data will be formatted. This
contract (or *protocol* if you will) is called an *audio
format*. We'll just focus on most used format nowadays.

An audio format in Java is represented by object of `AudioFormat`
class (which lives in
[javax.sound.sampled](http://download.oracle.com/javase/7/docs/api/index.html?javax/sound/sampled/package-summary.html),
we'll need some more classes from there, just keep that in mind).
Objects of this class serve only as metadata so we'll create one,
remember it somewhere and pass it around.

{% highlight clojure %}
(import '(javax.sound.sampled AudioFormat AudioFormat$Encoding))

(def popular-format
  (AudioFormat. AudioFormat$Encoding/PCM_SIGNED ;1: format
                48000 ;   sample rate
                16    ;   bits per sample (2 bytes)
                2     ;   channels: stereo!
                4     ;2: frame size 2*16bits [bytes]
                48000 ;3: frame rate
                false ;4: little endian
                ))
{% endhighlight %}

Again, I'll explain the numbered lines:

1.  `PCM_SIGNED` is linear signed and uncompressed format, which means
    that each sample will be an signed integer.

    (`AudioFormat$Encoding/PCM_SIGNED` means `PCM_SIGNED` static
    variable in `Encoding` class which is inner class in
    `AudioFormat`.)

2.  Frame is a complete unit of data for each moment in time (data for
    all channels). So it's size in our uncompressed format is just
    number of bytes for every sample multiplied by number of channels.

3.  Frame rate can be different from sample rate but it doesn't make
    sense this time.

4.  When we have more bytes than one for a sample, order in which we
    read them matters. It's so-called
    [*endianness*](http://en.wikipedia.org/wiki/Endianness). Big
    endian is reading bytes in forward direction, little endian is
    reading them backwards. My computer is using little endian and I'm
    symphatising with him.

## How To Actually Play Something?



{% highlight clojure %}
(defn open-line [audio-format]
  (let [line (AudioSystem/getLine
              (DataLine$Info. SourceDataLine audio-format))]
    (.open line audio-format)
    (.start line)
    line))
{% endhighlight %}

! GETTING LINE, AGENT !

## According To Contract...

Our sine is not quite ready to push it to speakers. We need to satisfy
audio format that we defined earlier. To do that we will:

1.  **Scale values of sine** to maximum and minimum values possible for
    our sample size. We have 16 bits at our disposal which means we
    have circa +/- 2<sup>15</sup> range (one bit is stolen for sign).

2.  **Torn each sample** to bytes according to chosen *endianness*.

3.  **Multiply each sample** to conform number of channels.

4.  **Pack whole sine** to byte array.


### 1. Scaling

When comming out from `sine` function our samples have floating-point
values from -1 to 1. We need to scale them to signed integers with
values from -2<sup>samplesize-1</sup> to
2<sup>samplesize-1</sup>-1. So just mulplying by amplitude of
2<sup>samplesize-1</sup> will do the trick. Actual amplitude will be
delivered by `amplitude` function:

{% highlight clojure %}
(defn amplitude [sample-size]
  (Math/pow 2 (- sample-size 1.1)))
{% endhighlight %}

I subtract 1.1 (not 1) from sample size to avoid *dangerous*
inaccuracy when multiplying two floating-point numbers.

Actual scaling will be done in `quantize` function:

{% highlight clojure %}
(defn quantize [amplitude value]
  (int (* amplitude value)))
{% endhighlight %}

### 2. Fragmentation To Bytes

I do reading integers backward and forward like this:

{% highlight clojure %}
(defn little-endian [size x]
  (for [b (range size)]
    (-> (bit-shift-right x (* 8 b))
        (bit-and 255)
        unsigned-byte)))

(defn big-endian [size x]
  (reverse (little-endian size x)))
{% endhighlight %}

Where `unsigned-byte` is needed to cheat JVM because JVM supports only
signed bytes with values from -128 to 127 and we need signed bytes
with values in 0..255 range. Blah. So we cheat like this:

{% highlight clojure %}
(defn unsigned-byte [x]
  (byte (if (> x 127) (- x 256) x)))
{% endhighlight %}

This is one thing that I won't explain here :P. It'd be just too
big. It's based on how signed and unsigned numbers [look
internally](http://en.wikipedia.org/wiki/Two%27s_complement).

### 3. Repeating Data For Each Channel

OK. This will be very lame stereo. We'll just repeat data for each
channel and I do it like this: `(take frame-size (cycle bytes))`. If
you wanna you can modify that code (in fact, you should) and
incorporate some fancy space-age surround effect<sup><a
href="#foot1" id="foot1back">1</a></sup>.

### 4. Gathering All Together

Whole pipeline is mirrored in `sine-bytes` function with each of these
steps represented by mapping a function on collection returned by it's
predecessor:

{% highlight clojure %}
(defn sine-bytes [format freq]
  (let [{:keys [sampleSizeInBits frameSize
                sampleRate bigEndian]} (bean format)
        sample-size (/ sampleSizeInBits 8)
        ampl (amplitude sample-size)
        tear (if bigEndian big-endian little-endian)]
    (->> (sine sampleRate freq)
         (map (partial quantize ampl))    ;1
         (map (partial tear sample-size)) ;2
         (map cycle)                      ;3
         (map (partial take frameSize))   ;3
         (apply concat)                   ;A
         byte-array)))                    ;4
{% endhighlight %}

Numbers in comments corresponds to points mentioned before.

<small>
<span id="foot1"><sup><a href="#foot1back">1</a></sup> Sound doesn't fly in Space.</span>
</small>

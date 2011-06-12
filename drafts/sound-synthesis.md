--
layout: post
categories: [Clojure, sound]
title: Simple Sound Playback and Synthesis
--

This tutorial covers accessing Java Sound API and generating simple,
clean sounds of desired frequency (sines). There's a big and in-depth
tutorial made by Sun, but as it turns out it's very simple.

## Fast Facts About Sound

Sound are in fact moving particles of air and the speaker moves
them. And we will move the speaker. From perspective of a programmer
playing some sound is changing it's position over time. Because on
computers nothing is continuous, we can manage it's position in
concrete moments only. These *moments* come at constant rate. So we
can imagine that playing sound is actually feeding our speaker with
it's position regularly.

About **moments**: Speaker can move forward and backward. It's
position is relative to some starting position to which we will refer
as position "0". Moving speaker forward is increasing it's position
and moving backward is decreasing it's position. So, speaker position
is a number and it's called a **sample**.

## Technicalia of Sound

Sample has fixed size and it's usually 16 bits. Sample size is
limiting our minimum and maximum value. We don't have to bother about
what these value are (wait for code, you'll see why).

Pace at which samples come to sound system is usually 48000 Hz (Hz
[Hertz] means "ticks per second") or 44100 Hz (on older computers,
it's Audio CD quality) and it's called sample rate. Yes, we need to
feed our speaker that fast ;)

## Know Your Math

Because this tut is about generating sines I have to tell what sine
actually is. Sine is the cleanest type of sound possible. It also
looks like a sine on a graph ;)

! SINE GRAPH WITHOUT SCALES !

Someone said that every sound can be torn to several sines. So once we
can generate one sine we can synthesize any sound. In this tut we'll
generate just one ;)

Every sine played over time has it's frequency. It's measured just
like sample rate, in Hz. Frequency is a weird number, because it's just
inverted period (T, time after it repeat itself):

! Wzór na częstotliwość !

It means that sine of 1 Hz frequency have 1s period and sine of 2 Hz
frequency have 0.5s period.

! SINE GRAPH WITH TWO SINES with only time scale !

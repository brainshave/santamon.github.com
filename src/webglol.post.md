title: WebGLOL
date: 2011-05-22
tags: [WebGL, OpenGL, CoffeeScript, LOL, JavaScript]

&&&

I deviated form my Clojure stuff for a while and made something
completely different.

&&&

I'm learning OpenGL recently. I've made this silly animation once in
Java and wanted to see what it takes to port it to CoffeeScript and
WebGL.

## Don't Even Wonder If That Means Anything ;-)

<p class="sidenote">Click for full window view</p>

<canvas id="robot_canvas" width="640" height="300" style="border: 1px solid black;"></canvas>
<script src="media/glMatrix-0.9.5.min.js"></script>
<script src="media/RequestAnimationFrame.js"></script>
<script id="shader-fs" type="x-shader/x-fragment">
    #ifdef GL\_ES
    precision highp float;
    #endif

    uniform vec4 vColor;

    void main(void) {
        gl\_FragColor = vColor;
    }
</script>
<script id="shader-vs" type="x-shader/x-vertex">
    attribute vec3 aVertexPosition;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    void main(void) {
        gl\_Position = uPMatrix \* uMVMatrix \* vec4(aVertexPosition, 1.0);
    }
</script>
<script src="media/robots.coffee" type="text/coffeescript"></script>
<script src="media/coffee-script.js"></script>

If you see a rectangle only it means you have to
[get WebGL-enabled browser](http://get.webgl.org). It probably won't
show up in feed readers because they usually block scripts. If you
don't have time to grab a browser, here you have a video of Java
version (recording is crappy, I'm new to this also):

<object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/Epncu2iq0EU?hl=pl&fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/Epncu2iq0EU?hl=pl&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object>

You can see the source code just by viewing source of this page or
[on GitHub](https://github.com/santamon/OpenGLOL/tree/master/webgl)
(files
[robots.html](https://github.com/santamon/OpenGLOL/blob/master/webgl/robots.html)
and
[robots.coffee](https://github.com/santamon/OpenGLOL/blob/master/webgl/robots.coffee)).

## Thoughts

I have to say that WebGL is hard. There's a lot you have to know
before you draw anything. It's bearable thanks to such great resources
as [Learning WebGL](http://learningwebgl.com/blog/?page_id=1217). I've
done that animation only after 3 lessons so pace of this tutorial is
really good. One more great thing about it is that examples are using
very minimal set of external libraries so it's kind of close to the
metal. That animation was made with only addition of CoffeeScript. If
you don't want to write everything by hand there's
[Three.js](https://github.com/mrdoob/three.js/) library.

I also gave CoffeeScript a try and it was worth it. I like that very
succinct syntax -- my favorite is anonymous function: it's just `->`
(compared to JavaScript's `function(){}`). Some functional programming
stuff like
[list comprehensions](http://jashkenas.github.com/coffee-script/#loops)
and
[destructuring lists](http://jashkenas.github.com/coffee-script/#destructuring)
are very welcome too. I don't know much of JavaScript so I can't tell
how much writing in CoffeeScript was easier but at least it was more
enjoyable :) .

[CoffeeScript site](http://jashkenas.github.com/coffee-script/) make
learning it easy. There's even a real-time translator to JavaScript so
you can play with language in the browser. What's mentioned
[almost at the very bottom of document](http://jashkenas.github.com/coffee-script/#scripts)
is that you don't have to compile `*.coffee` to `*.js` files
offline. They can be compiled in the browser. Just include
[`coffee-script.js`](http://jashkenas.github.com/coffee-script/extras/coffee-script.js)
and tag you scripts with `type="text/coffeescript"`.

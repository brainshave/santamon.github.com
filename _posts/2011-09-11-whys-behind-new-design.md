---
layout: post
title: The Whys Behind This New Freaky Design
---

There where 3 persons sitting at the other side of a table and I was at
a job interview. I was given a quick 10-minute test to comprehend but
they didn't had anything to make them busy so they took their phones
out and pointed their browsers at the inteviewee's blog (mine). Quite
luckily for me they actually started to think out loud about what they
encounter, not minding I was taking the test ;) . As it turns out, I
was double-tested :) .

I've heard remarks like "It looks strange on iPhone" but the most
important one was that they had taken for granted that my blog has
only one post (!). This was a big issue for me. The home page of my
blog was with just one post, then comments with no posts after. The
only way to get to other posts was to hit the "Archive"
link. Apparently that link was not presented in a clean way. Usually
people assume that there should be something after the post they are
presented at the first moment. So first they will probably start
scrolling down rather than carefully investigate the top of the
page.

{% sidenote %}
This could be a bad idea as well, time will tell...
{% endsidenote %}

I felt a need to make my blog more approachable so now I present list
of posts at my home page. I also made a sidebar with "Archive"
section in it. This also new design is better suited if I decide to
make standard pagination or implement infinite scrolling.

{% section The Wrongness of Footnotes %}

I am uberly annoyed by footnotes idea on web sites. It feels *so
wrong* to break reading, scroll down to the bottom of an article to
read the footnotes (even if anchored link is provided).

{% sidenote %}
This was actually inspired by typography in
*Concrete Mathematics* by Graham, Knuth and Patashnik (in PL
edition but I assume it inherits typography from the original).
{% endsidenote %}

Instead I figured out that **sidenotes** are much better for the Web.
It's *so* much easier to just glance at the margin than scroll all the
way to the bottom, and less disruptive too.

Footnotes are good for printed books (or electronic, but only if
they're paginated, not scrolled) because they're not that far when
printed on same page.

Ah, you won't see sidenotes on the side if you're reading this through
RSS reader--sorry, only on-site feature for now.

{% section The Rest %}

Some more noticable changes are the logo which is now vectorized in
SVG. The usual lack of color shouldn't surprise anyone but this time
it's actually 99% 1-bit ;) (with exception in code listings and some
images).

Someone observant can also notice that I've finally adhered to the
[960 grid system](http://960.gs). I've tried to be consequent so even
the logo is aligned to it ;) . For now there's no mobile CSS but I'm
thinking about it.

As much as I am not a designer I enjoy tinkering with this blog's
"design". Be sure that something, sometime will change :) .

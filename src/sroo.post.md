title: Another HTML/JavaScript Slideshow Library
date: 2011-09-23
tags: [HTML, JavaScript, slideshow]

&&&

There's a bunch of them. Here's another one: the
[Sroo](http://longstandingbug.com/sroo). My main excuse for creating
it was to learn some JavaScript and DOM manipulation. It's probably
not very new and original but I've combined some features that sounded
sane for me:

&&&

-   Slides are not marked by some CSS classes. Rather than that
    I prefer to use "semantic" tags, like `<h1>` or `<section>`.

    This actually makes it work well with content-generation programs,
    like [Jekyll](http://github.com/mojombo/jekyll).

-   Prospectus view is used when your screen is to small, in portait
    orientation or when JavaScript is disabled.

-   Standard stuff like auto-scaling, navigation using mouse wheel and
    keyboard.

There's no support for legacy browsers but there's wide support for
current browsers (including IE 9). There's actually only one problem
with Opera Mobile (as of version 11.10) which just utterly destroys
the layout. I believe it's a bug :P. Serious mobile support is yet to
come (with touch support).

Like almost everything I do the project is [on GitHub](http://github.com/santamon/sroo). I'm not providing any CSS
themes because I'm a pretty awful designer and I don't want to ruin
your presentation :D.

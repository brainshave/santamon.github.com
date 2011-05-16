---
title: Clojure is NOT a LISP
layout: post
---

> Please consider this post as a mental experiment rather than crusade
  against well-known fact ;) .

First, what is LISP? LISP stands for **LIS**t **P**rocessing. While it
is true for original LISP and it's immediate descendants it's not true
for Clojue. Original LISP was all about lists to the point where even
program code was expressed using lists
([S-expressions](http://en.wikipedia.org/wiki/S-expression)).

Clojure inherit that list-goodness but
[Rich Hickley](http://en.wikipedia.org/wiki/Rich_Hickey) (mastermind
behind Clojure's design) added more data structures to the language
(in contrary to putting them in library only). We have now maps,
vectors and sets and yes, they're integrated to the same point that
lists are in LISP. They're even part of Clojure expressions. So, it's
not only lists anymore. What Clojure should be called then? Lets call
Clojure a *Data Processing Language*. If we strip Clojure to the
minimum data processing is what it does.

## Abstracted Away

Most Clojure's functions that do something with data (as `map`,
`reduce` or `filter`, etc.) handle all types transparently. Thanks to
[Sequence](http://clojure.org/sequences) abstraction (all data
structures can be represented as sequences) even most functions you
write will handle them transparently (until you do something specific
to one data type but this is obvious).

## Data Structures are Functions

Neat feature that make data structures useful as a language construct
is that data structures are functions. Vectors are functions of index:

{% highlight clojure %}
user> ([7 8 9] 0)
7
{% endhighlight %}

Maps are functions of their keys:

{% highlight clojure %}
user> ({:a 1 :b 2 :c 3} :a)
1
{% endhighlight %}

And sets are functions of membership (here I use set as a predicate
for `filter`)

{% highlight clojure %}
user> (filter #{1 2 3} [1 5 3 5 2 5])
(1 3 2)
{% endhighlight %}

This so new (well, to me, even now, after 3 years) that I think it's
one of the most unexplored Clojure's features. There's always a mental
gap when we are introduced to something new but I can imagine that
there's use for it to create even more idiomatic code.

## Data as Syntax

Similarly to lists in LISP, Clojure data structures are everywhere. In
addition to lists, maps and vectors are used where
appropriate. Examples:

Function's `:pre` and `:post` conditions are put into a map:

{% highlight clojure %}
(defn fail [x]
  {:pre  [(even? x)]
   :post [(odd? %)]}
  (* x x))
{% endhighlight %}

This function will of course always fail.

But a real killer feature is destructuring data in function arguments:

{% highlight clojure %}
(defn addabc [{a :a b :b c :c}]
  (+ a b c))
{% endhighlight %}

Which will take a map as argument and set `a` to value for key `:a`
and so on.

{% highlight clojure %}
user> (addabc {:a 1 :b 2 :c 3})
6
{% endhighlight %}

It sounds something like named arguments. It can become even simpler:

{% highlight clojure %}
(defn addabc [{:keys [a b c]}]
  (+ a b c))
{% endhighlight %}

## Data Processing Language

I wanted to highlight Clojure features that makes it more than just
LISt Processing. It's Data Processing Language. I have not emphasized
all Clojure abilities to crack data, just those where it's more than
lists. Of course Clojure is much more than just data processing. And,
of course, it IS a LISP.

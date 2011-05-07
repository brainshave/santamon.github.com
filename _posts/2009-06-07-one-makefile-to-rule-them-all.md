---
title: One Makefile To Rule Them All
layout: post
lang: pl
categories: [C++, kompilacja, Make, Makefile, programowanie]
---

Wpis archiwalny z [mojej starej strony](http://gaco.wordpress.com).

> One Makefile to rule them all, One Makefile to find them,<br />
> One Makefile to bring them all and in the batch compile them<br />
> In the Land of Unix where the Shells lie.

Kiedyś szukałem sposobu, by dodając nowe pliki \*.cpp do projektu
(każdy z nich był osobnym programem) nie trzeba było modyfikować
Makefile'a i dałem sobie spokój w pewnym momencie.  Szukałem niezbyt
gorliwie jak się okazuje, bo podpowiedź była
[w manualu do GNU Make'a](http://www.gnu.org/software/make/manual/html_node/Wildcard-Function.html).
Ten Makefile skompiluje wszystkie pliki \*.cpp jako osobne programy do
podkatalogu bin.

{% highlight makefile %}
cele := $(patsubst %.cpp,bin/%,$(wildcard *.cpp))

komp=g++ -Wall -O2

asdf: $(cele)

$(cele) : bin/% : %.cpp
	$(komp) $&lt; -o $@

clean:
	rm $(cele)
{% endhighlight %}

Żeby pakowało binarki bezpośrednio do katalogu ze źródłami trzeba usunąć 2x `bin/`.

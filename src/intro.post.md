title: Intro
lang: pl
date: 2010-08-16
tags: [Makeblog, make]

&&&

Witam serdecznie. O blogu, który by się tak nazywał, działał i wyglądał myślałem
od jakiegoś czasu. Będę pisał o własnych zainteresowaniach,
skupiając się zapewne w głównej mierze na języku [Clojure](http://clojure.org).
Mam dwa pomysły na pracę mgr, których, dopóki nie dorosną, nie zdradzę.

Wygląd strony jest minimalistyczny; mam nadzieję, że jeśli nie przypadnie
komuś do gustu to przynajmniej nie będzie przeszkadzał w dostępie do treści.

&&&

## Makeblog

Na potrzeby bloga napisałem kilka skryptów do generowania stron off-line.
Kilka zalet takiego rozwiązania (porównując np. z Wordpressem):
- strony ładują się szybciej, nie ma odwołań do bazy danych,
- mogę użyć dowolnego edytora do edycji stron/wpisów,
- całą treść trzymam u siebie na dysku, zmiana hostingu jest dzięki temu uproszczona.

W tym momencie strona hostowana jest na
[GitHubie](http://github.com/santamon/santamon.github.com), co mi
bardzo odpowiada: synchronizacja treści przez gita, cud-miód :).

Makeblog używa składni podobnej do [`org-mode`'a](http://orgmode.org).
Dzięki temu mogę pisać wpisy w czystym tekście, polecam zobaczyć
[plik źródłowy tego wpisu](http://github.com/santamon/santamon.github.com/blob/master/input/intro.txt)
oraz plik
[Syntax](http://github.com/santamon/makeblog/blob/master/input/Syntax.txt),
którego używałem do testowania parsera.
[Schematy stron](http://github.com/santamon/santamon.github.com/blob/master/templates/article.html)
używają bardzo prostej składni (podmiany z `$`).

## Skąd taka nazwa?
Proste: Makeblog używa programu **make** do śledzenia, które pliki mają być
zaktualizowane. Skrypty do parsowania tekstu i indeksowania są napisane
w Pythonie. Dlaczego nie w Clojure? Może więcej o Makeblogu w następnym
wpisie.

Projekt jest hostowany na GitHubie: <http://github.com/santamon/makeblog>.

## Braki i niedoróbki

<p class="sidenote">
Problemy te nie dotyczą aktualnego wyglądu strony, która używa innych czcionek.
</p>

Póki co zauważyłem problemy z renderowaniem czcionek pod Windowsem
(gdy używa się ClearType, pod Safari z renderowaniem "makowym" wygląda
b. dobrze).  Dlatego na Viście i 7 zostaną użyte kroje systemowe (nowe
kroje wprowadzone z Vistą, nie ma ich w innych OS-ach, więc na
Linuksie zostaną użyte te zagnieżdżone). Na XP jeszcze nie wiem co
zrobić. Zobaczymy po testach (nie mam komputera z XP pod ręką
ostatnio).

Brakuje kilku istotnych łebdwazerowych funkcji, czyli tagów i RSS-a lub Atoma.
Jest w moim TODO ;).

# -*- coding: utf-8 -*-
# Licencja: "Bierzcie i jedzcie z tego wszyscy"
from pyparsing import *
from pprint import pprint

undecorated = OneOrMore( # tłumaczy się samo przez się
                         Word( # słowo (przynajmniej 1 znak) złożone z:
                               alphanums)) # litery i cyfry

bold = "*" + undecorated + "*"   # prawda,
italic = "/" + undecorated + "/" # że proste?

# metoda parseString() służy do... parsowania napisów
pprint(bold.parseString("*asdf*").asList())
pprint(italic.parseString("/qwer/").asList())

## wersja rekurencyjna:
bold = Forward()
italic = Forward()

expression = OneOrMore( undecorated | bold | italic )

# Domyślnie wszystkie elementy odnalezione przez pyparsing
# zwracane są jako jednowymiarowa lista, Group stworzy
# listę zagnieżdżoną
bold << Group("*" + expression + "*")
italic << Group("/" + expression + "/")
#bold.setParseAction(lambda x: ['<b>', x[0][1:-1], '</b>'])
#italic.setParseAction(lambda x: ['<em>', x[0][1:-1], '</em>'])

pprint(expression.parseString("""
czysty tekst
/krzywo/ *grubo*
/*krzywo grubo*/ */grubo krzywo/*
*grubo /krzywo i jeszcze raz *grubo*/*
""").asList())

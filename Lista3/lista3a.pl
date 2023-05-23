urzadzenie(klawiatura).

komoponent(elektronika).
komoponent(obudowa).
komoponent(przelacznik).

/* Klasy części */

czesc(keycap).
czesc(sterownik).
czesc(portUSB).

/* Klasy użytkowników */

uzytkownik(admin).
uzytkownik(gracz).

/* Relacje między komponentami */

sklada_sie_z(klawiatura, elektronika).
sklada_sie_z(klawiatura, obudowa).
sklada_sie_z(klawiatura, przelacznik).

sklada_sie_z(elektronika, sterownik).
sklada_sie_z(elektronika, portUSB).
sklada_sie_z(przelacznik, keycap).

/* Zależności między komponentami i użytkownikami */

zarzadza(klawiatura, admin).
uzywa(klawiatura, gracz).

/* Reguły wnioskowania */

jest_czescia(X, Y) :-
    sklada_sie_z(Z, X),
    sklada_sie_z(Y, Z).

jest_czescia(X, Y) :-
    sklada_sie_z(Y, X).

uzytkownik(X, Y) :-
    zarzadza(Y, X).
    
uzytkownik(X, Y) :-
    uzywa(Y, X).

jest_urzadzeniem(X) :-
    sklada_sie_z(X, _),
    \+ sklada_sie_z(_, X).

jest_komponentem(X) :-
    sklada_sie_z(_, X).

/** <examples>
?- uzytkownik(gracz, klawiatura).
?- jest_czescia(keycap, klawiatura).
?- jest_urzadzeniem(elektronika).
?- jest_urzadzeniem(klawiatura).
?- jest_czescia(X, klawiatura).
?- jest_urzadzeniem(klawiatura).
?- jest_urzadzeniem(X).
?- jest_czescia(portUSB, Y).
*/



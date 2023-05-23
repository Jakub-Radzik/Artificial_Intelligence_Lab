/* 1. reguły diagnostyczne: jeśli dzieje się A to przyczyną może być B */

/*Definicja obiektów generujących zachowania*/
kontrolka(uwaga).
kontrolka(gotowe).

/*Obserwowane zachowania*/
stan_diody(uwaga, mruga).
stan_diody(uwaga, świeci).
stan_diody(uwaga, nie_świeci).

stan_diody(gotowe, mruga).
stan_diody(gotowe, świeci).
stan_diody(gotowe, nie_świeci).

/*stany drukarki*/

stan_drukarki(pracuje_w_trybie_recznym).
stan_drukarki(przetwarzanie_drukowania_dwustronnego).
stan_drukarki(podajnik_pusty).
stan_drukarki(drzwiczki_otwarte).
stan_drukarki(drukarka_nie_podaje_papieru).
stan_drukarki(bląd_krytyczny_uniemożliwiający_kontynuacje_pracy).

zachowanie_drukarki(nie_pobiera_papieru).
zachowanie_drukarki(pobiera_kilka_arkuszy_papieru).
zachowanie_drukarki(zacięcia_papieru).
zachowanie_drukarki(drukarka_nie_drukuje).


problem(siec_bezprzewodowa).

przyczyna(zainstalowana_zewnetrzna_zapora).
przyczyna(zmieniony_router).
przyczyna(podlaczenie_do_vpn).


/*czynności do wykonania*/
czynnosc_do_wykonania(   stan_diody(uwaga, mruga),
                      	 stan_diody(gotowe, nie_świeci),
                         stan_drukarki(pracuje_w_trybie_recznym), 
                         "Załaduj papier o prawidłowym rozmiarze i formacie do podajnika wejściowego. Naciśnij przycisk Wznów/Anuluj , aby kontynuować.",
                         "Nie znana"
                      ).

czynnosc_do_wykonania(   stan_diody(uwaga, mruga),
                         stan_diody(gotowe, nie_świeci),
                         stan_drukarki(przetwarzanie_drukowania_dwustronnego), 
                         "Załaduj papier do podajnika wejściowego, aby
wydrukować drugie strony. Naciśnij przycisk
Wznów/Anuluj , aby kontynuować.",
                         "Nie znana"
                      ).

czynnosc_do_wykonania(   stan_diody(uwaga, mruga),
                      stan_diody(gotowe, nie_świeci),
                         stan_drukarki(podajnik_pusty), 
                         "Załaduj papier do podajnika.",
                         "Nie znana"
                      ).

czynnosc_do_wykonania(   stan_diody(uwaga, mruga),
                      stan_diody(gotowe, nie_świeci),
                         stan_drukarki(drzwiczki_otwarte), 
                         "Upewnij się, że drzwiczki dostępu do kaset z tonerem są zamknięte.",
                         "Nie znana"
                      ).

czynnosc_do_wykonania(   stan_diody(uwaga, mruga),
                      stan_diody(gotowe, nie_świeci),
                         stan_drukarki(drukarka_nie_podaje_papieru), 
                         "Upewnij się, że papier jest prawidłowo załadowany,
a następnie naciśnij przycisk Wznów/Anuluj ,
aby kontynuować.",
                         "Nie znana"
                      ).

czynnosc_do_wykonania(   stan_diody(uwaga, świeci),
                         stan_diody(gotowe, świeci),
                         stan_drukarki(bląd_krytyczny_uniemożliwiający_kontynuacje_pracy), 
                         "1. Wyłącz drukarkę lub odłącz przewód
zasilający od drukarki.
2. Zaczekaj ok. 30 sekund, a następnie włącz
drukarkę lub podłącz ponownie przewód
zasilania.
3. Poczekaj na zainicjowanie drukarki.
Jeżeli błąd nadal występuje, skontaktuj się z
działem pomocy technicznej firmy HP.",
                         "Nie znana"
                      ).

czynnosc_do_wykonania(zachowanie_drukarki(nie_pobiera_papieru), "Jeśli drukarka nie pobiera papieru z podajnika, wypróbuj poniższe rozwiązania.
1. Otwórz urządzenie i wyjmij wszystkie zacięte arkusze papieru.
2. Umieść w podajniku papier w formacie odpowiednim dla zlecenia.
3. Upewnij się, że rodzaj i format papieru są ustawione prawidłowo na panelu sterowania drukarki.
4. Upewnij się, że prowadnice papieru w podajniku są ustawione odpowiednio dla formatu papieru.
Wyreguluj odpowiednie przesunięcie prowadnic w pojemniku.
5. Sprawdź panel sterowania drukarki i zobacz, czy nie oczekuje ona na potwierdzenie monitu o ręczne
podanie papieru. Załaduj papier i kontynuuj drukowanie.
6. Rolka pobierania i wkład rozdzielający mogą być zabrudzone.").

czynnosc_do_wykonania(zachowanie_drukarki(pobiera_kilka_arkuszy_papieru), "Jeśli drukarka pobiera jednorazowo kilka arkuszy papieru z podajnika, wypróbuj poniższe rozwiązania.
1. Wyjmij stos papieru z podajnika, zegnij łagodnie kilka razy, obróć o 180 stopni i przewróć na drugą
stronę. Nie należy kartkować papieru. Włóż stos papieru z powrotem do podajnika.
2. Należy używać tylko papieru zgodnego ze specyfikacjami firmy HP dla tej drukarki.
3. Używaj papieru, który nie jest zmięty, załamany ani zniszczony. W razie potrzeby weź papier z innego
opakowania.
4. Upewnij się, że podajnik nie jest przepełniony. Jeśli jest, wyjmij z niego cały stos papieru, wyprostuj go,
a następnie włóż do podajnika tylko część arkuszy.
5. Upewnij się, że prowadnice papieru w podajniku są ustawione odpowiednio dla formatu papieru.
Wyreguluj odpowiednie przesunięcie prowadnic w pojemniku.
6. Upewnij się, że urządzenie działa w zalecanych warunkach otoczenia.").


czynnosc_do_wykonania(zachowanie_drukarki(zacięcia_papieru), "Wykonaj następujące czynności, aby rozwiązać problemy z częstymi zacięciami papieru. Jeśli pierwszy krok
nie rozwiąże problemu, przejdź do następnego kroku dopóki problem nie zostanie rozwiązany.
1. Jeśli papier zaciął się w drukarce, usuń zacięcie i wydrukuj stronę konfiguracji w celu przetestowania
drukarki.
2. Sprawdź, czy podajnik jest skonfigurowany dla odpowiedniego formatu i rodzaju papieru na panelu
sterowania drukarki. Dostosuj ustawienia papieru w razie potrzeby.
3. Wyłącz drukarkę na 30 sekund, a następnie włącz ją ponownie.
4. Wydrukuj stronę czyszczenia, aby usunąć nagromadzony toner z wnętrza drukarki.").


czynnosc_do_wykonania(problem(siec_bezprzewodowa), zachowanie_drukarki(drukarka_nie_drukuje),"Zaktualizuj oprogramowanie zapory do najnowszej wersji udostępnionej przez producenta.
2. Jeśli podczas instalowania drukarki lub próby wydruku widać programy żądające od zapory zezwolenia
na dostęp do komputera, pozwól na taki dostęp.
3. Wyłącz zaporę i zainstaluj oprogramowanie drukarki bezprzewodowej na komputerze. Po zainstalowaniu oprogramowania urządzenia ponownie włącz zaporę.", przyczyna(zainstalowana_zewnetrzna_zapora)).
czynnosc_do_wykonania(problem(siec_bezprzewodowa), zachowanie_drukarki(drukarka_nie_drukuje),"Upewnij się, że router lub drukarka są podłączone do tej samej sieci, co komputer. Wydrukuj stronę konfiguracji.
Porównaj identyfikator SSID na stronie konfiguracji z identyfikatorem SSID w konfiguracji drukarki na komputerze.
Jeśli nie są takie same, urządzenie i komputer korzystają z różnych sieci. Zmień ustawienia komunikacji bezprzewodowej drukarki.", przyczyna(zmieniony_router)).
czynnosc_do_wykonania(problem(siec_bezprzewodowa), zachowanie_drukarki(drukarka_nie_drukuje),"Zazwyczaj nie można ustanowić połączeń jednocześnie z siecią VPN i innymi sieciami.", przyczyna(podlaczenie_do_vpn)).


szukaj(DiodaA, StanDiodyA,DiodaB, StanDiodyB, StanDrukarki, Czynnosc, Przyczyna) :-
    czynnosc_do_wykonania(stan_diody(DiodaA, StanDiodyA), stan_diody(DiodaB, StanDiodyB), stan_drukarki(StanDrukarki), Czynnosc, Przyczyna),
    write('Dla diody '), write(DiodaA),
    write(' w stanie '), write(StanDiodyA),
    write(' i dla diody '), write(DiodaB),
    write(' w stanie '), write(StanDiodyB),
    write(' i drukarki w stanie '), write(StanDrukarki),
    write(' wykonaj czynnosc: '), write(Czynnosc),
    write(' Możliwa przyczyna: '), write(Przyczyna), nl.


szukaj(DiodaA, StanDiodyA,DiodaB, StanDiodyB, StanDrukarki, Czynnosc) :-
    czynnosc_do_wykonania(stan_diody(DiodaA, StanDiodyA), stan_diody(DiodaB, StanDiodyB), stan_drukarki(StanDrukarki), Czynnosc, _),
    write('Dla diody '), write(DiodaA),
    write(' w stanie '), write(StanDiodyA),
    write(' i dla diody '), write(DiodaB),
    write(' w stanie '), write(StanDiodyB),
    write(' i drukarki w stanie '), write(StanDrukarki),
    write(' wykonaj czynnosc: '), write(Czynnosc), nl.


szukaj(ZachowanieDrukarki, Czynnosc) :-
    czynnosc_do_wykonania(zachowanie_drukarki(ZachowanieDrukarki), Czynnosc),
    write(' Zachowanie drukarki: '), write(ZachowanieDrukarki),
    write(' wykonaj czynnosc: '), write(Czynnosc), nl.

szukaj(Problem, Zachowanie, Czynnosc, Przyczyna) :-
    czynnosc_do_wykonania(problem(Problem), Zachowanie, Czynnosc, Przyczyna),
    write(' Problem: '), write(Problem),
    write(' wykonaj czynnosc: '), write(Czynnosc), nl.


/** <examples>

?- szukaj(uwaga, mruga, gotowe, nie_świeci, Y,Z).
?- szukaj(nie_pobiera_papieru,Y).
?-szukaj(siec_bezprzewodowa,Y,Z,A).
*/












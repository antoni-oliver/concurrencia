# Llenguatges de programació - concurrència

Alguns exemples de les diferents tècniques per fer servir programació concurrent.

## Visió general

**Dos casos d'ús**
* `cpu`: aplicació centrada en l'ús de la CPU (càlcul de valors de la seqüència de Fibonacci)
* `io`: aplicació centrada en entrada/sortida (peticions HTTP a un servidor web)

**Dos llenguatges de programació**
* `javascript` (Node.js)
* `python` (CPython)

**Quatre tècniques**
1. _Aproximació síncrona_ (no fer res)
    * En segons quins casos implica fer-ho "malament" a posta (per exemple, E/S a Javascript).
1. _Tasques asíncrones_
    * Promises (Javascript)
    * async/await (Javascript i Python)
1. _Threads_
    * Threads de Javascript (Workers)
    * Threads de Python (no són paral·lels)
1. Processos

## Cas d'ús limitat per CPU

Problema: càlcul de 20 vegades `fib(35)` i sumar-ne els valors.

## Resultats 

Temps d'execució en segons:

| Tècnica      | Javascript | Python |
| ------------ | ---------: | -----: |
| 1. Síncrona  |       1.55 |  24.54 |
| 2. Asíncrona |      31.03 |  55.33 |
| 3. Threads   |       0.27 |  24.95 |
| 4. Processos |       0.32 |   3.47 |

Nota: Javascript és bastant més ràpid que Python, entre d'altres coses, gràcies al compilador JIT. Es pot desactivar així: `node --jitless script`.

Com podem veure, fer servir tasques asíncrones, no només no ajuda, sinó que empitjora els resultats.

A les tasques limitades per CPU, ens interessa paral·lelitzar l'execució sempre que puguem. Això implica fer servir threads o processos. Els threads són un poc més lleugers que els processos, i per això tenen resultats un poc millors a Javascript. En el cas de Python, però, els threads no són realment paral·lels, així que només podem fer servir processos si volem execució paral·lela.

## Cas d'ús limitat per entrada/sortida


### Preparació

Hem de preparar un servidor web que respongui les nostres peticions. Això es pot fer amb l'script `server.js`: `node server.js`. Per poder-lo fer servir, s'hauran d'instal·lar les dependències: `npm install` dins el directori `javascript`.

També haurem d'instal·lar els següents mòduls:
* Javascript: `sync-fetch` per simular peticions HTTP síncrones.
* Python: `aiohttp` per fer peticions HTTP asíncrones i `requests` per fer peticions HTTP síncrones.

Temps d'execució en segons:

| Tècnica      | Javascript | Python |
| ------------ | ---------: | -----: |
| 1. Síncrona  |      20.19 |  10.84 |
| 2. Asíncrona |       0.25 |   0.18 |
| 3. Threads   |       2.10 |   1.43 |
| 4. Processos |       2.34 |   1.99 |

Amb Javascript podem fer tasques asíncrones a traves de Promises o a través d'async/await. Hi ha una versió de cada, amb temps d'execució molt similars.

A les tasques limitades per E/S podem fer servir més fils d'execució paral·lela però, una vegada haguem arribat al límit del nostre sistema, tanmateix estarem esperant perquè algú altre ens doni la resposta.
Una solució més intel·ligent és fer servir tasques asíncrones: així, en detectar que estam esperant algú altre, passam a la següent tasca sense necessitar paral·lelisme real.
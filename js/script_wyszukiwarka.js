// ======= Pobranie parametrów z URL =======

const params = new URLSearchParams(window.location.search);

// ======= Pobranie zapytania z URL =======

const zapytanie = params.get('zapytanie');

if (zapytanie) {
    // placeholder skryptu
    document.body.innerHTML += `<h1>Wpisano do wyszukiwarki: "${zapytanie}"</h1>`;
}

// ========== Pobranie filtru z URL =======

const filtr = params.get('filter');

if (filtr) {
    // placeholder skryptu
    document.body.innerHTML += `<h1>Wybrano filtr: "${filtr}"</h1>`;
}
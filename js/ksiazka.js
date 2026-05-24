function ksiazkaKolorTla(ksiazkaZapisana) {
    document.documentElement.style.setProperty(
        '--box-shadow',
        `${ksiazkaZapisana.cover_color}`
    );
}

var ksiazkaZapisana;
async function wlaczKsiazkaDetale() {
    const ksiazki=await getBooks();
    const ksiazkaSzukana=new URLSearchParams(window.location.search);

    ksiazkaZapisana=ksiazki.find(szukana =>
        szukana.slug===ksiazkaSzukana.get("tytul"));

    if (!ksiazkaZapisana) {
        document.getElementById("ksiazkaDetale").textContent="Nie znaleziono książki";
        return;
    }

    document.getElementById("ksiazkaDetale").innerHTML=ksiazkaDetale(
        ksiazkaZapisana.simple_thumb,ksiazkaZapisana.title,ksiazkaZapisana.author);

    ksiazkaKolorTla(ksiazkaZapisana);
}

wlaczKsiazkaDetale();

const motywZmiana = document.getElementById("mode-switch");
motywZmiana.addEventListener("click", () => {
    if (!ksiazkaZapisana) return;
    ksiazkaKolorTla(ksiazkaZapisana);

    console.log(ksiazkaZapisana);
});

function ksiazkaDetale(img, title, author) {
    return `
        <h3 class="tytul" id="ksiazkaDetaleTytul">${title}</h3>
        <a id="ksiazkaDetaleAutor" href="youtube.com">${author}</a>
        <img src="${img}" id="ksiazkaDetaleOkladka"></img>
    `;
}
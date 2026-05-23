function ksiazkaKolorTla(ksiazkaZapisana) {
    // const aktualnyMotywCzyJasny=document.documentElement.classList.contains("light");
    // let kolorGlowny=aktualnyMotywCzyJasny ? "#ffffff" : "#000000";
    // let kolorAkcent=ksiazkaZapisana.cover_color;
    
    // if (aktualnyMotywCzyJasny===true) {
    //     document.documentElement.style.setProperty(
    //         '--background-background',
    //         `color-mix(in srgb, ${kolorGlowny} 90%, ${kolorAkcent} 10%)`
    //     );
    // }
    // else {
    //     document.documentElement.style.setProperty(
    //         '--background-background',
    //         `color-mix(in srgb, ${kolorGlowny} 50%, ${kolorAkcent} 50%)`
    //     );
    // }

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
});

function ksiazkaDetale(img, title, author) {
    return `
        <img src="${img}" id="ksiazkaDetaleOkladka"></img>
        <h3 class="tytul" id="ksiazkaDetaleTytul">${title}</h3>
        <p class="autor" id="ksiazkaDetaleAutor">${author}</p>
    `;
}
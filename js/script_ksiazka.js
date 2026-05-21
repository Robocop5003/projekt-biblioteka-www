async function wlaczKsiazkaDetale() {
    const ksiazki=await getBooks();
    const ksiazkaSzukana=new URLSearchParams(window.location.search);

    const ksiazkaZapisana=ksiazki.find(szukana =>
        szukana.slug===ksiazkaSzukana.get("tytul"));

    if (!ksiazkaZapisana) {
        document.getElementById("ksiazkaInfo").textContent="Nie znaleziono książki";
        return;
    }

    document.getElementById("ksiazkaInfo").textContent=ksiazkaZapisana.slug;
}

wlaczKsiazkaDetale();
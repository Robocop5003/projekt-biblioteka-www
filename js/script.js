// ========== Funkcje pomocnicze ==========

function randomInt(max, min = 0) {
    return Math.floor(Math.random() * max) + min;
}

// ========== Web Componenty ==========

class Naglowek extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="head" class="sticky"> <!--todo < Zmieńmy może tego id, żeby nie myliła się nam z <head> -->
                <header>
                    <span id="menu-icon" alt="Menu" class="material-symbols-outlined unselectable">menu</span>
                    <a href="./index.html" style="text-decoration: none; color: inherit;">
                        <h1 id="logo">Biblioteka</h1>
                    </a>
                    <span id="mode-switch" alt="Zmiana motywu" class="material-symbols-outlined unselectable"></span>
                </header>
             </div>
        `;
    }
}
customElements.define('komponent-naglowek', Naglowek);

class Nawigacja extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div id="navigacja">
            <nav>
                <ul>
                    <li><a href="./wyszukiwarka.html?filter=gatunki">Gatunki</a></li>
                    <li><a href="./wyszukiwarka.html?filter=epoki">Epoki</a></li>
                    <li><a href="./wyszukiwarka.html?filter=rodzaje">Rodzaje</a></li>
                </ul>
            </nav>
        </div>`;
    }
}

//<li><a href="./wyszukiwarka.html?filter=motywy">Motywy</a></li>
// motywow nie ma w ksiazkach w api

customElements.define('komponent-nawigacja', Nawigacja);

// ========== Przyciski na sticky ==========

const menuButton = document.getElementById("menu-icon");
const modeSwitchButton = document.getElementById("mode-switch");
const navigacja = document.getElementById("navigacja");

if(menuButton) {
    menuButton.addEventListener("click", menuClick);
}

if(modeSwitchButton) {
    modeSwitchButton.addEventListener("click", modeSwitchClick);
    initThemeIcon();
}

function initThemeIcon() {
    const theme = localStorage.getItem("theme");
    if(theme != null)
        modeSwitchButton.innerHTML = theme == "dark" ? "dark_mode" : "light_mode";
    else
        modeSwitchButton.innerHTML = "dark_mode";
}

function menuClick() {
    navigacja.classList.toggle("active");
}

function modeSwitchClick() {
    const theme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark");
    document.documentElement.classList.toggle("light");
    localStorage.setItem("theme", theme == "dark" ? "light" : "dark");
    initThemeIcon();
}

// ========== Książki ==========

async function getData(what) {
    const url = `https://wolnelektury.pl/api/${what}`;
    const data = await fetch(url);
    const json = await data.json();
    return json;
}

async function getBooks() {
    const json = await getData("books");
    return json;
}

async function getGenres() {
    const json = await getData("genres");
    return json;
}

async function getEpochs() {
    const json = await getData("epochs");
    return json;
}

async function getKinds() {
    const json = await getData("kinds");
    return json;
}

async function getThemes() {
    const json = await getData("themes");
    return json;
}

function ksiazkaHTMLString(img, title, author) {
    return `
        <img src="${img}"></img>
        <h3 class="tytul">${title}</h3>
        <p class="autor">${author}</p>
    `;
}

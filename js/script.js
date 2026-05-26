// ========== Funkcje pomocnicze ==========

function randomInt(max, min = 0) {
    return Math.floor(Math.random() * max) + min;
}

// ========== Web Componenty ==========

class Naglowek extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="head" class="sticky">
                <header>
                    <!-- Ikony po lewej -->
                    <span id="menu-icon" alt="Menu" class="material-symbols-outlined unselectable">menu</span>

                    <!-- Ikony po środku -->
                    <a href="./index.html" style="text-decoration: none; color: inherit;">
                        <h1 id="logo">Lekturoteka</h1> <!--todo NAPRAWIĆ TO, ŻEBY BYŁO PO ŚRODKU!!! -->
                    </a>

                    <!-- Ikony po prawej -->
                    <span id="koszykIkona" alt="Koszyk" class="material-symbols-outlined unselectable">shopping_basket</span>
                    <span id="kontoIkona" alt="Konto" class="material-symbols-outlined unselectable">account_circle</span>
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
        <div id="nawigacja">
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

customElements.define('komponent-nawigacja', Nawigacja);

class Wyszukiwarka extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section id="wyszukiwarka">
            <form action="wyszukiwarka.html" method="GET">
                <input type="text" name="zapytanie" id="wyszukiwarka-textbox" placeholder="Wyszukaj ksiazke...">
            </form>
        </section>`;
    }
}

customElements.define('komponent-wyszukiwarka', Wyszukiwarka);

// ========== Przyciski na sticky ==========

const menuButton = document.getElementById("menu-icon");
const koszykPrzycisk = document.getElementById("koszykIkona");
const kontoPrzycisk = document.getElementById("kontoIkona");
const modeSwitchButton = document.getElementById("mode-switch");
const nawigacja = document.getElementById("nawigacja");
const main = document.getElementById("main");

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
    nawigacja.classList.toggle("active");
    main.classList.toggle("active");
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
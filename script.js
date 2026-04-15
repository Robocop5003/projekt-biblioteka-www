// ========== Funkcje pomocnicze ==========

function randomInt(max, min = 0) {
    return Math.floor(Math.random() * max) + min;
}

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

function ksiazkaHTMLString(img, title, author) {
    return `
        <img src="${img}"></img>
        <h3 class="tytul">${title}</h3>
        <p class="autor">${author}</p>
    `;
}

async function initBooks() {
    const books = await getBooks();
    const len = books.length;
    const elements = document.getElementsByClassName("ksiazka");
    Array.from(elements).forEach(element => {
        const randomBook = books[randomInt(len)]
        element.innerHTML = ksiazkaHTMLString(randomBook.simple_thumb, randomBook.title, randomBook.author);
    });
}

initBooks()
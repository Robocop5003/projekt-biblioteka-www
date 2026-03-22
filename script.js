const menuButton = document.getElementById("menu-icon");
const modeSwitchButton = document.getElementById("mode-switch");
const navigacja = document.getElementById("navigacja");

if(menuButton)
    menuButton.addEventListener("click", menuClick);

if(modeSwitchButton)
    modeSwitchButton.addEventListener("click", modeSwitchClick);

function menuClick(){
    navigacja.classList.toggle("active");
}

function modeSwitchClick() {
    const theme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark");
    document.documentElement.classList.toggle("light");
    localStorage.setItem("theme", theme == "dark" ? "light" : "dark");
}

function randomInt(max, min = 0) {
    return Math.floor(Math.random() * max) + min;
}

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

async function initBooks() {
    const books = await getBooks();
    const len = books.length;
    const elements = document.getElementsByClassName("ksiazka");
    Array.from(elements).forEach(element => {
        const randomBook = books[randomInt(len)]
        element.innerHTML = `
            <img src="${randomBook.simple_thumb}"></img>
            <p>${randomBook.author} - ${randomBook.title}</p>
        `;
    });
}

initBooks()

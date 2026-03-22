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

const menuButton = document.getElementById("menu-icon");
const modeSwitchButton = document.getElementById("mode-switch");
const navigacja = document.getElementById("navigacja");

menuButton.addEventListener("click", menuClick);
modeSwitchButton.addEventListener("click", modeSwitchClick);

function menuClick(){
    navigacja.classList.toggle("active");
}

function modeSwitchClick() {
    if (document.body.classList.contains("light")) {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } 
    
    else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
    } 
}

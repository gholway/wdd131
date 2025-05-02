const themeSelector = document.querySelector;
function changeTheme() {
    if (themeSelector == 'Dark') {
        document.getElementById("div");
        Element.classList.add("dark");
        document.getElementById("img").src ="byui-logo_white.png";
    }
    else {
        document.getElementById("div");
        Element.classList.remove("dark");
        document.getElementById("img").src ="byui-logo_blue.png";
    }
}
themeSelector.addEventListener('change', changeTheme);
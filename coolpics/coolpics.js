const menuButton = document.querySelector(".menu-button");
const gallery = document.querySelector(".gallery");
function toggleMenu() {
    const menu = document. querySelector(".menu");
    menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

function handleResize() {
    const menu = document.querySelector(".menu");
    if (window.innerWidth > 100) {
        menu.classList.remove("hide");
    }
    else {
        menu.classList.add("hide");
    }
}

handleResize();
window.addEventListener("resize", handleResize);

function modal(gallery) {
    dialog.add(gallery);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    })
}
const openMenuBtn = document.querySelector(".toggle-menu");
const soundMenu = document.querySelector(".sound-picker");

openMenuBtn.addEventListener("click", () => {
    soundMenu.classList.toggle("open");
    openMenuBtn.classList.toggle("rotate");
});
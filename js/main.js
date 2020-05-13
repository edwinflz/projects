$(function() {
    $('[data-toggle="tooltip"]').tooltip();
    animationImg();
});

const animationImg = () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        const image = card.querySelector("img");
        image.addEventListener("load", (event) => {
            event.srcElement.classList.add("fadeIn");
        });
    });
};
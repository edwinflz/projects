const ipad = window.matchMedia('screen and (max-width: 767px');
const menuCanva = document.querySelector('.menu');
const burgerButton = document.querySelector('#burger-menu');


ipad.addListener((event) => {
    (event.matches) ? addClick(hideShow) : removeClick(hideShow);
});

const hideShow = () => {
    menuCanva.classList.toggle('is-active');
}

const addClick = (hideShow) => {
    burgerButton.addEventListener('click', hideShow);
}

const removeClick = (hideShow) => {
    burgerButton.removeEventListener('click', hideShow);
}

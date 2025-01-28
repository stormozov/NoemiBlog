/*
  ОТКРЫТИЕ И ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ
*/

const toggleMobileMenu = () => {
  const body = document.body;
  const hamburgerButton = document.querySelector(".nav--primary__hamburger");
  const navMenu = document.querySelector(".nav--primary");

  hamburgerButton.addEventListener("click", () => {
      body.classList.toggle("body-open-nav");
      navMenu.classList.toggle("nav--primary-open");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  toggleMobileMenu();
});
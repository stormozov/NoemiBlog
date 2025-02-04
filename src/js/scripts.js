/*
  * ----------------------------------------------------------------------------
  * Файл: scripts.js
  * Описание: Содержит функции для управления мобильным меню и модальным окном.
  * Автор: Сергей Тормозов (https://github.com/stormozov/)
  * Дата создания: 28.01.2025
  * Последнее обновление: 28.01.2025
  * Версия: 1.0
  * ---------------------------------------------------------------------------  
  * 
  * Функции:
  * 1. toggleMobileMenu: 
  *   - Описание: Позволяет открывать и закрывать мобильное навигационное меню при нажатии на кнопку-гамбургер.
  *   - Как это работает: Добавляет обработчик событий на кнопку, который переключает классы на body и навигационном меню.
  * 
  * 2. openCloseModal: 
  *   - Описание: Управляет открытием и закрытием модального окна.
  *   - Как это работает: 
  *     - Открывает модальное окно при выходе мыши за пределы экрана в ПК-версии или при нажатии на экран в мобильной версии.
  *     - Запоминает время последнего закрытия модального окна в localStorage, чтобы предотвратить его повторное открытие в течение двух дней.
  *     - Закрывает модальное окно при нажатии на кнопку закрытия или на оверлей.
  * 
  * 3. adjustCardHeights: 
  *   - Описание: Автоматически перестраивает высоту карточек в списке.
  *   - Как это работает: 
  *     - Выбирает все карточки в "goods__list".
  *     - Находит максимальную высоту среди карточек.
  *     - Устанавливает всем карточкам эту максимальную высоту.
  * 
  * 4. DOMContentLoaded: 
  *   - Описание: Инициализирует функции мобильного меню и модального окна при загрузке страницы.
  *   - Также вызывает adjustCardHeights для установки высоты карточек.
  */

const BODY = document.body;

/*
  ОТКРЫТИЕ И ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ
*/

const toggleMobileMenu = () => {
  const hamburgerButton = document.querySelector(".nav--primary__hamburger");
  const navMenu = document.querySelector(".nav--primary");

  hamburgerButton.addEventListener("click", () => {
      BODY.classList.toggle("body-open-nav");
      navMenu.classList.toggle("nav--primary-open");
  });
}

/*
  ОТКРЫТИЕ И ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
*/

const openCloseModal = () => {
  const modal = document.querySelector(".modal");
  const modalOverlay = document.querySelector(".modal__overlay");
  const modalButtonClose = document.querySelector(".modal__btn-close");

  const removeModalClasses = () => {
    document.body.classList.remove("body-modal-open");
    modal.classList.remove("modal--open");

    localStorage.setItem("modalLastClosed", Date.now());
  };

  const shouldShowModal = () => {
    const lastClosed = localStorage.getItem("modalLastClosed");
    if (!lastClosed) return true;

    const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;
    return (Date.now() - lastClosed) > twoDaysInMilliseconds;
  };

  // Открытие модального окна при выходе мыши за пределы экрана в ПК-версиях
  document.addEventListener("mouseleave", e => {
    if (e.clientY < 0 && shouldShowModal()) {
      document.body.classList.add("body-modal-open");
      modal.classList.add("modal--open");
    }
  });

  // Открытие модального окна при нажатии на экран
  document.addEventListener("touchstart", e => {
    if (shouldShowModal()) {
      document.body.classList.add("body-modal-open");
      modal.classList.add("modal--open");
    }
  });

  modalButtonClose.addEventListener("click", removeModalClasses);
  modalOverlay.addEventListener("click", removeModalClasses);
};

/*
  АВТОМАТИЧЕСКАЯ ПЕРЕСТРОЙКА ВЫСОТЫ КАРТОЧЕК
*/

const adjustCardHeights = (cardsSelector) => {
  const cards = document.querySelectorAll(cardsSelector);
  let maxHeight = 0;

  // Находим максимальную высоту
  cards.forEach(card => {
    card.style.height = "auto"; // Сбрасываем высоту
    maxHeight = Math.max(maxHeight, card.offsetHeight);
  });

  // Устанавливаем всем карточкам максимальную высоту
  cards.forEach(card => {
    card.style.height = `${maxHeight}px`;
  });
};

/*
  ОБРАБОТКА СОБЫТИЙ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
*/

document.addEventListener("DOMContentLoaded", () => {
  toggleMobileMenu();
  openCloseModal();
  adjustCardHeights(".goods__text-wrapper");
});

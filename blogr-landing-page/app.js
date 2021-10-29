const menu_btn = document.querySelector(".menu-icon");
const nav_bar = document.querySelector(".nav-bar");
const header_bottom = document.querySelector(".header-bottom");
const product_item = document.querySelector(".product-item");
const company_item = document.querySelector(".company-item");
const connect_item = document.querySelector(".connect-item");
const product_menu = document.querySelector(".product-menu");
const company_menu = document.querySelector(".company-menu");
const connect_menu = document.querySelector(".connect-menu");
const arrow_down = document.querySelectorAll(".arrow-down");

menu_btn.addEventListener("click", () => {
  nav_bar.classList.toggle("visually-hidden");
  header_bottom.classList.toggle("visually-hidden");
});

product_item.addEventListener("click", () => {
  product_menu.classList.toggle("visually-hidden");
  arrow_down[0].classList.toggle("rotate");
  arrow_down[1].classList.toggle("rotate");
});

company_item.addEventListener("click", () => {
  company_menu.classList.toggle("visually-hidden");
  arrow_down[2].classList.toggle("rotate");
  arrow_down[3].classList.toggle("rotate");
});

connect_item.addEventListener("click", () => {
  connect_menu.classList.toggle("visually-hidden");
  arrow_down[4].classList.toggle("rotate");
  arrow_down[5].classList.toggle("rotate");
});

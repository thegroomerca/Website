function initSiteMenu() {
  const toggle = document.querySelector(".site-menu-toggle");
  const mobileMenu = document.querySelector(".site-mobile-menu");

  if (!toggle || !mobileMenu) {
    return;
  }

  if (toggle.dataset.menuInitialized === "true") {
    return;
  }

  toggle.dataset.menuInitialized = "true";

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    mobileMenu.classList.add("is-open");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  toggle.addEventListener("click", function () {
    const isOpen = mobileMenu.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 980) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initSiteMenu();
});
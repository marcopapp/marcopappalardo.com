const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();


const heroPortrait = document.querySelector("#hero-portrait");
if (heroPortrait) {
  fetch("/assets/hero-photo-base64.txt?v=20260923-hq2")
    .then((response) => {
      if (!response.ok) throw new Error("Portrait data unavailable");
      return response.text();
    })
    .then((base64) => {
      const data = base64.trim();
      if (data) heroPortrait.src = "data:image/webp;base64," + data;
    })
    .catch(() => {});
}

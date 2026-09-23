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
  const heroParts = [1,2,3,4,5,6].map((n) =>
    `/assets/hero-photo-20260923-part-${String(n).padStart(2, "0")}.txt?v=20260923-exact-v1`
  );
  Promise.all(heroParts.map((url) => fetch(url).then((response) => {
    if (!response.ok) throw new Error("Hero portrait unavailable");
    return response.text();
  })))
    .then((parts) => {
      heroPortrait.src = "data:image/webp;base64," + parts.join("").replace(/\s+/g, "");
    })
    .catch(() => {});
}

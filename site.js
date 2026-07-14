document.documentElement.classList.add("has-js");

const header = document.querySelector("[data-header]");
const hero = document.querySelector(".hero");
const revealItems = document.querySelectorAll("[data-reveal]");

if (window.location.hash) {
  window.addEventListener("load", () => {
    const target = document.querySelector(window.location.hash);
    if (!target) return;

    target.querySelectorAll("[data-reveal]").forEach((item) => item.classList.add("is-visible"));
    document.documentElement.style.scrollBehavior = "auto";
    target.scrollIntoView({ block: "start" });
    requestAnimationFrame(() => document.documentElement.style.removeProperty("scroll-behavior"));
  });
}

if (header && hero) {
  const headerObserver = new IntersectionObserver(
    ([entry]) => header.classList.toggle("is-scrolled", !entry.isIntersecting),
    { threshold: 0.08 },
  );

  headerObserver.observe(hero);
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10%", threshold: 0.08 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

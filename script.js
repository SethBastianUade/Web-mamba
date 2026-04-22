// URL central de Calendly — reemplazar por la real del cliente.
const CALENDLY_URL = "https://calendly.com/mambaservicios/reunion";

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const revealItems = document.querySelectorAll(
  ".service-card, .advantage-card, .project-card, .logo-card, .review-card, .sponsor-card, .final-cta-box, .video-frame"
);
const calendlyTriggers = document.querySelectorAll("[data-calendly]");
const yearTarget = document.getElementById("year");

const closeMenu = () => {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });
}

const updateHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

// Calendly popup trigger: cualquier elemento con [data-calendly] abre el modal.
calendlyTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
      event.preventDefault();
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
    // Si Calendly aún no cargó, el enlace hace fallback al href (#contacto).
  });
});

if ("IntersectionObserver" in window) {
  revealItems.forEach((item) => item.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

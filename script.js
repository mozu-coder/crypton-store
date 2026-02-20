// ==============================================
// NOCT SPOOFER - MAIN JAVASCRIPT
// ==============================================

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("🎮 NOCT SPOOFER - Initializing...");

  // Marcar HTML como carregado para prevenir FOUC
  document.documentElement.classList.add("loaded");

  initMobileMenu();
  initSmoothScroll();
  initScrollEffects();
  initAnimations();
  initLazyLoading();

  console.log("✅ NOCT SPOOFER - Ready!");
});

// ==============================================
// MOBILE MENU
// ==============================================
function initMobileMenu() {
  const menuBtn = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");

  if (!menuBtn || !menu) {
    console.warn("⚠️ Menu elements not found");
    return;
  }

  console.log("📱 Mobile menu initialized");

  // Toggle menu
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isHidden = menu.classList.contains("hidden");
    menu.classList.toggle("hidden");

    // Update icon
    const icon = menuBtn.querySelector(".material-symbols-outlined");
    if (icon) {
      icon.textContent = isHidden ? "close" : "menu";
    }

    console.log(isHidden ? "📂 Menu opened" : "📁 Menu closed");
  });

  // Close on link click
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      const icon = menuBtn.querySelector(".material-symbols-outlined");
      if (icon) icon.textContent = "menu";
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
      if (!menu.classList.contains("hidden")) {
        menu.classList.add("hidden");
        const icon = menuBtn.querySelector(".material-symbols-outlined");
        if (icon) icon.textContent = "menu";
      }
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.classList.contains("hidden")) {
      menu.classList.add("hidden");
      const icon = menuBtn.querySelector(".material-symbols-outlined");
      if (icon) icon.textContent = "menu";
    }
  });

  // Close on viewport resize to desktop
  let lastWidth = window.innerWidth;
  window.addEventListener(
    "resize",
    debounce(() => {
      if (window.innerWidth >= 1024 && lastWidth < 1024) {
        menu.classList.add("hidden");
        const icon = menuBtn.querySelector(".material-symbols-outlined");
        if (icon) icon.textContent = "menu";
      }
      lastWidth = window.innerWidth;
    }, 250),
  );
}

// ==============================================
// SMOOTH SCROLL
// ==============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ==============================================
// SCROLL EFFECTS
// ==============================================
function initScrollEffects() {
  const header = document.querySelector("header");
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    debounce(() => {
      const currentScroll = window.pageYOffset;

      // Add shadow when scrolled
      if (currentScroll > 10) {
        header?.classList.add("shadow-lg");
      } else {
        header?.classList.remove("shadow-lg");
      }

      // Update active nav link
      updateActiveNav();

      lastScroll = currentScroll;
    }, 10),
  );
}

function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('header a[href^="#"]');
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("text-accent");
        link.classList.add("text-slate-300");

        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("text-accent");
          link.classList.remove("text-slate-300");
        }
      });
    }
  });
}

// ==============================================
// ANIMATIONS
// ==============================================
function initAnimations() {
  // Intersection Observer for fade-in
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply to sections
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(section);
  });

  // Add ripple effect to buttons
  document.querySelectorAll("button, .clip-jagged").forEach((button) => {
    button.addEventListener("click", createRipple);
  });
}

function createRipple(e) {
  const button = e.currentTarget;
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.classList.add("ripple");

  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// ==============================================
// LAZY LOADING
// ==============================================
function initLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img").forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para browsers antigos
    document.querySelectorAll("img").forEach((img) => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      img.classList.add("loaded");
    });
  }
}

// ==============================================
// UTILITY FUNCTIONS
// ==============================================
function debounce(func, wait = 20) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ==============================================
// CONSOLE EASTER EGG
// ==============================================
console.log(
  "%c🎮 NOCT SPOOFER 🎮",
  "color: #39ff14; font-size: 24px; font-weight: bold; text-shadow: 2px 2px #8c25f4;",
);
console.log(
  "%cSistema UEFI carregado com sucesso!",
  "color: #8c25f4; font-size: 14px;",
);
console.log(
  "%c💬 Discord: https://discord.gg/noctspoofer",
  "color: #5865F2; font-size: 12px;",
);

// ==============================================
// TOUCH SUPPORT
// ==============================================
if ("ontouchstart" in window) {
  document.querySelectorAll(".group").forEach((element) => {
    element.addEventListener("touchstart", function () {
      this.classList.add("touch-active");
    });

    element.addEventListener("touchend", function () {
      setTimeout(() => {
        this.classList.remove("touch-active");
      }, 300);
    });
  });
}

// ==============================================
// PREVENT CONTEXT MENU ON IMAGES (OPTIONAL)
// ==============================================
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });
});

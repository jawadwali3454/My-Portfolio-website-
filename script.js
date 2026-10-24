
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Automatically update the footer year
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile navigation menu
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });

    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      }
    });
  }

  // 3. Filter featured projects
  const projectButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  projectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      projectButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      projectCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(/\s+/);
        const matches =
          selectedFilter === "all" ||
          categories.includes(selectedFilter);

        card.classList.toggle("hidden", !matches);
      });
    });
  });

  // 4. Filter skills by category
  const skillButtons = document.querySelectorAll(".skill-tab");
  const skillItems = document.querySelectorAll(".skill");

  skillButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.classList.contains("active"))
    );

    button.addEventListener("click", () => {
      const selectedSkill = button.dataset.skill;

      skillButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      skillItems.forEach((skill) => {
        const matches =
          selectedSkill === "all" ||
          skill.dataset.category === selectedSkill;

        skill.classList.toggle("hidden", !matches);
      });
    });
  });

  // 5. Animate skill progress bars when visible
  const progressBars = document.querySelectorAll(".progress span");

  const animateSkills = () => {
    progressBars.forEach((bar) => {
      const container = bar.closest(".skill");

      if (container && !container.classList.contains("hidden")) {
        bar.style.width = bar.style.getPropertyValue("--level");
      }
    });
  };

  if ("IntersectionObserver" in window) {
    const skillsSection = document.getElementById("skills");

    if (skillsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateSkills();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(skillsSection);
    }
  } else {
    animateSkills();
  }

  // 6. Highlight the current navigation section
  const navLinks = document.querySelectorAll('#navMenu a[href^="#"]');
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && navLinks.length && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              const active = link.getAttribute("href") === `#${entry.target.id}`;

              link.classList.toggle("active", active);

              if (active) {
                link.setAttribute("aria-current", "location");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          }
        });
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // 7. Contact form: prepare an email in the user's email application
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = "Please complete all fields.";
        return;
      }

      const subject = encodeURIComponent(
        `Portfolio inquiry from ${name}`
      );

      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      const mailtoLink =
        `mailto:jawadwali3454@gmail.com?subject=${subject}&body=${body}`;

      formStatus.textContent =
        "Opening your email application. Send the prepared email to complete your message.";

      window.location.href = mailtoLink;
    });
  }

  // 8. Add accessible pressed states to filter buttons
  document.querySelectorAll(".filter-btn, .skill-tab").forEach((button) => {
    if (!button.hasAttribute("aria-pressed")) {
      button.setAttribute(
        "aria-pressed",
        String(button.classList.contains("active"))
      );
    }
  });

  console.log("Jawad Tech Hub website initialized successfully.");
});

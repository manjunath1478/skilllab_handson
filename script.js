
/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Close the menu if the user clicks outside it.
document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    }
});


/* =========================================
   2. SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    // Fallback for older browsers and reduced-motion preferences.
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


/* =========================================
   3. ACTIVE NAVIGATION ON SCROLL
========================================= */

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const sectionId = entry.target.id;

                navItems.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") === `#${sectionId}`;

                    link.classList.toggle("active", isActive);
                });
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


/* =========================================
   4. AUTOMATIC COPYRIGHT YEAR
========================================= */

const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();


/* =========================================
   5. CONTACT FORM
========================================= */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// IMPORTANT:
// Replace this with your actual email address.
const portfolioEmail = "your-email@example.com";

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    if (
        portfolioEmail === "your-email@example.com" ||
        !portfolioEmail.includes("@")
    ) {
        formStatus.textContent =
            "Please replace the placeholder email in script.js first.";
        return;
    }

    const formData = new FormData(contactForm);

    const name = formData.get("name").trim();
    const senderEmail = formData.get("email").trim();
    const message = formData.get("message").trim();

    const subject = `Portfolio enquiry from ${name}`;

    const body = [
        `Name: ${name}`,
        `Email: ${senderEmail}`,
        "",
        "Message:",
        message
    ].join("\n");

    const mailtoLink =
        `mailto:${portfolioEmail}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

    formStatus.textContent =
        "Opening your email application. Send the message there to complete it.";

    window.location.href = mailtoLink;
});


/* =========================================
   6. PROJECT LINK PLACEHOLDER CHECK
========================================= */

document.querySelectorAll(".project-link, .social-link").forEach((link) => {
    link.addEventListener("click", (event) => {
        if (link.getAttribute("href") === "#") {
            event.preventDefault();
            alert(
                "Replace this placeholder with your actual project or social profile URL."
            );
        }
    });
});

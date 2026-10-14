
/* ==============================
   VERN PORTFOLIO - INTERACTIONS
================================= */

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-link");
    const backToTop = document.getElementById("back-to-top");
    const typingText = document.getElementById("typing-text");
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    // Current year in footer
    document.getElementById("year").textContent =
        new Date().getFullYear();

    // Mobile navigation
    function closeMenu() {
        menuToggle.classList.remove("open");
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navItems.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close mobile navigation with Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // Header shadow and back-to-top button
    function handleScroll() {
        const scrolled = window.scrollY > 30;

        header.classList.toggle("scrolled", scrolled);
        backToTop.classList.toggle("visible", window.scrollY > 450);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Back to top
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth"
        });
    });

    // Typing effect
    const words = ["web.", "ideas.", "experiences.", "the future."];
    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
        typingText.textContent = "web.";
    } else {
        function typeEffect() {
            const currentWord = words[wordIndex];

            if (deleting) {
                characterIndex--;
            } else {
                characterIndex++;
            }

            typingText.textContent = currentWord.slice(
                0,
                characterIndex
            );

            let delay = deleting ? 55 : 105;

            if (!deleting && characterIndex === currentWord.length) {
                deleting = true;
                delay = 1300;
            } else if (deleting && characterIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 350;
            }

            window.setTimeout(typeEffect, delay);
        }

        typeEffect();
    }

    // Reveal elements as they enter the viewport
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && !reducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // Highlight the navigation link for the visible section
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navItems.forEach((link) => {
                            const matches =
                                link.getAttribute("href") ===
                                `#${entry.target.id}`;

                            link.classList.toggle("active", matches);
                        });
                    }
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

    // Contact form: validate and prepare an email
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const formData = new FormData(contactForm);

        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const subject = formData.get("subject").trim();
        const message = formData.get("message").trim();

        // Replace this with your real email address
        const recipient = "heroxhonattackz20@gmail.com";

        const emailSubject = encodeURIComponent(
            `${subject} — from ${name}`
        );

        const emailBody = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`
        );

        const mailtoLink =
            `mailto:${recipient}` +
            `?subject=${emailSubject}` +
            `&body=${emailBody}`;

        formStatus.textContent =
            "Opening your email app. If nothing opens, check that an email app is configured.";

        window.location.href = mailtoLink;
    });
});

//javascript
document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // MOBILE NAVIGATION
    // =========================

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-link");

    function closeMenu() {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Open navigation menu" : "Close navigation menu"
        );

        navLinks.classList.toggle("open", !isOpen);
    });

    navItems.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // =========================
    // TYPING EFFECT
    // =========================

    const typingElement = document.getElementById("typing-text");

    const words = [
        "Web Developer",
        "Creative Thinker",
        "Website Builder",
        "Lifelong Learner"
    ];

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (typingElement && !reduceMotion) {
        let wordIndex = 0;
        let characterIndex = words[0].length;
        let deleting = true;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (deleting) {
                characterIndex--;

                typingElement.textContent = currentWord.slice(
                    0,
                    Math.max(0, characterIndex)
                );

                if (characterIndex <= 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;

                    setTimeout(typeEffect, 350);
                    return;
                }

                setTimeout(typeEffect, 45);
            } else {
                const nextWord = words[wordIndex];
                characterIndex++;

                typingElement.textContent = nextWord.slice(
                    0,
                    characterIndex
                );

                if (characterIndex >= nextWord.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1700);
                    return;
                }

                setTimeout(typeEffect, 85);
            }
        }

        setTimeout(typeEffect, 1700);
    }

    // =========================
    // REPEATING SCROLL ANIMATIONS
    // =========================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    } else {
                        // Remove the class so the animation can replay
                        // when the user scrolls back to this element.
                        entry.target.classList.remove("visible");
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // =========================
    // ACTIVE NAVIGATION ON SCROLL
    // =========================

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
                rootMargin: "-30% 0px -55% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // =========================
    // CONTACT FORM
    // =========================

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    const recipientEmail = "heroxhonattackz20@gmail.com";

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const name = document.getElementById("name").value.trim();
        const senderEmail = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const emailSubject = `[Portfolio Contact] ${subject}`;

        const emailBody = [
            `Name: ${name}`,
            `Email: ${senderEmail}`,
            "",
            "Message:",
            message
        ].join("\n");

        const mailtoURL =
            `mailto:${recipientEmail}` +
            `?subject=${encodeURIComponent(emailSubject)}` +
            `&body=${encodeURIComponent(emailBody)}`;

        formStatus.textContent =
            "Opening your email app. Review the message and press Send to email Vern.";

        // Open the visitor's default email application.
        window.location.href = mailtoURL;
    });

    // =========================
    // AUTOMATIC COPYRIGHT YEAR
    // =========================

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});


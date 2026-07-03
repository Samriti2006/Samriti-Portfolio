const themeToggle = document.getElementById("themeToggle");
const iconMoon = document.getElementById("iconMoon");
const iconSun = document.getElementById("iconSun");

function setTheme(isLight) {
  document.body.classList.toggle("light", isLight);
  iconMoon.style.display = isLight ? "none" : "inline";
  iconSun.style.display = isLight ? "inline" : "none";
}


const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    setTheme(true);
} else {
    setTheme(false);
}

themeToggle.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light");
    setTheme(isLight);

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );
});

const statusText = document.getElementById("typedStatus");

const statusMessages = [
    "Building Full Stack Projects",
    "Learning Machine Learning",
    "Practicing Data Structures & Algorithms",
    "Exploring Modern Web Development",
    "Always Learning Something New"
];

let currentMessage = 0;
let currentCharacter = 0;
let deleting = false;

function typeLoop() {

    const current = statusMessages[currentMessage];

    if (!deleting) {

        currentCharacter++;

        statusText.textContent = current.slice(0, currentCharacter);

        if (currentCharacter === current.length) {

            deleting = true;

            setTimeout(typeLoop, 1500);

            return;

        }

    } else {

        currentCharacter--;

        statusText.textContent = current.slice(0, currentCharacter);

        if (currentCharacter === 0) {

            deleting = false;

            currentMessage++;

            if (currentMessage >= statusMessages.length) {

                currentMessage = 0;

            }

        }

    }

    setTimeout(typeLoop, deleting ? 40 : 70);

}

typeLoop();


const fileLinks = document.querySelectorAll(".file-link");
const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll(".section");

function setActiveTarget(id) {
  fileLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.target === id);
  });
  tabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.target === id);
  });
}

[...fileLinks, ...tabs].forEach(el => {
  el.addEventListener("click", (e) => {
    const targetId = el.dataset.target;
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      if (e.type === "click" && el.tagName === "A") e.preventDefault();
      targetSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
});
      setActiveTarget(targetId);
      closeSidebarOnMobile();
    }
  });
});


const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveTarget(entry.target.id);
    }
  });
}, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

sections.forEach(section => {
  revealObserver.observe(section);
  spyObserver.observe(section);
});

const skillFills = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.level + "%";
      observer.unobserve(fill);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const tags = card.dataset.tags.split(" ");
      const show = filter === "all" || tags.includes(filter);
      card.classList.toggle("hidden", !show);
    });
  });
});

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);
  input.closest(".form-row").classList.toggle("error", !!message);
  errorEl.textContent = message;
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formSuccess.classList.remove("visible");

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let valid = true;

  if (name.length < 2) {
    showError("name", "nameError", "Please enter your name.");
    valid = false;
  } else {
    showError("name", "nameError", "");
  }

  if (!emailPattern.test(email)) {
    showError("email", "emailError", "Please enter a valid email address.");
    valid = false;
  } else {
    showError("email", "emailError", "");
  }

  if (message.length < 10) {
    showError("message", "messageError", "Message should be at least 10 characters.");
    valid = false;
  } else {
    showError("message", "messageError", "");
  }
if (valid) {
    emailjs.init("0QzQqldGLb4qGR_yr");

    emailjs.sendForm("service_mqwth7m", "template_yclyp7o", contactForm)
        .then(() => {
            formSuccess.textContent = "✓ Message sent successfully!";
            formSuccess.classList.add("visible");
            contactForm.reset();

            setTimeout(() => {
                formSuccess.classList.remove("visible");
            }, 3000);
        })
        .catch(() => {
            formSuccess.textContent = "✗ Something went wrong. Please try again.";
            formSuccess.classList.add("visible");
        });
}
});


const sidebar = document.getElementById("sidebar");
const mobileNavToggle = document.getElementById("mobileNavToggle");

mobileNavToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

function closeSidebarOnMobile() {
  if (window.innerWidth <= 760) {
    sidebar.classList.remove("open");
  }
}

const certModal = document.getElementById("certModal");
const certModalImg = document.getElementById("certModalImg");
const certModalClose = document.getElementById("certModalClose");
const certModalBackdrop = document.getElementById("certModalBackdrop");
const certCards = document.querySelectorAll(".cert-card[data-cert-img]");

function openCertModal(imgSrc) {
  certModalImg.src = imgSrc;
  certModal.classList.add("open");
}

function closeCertModal() {
  certModal.classList.remove("open");
  certModalImg.src = "";
}

certCards.forEach(card => {
  card.addEventListener("click", () => {
    const imgSrc = card.dataset.certImg;
    if (imgSrc) openCertModal(imgSrc);
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const imgSrc = card.dataset.certImg;
      if (imgSrc) openCertModal(imgSrc);
    }
  });
});

certModalClose.addEventListener("click", closeCertModal);
certModalBackdrop.addEventListener("click", closeCertModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCertModal();
});
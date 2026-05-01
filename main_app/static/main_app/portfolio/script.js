const workCards = document.querySelectorAll(".work-card");
const lightbox = document.querySelector(".lightbox");
const lightboxVideo = document.querySelector(".lightbox video");
const closeButton = document.querySelector(".lightbox-close");
const contactForm = document.querySelector(".contact-card");
const whatsappButton = document.querySelector("[data-send='whatsapp']");
const emailButton = document.querySelector("[data-send='email']");

workCards.forEach((card) => {
  const preview = card.querySelector("video");

  card.addEventListener("mouseenter", () => {
    preview.play().catch(() => {});
  });

  card.addEventListener("mouseleave", () => {
    preview.pause();
  });

  card.addEventListener("focus", () => {
    preview.play().catch(() => {});
  });

  card.addEventListener("blur", () => {
    preview.pause();
  });

  card.addEventListener("click", () => {
    const videoPath = card.dataset.video;
    lightboxVideo.src = videoPath;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxVideo.play().catch(() => {});
  });
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxVideo.pause();
  lightboxVideo.removeAttribute("src");
  lightboxVideo.load();
}

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

function getContactMessage() {
  const data = new FormData(contactForm);
  const name = data.get("name") || "New lead";
  const project = data.get("project") || "Project inquiry";
  const message = data.get("message") || "";

  return {
    project,
    subject: `Digital Dizzles message: ${project}`,
    body: `Name: ${name}\nProject: ${project}\n\nMessage:\n${message}`,
  };
}

whatsappButton.addEventListener("click", () => {
  const contact = getContactMessage();
  window.open(`https://wa.me/923700885172?text=${encodeURIComponent(contact.body)}`, "_blank");
});

if (emailButton) {
  emailButton.addEventListener("click", () => {
    const contact = getContactMessage();
    window.open(`mailto:digitaldizzlesofficial@gmail.com?subject=${encodeURIComponent(contact.subject)}&body=${encodeURIComponent(contact.body)}`, "_blank");
  });
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

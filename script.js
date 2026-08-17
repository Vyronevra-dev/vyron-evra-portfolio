const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");


burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const response = await fetch("https://formspree.io/f/xdenwyoq", {
    method: "POST",
    headers: { "Accept": "application/json" },
    body: new FormData(form)
  });

  const result = await response.json();

  if (result.ok) {
    formMsg.style.color = "#fff4cc";
    formMsg.textContent = "* Message sent, I'll get back to you soon!";
    form.reset();
  } else {
    formMsg.style.color = "red";
    formMsg.textContent = "* Something went wrong, try again.";
  }
});
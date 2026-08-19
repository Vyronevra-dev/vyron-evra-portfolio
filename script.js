const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const form = document.getElementById("contactForm");
const firstName = document.querySelector("input[name='firstName']");

burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

function showToast(message, type) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");

  toastMsg.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    const originalHTML = submitBtn.innerHTML;

    // Disable button
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    const response = await fetch("https://formspree.io/f/xdenwyoq", {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(form)
    });

    const result = await response.json();

    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHTML;

    if (result.ok) {
      showToast(`Message sent. I'll get back to you soon, ${firstName.value}!`, "success");
      form.reset();
    } else {
      showToast("Something went wrong, try again.", "error");
    }
});
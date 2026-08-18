const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const form = document.getElementById("contactForm");

burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
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

    const spinner = document.getElementById("spinner");
    const submitBtn = form.querySelector("button[type='submit']");
    const originalHTML = submitBtn.innerHTML;

    // show spinner, disable button
    spinner.style.display = "block";
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    const response = await fetch("https://formspree.io/f/xdenwyoq", {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(form)
    });

    const result = await response.json();

    // hide spinner, re-enable button
    spinner.style.display = "none";
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHTML;

    if (result.ok) {
      showToast("Message sent, I'll get back to you soon!", "success");
      form.reset();
    } else {
      showToast("Something went wrong, try again.", "error");
    }
});
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const form = document.getElementById("contactForm");
const firstName = document.querySelector("input[name='firstName']");

burger.addEventListener('click', () => {
  const isOpen = burger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('click', (e) => {
  if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

function showToast(message, type) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");
  const icon = type === "success"
  ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#C8917A" class="icon icon-tabler icons-tabler-filled icon-tabler-circle-check">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
  </svg>`
  : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff0000" class="icon icon-tabler icons-tabler-filled icon-tabler-alert-triangle">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
  </svg>`;

  toastMsg.innerHTML = `${icon} ${message}`;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    const originalHTML = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    try {
      const response = await fetch("https://formspree.io/f/xdenwyoq", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      });
      const result = await response.json();

      if (response.ok && result.ok) {
        showToast(`Message sent. I'll get back to you soon, ${firstName.value}!`, "success");
        form.reset();
      } else {
        showToast("Something went wrong, try again.", "error");
      }
    } catch {
      showToast("Unable to send your message. Check your connection and try again.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
    }
});
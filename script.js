const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const form = document.getElementById("contactForm");
const firstName = document.querySelector("input[name='firstName']");
const ring = document.querySelector("#cursorRing");
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
const commands = {
    help: `available commands:

  whoami              — who is Vyron?
  cat about.txt       — the full story
  ls projects/        — what I've built
  ls skills/          — the full tech stack
  focus               — what I'm working on
  status              — availability
  contact             — get in touch
  clear               — clear the terminal
  help                — show this list`,

    whoami: `Vyron Evra Ojoy. 19. CS student at Chuka University, graduating 2030. Born and raised in Nairobi, Kenya. Started building in 2026 at Ta'awun Vocational Training College after realizing I cared more about making things than studying them.`,

    'cat about.txt': `I build with HTML, CSS, and JavaScript. Clean interfaces, purposeful code. Alongside development I am self-studying cybersecurity because I want to understand systems well enough to both build and break them. I hold myself to a high standard regardless of the project size or who it is for. Open for freelance 24/7.`,

    'ls projects/': `Open the projects section to see these in real time:

  ashbourne-school    — live
  ellingtons-motors   — live
  codepanda           — live
  seed-initiative     — coming soon`,

    'ls skills/': `Each skill is proven by real projects:

  • HTML              • Git
  • CSS               • GitHub
  • JavaScript        • Vercel
  • Cybersecurity (learning)`,

    focus: `Currently focused on two things:

  • Exploring modern UI/UX design and how better experiences are built.
  • Learning cybersecurity from the ground up — how systems work, how they break, and how to build them better.`,

    status: `Open to freelance work. If you have a project that needs a clean, purposeful interface built from scratch, I am the guy. Same level of focus regardless of project size or who it is for.`,

    contact: `Best way to reach me is via email at vyronevra27@gmail.com. Also on GitHub as Vyronevra-dev and LinkedIn as Vyron Evra. If you have something worth building, reach out.`,

    clear: null
};


// Custom cursor
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  ring.style.opacity = '1';
});

document.querySelectorAll('a, button, input, textarea, #terminal').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.opacity = '0';
    ring.style.transform = 'translate(-50%, -50%) scale(0)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.opacity = '1';
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

(function animate() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animate);
})();


// Burger menu toggle
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

// Terminal
function switchView(tab, btn) {
    document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    const activePanel = document.getElementById(tab);
    activePanel.classList.remove('hidden');
    activePanel.classList.remove('panel-animate');

    void activePanel.offsetWidth;

    activePanel.classList.add('panel-animate');

    const actualBtn = btn.closest('.tab-btn');
    actualBtn.classList.add('active');

    if (tab === 'txt') {
    document.getElementById('term-output').innerHTML = '';
    document.getElementById('termInput').value = '';
    }

    if (tab === 'terminal') {
        document.getElementById('termInput').focus();
    }
}

document.getElementById('termInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const input = this.value.trim().toLowerCase();
        const output = document.getElementById('term-output');

        const cmdLine = document.createElement('p');
        cmdLine.className = 'term-line cmd';
        cmdLine.textContent = `vyron@nairobi ~ $ ${input}`;
        output.appendChild(cmdLine);

        if (input === 'clear') {
            output.innerHTML = '';
        } else if (commands[input] !== undefined && commands[input] !== null) {
            const res = document.createElement('p');
            res.className = 'term-line response';
            res.textContent = commands[input];
            output.appendChild(res);
        } else if (input !== '') {
            const err = document.createElement('p');
            err.className = 'term-line error';
            err.textContent = `command not found: ${input}. Type 'help' for available commands.`;
            output.appendChild(err);
        }

        this.value = '';
        output.scrollTop = output.scrollHeight;
    }
});


// Submit Form
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


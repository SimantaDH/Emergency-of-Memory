const themeData = {
  bonds: {
    eyebrow: "31.4% FB | 27.1% IG",
    title: "Continuing Bonds and Direct Address",
    body:
      "The dominant topic treats the profile as a communicative conduit: mourners address the deceased directly, sustain co-presence, and fold the profile into everyday life after death.",
    register: "Second-person address, longing, ongoing relation.",
    importance: "It shows that digital memorials are not static tombstones but active social spaces."
  },
  anniversary: {
    eyebrow: "22.8% FB | 18.3% IG",
    title: "Ritualized Anniversary Posting",
    body:
      "Birthday posts, death anniversaries, and calendar rituals organize grief into recurring cycles. The profile becomes a place where time is marked and renewed.",
    register: "Birthday invocations, counterfactual age, yearly return.",
    importance: "It reveals digital grief as rhythmic rather than simply fading."
  },
  solidarity: {
    eyebrow: "19.6% FB | 23.5% IG",
    title: "Collective Mourning and Solidarity",
    body:
      "Posts gather friends, relatives, and wider publics into visible networks of care through tribute hashtags, legacy projects, fundraisers, and shared memories.",
    register: "Collective address, tribute networks, group remembrance.",
    importance: "It shows how communities form around a profile after biological death."
  },
  archiving: {
    eyebrow: "14.2% FB | 11.4% IG",
    title: "Platform Anxiety and Archiving",
    body:
      "This is the project's most novel topic: explicit awareness that memory can vanish through platform deletion, privacy shifts, account lockout, or policy change.",
    register: "Save this, download before deletion, preserve the account.",
    importance: "It grounds the concepts of curatorial labour and memorial precarity anxiety."
  },
  afterlife: {
    eyebrow: "12.0% FB | 19.7% IG",
    title: "Spiritual and Afterlife Belief",
    body:
      "Spiritual consolation appears through prayer, angel imagery, heavenly watching, and afterlife language, especially in image-first Instagram memorials.",
    register: "Prayer, heavenly care, spiritual reassurance.",
    importance: "It shows how platform affordances shape the form and tone of mourning."
  }
};

const careData = {
  practice: {
    eyebrow: "Grassroots | Fluid | Temporal",
    title: "Emergent Practice",
    body:
      "Validate the already-existing labour of saving screenshots, downloading posts, copying captions, and sharing fragile traces before a platform can erase them.",
    bullets: [
      "Recognize community archivists as cultural memory workers.",
      "Stop penalizing preservation practices as suspicious platform behaviour.",
      "Preserve context, not only isolated images or files."
    ]
  },
  curation: {
    eyebrow: "Community | Organized | Relational",
    title: "Community Curation",
    body:
      "Support memorial groups, shared folders, peer training, and local protocols that let bereaved communities organize digital remains collaboratively.",
    bullets: [
      "Create structured archives with shared stewardship.",
      "Document consent, access roles, and contextual meaning.",
      "Keep memorial rhythms visible over time."
    ]
  },
  scaffold: {
    eyebrow: "Institutional | Durable | Ethical",
    title: "Institutional Scaffold",
    body:
      "Connect communities with libraries, universities, digital humanities centres, and cultural archives that can provide metadata, storage, and ethical oversight.",
    bullets: [
      "Offer long-term storage beyond commercial platforms.",
      "Translate community materials into preservation-ready collections.",
      "Build partnerships that respect grief and privacy."
    ]
  },
  policy: {
    eyebrow: "Systemic | Stable | Governed",
    title: "Policy and Standards",
    body:
      "Move digital remains into public-interest governance through non-commercial APIs, heritage legislation, and international preservation standards.",
    bullets: [
      "Define memorial account preservation rights.",
      "Create platform obligations for data portability and continuity.",
      "Align technical standards with ethical research guidance."
    ]
  }
};

const themeDetail = document.querySelector("#themeDetail");
const careDetail = document.querySelector("#careDetail");

function renderTheme(key) {
  const data = themeData[key];
  themeDetail.innerHTML = `
    <p class="eyebrow">${data.eyebrow}</p>
    <h3>${data.title}</h3>
    <p>${data.body}</p>
    <dl>
      <div>
        <dt>Register</dt>
        <dd>${data.register}</dd>
      </div>
      <div>
        <dt>Why it matters</dt>
        <dd>${data.importance}</dd>
      </div>
    </dl>
  `;
}

function renderCare(key) {
  const data = careData[key];
  careDetail.innerHTML = `
    <p class="eyebrow">${data.eyebrow}</p>
    <h3>${data.title}</h3>
    <p>${data.body}</p>
    <ul>${data.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
}

document.querySelectorAll(".theme-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".theme-button").forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");
    renderTheme(button.dataset.theme);
  });
});

document.querySelectorAll(".care-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".care-button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderCare(button.dataset.layer);
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((item) => {
  if (reduceMotion) {
    item.classList.add("is-visible");
  } else {
    revealObserver.observe(item);
  }
});

function formatCounter(value, element) {
  if (element.dataset.format === "compact") {
    return `${element.dataset.prefix || ""}${Math.round(value / 1000)}k`;
  }
  const formatted = element.dataset.format === "comma" ? Math.round(value).toLocaleString("en-US") : Math.round(value);
  return `${element.dataset.prefix || ""}${formatted}`;
}

document.querySelectorAll("[data-count]").forEach((item) => {
  item.textContent = formatCounter(Number(item.dataset.count), item);
});

const meter = document.querySelector(".scroll-meter span");
const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateScrollUI() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  meter.style.width = `${progress}%`;

  let active = sections[0]?.id;
  const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom || 90;
  const activationLine = headerBottom + 90;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= activationLine) {
      active = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${active}`);
  });
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
window.addEventListener("resize", updateScrollUI);
updateScrollUI();

function alignHashTarget() {
  if (!location.hash) return;
  const target = document.querySelector(location.hash);
  if (target) {
    target.scrollIntoView({ block: "start" });
    document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
    updateScrollUI();
  }
}

window.addEventListener("load", () => {
  alignHashTarget();
  window.setTimeout(alignHashTarget, 300);
  window.setTimeout(alignHashTarget, 900);
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const closeLightbox = document.querySelector(".lightbox-close");
const lightboxPlaceholder = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

function openLightbox(src, title) {
  lightbox.hidden = false;
  lightboxImage.src = src;
  lightboxImage.alt = title;
  lightboxTitle.textContent = title;
  closeLightbox.focus();
  document.body.style.overflow = "hidden";
}

function hideLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = lightboxPlaceholder;
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => openLightbox(button.dataset.lightbox, button.dataset.title || "Project image"));
});

closeLightbox.addEventListener("click", hideLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) hideLightbox();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) hideLightbox();
});

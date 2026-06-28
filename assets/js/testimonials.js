(function () {
  const fallbackTestimonials = [
    {
      id: "fallback-slada-lee-millie",
      name: "Slada Lee",
      initials: "SL",
      meta: "Client testimonial",
      quote: "Sunyoung was calm, gentle, and incredibly patient — it was a completely stress-free experience.",
      shortQuote: "Sunyoung was calm, gentle, and incredibly patient — it was a completely stress-free experience.",
      image: "assets/img/photos/gallery-testimonial.webp",
      active: true
    }
  ];

  function currentScriptBase() {
    const scripts = Array.from(document.querySelectorAll("script[src]"));
    const ownScript = scripts.find(function (script) {
      return script.src.indexOf("assets/js/testimonials.js") !== -1;
    });

    return ownScript ? ownScript.src : window.location.href;
  }

  function dataUrl() {
    return new URL("../data/testimonials.json", currentScriptBase()).href;
  }

  function normalizeTestimonials(items) {
    if (!Array.isArray(items)) {
      return fallbackTestimonials;
    }

    const active = items.filter(function (testimonial) {
      return testimonial && testimonial.active !== false && testimonial.quote && testimonial.name;
    });

    return active.length ? active : fallbackTestimonials;
  }

  function shuffle(items) {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function relativeAssetPath(path) {
    if (!path) {
      return "";
    }

    const isInPagesFolder = window.location.pathname.indexOf("/pages/") !== -1;

    if (/^(https?:)?\/\//i.test(path) || path.charAt(0) === "/") {
      return path;
    }

    return isInPagesFolder ? "../" + path : path;
  }

  function hasDedicatedPhoto(testimonial) {
    return testimonial.image && testimonial.image.indexOf("gallery-testimonial.webp") === -1;
  }

  function setText(slot, field, value) {
    const node = slot.querySelector('[data-testimonial-field="' + field + '"]');
    if (node) {
      node.textContent = value || "";
    }
  }

  function renderHero(testimonials) {
    const slot = document.querySelector('[data-testimonial-slot="hero"]');
    if (!slot || !testimonials.length) {
      return;
    }

    const testimonial = randomItem(testimonials);
    setText(slot, "quote", '"' + (testimonial.shortQuote || testimonial.quote) + '"');
    setText(slot, "name", "— " + testimonial.name);
  }

  function renderFeatured(testimonials) {
    const slot = document.querySelector('[data-testimonial-slot="gallery-featured"]');
    if (!slot || !testimonials.length) {
      return;
    }

    const testimonial = randomItem(testimonials);
    setText(slot, "quote", testimonial.quote);
    setText(slot, "name", testimonial.name);
    setText(slot, "meta", testimonial.meta || testimonial.source || "Client testimonial");

    const image = slot.querySelector('[data-testimonial-field="image"]');
    if (image && testimonial.image) {
      image.src = relativeAssetPath(testimonial.image);
      image.alt = "Happy groomed dog associated with " + testimonial.name + " testimonial";
    }
  }

  function testimonialCard(testimonial) {
    const article = document.createElement("article");
    article.className = "about-testimonial testimonial-carousel__card";

    const quote = document.createElement("p");
    quote.className = "about-testimonial__quote";
    quote.textContent = '"' + testimonial.quote + '"';

    const person = document.createElement("div");
    person.className = "about-testimonial__person";

    let identityMedia;
    if (hasDedicatedPhoto(testimonial)) {
      identityMedia = document.createElement("img");
      identityMedia.className = "about-testimonial__photo";
      identityMedia.src = relativeAssetPath(testimonial.image);
      identityMedia.alt = testimonial.dogName
        ? "Groomed dog portrait of " + testimonial.dogName
        : "Groomed dog portrait for " + testimonial.name + " testimonial";
      identityMedia.loading = "lazy";
      identityMedia.decoding = "async";
    } else {
      identityMedia = document.createElement("span");
      identityMedia.className = "about-testimonial__initials";
      identityMedia.textContent = testimonial.initials || testimonial.name.split(/\s+/).map(function (part) {
        return part.charAt(0);
      }).join("").slice(0, 2).toUpperCase();
    }

    const textWrap = document.createElement("div");

    const name = document.createElement("div");
    name.className = "about-testimonial__name";
    name.textContent = testimonial.name;

    const meta = document.createElement("div");
    meta.className = "about-testimonial__meta";
    meta.textContent = testimonial.meta || testimonial.source || "Client testimonial";

    textWrap.appendChild(name);
    textWrap.appendChild(meta);
    person.appendChild(identityMedia);
    person.appendChild(textWrap);
    article.appendChild(quote);
    article.appendChild(person);

    return article;
  }

  function updateCarouselButtonState(viewport, prev, next) {
    if (!viewport) {
      return;
    }

    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const atStart = viewport.scrollLeft <= 2;
    const atEnd = viewport.scrollLeft >= maxScroll - 2;

    if (prev) {
      prev.disabled = atStart;
      prev.setAttribute("aria-disabled", atStart ? "true" : "false");
    }

    if (next) {
      next.disabled = atEnd;
      next.setAttribute("aria-disabled", atEnd ? "true" : "false");
    }
  }

  function renderCarousel(testimonials) {
    const slot = document.querySelector('[data-testimonial-slot="carousel"]');
    if (!slot || !testimonials.length) {
      return;
    }

    const track = slot.querySelector(".testimonial-carousel__track");
    const viewport = slot.querySelector(".testimonial-carousel__viewport");
    const prev = slot.querySelector('[data-testimonial-action="prev"]');
    const next = slot.querySelector('[data-testimonial-action="next"]');

    if (!track || !viewport) {
      return;
    }

    const shuffledTestimonials = shuffle(testimonials);
    track.innerHTML = "";
    shuffledTestimonials.forEach(function (testimonial) {
      track.appendChild(testimonialCard(testimonial));
    });

    slot.setAttribute("data-testimonial-loaded-count", String(shuffledTestimonials.length));

    function scrollByPage(direction) {
      viewport.scrollBy({
        left: direction * viewport.clientWidth,
        behavior: "smooth"
      });
    }

    if (prev && prev.dataset.testimonialBound !== "true") {
      prev.dataset.testimonialBound = "true";
      prev.addEventListener("click", function () {
        scrollByPage(-1);
      });
    }

    if (next && next.dataset.testimonialBound !== "true") {
      next.dataset.testimonialBound = "true";
      next.addEventListener("click", function () {
        scrollByPage(1);
      });
    }

    viewport.addEventListener("scroll", function () {
      updateCarouselButtonState(viewport, prev, next);
    }, { passive: true });

    window.addEventListener("resize", function () {
      updateCarouselButtonState(viewport, prev, next);
    });

    updateCarouselButtonState(viewport, prev, next);
  }

  function loadTestimonials() {
    if (Array.isArray(window.TGROOMER_TESTIMONIALS)) {
      return Promise.resolve(normalizeTestimonials(window.TGROOMER_TESTIMONIALS));
    }

    return fetch(dataUrl(), { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Testimonials file not found");
        }
        return response.json();
      })
      .then(function (data) {
        return normalizeTestimonials(data);
      })
      .catch(function () {
        return fallbackTestimonials;
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    loadTestimonials().then(function (testimonials) {
      renderHero(testimonials);
      renderFeatured(testimonials);
      renderCarousel(testimonials);
    });
  });
})();

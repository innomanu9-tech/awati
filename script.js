// Smooth, accessible interactions for the AWATI website.

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const statItems = document.querySelectorAll('[data-count]');
const forms = document.querySelectorAll('form[data-form]');
const themeToggle = document.querySelector('.theme-toggle');
const testimonials = Array.from(document.querySelectorAll('.testimonial-card'));
const testimonialDots = Array.from(document.querySelectorAll('.dot'));
const carouselButtons = Array.from(document.querySelectorAll('.carousel-btn'));
const faqItems = Array.from(document.querySelectorAll('.faq-item'));

// Mobile navigation toggle.
if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });

  const dropdownToggles = Array.from(document.querySelectorAll('.nav-item--dropdown > .nav-link'));
  const mobileQuery = window.matchMedia('(max-width: 760px)');

  const closeDropdowns = () => {
    document.querySelectorAll('.nav-item--dropdown.active').forEach((item) => {
      item.classList.remove('active');
      const toggle = item.querySelector('.nav-link');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  };

  dropdownToggles.forEach((dropdownLink) => {
    dropdownLink.addEventListener('click', (event) => {
      if (!mobileQuery.matches) {
        return;
      }

      event.preventDefault();
      const parent = dropdownLink.closest('.nav-item--dropdown');
      const isActive = parent.classList.contains('active');
      closeDropdowns();
      if (!isActive) {
        parent.classList.add('active');
        dropdownLink.setAttribute('aria-expanded', 'true');
      }
    });
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    if (dropdownToggles.includes(link)) {
      return;
    }

    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      closeDropdowns();
    });
  });

  document.addEventListener('click', (event) => {
    if (!mobileQuery.matches) {
      return;
    }

    if (!event.target.closest('.nav-item--dropdown')) {
      closeDropdowns();
    }
  });
}

// Optional parallax effect for the hero section.
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.25;
    hero.style.setProperty('--parallax-offset', `${offset}px`);
  });
}

const heroMedia = document.querySelector('.hero-media.hero-slider');
if (heroMedia) {
  const heroSlideImages = [
    'images/hero/hero-1.svg',
    'images/hero/hero-2.svg',
    'images/hero/hero-3.svg',
    'images/hero/hero-4.svg',
    'images/hero/hero-5.svg'
  ];

  heroMedia.innerHTML = heroSlideImages
    .map((src, index) => `<div class="hero-slide${index === 0 ? ' active' : ''}" style="background-image:url('${src}')"></div>`)
    .join('');

  let currentSlide = 0;
  window.setInterval(() => {
    const slides = Array.from(heroMedia.querySelectorAll('.hero-slide'));
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 6000);
}

const searchIndex = [
  { title: 'Home', description: 'Explore our mission, programs, and impact.', href: 'index.html' },
  { title: 'About', description: 'Learn about AWATI’s vision and community work.', href: 'about.html' },
  { title: 'Programs', description: 'Discover training, finance, and leadership programs.', href: 'programs.html' },
  { title: 'Impact', description: 'See our statistics, map coverage, and results.', href: 'impact.html' },
  { title: 'Stories', description: 'Read profiles of women shaping agriculture.', href: 'stories.html' },
  { title: 'Donate', description: 'Support farmers, training groups, and village farms.', href: 'donate.html' },
  { title: 'Gallery', description: 'Browse photo stories from our projects.', href: 'gallery.html' },
  { title: 'News', description: 'Stay up to date with AWATI announcements.', href: 'news.html' },
  { title: 'Events', description: 'Register for upcoming trainings and outreach.', href: 'events.html' },
  { title: 'Volunteer', description: 'Apply to volunteer with AWATI in the field.', href: 'volunteer.html' },
  { title: 'Contact', description: 'Get in touch with questions or partnership inquiries.', href: 'contact.html' }
];

const buildSearchOverlay = () => {
  if (document.querySelector('.search-overlay')) {
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.innerHTML = `
    <div class="search-modal" role="dialog" aria-modal="true" aria-label="Search AWATI site">
      <button type="button" class="search-close" aria-label="Close search">×</button>
      <div class="search-field">
        <label class="sr-only" for="site-search-input">Search site</label>
        <input id="site-search-input" type="search" placeholder="Search programs, stories, news, team..." autocomplete="off" />
      </div>
      <div class="search-results" aria-live="polite"></div>
    </div>
  `;

  document.body.appendChild(overlay);
  const searchInput = overlay.querySelector('input');
  const searchResults = overlay.querySelector('.search-results');
  const closeButton = overlay.querySelector('.search-close');

  const renderResults = (items) => {
    if (!items.length) {
      searchResults.innerHTML = '<p class="search-empty">No matching results found.</p>';
      return;
    }

    searchResults.innerHTML = items
      .map(
        (item) => `
          <a class="search-result" href="${item.href}">
            <strong>${item.title}</strong>
            <span>${item.description}</span>
          </a>
        `
      )
      .join('');
  };

  const updateResults = () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      renderResults(searchIndex);
      return;
    }

    const matches = searchIndex.filter((item) => {
      return item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
    });

    renderResults(matches);
  };

  searchInput.addEventListener('input', updateResults);
  closeButton.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      overlay.classList.remove('active');
    }
  });
  overlay.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      overlay.classList.remove('active');
    }
  });
  renderResults(searchIndex);
};

const searchButtons = Array.from(document.querySelectorAll('.search-toggle'));
searchButtons.forEach((button) => {
  button.addEventListener('click', () => {
    buildSearchOverlay();
    const overlay = document.querySelector('.search-overlay');
    overlay.classList.add('active');
    setTimeout(() => {
      overlay.querySelector('input').focus();
    }, 100);
  });
});

const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
const lightboxOverlay = document.querySelector('.lightbox-overlay');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxMeta = document.querySelector('.lightbox-meta');

const openLightbox = (card) => {
  if (!lightboxOverlay) {
    return;
  }

  const img = card.querySelector('img');
  const caption = card.querySelector('.gallery-caption span').textContent;
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
  lightboxMeta.textContent = caption;
  lightboxOverlay.hidden = false;
  lightboxOverlay.setAttribute('aria-hidden', 'false');
  lightboxOverlay.classList.add('active');
};

const closeLightbox = () => {
  if (!lightboxOverlay) {
    return;
  }

  lightboxOverlay.hidden = true;
  lightboxOverlay.setAttribute('aria-hidden', 'true');
  lightboxOverlay.classList.remove('active');
};

if (galleryCards.length && lightboxOverlay) {
  galleryCards.forEach((card) => {
    card.addEventListener('click', () => openLightbox(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(card);
      }
    });
  });

  lightboxOverlay.addEventListener('click', (event) => {
    if (event.target === lightboxOverlay || event.target.classList.contains('lightbox-close')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });
}

const filterButtons = Array.from(document.querySelectorAll('.filter-button'));
if (filterButtons.length && galleryCards.length) {
  const updateGalleryFilter = (filter) => {
    galleryCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      updateGalleryFilter(button.dataset.filter);
    });
  });
}

const mapDetails = document.querySelector('.map-details');
const mapButtons = Array.from(document.querySelectorAll('.map-region'));

const mapRegions = {
  kampala: {
    label: 'Kampala',
    description: 'Regional hub for training, partnerships, and farmer advisory services.'
  },
  mbale: {
    label: 'Mbale',
    description: 'Community demonstrations and women-led seed saving networks.'
  },
  jinja: {
    label: 'Jinja',
    description: 'Agri-tech clinics and youth entrepreneurship support.'
  },
  soroti: {
    label: 'Soroti',
    description: 'Climate-smart farming workshops and field trials.'
  },
  kampala_district: {
    label: 'Central Uganda',
    description: 'District outreach for market access and digital skills.'
  }
};

if (mapButtons.length && mapDetails) {
  mapButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const region = button.dataset.region;
      const regionInfo = mapRegions[region];
      if (!regionInfo) {
        return;
      }

      mapButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      mapDetails.innerHTML = `<h3>${regionInfo.label}</h3><p>${regionInfo.description}</p>`;
    });
  });
}

const revealItems = Array.from(document.querySelectorAll('[data-reveal]'));
if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

// Custom cursor behavior.
if (cursorDot && cursorRing) {
  window.addEventListener('mousemove', (event) => {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
    cursorRing.style.left = `${event.clientX}px`;
    cursorRing.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll('a, button, input, textarea, .info-card, .story-card').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      cursorRing.style.width = '48px';
      cursorRing.style.height = '48px';
      cursorRing.style.borderColor = 'rgba(16, 185, 129, 0.75)';
    });

    element.addEventListener('mouseleave', () => {
      cursorRing.style.width = '34px';
      cursorRing.style.height = '34px';
      cursorRing.style.borderColor = 'rgba(16, 185, 129, 0.45)';
    });
  });
}

// Animated count-up statistics.
const animateCount = (element) => {
  const target = Number(element.dataset.count);
  const suffix = element.dataset.suffix || '';
  const duration = 1400;
  const startTime = performance.now();

  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = `${target}${suffix}`;
    }
  };

  requestAnimationFrame(step);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

statItems.forEach((item) => observer.observe(item));

// Theme toggle for light/dark experience.
if (themeToggle) {
  const savedTheme = localStorage.getItem('awati-theme');
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('awati-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-moon"></i>'
      : '<i class="fa-solid fa-sun"></i>';
  });
}

// Testimonial cards.
if (testimonials.length) {
  testimonials.forEach((card) => {
    card.hidden = false;
    card.classList.add('active');
  });
}

// FAQ accordion.
faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');
    faqItems.forEach((entry) => {
      entry.classList.remove('active');
      entry.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

// Contact and newsletter form validation feedback.
forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const messageBox = form.querySelector('.form-message');
    const data = new FormData(form);
    const name = data.get('name')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';

    if (!name || !email) {
      messageBox.textContent = 'Please fill in the required details before submitting.';
      return;
    }

    if (!email.includes('@')) {
      messageBox.textContent = 'Please enter a valid email address.';
      return;
    }

    messageBox.textContent = form.dataset.form === 'contact'
      ? 'Thank you for reaching out. We will be in touch shortly.'
      : 'Thank you for subscribing. Monthly updates are on the way.';
    form.reset();
  });
});

const contactForm = document.querySelector('[data-form="contact"]');
const formMessage = document.querySelector('.form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const button = contactForm.querySelector('button');
        button.textContent = "Sending...";
        button.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                formMessage.textContent = "✅ Message delivered successfully!";
                formMessage.style.color = "green";
                contactForm.reset();
            } else {
                formMessage.textContent = "❌ Something went wrong. Try again.";
                formMessage.style.color = "red";
            }

        } catch (error) {
            formMessage.textContent = "❌ Network error. Please try again.";
            formMessage.style.color = "red";
        }

        button.textContent = "Send message";
        button.disabled = false;
    });
}

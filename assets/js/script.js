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
    'https://scontent.febb9-1.fna.fbcdn.net/v/t39.30808-6/468393213_122137084994372269_4653047660461379983_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x960&ctp=s1280x960&_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=cM3BjdhM3cMQ7kNvwG9KeZf&_nc_oc=AdoZHswkhEwDm_FG7fOYtE3QquLsWqCFTB64YOyXBg5hFVekcabbZ41ggPunSZHeUsw&_nc_zt=23&_nc_ht=scontent.febb9-1.fna&_nc_gid=4USjdODRenQzyL7HdS7dKg&_nc_ss=7a289&oh=00_AQDMKVxrrO0RCGPaaw_axW0Y1WUpRU1LIylI-ThxKyiIjw&oe=6A4C0561',
    'https://scontent.febb9-1.fna.fbcdn.net/v/t39.30808-6/710252560_122210291330372269_4045105465062410363_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x960&ctp=s1280x960&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=r-ABH9u3m0cQ7kNvwFjrpAI&_nc_oc=AdqqXtWye8dzoqFPzD-GEUy4LV9qRQCrfHP5oWTKKOJYIwp7gD2e2X44bj7oWhcVE7Y&_nc_zt=23&_nc_ht=scontent.febb9-1.fna&_nc_gid=4USjdODRenQzyL7HdS7dKg&_nc_ss=7a289&oh=00_AQAH0Te1-86W0Zp1tg-4f45DUHCztwwXI6Qh7zhiZXuLgw&oe=6A4BF74B',
    'https://scontent.febb9-1.fna.fbcdn.net/v/t39.30808-6/709226962_122210291342372269_3653307666722993347_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x960&ctp=s1280x960&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=uusgmjlKJFQQ7kNvwF-8I5_&_nc_oc=AdpaWgoqAN0MTXbKr0bahewYw0cLOfr9oQPpGylK0hlS-4Tw4Twir5jbaUxyLnJS9nw&_nc_zt=23&_nc_ht=scontent.febb9-1.fna&_nc_gid=4USjdODRenQzyL7HdS7dKg&_nc_ss=7a289&oh=00_AQDlQXQMcEj-X0_s-0fBB9lRIeln1sGrQ87IKKB449-EPw&oe=6A4C01B4',
    'https://scontent.febb9-1.fna.fbcdn.net/v/t39.30808-6/693392576_122208292460372269_1049242844526523895_n.jpg?stp=dst-jpg_tt6&cstp=mx1086x1086&ctp=s1086x1086&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=QX4icvIP128Q7kNvwFWV2G1&_nc_oc=AdrXU-EDRm-ZghMgYu0XAVyyZoPpPgqcLiXBfe0BfMNQ9hgJyLVbIaDfRauJ3NmrXkc&_nc_zt=23&_nc_ht=scontent.febb9-1.fna&_nc_gid=4USjdODRenQzyL7HdS7dKg&_nc_ss=7a289&oh=00_AQCbO52qoiFA96zoewhmHlBIqwWpOrKaj9ikWeZIYmLHWg&oe=6A4C0DAB',
    'https://scontent.febb9-1.fna.fbcdn.net/v/t39.30808-6/674013295_122206026908372269_4052487642782187804_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x1536&ctp=s1536x1536&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=v7mM27IpRU4Q7kNvwH52RS4&_nc_oc=Adqjln-XMftNpJ-QULpLLVDIgRn3U6nIxlWBXY8qpEq2EKiqpEB0sBmoAzdf85mx5mE&_nc_zt=23&_nc_ht=scontent.febb9-1.fna&_nc_gid=4USjdODRenQzyL7HdS7dKg&_nc_ss=7a289&oh=00_AQDULtNBNgc2UbbmXumasyiVsltpe9dRVErbo4c5Q3fOJg&oe=6A4C0954'
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

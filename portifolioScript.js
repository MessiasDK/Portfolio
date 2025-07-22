document.addEventListener('DOMContentLoaded', function() {
  // 1. Dark Mode Functionality
  const setupDarkMode = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle || !themeIcon) return;

    const toggleDarkMode = () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      
      themeIcon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', 
                                isDark ? 'fa-sun' : 'fa-moon');
      localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    };

    themeToggle.addEventListener('click', toggleDarkMode);

    // Initialize from localStorage or OS preference
    if (localStorage.getItem('darkMode') === 'enabled' || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('dark-mode');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
  };

  // 2. Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
      });
    });
  }

  // 3. Sticky Header
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 100);
    }
  });

  // 4. Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Portfolio Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length && portfolioItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // 7. Form Submission
  const form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
      form.reset();
    });
  }

  // 8. Initialize Dark Mode
  setupDarkMode();
});
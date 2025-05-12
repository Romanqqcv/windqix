document.addEventListener('DOMContentLoaded', function() {
  // Мобильное меню
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }

  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Закрыть мобильное меню при клике на ссылку
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
        }
      }
    });
  });

  // Мобильное выпадающее меню
  const mobileDropdownToggles = document.querySelectorAll('.mobile-menu .dropdown-toggle');
  
  mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const parent = this.closest('.nav-item');
      
      // Закрыть все другие открытые меню
      document.querySelectorAll('.mobile-menu .nav-item').forEach(item => {
        if (item !== parent) {
          item.classList.remove('active');
        }
      });
      
      // Переключить активное состояние текущего элемента
      parent.classList.toggle('active');
    });
  });

  // Закрыть мобильное меню при клике на ссылку
  document.querySelectorAll('.mobile-menu a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', function() {
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
      }
    });
  });

  // Анимации при скролле
  const fadeInElements = document.querySelectorAll('.fade-in');
  const slideInElements = document.querySelectorAll('.slide-in');
  
  function checkFade() {
    const triggerBottom = window.innerHeight * 0.9;
    
    fadeInElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
        element.classList.add('visible');
      }
    });
    
    slideInElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
        element.classList.add('visible');
      }
    });
  }
  
  window.addEventListener('scroll', checkFade);
  checkFade(); // Проверить видимые элементы при загрузке страницы

  // FAQ аккордеон
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // Закрыть все другие элементы
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Переключить текущий элемент
      item.classList.toggle('active', !isOpen);
    });
  });

  // Валидация формы
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (isValid) {
        // Здесь можно добавить отправку формы на сервер через AJAX
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        // Имитация отправки
        setTimeout(() => {
          form.reset();
          submitBtn.textContent = 'Отправлено!';
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 2000);
        }, 1500);
      }
    });
  });

  // Счетчик статистики
  const counters = document.querySelectorAll('.counter');
  
  function startCounting() {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 секунды на анимацию
      const startTime = performance.now();
      
      function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime < duration) {
          const value = Math.floor((elapsedTime / duration) * target);
          counter.textContent = value;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }
      
      requestAnimationFrame(updateCounter);
    });
  }
  
  // Запускать счетчик только когда блок виден на экране
  const statsSection = document.querySelector('.stats');
  
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounting();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });
    
    observer.observe(statsSection);
  }

  // Модальные окна
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalCloseButtons = document.querySelectorAll('.modal-close');
  const modals = document.querySelectorAll('.modal');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal);
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });
}); 
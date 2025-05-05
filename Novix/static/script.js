document.addEventListener('DOMContentLoaded', function() {
  // Scroll suave
  const initSmoothScroll = () => {
      document.querySelectorAll('a[href^="#topo"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
              e.preventDefault();
              const targetId = this.getAttribute('href');
              const targetElement = document.querySelector(targetId);
              
              if (targetElement) {
                  const headerHeight = document.querySelector('.site-header').offsetHeight;
                  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                  
                  window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                  });
                  
                  if (history.pushState) {
                      history.pushState(null, null, targetId);
                  } else {
                      window.location.hash = targetId;
                  }
              }
          });
      });
  };

  // Animação do SVG do Hero
  const initHeroAnimation = () => {
    const heroSvg = `
    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="spin-slow">
      <circle cx="50" cy="50" r="40" stroke="url(#grad)" stroke-width="8" stroke-linecap="round" />
      <circle cx="90" cy="50" r="8" fill="#6366F1" />
      <defs>
        <linearGradient id="grad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stop-color="#4F46E5" />
          <stop offset="1" stop-color="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  `;
      
      const heroGraphic = document.querySelector('.hero-graphic');
      if (heroGraphic) {
          heroGraphic.innerHTML = heroSvg;
      }
      
      //Animação style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .spin-slow {
        animation: spin-slow 10s linear infinite;
      }
    `;
    document.head.appendChild(style);
  };  
  // Validação e envio do formulário de contato
  const initFormHandling = () => {
      const form = document.getElementById('contact-form');
      const formStatus = document.getElementById('form-status');
      let isSubmitting = false;

      const showError = (input, message) => {
          const errorElement = input.nextElementSibling;
          errorElement.textContent = message;
          input.classList.add('error');
      };

      const clearError = (input) => {
          const errorElement = input.nextElementSibling;
          errorElement.textContent = '';
          input.classList.remove('error');
      };

      const validateEmail = (email) => {
          const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return re.test(email.toLowerCase());
      };

      const validateField = (input) => {
          if (!input.value.trim()) {
              showError(input, 'Este campo é obrigatório');
              return false;
          }
          if (input.type === 'email' && !validateEmail(input.value)) {
              showError(input, 'Email inválido');
              return false;
          }
          clearError(input);
          return true;
      };

      // Adiciona ouvintes de evento para validação em tempo real
      form.querySelectorAll('input, textarea').forEach(input => {
          input.addEventListener('input', () => validateField(input));
          input.addEventListener('blur', () => validateField(input));
      });

      form.addEventListener('submit', async (e) => {
          e.preventDefault();
          if (isSubmitting) return;

          const nameInput = form.querySelector('#name');
          const emailInput = form.querySelector('#email');
          const messageInput = form.querySelector('#message');

          // Valida todos os campos
          const isNameValid = validateField(nameInput);
          const isEmailValid = validateField(emailInput);
          const isMessageValid = validateField(messageInput);

          if (!isNameValid || !isEmailValid || !isMessageValid) {
              return;
          }

          isSubmitting = true;
          formStatus.textContent = 'Enviando mensagem...';
          formStatus.className = 'form-status info';

          try {
              const response = await fetch('/send', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      name: nameInput.value.trim(),
                      email: emailInput.value.trim(),
                      message: messageInput.value.trim()
                  })
              });

              const data = await response.json();

              if (response.ok) {
                  formStatus.textContent = data.message || 'Mensagem enviada com sucesso!';
                  formStatus.className = 'form-status success';
                  form.reset();
              } else {
                  throw new Error(data.message || 'Erro ao enviar mensagem');
              }
          } catch (error) {
              formStatus.textContent = error.message || 'Erro ao enviar mensagem. Tente novamente.';
              formStatus.className = 'form-status error';
          } finally {
              isSubmitting = false;
          }
      });
  };

  // Inicializa as funções
  initSmoothScroll();
  initHeroAnimation();
  initFormHandling();
});
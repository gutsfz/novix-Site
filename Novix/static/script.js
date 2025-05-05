//Javascript para o site Novix

document.addEventListener('DOMContentLoaded', function() {
// Scroll suave
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
          
          // Atualiza o URL sem recarregar a página
          if (history.pushState) {
            history.pushState(null, null, targetId);
          } else {
            window.location.hash = targetId;
          }
        }
      });
    });
  };

  //Animação do SVG do Hero
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

 //Inicializa funções
  initSmoothScroll();
  initHeroAnimation();
  });

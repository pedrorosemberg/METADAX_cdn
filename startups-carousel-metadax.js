(function() {
  'use strict';
  
  // Configuração do carrossel
  const config = {
    images: [
      'https://via.placeholder.com/1375x697/4A90E2/ffffff?text=Startup+1',
      'https://via.placeholder.com/1375x697/7B68EE/ffffff?text=Startup+2',
      'https://via.placeholder.com/1375x697/50C878/ffffff?text=Startup+3',
      'https://via.placeholder.com/1375x697/FF6B6B/ffffff?text=Startup+4',
      'https://via.placeholder.com/1375x697/FFA500/ffffff?text=Startup+5'
    ],
    autoPlayInterval: 4000,
    transitionDuration: 600
  };

  // Encontra o elemento alvo
  const targetElement = document.getElementById('startups-carrousel-metadax-js');
  
  if (!targetElement) {
    console.error('Elemento #startups-carrousel-metadax-js não encontrado');
    return;
  }

  // Cria a estrutura HTML
  const carouselHTML = `
    <div class="metadax-carousel-container">
      <div class="metadax-carousel-wrapper">
        <div class="metadax-carousel-track"></div>
      </div>
      <button class="metadax-carousel-btn metadax-carousel-prev" aria-label="Anterior">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="metadax-carousel-btn metadax-carousel-next" aria-label="Próximo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="metadax-carousel-indicators"></div>
    </div>
  `;

  // Injeta CSS
  const style = document.createElement('style');
  style.textContent = `
    .metadax-carousel-container {
      position: relative;
      width: 100%;
      max-width: 100vw;
      margin: 0 auto;
      overflow: hidden;
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .metadax-carousel-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .metadax-carousel-track {
      display: flex;
      transition: transform ${config.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
    }

    .metadax-carousel-slide {
      flex: 0 0 100%;
      position: relative;
      aspect-ratio: 1375 / 697;
    }

    .metadax-carousel-slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      user-select: none;
      -webkit-user-drag: none;
    }

    .metadax-carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      border: none;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      color: #1e3c72;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .metadax-carousel-btn:hover {
      background: #ffffff;
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    .metadax-carousel-btn:active {
      transform: translateY(-50%) scale(0.95);
    }

    .metadax-carousel-prev {
      left: 20px;
    }

    .metadax-carousel-next {
      right: 20px;
    }

    .metadax-carousel-indicators {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 10;
    }

    .metadax-carousel-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      border: 2px solid rgba(255, 255, 255, 0.8);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .metadax-carousel-indicator.active {
      background: #ffffff;
      transform: scale(1.2);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    }

    .metadax-carousel-indicator:hover {
      background: rgba(255, 255, 255, 0.8);
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      .metadax-carousel-btn {
        width: 40px;
        height: 40px;
      }

      .metadax-carousel-prev {
        left: 10px;
      }

      .metadax-carousel-next {
        right: 10px;
      }

      .metadax-carousel-indicators {
        bottom: 10px;
      }

      .metadax-carousel-indicator {
        width: 10px;
        height: 10px;
      }
    }
  `;
  document.head.appendChild(style);

  // Renderiza o carrossel
  targetElement.innerHTML = carouselHTML;

  // Elementos do DOM
  const container = targetElement.querySelector('.metadax-carousel-container');
  const track = targetElement.querySelector('.metadax-carousel-track');
  const prevBtn = targetElement.querySelector('.metadax-carousel-prev');
  const nextBtn = targetElement.querySelector('.metadax-carousel-next');
  const indicatorsContainer = targetElement.querySelector('.metadax-carousel-indicators');

  // Estado do carrossel
  let currentIndex = 0;
  let autoPlayTimer = null;
  let isTransitioning = false;

  // Cria os slides
  config.images.forEach((imgSrc, index) => {
    const slide = document.createElement('div');
    slide.className = 'metadax-carousel-slide';
    slide.innerHTML = `<img src="${imgSrc}" alt="Startup ${index + 1}" loading="${index === 0 ? 'eager' : 'lazy'}">`;
    track.appendChild(slide);

    // Cria indicador
    const indicator = document.createElement('button');
    indicator.className = 'metadax-carousel-indicator';
    indicator.setAttribute('aria-label', `Ir para slide ${index + 1}`);
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  // Função para ir para um slide específico
  function goToSlide(index) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    currentIndex = index;
    
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    updateIndicators();
    resetAutoPlay();
    
    setTimeout(() => {
      isTransitioning = false;
    }, config.transitionDuration);
  }

  // Função para próximo slide
  function nextSlide() {
    const nextIndex = (currentIndex + 1) % config.images.length;
    goToSlide(nextIndex);
  }

  // Função para slide anterior
  function prevSlide() {
    const prevIndex = (currentIndex - 1 + config.images.length) % config.images.length;
    goToSlide(prevIndex);
  }

  // Atualiza indicadores
  function updateIndicators() {
    const indicators = indicatorsContainer.querySelectorAll('.metadax-carousel-indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  // AutoPlay
  function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, config.autoPlayInterval);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Pausa o autoplay ao passar o mouse
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);

  // Suporte para touch/swipe
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoPlay();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Suporte para navegação por teclado
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Inicia o autoplay
  startAutoPlay();

  // Cleanup ao sair da página
  window.addEventListener('beforeunload', stopAutoPlay);

})();
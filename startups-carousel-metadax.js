(function() {
  'use strict';
  
  // Configuração do carrossel
  const config = {
    images: [
      'https://cdn.metadax.cloud/assets/images/metadax/startups/capivara.png',
      'https://cdn.metadax.cloud/assets/images/metadax/startups/creditix.png',
      'https://cdn.metadax.cloud/assets/images/metadax/startups/curamente.png',
      'https://cdn.metadax.cloud/assets/images/metadax/startups/econx.png',
      'https://cdn.metadax.cloud/assets/images/metadax/startups/ietesp.png',
      'https://cdn.metadax.cloud/assets/images/metadax/startups/logicadocaos.png',
      'https://cdn.metadax.cloud/assets/images/metadax/startups/mobivin.png',
      'https://cdn.metadax.cloud/assets/images/metadax/startups/neovolt.png',
      'https://cdn.metadax.cloud/assets/images/metadax/startups/seekpay.png',
      'https://cdn.metadax.cloud/assets/images/metadax/startups/veiacriativa.png',
      'https://cdn.metadax.cloud/assets/images/metadax/startups/dragonx.png',
      'https://cdn.metadax.cloud/assets/images/metadax/startups/icc.png',
      'https://cdn.metadax.cloud/assets/images/metadax/startups/marketguru.png'
    ],
    autoPlayInterval: 3500,
    transitionDuration: 800,
    slideGap: 24,
    containerPadding: 40
  };

  const targetElement = document.getElementById('startups-carrousel-metadax-js');
  
  if (!targetElement) {
    console.error('Elemento #startups-carrousel-metadax-js não encontrado');
    return;
  }

  const carouselHTML = `
    <div class="metadax-carousel-container">
      <div class="metadax-carousel-wrapper">
        <div class="metadax-carousel-track"></div>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .metadax-carousel-container {
      position: relative;
      width: 100%;
      max-width: 100vw;
      margin: 0 auto;
      padding: ${config.containerPadding}px;
      overflow: hidden;
      background: transparent;
      cursor: grab;
      user-select: none;
      box-sizing: border-box;
    }

    .metadax-carousel-container:active {
      cursor: grabbing;
    }

    .metadax-carousel-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .metadax-carousel-track {
      display: flex;
      gap: ${config.slideGap}px;
      transition: transform ${config.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
      will-change: transform;
    }

    .metadax-carousel-track.dragging {
      transition: none;
    }

    .metadax-carousel-track.no-transition {
      transition: none;
    }

    .metadax-carousel-slide {
      flex: 0 0 auto;
      width: 280px;
      position: relative;
    }

    .metadax-carousel-slide img {
      width: 100%;
      height: auto;
      aspect-ratio: 1375 / 697;
      object-fit: cover;
      display: block;
      user-select: none;
      -webkit-user-drag: none;
      pointer-events: none;
      background: transparent;
    }

    @media (max-width: 768px) {
      .metadax-carousel-container {
        padding: 24px;
      }

      .metadax-carousel-slide {
        width: 220px;
      }
    }

    @media (max-width: 480px) {
      .metadax-carousel-container {
        padding: 20px;
      }

      .metadax-carousel-slide {
        width: 200px;
      }
    }
  `;
  document.head.appendChild(style);

  targetElement.innerHTML = carouselHTML;

  const container = targetElement.querySelector('.metadax-carousel-container');
  const track = targetElement.querySelector('.metadax-carousel-track');

  // Duplica as imagens para criar efeito infinito
  const repeatedImages = [...config.images, ...config.images, ...config.images];
  
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;
  let startPos = 0;
  let animationID = null;
  let autoPlayTimer = null;
  let isTransitioning = false;

  // Cria os slides
  repeatedImages.forEach((imgSrc, index) => {
    const slide = document.createElement('div');
    slide.className = 'metadax-carousel-slide';
    slide.innerHTML = `<img src="${imgSrc}" alt="Startup" loading="${index < 6 ? 'eager' : 'lazy'}">`;
    track.appendChild(slide);
  });

  const slides = Array.from(track.querySelectorAll('.metadax-carousel-slide'));
  const originalLength = config.images.length;

  function getSlideWidth() {
    return slides[0].offsetWidth + config.slideGap;
  }

  function setPosition(position, instant = false) {
    if (instant) {
      track.classList.add('no-transition');
    }
    track.style.transform = `translateX(${position}px)`;
    if (instant) {
      setTimeout(() => track.classList.remove('no-transition'), 50);
    }
  }

  // Inicia no meio do array para permitir scroll infinito
  function initPosition() {
    const slideWidth = getSlideWidth();
    currentTranslate = -originalLength * slideWidth;
    prevTranslate = currentTranslate;
    setPosition(currentTranslate, true);
  }

  function checkInfiniteScroll() {
    const slideWidth = getSlideWidth();
    const totalWidth = originalLength * slideWidth;
    
    // Se passou muito para a direita, volta para o meio
    if (currentTranslate > -slideWidth * 2) {
      currentTranslate -= totalWidth;
      prevTranslate = currentTranslate;
      setPosition(currentTranslate, true);
    }
    
    // Se passou muito para a esquerda, volta para o meio
    if (currentTranslate < -(totalWidth * 2 + slideWidth * 2)) {
      currentTranslate += totalWidth;
      prevTranslate = currentTranslate;
      setPosition(currentTranslate, true);
    }
  }

  function autoScroll() {
    if (isTransitioning || isDragging) return;
    
    isTransitioning = true;
    const slideWidth = getSlideWidth();
    currentTranslate -= slideWidth;
    prevTranslate = currentTranslate;
    
    setPosition(currentTranslate);
    
    setTimeout(() => {
      checkInfiniteScroll();
      isTransitioning = false;
    }, config.transitionDuration);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(autoScroll, config.autoPlayInterval);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    setTimeout(startAutoPlay, 1000);
  }

  // Mouse/Touch events
  function touchStart(event) {
    isDragging = true;
    startPos = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    animationID = requestAnimationFrame(animation);
    track.classList.add('dragging');
    stopAutoPlay();
  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }

  function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    track.classList.remove('dragging');

    const movedBy = currentTranslate - prevTranslate;
    const slideWidth = getSlideWidth();

    // Snap para o slide mais próximo
    const snapPosition = Math.round(currentTranslate / slideWidth) * slideWidth;
    currentTranslate = snapPosition;
    prevTranslate = currentTranslate;

    setPosition(currentTranslate);
    
    setTimeout(() => {
      checkInfiniteScroll();
      resetAutoPlay();
    }, config.transitionDuration);
  }

  function animation() {
    setPosition(currentTranslate, true);
    if (isDragging) requestAnimationFrame(animation);
  }

  // Desktop drag
  container.addEventListener('mousedown', touchStart);
  container.addEventListener('mousemove', touchMove);
  container.addEventListener('mouseup', touchEnd);
  container.addEventListener('mouseleave', () => {
    if (isDragging) touchEnd();
  });

  // Mobile touch
  container.addEventListener('touchstart', touchStart, { passive: true });
  container.addEventListener('touchmove', touchMove, { passive: true });
  container.addEventListener('touchend', touchEnd);

  // Scroll do mouse
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isTransitioning) return;
    
    isTransitioning = true;
    const slideWidth = getSlideWidth();
    
    if (e.deltaY > 0) {
      currentTranslate -= slideWidth;
    } else {
      currentTranslate += slideWidth;
    }
    
    prevTranslate = currentTranslate;
    setPosition(currentTranslate);
    
    setTimeout(() => {
      checkInfiniteScroll();
      isTransitioning = false;
    }, config.transitionDuration);
    
    resetAutoPlay();
  }, { passive: false });

  // Pause on hover
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);

  // Resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initPosition();
    }, 250);
  });

  // Inicializa
  initPosition();
  startAutoPlay();

  window.addEventListener('beforeunload', stopAutoPlay);

})();
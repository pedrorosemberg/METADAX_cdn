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
    autoPlayInterval: 4000,
    transitionDuration: 800,
    slideGap: 20
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
      overflow: hidden;
      background: transparent;
      cursor: grab;
      user-select: none;
    }

    .metadax-carousel-container:active {
      cursor: grabbing;
    }

    .metadax-carousel-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
      padding: 20px 0;
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

    .metadax-carousel-slide {
      flex: 0 0 auto;
      width: calc((100vw - 80px - ${config.slideGap * 2}px) / 3);
      max-width: 450px;
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .metadax-carousel-slide:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
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
    }

    @media (max-width: 1200px) {
      .metadax-carousel-slide {
        width: calc((100vw - 60px - ${config.slideGap}px) / 2);
        max-width: 500px;
      }
    }

    @media (max-width: 768px) {
      .metadax-carousel-wrapper {
        padding: 15px 0;
      }

      .metadax-carousel-slide {
        width: calc(100vw - 60px);
        max-width: none;
      }

      .metadax-carousel-slide:hover {
        transform: none;
      }
    }

    @media (max-width: 480px) {
      .metadax-carousel-slide {
        width: calc(100vw - 40px);
      }
    }
  `;
  document.head.appendChild(style);

  targetElement.innerHTML = carouselHTML;

  const container = targetElement.querySelector('.metadax-carousel-container');
  const track = targetElement.querySelector('.metadax-carousel-track');

  let currentIndex = 0;
  let autoPlayTimer = null;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = null;

  config.images.forEach((imgSrc, index) => {
    const slide = document.createElement('div');
    slide.className = 'metadax-carousel-slide';
    slide.innerHTML = `<img src="${imgSrc}" alt="Startup ${index + 1}" loading="${index < 3 ? 'eager' : 'lazy'}">`;
    track.appendChild(slide);
  });

  const slides = Array.from(track.querySelectorAll('.metadax-carousel-slide'));

  function getSlideWidth() {
    return slides[0].offsetWidth + config.slideGap;
  }

  function getSlidesPerView() {
    const containerWidth = container.offsetWidth;
    const slideWidth = slides[0].offsetWidth;
    return Math.floor(containerWidth / (slideWidth + config.slideGap));
  }

  function setPositionByIndex() {
    const slideWidth = getSlideWidth();
    currentTranslate = -currentIndex * slideWidth;
    prevTranslate = currentTranslate;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function nextSlide() {
    const maxIndex = Math.max(0, slides.length - getSlidesPerView());
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    setPositionByIndex();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = Math.max(0, slides.length - getSlidesPerView());
    }
    setPositionByIndex();
  }

  function startAutoPlay() {
    stopAutoPlay();
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

  // Mouse events
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

    if (movedBy < -slideWidth / 4 && currentIndex < slides.length - getSlidesPerView()) {
      currentIndex++;
    } else if (movedBy > slideWidth / 4 && currentIndex > 0) {
      currentIndex--;
    }

    setPositionByIndex();
    resetAutoPlay();
  }

  function animation() {
    track.style.transform = `translateX(${currentTranslate}px)`;
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
  container.addEventListener('touchstart', touchStart);
  container.addEventListener('touchmove', touchMove);
  container.addEventListener('touchend', touchEnd);

  // Scroll do mouse
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
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
      setPositionByIndex();
    }, 250);
  });

  startAutoPlay();

  window.addEventListener('beforeunload', stopAutoPlay);

})();
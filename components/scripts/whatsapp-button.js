(function() {
    'use strict';

    const CONFIG = {
        buttonId: 'whatsapp-metadax-btn',
        link: 'https://whatsapp.metadax.com.br',
        faVersion: '6.5.1',
        faUrl: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        timeout: 3000 // Tempo limite para validar o carregamento da fonte
    };

    if (document.getElementById(CONFIG.buttonId)) return;

    function injectStyles() {
        if (document.getElementById('wa-styles')) return;
        const style = document.createElement('style');
        style.id = 'wa-styles';
        style.textContent = `
            #${CONFIG.buttonId} {
                position: fixed; bottom: 1.5rem; right: 1rem;
                background-color: #22c55e; color: white;
                width: 3.5rem; height: 3.5rem;
                display: flex; align-items: center; justify-content: center;
                border-radius: 9999px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2);
                text-decoration: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 999999; cursor: pointer; border: none;
            }
            #${CONFIG.buttonId}:hover { background-color: #16a34a; transform: scale(1.1); }
            #${CONFIG.buttonId} i, #${CONFIG.buttonId} svg { 
                font-size: 1.875rem; width: 1.875rem; height: 1.875rem; 
                fill: currentColor; display: flex; align-items: center; justify-content: center;
            }
            @media (max-width: 640px) {
                #${CONFIG.buttonId} { width: 3.2rem; height: 3.2rem; bottom: 1rem; right: 1rem; }
            }
        `;
        document.head.appendChild(style);
    }

    // Carrega o CSS do FontAwesome e retorna uma Promise
    function loadFontAwesome() {
        return new Promise((resolve) => {
            const id = 'fa-metadax-cdn';
            if (document.getElementById(id)) return resolve(true);

            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = CONFIG.faUrl;
            link.crossOrigin = 'anonymous';
            link.onload = () => resolve(true);
            link.onerror = () => resolve(false);
            document.head.appendChild(link);
        });
    }

    // Valida se a fonte foi realmente aplicada ao elemento
    function validateFontRender() {
        return new Promise((resolve) => {
            const tester = document.createElement('span');
            tester.className = 'fab fa-whatsapp';
            tester.style.position = 'absolute';
            tester.style.top = '-9999px';
            tester.style.fontFamily = 'initial';
            document.body.appendChild(tester);

            const start = Date.now();
            const check = setInterval(() => {
                const fontFamily = window.getComputedStyle(tester).fontFamily;
                const isLoaded = fontFamily.includes('Font Awesome') || fontFamily.includes('FontAwesome');
                const isTimeout = (Date.now() - start) > CONFIG.timeout;

                if (isLoaded || isTimeout) {
                    clearInterval(check);
                    document.body.removeChild(tester);
                    resolve(isLoaded);
                }
            }, 100);
        });
    }

    function getIcon(useSvg = false) {
        if (useSvg) {
            // Fallback: Ícone oficial do WhatsApp em SVG
            return `<svg viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.4 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.6-30.6-38.1-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.4-29.8-17-40.7-4.5-10.7-9.1-9.2-12.4-9.4h-10.6c-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>`;
        }
        return `<i class="fab fa-whatsapp"></i>`;
    }

    async function init() {
        injectStyles();
        
        // Inicia carregamento do FA
        await loadFontAwesome();
        
        // Verifica se funcionou
        const isFaWorking = await validateFontRender();

        const button = document.createElement('a');
        button.id = CONFIG.buttonId;
        button.href = CONFIG.link;
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        button.title = 'Fale conosco via WhatsApp';
        
        // Define o conteúdo (ícone real ou SVG de fallback)
        button.innerHTML = getIcon(!isFaWorking);
        
        document.body.appendChild(button);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

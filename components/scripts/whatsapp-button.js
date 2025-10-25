(function() {
    'use strict';
    
    // Verifica se o botão já foi adicionado
    if (document.getElementById('whatsapp')) {
        return;
    }
    
    // Função para criar e injetar os estilos
    function injectStyles() {
        const styleId = 'whatsapp-button-styles';
        
        // Verifica se os estilos já foram injetados
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            #whatsapp {
                position: fixed;
                bottom: 1.5rem;
                right: 1rem;
                background-color: #22c55e;
                color: white;
                width: 3.5rem;
                height: 3.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 9999px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                text-decoration: none;
                transition: all 0.3s ease;
                z-index: 9999;
                border: none;
                cursor: pointer;
            }
            
            #whatsapp:hover {
                background-color: #16a34a;
                transform: scale(1.1);
            }
            
            #whatsapp i {
                font-size: 1.875rem;
                line-height: 1;
            }
            
            @media (max-width: 640px) {
                #whatsapp {
                    width: 3rem;
                    height: 3rem;
                    bottom: 1rem;
                    right: 1rem;
                }
                
                #whatsapp i {
                    font-size: 1.5rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Função para criar o botão
    function createWhatsAppButton() {
        const button = document.createElement('a');
        button.id = 'whatsapp';
        button.title = 'Clique para acessar o WhatsApp';
        button.rel = 'noopener noreferrer';
        button.href = 'https://whatsapp.metadax.cloud';
        button.target = '_blank';
        
        // Cria o ícone
        const icon = document.createElement('i');
        icon.className = 'fa-brands fa-whatsapp';
        
        button.appendChild(icon);
        
        return button;
    }
    
    // Função para verificar e carregar Font Awesome se necessário
    function ensureFontAwesome() {
        const fontAwesomeId = 'font-awesome-whatsapp';
        
        if (document.getElementById(fontAwesomeId)) {
            return;
        }
        
        // Verifica se Font Awesome já está carregado
        const hasFontAwesome = document.querySelector('link[href*="font-awesome"]') || 
                              document.querySelector('link[href*="fontawesome"]');
        
        if (!hasFontAwesome) {
            const link = document.createElement('link');
            link.id = fontAwesomeId;
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        }
    }
    
    // Função principal de inicialização
    function init() {
        // Injeta os estilos
        injectStyles();
        
        // Garante que o Font Awesome está carregado
        ensureFontAwesome();
        
        // Cria e adiciona o botão ao body
        const button = createWhatsAppButton();
        document.body.appendChild(button);
    }
    
    // Executa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
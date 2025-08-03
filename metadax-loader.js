/*!
 * METADAX Loader v1.0.0
 * Biblioteca JavaScript para animações de carregamento profissionais
 *
 * CDN: https://cdn.metadax.cloud/metadax-loader.js
 * Docs: https://cdn.metadax.cloud/documentation.html
 *
 * Copyright (c) 2025 METADAX Tecnologia e Serviços LTDA
 * CNPJ: 59.324.751/0001-06
 * Avenida Paulista, 1106, Sala 01, Andar 16, Bela Vista, São Paulo, SP, CEP 01310-914, Brasil
 *
 * Licensed under MIT License
 */

(function(window, document) {
    'use strict';

    /**
     * MetadaxLoader - Classe principal para gerenciar o loader
     */
    class MetadaxLoaderLib {
        constructor() {
            this.version = '1.0.0';
            this.loader = null;
            this.logoImg = null;
            this.isVisible = false;
            this.isInitialized = false;
            // Configurações padrão do loader
            this.config = {
                // Imagem padrão de carregamento
                logoUrl: 'https://cdn.metadax.cloud/assets/images/loader.png',
                duration: 2500,
                fadeOut: 600,
                autoHide: true,
                logoSize: '250px',
                // Cores do círculo atualizadas para corresponder ao manual de marca
                circleColor: '#0056B3',
                backgroundColor: '#ffffff',
                onShow: null,
                onHide: null
            };

            // Bind methods para manter contexto
            this.init = this.init.bind(this);
            this.show = this.show.bind(this);
            this.hide = this.hide.bind(this);
            this.isActive = this.isActive.bind(this);

            // Auto-inicialização quando DOM estiver pronto
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.autoInit());
            } else {
                setTimeout(() => this.autoInit(), 0);
            }
        }

        /**
         * Inicialização automática (apenas se não foi chamado manualmente)
         */
        autoInit() {
            if (!this.isInitialized) {
                this.init();
            }
        }

        /**
         * Inicializa o loader com configurações personalizadas
         * @param {Object} options - Opções de configuração
         * @returns {MetadaxLoaderLib} - Instância para encadeamento
         */
        init(options = {}) {
            try {
                // Merge configurações
                this.config = { ...this.config, ...options };
                this.isInitialized = true;

                // Criar/encontrar elementos do loader
                this.setupLoader();

                // Aplicar estilos personalizados
                this.applyStyles();

                // Carregar fonte Audiowide se não estiver carregada
                this.loadFont();

                // Atualizar logo se fornecida, usando a padrão se não houver
                this.updateLogo(this.config.logoUrl);

                // Mostrar loader
                this.show();

                // Configurar auto-hide
                if (this.config.autoHide) {
                    this.setupAutoHide();
                }

                // Log de inicialização
                this.log('Inicializado com sucesso', 'info');

                return this;
            } catch (error) {
                this.log('Erro na inicialização: ' + error.message, 'error');
                return this;
            }
        }

        /**
         * Configura os elementos HTML do loader
         */
        setupLoader() {
            // Verificar se já existe
            this.loader = document.getElementById('metadax-loader');

            if (!this.loader) {
                this.createLoader();
            }
        }

        /**
         * Cria os elementos HTML do loader
         */
        createLoader() {
            // Inject CSS se não existir
            if (!document.getElementById('metadax-loader-styles')) {
                this.injectStyles();
            }

            // Criar HTML
            const logoSvg = `
                <svg class="metadax-logo-svg" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="metadax-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <!-- Cores do gradiente atualizadas conforme o manual de marca -->
                            <stop offset="0%" style="stop-color:#0056B3;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#1E1E1E;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <g>
                        <path d="M20 20 L60 60 M60 20 L20 60" stroke="url(#metadax-gradient)" stroke-width="8" stroke-linecap="round"/>
                        <text x="90" y="55" font-family="Audiowide, Arial, sans-serif" font-size="36" font-weight="bold" fill="#1E1E1E">METADAX</text>
                    </g>
                </svg>
            `;

            const logoImg = `<img class="metadax-logo-img" alt="Loading...">`;

            const loaderContent = this.config.logoUrl ? logoImg : logoSvg;
            
            const loaderHTML = `
                <div id="metadax-loader" class="metadax-loader">
                    <div class="metadax-logo-container">
                        <div class="metadax-loading-circle"></div>
                        ${loaderContent}
                    </div>
                </div>
            `;

            // Inserir no início do body
            document.body.insertAdjacentHTML('afterbegin', loaderHTML);
            this.loader = document.getElementById('metadax-loader');
            this.logoImg = this.loader.querySelector('.metadax-logo-img');
        }

        /**
         * Injeta os estilos CSS necessários
         */
        injectStyles() {
            // Os estilos foram movidos para um arquivo CSS externo para maior modularidade e coerência
            // com o restante do projeto. Não há necessidade de injetá-los via JavaScript.
        }

        /**
         * Carrega a fonte Audiowide do Google Fonts
         */
        loadFont() {
            if (!document.querySelector('link[href*="Audiowide"]')) {
                const preconnect1 = document.createElement('link');
                preconnect1.rel = 'preconnect';
                preconnect1.href = 'https://fonts.googleapis.com';

                const preconnect2 = document.createElement('link');
                preconnect2.rel = 'preconnect';
                preconnect2.href = 'https://fonts.gstatic.com';
                preconnect2.crossOrigin = 'anonymous';

                const fontLink = document.createElement('link');
                fontLink.rel = 'stylesheet';
                fontLink.href = 'https://fonts.googleapis.com/css2?family=Audiowide:wght@400&display=swap';

                document.head.appendChild(preconnect1);
                document.head.appendChild(preconnect2);
                document.head.appendChild(fontLink);
            }
        }

        /**
         * Aplica estilos personalizados baseados na configuração
         */
        applyStyles() {
            if (!this.loader) return;

            // Background
            this.loader.style.backgroundColor = this.config.backgroundColor;

            // Tamanho da logo
            const logos = this.loader.querySelectorAll('.metadax-logo-img, .metadax-logo-svg');
            logos.forEach(logo => {
                if (this.config.logoSize) {
                    logo.style.width = this.config.logoSize;
                }
            });

            // Cor do círculo
            this.updateCircleColor();
        }

        /**
         * Atualiza a cor do círculo de carregamento
         */
        updateCircleColor() {
            const existingStyle = document.getElementById('metadax-circle-color');
            if (existingStyle) {
                existingStyle.remove();
            }

            const circleStyle = document.createElement('style');
            circleStyle.id = 'metadax-circle-color';
            circleStyle.textContent = `
                .metadax-loading-circle::before {
                    border-top-color: ${this.config.circleColor} !important;
                }
            `;
            document.head.appendChild(circleStyle);
        }

        /**
         * Atualiza a logo com uma nova URL
         * @param {string} logoUrl - URL da nova logo
         */
        updateLogo(logoUrl) {
            if (!logoUrl || !this.logoImg) return;

            // Esconder SVG por padrão e carregar a imagem
            const logoSvg = this.loader.querySelector('.metadax-logo-svg');
            if (logoSvg) logoSvg.style.display = 'none';

            this.logoImg.src = logoUrl;
            this.logoImg.style.display = 'block';
            
            // Fallback em caso de erro
            this.logoImg.onerror = () => {
                this.logoImg.style.display = 'none';
                if (logoSvg) logoSvg.style.display = 'block';
                this.log('Erro ao carregar logo, usando fallback', 'warn');
            };
        }

        /**
         * Configura o auto-hide baseado no carregamento da página
         */
        setupAutoHide() {
            const hideLoader = () => {
                setTimeout(() => this.hide(), this.config.duration);
            };

            if (document.readyState === 'complete') {
                hideLoader();
            } else {
                window.addEventListener('load', hideLoader);
            }
        }

        /**
         * Exibe o loader
         * @returns {MetadaxLoaderLib} - Instância para encadeamento
         */
        show() {
            if (!this.loader) {
                this.log('Loader não encontrado', 'error');
                return this;
            }

            this.loader.classList.remove('metadax-hidden');
            this.loader.style.display = 'flex';
            this.isVisible = true;

            // Callback onShow
            if (typeof this.config.onShow === 'function') {
                try {
                    this.config.onShow();
                } catch (error) {
                    this.log('Erro no callback onShow: ' + error.message, 'error');
                }
            }

            this.log('Loader exibido', 'info');
            return this;
        }

        /**
         * Oculta o loader
         * @returns {MetadaxLoaderLib} - Instância para encadeamento
         */
        hide() {
            if (!this.loader || !this.isVisible) {
                return this;
            }

            this.loader.style.transition = `opacity ${this.config.fadeOut}ms ease-out, visibility ${this.config.fadeOut}ms ease-out`;
            this.loader.classList.add('metadax-hidden');
            this.isVisible = false;

            // Remover do DOM após a animação
            setTimeout(() => {
                if (this.loader) {
                    this.loader.style.display = 'none';
                }

                // Callback onHide
                if (typeof this.config.onHide === 'function') {
                    try {
                        this.config.onHide();
                    } catch (error) {
                        this.log('Erro no callback onHide: ' + error.message, 'error');
                    }
                }

                this.log('Loader ocultado', 'info');
            }, this.config.fadeOut);

            return this;
        }

        /**
         * Verifica se o loader está ativo/visível
         * @returns {boolean} - Status do loader
         */
        isActive() {
            return this.isVisible;
        }

        /**
         * Obtém a configuração atual
         * @returns {Object} - Configuração atual
         */
        getConfig() {
            return { ...this.config };
        }

        /**
         * Obtém informações sobre a versão
         * @returns {Object} - Informações da versão
         */
        getVersion() {
            return {
                version: this.version,
                cdn: 'https://cdn.metadax.cloud/',
                docs: 'https://cdn.metadax.cloud/documentation.html'
            };
        }

        /**
         * Sistema de log interno
         * @param {string} message - Mensagem
         * @param {string} level - Nível do log (info, warn, error)
         */
        log(message, level = 'info') {
            if (typeof console !== 'undefined') {
                const prefix = 'METADAX Loader:';
                switch (level) {
                    case 'error':
                        console.error(prefix, message);
                        break;
                    case 'warn':
                        console.warn(prefix, message);
                        break;
                    default:
                        console.log(prefix, message);
                }
            }
        }

        /**
         * Destrói o loader e limpa recursos
         */
        destroy() {
            if (this.loader && this.loader.parentNode) {
                this.loader.parentNode.removeChild(this.loader);
            }

            // Remover estilos
            const styles = document.getElementById('metadax-loader-styles');
            const circleStyles = document.getElementById('metadax-circle-color');

            if (styles) styles.remove();
            if (circleStyles) circleStyles.remove();

            // Reset vars
            this.loader = null;
            this.logoImg = null;
            this.isVisible = false;
            this.isInitialized = false;

            this.log('Loader destruído', 'info');
        }
    }

    // Criar instância global
    const MetadaxLoader = new MetadaxLoaderLib();

    // Expor globalmente
    window.MetadaxLoader = MetadaxLoader;

    // Também expor como módulo se suportado
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = MetadaxLoader;
    }

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define('MetadaxLoader', [], function() {
            return MetadaxLoader;
        });
    }

    // Log de carregamento
    console.log('%c🚀 METADAX Loader v1.0.0 carregado', 'color: #0056B3; font-size: 14px; font-weight: bold;');
    console.log('%cCDN: https://https://cdn.metadax.cloud/metadax-loader.js', 'color: #056bd8ff; font-size: 12px;');

})(window, document);
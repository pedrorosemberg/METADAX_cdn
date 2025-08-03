/*!
 * ECONX Loader v1.0.0
 * Biblioteca JavaScript para animações de carregamento profissionais
 *
 * CDN: https://cdn.loader.cloud.econx.com.br/econx-loader.js
 * Docs: https://cdn.loader.cloud.econx.com.br/documentation.html
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
     * EconxLoader - Classe principal para gerenciar o loader
     */
    class EconxLoaderLib {
        constructor() {
            this.version = '1.0.0';
            this.loader = null;
            this.logoImg = null;
            this.isVisible = false;
            this.isInitialized = false;
            this.config = {
                logoUrl: null,
                duration: 2500,
                fadeOut: 600,
                autoHide: true,
                logoSize: '280px',
                circleColor: '#2ECC71',
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
         * @returns {EconxLoaderLib} - Instância para encadeamento
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
                this.updateLogo(this.config.logoUrl || '/assets/images/econx_b.svg');

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
            this.loader = document.getElementById('econx-loader');

            if (!this.loader) {
                this.createLoader();
            }

            this.logoImg = this.loader.querySelector('.econx-logo-img');
        }

        /**
         * Cria os elementos HTML do loader
         */
        createLoader() {
            // Inject CSS se não existir
            if (!document.getElementById('econx-loader-styles')) {
                this.injectStyles();
            }

            // Criar HTML
            const loaderHTML = `
                <div id="econx-loader" class="econx-loader">
                    <div class="econx-logo-container">
                        <div class="econx-loading-circle"></div>
                        <img class="econx-logo-img" alt="Loading..." style="display: none;">
                        <svg class="econx-logo-svg" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="econx-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style="stop-color:#2ECC71;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#1ABC9C;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <g>
                                <path d="M20 20 L60 60 M60 20 L20 60" stroke="url(#econx-gradient)" stroke-width="8" stroke-linecap="round"/>
                                <text x="90" y="55" font-family="Audiowide, Arial, sans-serif" font-size="36" font-weight="bold" fill="#333333">ECONX</text>
                            </g>
                        </svg>
                    </div>
                </div>
            `;

            // Inserir no início do body
            document.body.insertAdjacentHTML('afterbegin', loaderHTML);
            this.loader = document.getElementById('econx-loader');
        }

        /**
         * Injeta os estilos CSS necessários
         */
        injectStyles() {
            const styles = `
                <style id="econx-loader-styles">
                    .econx-loader {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                        background: #ffffff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 99999;
                        transition: opacity 0.6s ease-out, visibility 0.6s ease-out;
                    }

                    .econx-loader.econx-hidden {
                        opacity: 0;
                        visibility: hidden;
                    }

                    .econx-logo-container {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .econx-logo-img, .econx-logo-svg {
                        width: 280px;
                        height: auto;
                        max-width: 80vw;
                        animation: econx-logo-breathing 2s ease-in-out infinite;
                        z-index: 2;
                        position: relative;
                    }

                    .econx-loading-circle {
                        position: absolute;
                        width: 320px;
                        height: 320px;
                        max-width: 90vw;
                        max-height: 90vw;
                        border: 3px solid rgba(46, 204, 113, 0.1);
                        border-radius: 50%;
                        z-index: 1;
                    }

                    .econx-loading-circle::before {
                        content: '';
                        position: absolute;
                        top: -3px;
                        left: -3px;
                        width: 100%;
                        height: 100%;
                        border: 3px solid transparent;
                        border-top: 3px solid #2ECC71;
                        border-right: 3px solid #1ABC9C;
                        border-radius: 50%;
                        animation: econx-circle-rotate 1.5s linear infinite;
                    }

                    @keyframes econx-logo-breathing {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }

                    @keyframes econx-circle-rotate {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    @media (max-width: 768px) {
                        .econx-logo-img, .econx-logo-svg {
                            width: 220px;
                        }
                        .econx-loading-circle {
                            width: 260px;
                            height: 260px;
                        }
                    }

                    @media (max-width: 480px) {
                        .econx-logo-img, .econx-logo-svg {
                            width: 180px;
                        }
                        .econx-loading-circle {
                            width: 220px;
                            height: 220px;
                        }
                    }
                </style>
            `;

            document.head.insertAdjacentHTML('beforeend', styles);
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
            const logos = this.loader.querySelectorAll('.econx-logo-img, .econx-logo-svg');
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
            const existingStyle = document.getElementById('econx-circle-color');
            if (existingStyle) {
                existingStyle.remove();
            }

            const circleStyle = document.createElement('style');
            circleStyle.id = 'econx-circle-color';
            circleStyle.textContent = `
                .econx-loading-circle::before {
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
            if (!logoUrl || !this.loader) return;

            const logoImg = this.loader.querySelector('.econx-logo-img');
            const logoSvg = this.loader.querySelector('.econx-logo-svg');

            if (logoImg) {
                logoImg.src = logoUrl;
                logoImg.style.display = 'block';

                // Esconder SVG padrão quando logo carregada
                logoImg.onload = () => {
                    if (logoSvg) logoSvg.style.display = 'none';
                };

                // Fallback em caso de erro
                logoImg.onerror = () => {
                    logoImg.style.display = 'none';
                    if (logoSvg) logoSvg.style.display = 'block';
                    this.log('Erro ao carregar logo, usando fallback', 'warn');
                };
            }
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
         * @returns {EconxLoaderLib} - Instância para encadeamento
         */
        show() {
            if (!this.loader) {
                this.log('Loader não encontrado', 'error');
                return this;
            }

            this.loader.classList.remove('econx-hidden');
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
         * @returns {EconxLoaderLib} - Instância para encadeamento
         */
        hide() {
            if (!this.loader || !this.isVisible) {
                return this;
            }

            this.loader.style.transition = `opacity ${this.config.fadeOut}ms ease-out, visibility ${this.config.fadeOut}ms ease-out`;
            this.loader.classList.add('econx-hidden');
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
                cdn: 'https://cdn.loader.cloud.econx.com.br',
                docs: 'https://cdn.loader.cloud.econx.com.br/documentation.html'
            };
        }

        /**
         * Sistema de log interno
         * @param {string} message - Mensagem
         * @param {string} level - Nível do log (info, warn, error)
         */
        log(message, level = 'info') {
            if (typeof console !== 'undefined') {
                const prefix = 'ECONX Loader:';
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
            const styles = document.getElementById('econx-loader-styles');
            const circleStyles = document.getElementById('econx-circle-color');

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
    const EconxLoader = new EconxLoaderLib();

    // Expor globalmente
    window.EconxLoader = EconxLoader;

    // Também expor como módulo se suportado
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = EconxLoader;
    }

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define('EconxLoader', [], function() {
            return EconxLoader;
        });
    }

    // Log de carregamento
    console.log('%c🚀 ECONX Loader v1.0.0 carregado', 'color: #2ECC71; font-size: 14px; font-weight: bold;');
    console.log('%cCDN: https://cdn.loader.cloud.econx.com.br/econx-loader.js', 'color: #1ABC9C; font-size: 12px;');

})(window, document);
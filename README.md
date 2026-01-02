# METADAX Loader

Biblioteca JavaScript moderna para animações de carregamento profissionais com foco em performance e experiência do usuário.

![METADAX Loader](https://img.shields.io/badge/version-1.0.0-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![CDN](https://img.shields.io/badge/CDN-disponível-success)

## ✨ Características

- 🚀 **Zero dependências** - Biblioteca pura em JavaScript
- 📱 **Totalmente responsivo** - Funciona em todos os dispositivos
- 🎨 **Customizável** - Configure cores, tamanhos e comportamentos
- ⚡ **Performance otimizada** - ~3KB gzipped via CDN
- 🔧 **API simples** - Integração em menos de 5 minutos
- 🎯 **Fonte Audiowide** - Consistência visual com a marca METADAX

## 🚀 Instalação Rápida

### Via CDN (Recomendado)

```html
<!-- Inclua antes do fechamento do </head> -->
<script src="https://cdn.metadax.com.br/metadax-loader.js"></script>

<script>
// Inicialização básica
MetadaxLoader.init({
    logoUrl: 'https://seu-site.com/logo-metadax.png',
    duration: 2500
});
</script>
```

### Download Local

```bash
# Baixar arquivo
curl -O https://cdn.metadax.com.br/metadax-loader.js

# Ou usando wget
wget https://cdn.metadax.com.br/metadax-loader.js
```

## 📖 Uso Básico

```javascript
// Configuração mínima
MetadaxLoader.init({
    logoUrl: '/assets/logo-metadax.png'
});

// Configuração completa
MetadaxLoader.init({
    logoUrl: '/assets/logo-metadax.png',
    duration: 3000,                    // Duração mínima (ms)
    fadeOut: 600,                      // Tempo de fade out (ms)
    autoHide: true,                    // Ocultar automaticamente
    logoSize: '280px',                 // Tamanho da logo
    circleColor: '#2ECC71',            // Cor do círculo
    backgroundColor: '#ffffff',        // Cor de fundo
    onShow: () => console.log('Iniciado'),
    onHide: () => console.log('Finalizado')
});
```

## 🎯 Exemplos

### Integração WordPress

```php
<?php
// functions.php
function add_metadax_loader() {
    wp_enqueue_script('metadax-loader', 'https://cdn.metadax.com.br/metadax-loader.js', [], '1.0.0', false);
    
    $logo_url = get_template_directory_uri() . '/assets/logo-metadax.png';
    
    wp_add_inline_script('metadax-loader', "
        MetadaxLoader.init({
            logoUrl: '{$logo_url}',
            duration: 2500
        });
    ");
}
add_action('wp_enqueue_scripts', 'add_metadax_loader');
?>
```

### React/Next.js

```jsx
import { useEffect } from 'react';

export default function App() {
    useEffect(() => {
        // Carregar script
        const script = document.createElement('script');
        script.src = 'https://cdn.metadax.com.br/metadax-loader.js';
        script.onload = () => {
            window.MetadaxLoader.init({
                logoUrl: '/logo-metadax.png',
                duration: 2000,
                onHide: () => {
                    console.log('App carregada completamente');
                }
            });
        };
        document.head.appendChild(script);
        
        return () => document.head.removeChild(script);
    }, []);

    return <div>Seu app aqui</div>;
}
```

### Vue.js

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

// Carregar METADAX Loader
const script = document.createElement('script');
script.src = 'https://cdn.metadax.com.br/metadax-loader.js';
script.onload = () => {
    window.MetadaxLoader.init({
        logoUrl: '/logo-metadax.png',
        duration: 2500
    });
};
document.head.appendChild(script);

createApp(App).mount('#app')
```

## 🔧 API Referência

### MetadaxLoader.init(config)

Inicializa o loader com configurações personalizadas.

**Parâmetros:**

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `logoUrl` | String | `null` | URL da imagem da logo (PNG, JPG, SVG) |
| `duration` | Number | `2500` | Duração mínima em milissegundos |
| `fadeOut` | Number | `600` | Tempo de transição de saída |
| `autoHide` | Boolean | `true` | Ocultar automaticamente quando carregar |
| `logoSize` | String | `'280px'` | Tamanho da logo (CSS width) |
| `circleColor` | String | `'#2ECC71'` | Cor do círculo de carregamento |
| `backgroundColor` | String | `'#ffffff'` | Cor de fundo do loader |
| `onShow` | Function | `null` | Callback executado ao exibir |
| `onHide` | Function | `null` | Callback executado ao ocultar |

### Métodos Disponíveis

```javascript
// Exibir loader manualmente
MetadaxLoader.show();

// Ocultar loader manualmente  
MetadaxLoader.hide();

// Verificar se está ativo
if (MetadaxLoader.isActive()) {
    console.log('Loader está visível');
}

// Obter configuração atual
const config = MetadaxLoader.getConfig();

// Obter informações da versão
const info = MetadaxLoader.getVersion();

// Destruir loader e limpar recursos
MetadaxLoader.destroy();
```

## 🎨 Customização Avançada

### Cores Personalizadas

```javascript
MetadaxLoader.init({
    logoUrl: '/logo.png',
    circleColor: '#FF6B6B',        // Vermelho
    backgroundColor: '#F8F9FA'      // Cinza claro
});
```

### Controle Manual Completo

```javascript
// Inicializar sem auto-hide
MetadaxLoader.init({
    logoUrl: '/logo.png',
    autoHide: false
});

// Controlar manualmente
async function loadContent() {
    try {
        MetadaxLoader.show();
        
        // Simular carregamento
        await fetch('/api/data');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        MetadaxLoader.hide();
    } catch (error) {
        console.error('Erro:', error);
        MetadaxLoader.hide();
    }
}
```

### Integração com Analytics

```javascript
MetadaxLoader.init({
    logoUrl: '/logo.png',
    onShow: () => {
        // Google Analytics
        gtag('event', 'loader_shown', {
            'custom_parameter': 'metadax_loader'
        });
    },
    onHide: () => {
        // Marcar página como carregada
        gtag('event', 'page_loaded', {
            'load_time': Date.now() - window.startTime
        });
    }
});
```

## 🌐 CDN e Performance

### Recursos do CDN

- ✅ **Distribuição Global** - CloudFlare com baixa latência
- ✅ **Cache Otimizado** - Headers de cache por 1 ano
- ✅ **Compressão Gzip** - Redução de ~70% no tamanho
- ✅ **HTTP/2** - Carregamento mais rápido
- ✅ **SSL/TLS** - Segurança garantida
- ✅ **99.9% Uptime** - Disponibilidade confiável

### URLs Disponíveis

```
Biblioteca JS:    https://cdn.metadax.com.br/metadax-loader.js
Documentação:     https://cdn.metadax.com.br/documentation.html
Versão minificada: https://cdn.metadax.com.br/metadax-loader.min.js
```

### Verificação de Integridade

```html
<!-- Com verificação de integridade (recomendado para produção) -->
<script 
    src="https://cdn.metadax.com.br/metadax-loader.js"
    integrity="sha384-[hash-será-gerado]"
    crossorigin="anonymous">
</script>
```

## 🔧 Build e Desenvolvimento

### Estrutura do Projeto

```
metadax-loader/
├── src/
│   └── metadax-loader.js      # Código fonte principal
├── dist/
│   ├── metadax-loader.js      # Versão para desenvolvimento
│   └── metadax-loader.min.js  # Versão minificada
├── docs/
│   └── documentation.html   # Documentação
├── examples/
│   ├── basic.html          # Exemplo básico
│   ├── advanced.html       # Exemplo avançado
│   └── frameworks/         # Exemplos para frameworks
├── tests/
│   └── metadax-loader.test.js # Testes unitários
├── README.md
├── LICENSE
└── package.json
```

### Scripts de Build

```bash
# Instalar dependências de desenvolvimento
npm install

# Build para produção
npm run build

# Minificar arquivos
npm run minify

# Executar testes
npm test

# Servidor de desenvolvimento
npm run dev

# Deploy para CDN
npm run deploy
```

## 🧪 Testes

### Testes Automatizados

```javascript
// Exemplo de teste unitário
describe('METADAX Loader', () => {
    test('deve inicializar corretamente', () => {
        MetadaxLoader.init({ logoUrl: '/test-logo.png' });
        expect(MetadaxLoader.isActive()).toBe(true);
    });
    
    test('deve ocultar após o tempo configurado', (done) => {
        MetadaxLoader.init({ 
            logoUrl: '/test-logo.png',
            duration: 100,
            onHide: () => {
                expect(MetadaxLoader.isActive()).toBe(false);
                done();
            }
        });
    });
});
```

### Testes Manuais

```html
<!DOCTYPE html>
<html>
<head>
    <title>Teste METADAX Loader</title>
    <script src="https://cdn.metadax.com.br/metadax-loader.js"></script>
</head>
<body>
    <h1>Página de Teste</h1>
    <button onclick="MetadaxLoader.show()">Mostrar Loader</button>
    <button onclick="MetadaxLoader.hide()">Ocultar Loader</button>
    
    <script>
        MetadaxLoader.init({
            logoUrl: 'https://via.placeholder.com/200x50/2ECC71/FFFFFF?text=METADAX',
            autoHide: false
        });
    </script>
</body>
</html>
```

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Logo não aparece

```javascript
// Verificar se a URL está correta
MetadaxLoader.init({
    logoUrl: 'https://example.com/logo.png', // URL completa
    onShow: () => {
        console.log('Loader iniciado');
    }
});

// Verificar no console se há erros de CORS
```

#### 2. Loader não desaparece

```javascript
// Verificar se autoHide está habilitado
MetadaxLoader.init({
    logoUrl: '/logo.png',
    autoHide: true,  // Deve estar true
    duration: 3000   // Ajustar tempo se necessário
});

// Forçar ocultação se necessário
setTimeout(() => MetadaxLoader.hide(), 5000);
```

#### 3. Conflitos com outros scripts

```javascript
// Usar no modo manual para maior controle
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar outros scripts carregarem
    setTimeout(() => {
        MetadaxLoader.init({
            logoUrl: '/logo.png',
            duration: 2000
        });
    }, 100);
});
```

#### 4. Problemas de Performance

```javascript
// Otimizar configurações
MetadaxLoader.init({
    logoUrl: '/logo.png',
    duration: 1500,    // Reduzir tempo
    fadeOut: 300,      // Transição mais rápida
    onShow: () => {
        // Pausar animações desnecessárias
        document.querySelectorAll('video').forEach(v => v.pause());
    }
});
```

## 📊 Compatibilidade

### Navegadores Suportados

| Navegador | Versão Mínima |
|-----------|---------------|
| Chrome | 60+ |
| Firefox | 55+ |
| Safari | 12+ |
| Edge | 79+ |
| Internet Explorer | 11+ |
| iOS Safari | 12+ |
| Android Chrome | 60+ |

### Polyfills Necessários (IE11)

```html
<!-- Para suporte ao IE11 -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6,Promise"></script>
<script src="https://cdn.metadax.com.br/metadax-loader.js"></script>
```

## 🤝 Contribuição

### Como Contribuir

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Diretrizes de Desenvolvimento

- Mantenha o código compatível com ES5 para suporte ao IE11
- Adicione testes para novas funcionalidades
- Documente mudanças no README
- Siga as convenções de código existentes
- Teste em diferentes navegadores

### Reportar Bugs

Abra uma issue no GitHub com:

- Descrição detalhada do problema
- Passos para reproduzir
- Navegador e versão
- Exemplo de código mínimo
- Screenshots se aplicável

## 📄 Changelog

### v1.0.0 (2025-01-31)

**Funcionalidades:**
- ✨ Lançamento inicial da biblioteca
- ✨ Suporte a logos PNG, JPG e SVG
- ✨ Animações CSS3 otimizadas
- ✨ API completa para controle manual
- ✨ Integração com fonte Audiowide
- ✨ CDN oficial em cdn.metadax.com.br
- ✨ Documentação completa
- ✨ Suporte responsivo automático

## 📞 Suporte

### Suporte Técnico

- **Email:** dev@metadax.com.br
- **Documentação:** https://cdn.metadax.com.br/documentation.html
- **GitHub:** https://github.com/metadax/loader
- **Status CDN:** https://status.metadax.com.br

### Horários de Atendimento

- Segunda a Sexta: 9h às 18h (UTC-3)
- Sábado: 9h às 14h (UTC-3)
- Domingo: Apenas emergências

## 📝 Licença

MIT License - Copyright (c) 2025 METADAX Tecnologia e Serviços LTDA

```
MIT License

Copyright (c) 2025 METADAX Tecnologia e Serviços LTDA
CNPJ: 59.324.751/0001-06
Avenida Paulista, 1106, Sala 01, Andar 16, Bela Vista, São Paulo, SP, CEP 01310-914, Brasil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

**METADAX Loader v1.0.0** - Criado com ❤️ pela equipe METADAX
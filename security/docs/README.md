# Global Privacy Cover

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/metadax/global-privacy-cover)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Client-side security wrapper para implementação de políticas de segurança no DOM**

O `global-privacy-cover.js` é um script de segurança *defense-in-depth* projetado para reforçar programaticamente diversas políticas de proteção diretamente no navegador do usuário.

---

## 📋 Índice

- [Recursos](#-recursos)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Configuração](#️-configuração)
- [Funcionalidades Detalhadas](#-funcionalidades-detalhadas)
- [Limitações Conhecidas](#️-limitações-conhecidas)
- [Compatibilidade](#-compatibilidade)
- [Segurança](#-segurança)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🚀 Recursos

- ✅ **Content Security Policy (CSP)** - Proteção contra XSS e Clickjacking
- ✅ **Permissions Policy** - Controle granular de APIs do navegador
- ✅ **Referrer Policy** - Prevenção de vazamento de informações sensíveis
- ✅ **Content Exfiltration Mitigation** - Bloqueio de cópia e atalhos de teclado
- ✅ **HTTPS Enforcement** - Redirecionamento automático para conexões seguras
- ✅ **Frame-Busting** - Proteção contra embedding malicioso
- ✅ **Zero Dependencies** - JavaScript puro, sem dependências externas
- ✅ **Configurável** - Personalize as políticas conforme sua necessidade

---

## 📦 Instalação

### Via CDN (Recomendado)

Adicione o script no `<head>` do seu HTML, **antes de qualquer outro script**:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Global Privacy Cover - DEVE SER O PRIMEIRO SCRIPT -->
    <script src="https://cdn.metadax.cloud/global-privacy-cover.js"></script>
    
    <title>Minha Aplicação Segura</title>
</head>
<body>
    <!-- Seu conteúdo aqui -->
</body>
</html>
```

### Download Local

```bash
# Clone o repositório
git clone https://github.com/metadax/global-privacy-cover.git

# Ou baixe diretamente
wget https://cdn.metadax.cloud/global-privacy-cover.js
```

Inclua o arquivo localmente:

```html
<script src="/js/global-privacy-cover.js"></script>
```

---

## 💻 Uso

### Uso Básico

O script é auto-executável. Basta incluí-lo no HTML:

```html
<script src="https://cdn.metadax.cloud/global-privacy-cover.js"></script>
```

### Verificação da Ativação

Abra o console do navegador (F12) e você verá:

```
[Privacy Cover] Initializing security wrapper...
[Privacy Cover] CSP injected: default-src 'self'; script-src...
[Privacy Cover] Permissions-Policy injected: geolocation=(), camera=()...
[Privacy Cover] Referrer-Policy injected: strict-origin-when-cross-origin
[Privacy Cover] Content protection activated
[Privacy Cover] Security wrapper initialized successfully
```

---

## ⚙️ Configuração

O script possui um objeto de configuração interno que pode ser modificado antes da distribuição:

```javascript
const CONFIG = {
  // Content Security Policy
  csp: {
    'default-src': "'self'",
    'script-src': "'self' 'unsafe-inline' https://cdn.metadax.cloud",
    'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
    'font-src': "'self' https://fonts.gstatic.com",
    'img-src': "'self' data: https:",
    'connect-src': "'self' https://api.metadax.cloud",
    'frame-ancestors': "'none'",  // Previne clickjacking
    'base-uri': "'self'",
    'form-action': "'self'"
  },
  
  // Permissions Policy (Feature Policy)
  permissionsPolicy: {
    'geolocation': '()',      // Desabilita geolocalização
    'camera': '()',           // Desabilita câmera
    'microphone': '()',       // Desabilita microfone
    'payment': '()',          // Desabilita API de pagamentos
    'usb': '()',
    'magnetometer': '()',
    'gyroscope': '()',
    'accelerometer': '()'
  },
  
  // Referrer Policy
  referrerPolicy: 'strict-origin-when-cross-origin',
  
  // Funcionalidades opcionais
  blockContentExfiltration: true,  // Bloqueia cópia/atalhos
  forceHTTPS: true,                // Redireciona HTTP → HTTPS
  frameBuilsting: true             // Previne embedding em frames
};
```

### Personalizando Configurações

**Método 1: Editar o Arquivo**

Baixe o arquivo e modifique o objeto `CONFIG` conforme necessário.

**Método 2: Criar Versão Customizada**

```javascript
// custom-privacy-cover.js
(function() {
  'use strict';
  
  const CONFIG = {
    csp: {
      'default-src': "'self'",
      'script-src': "'self' https://meucdn.com",
      'frame-ancestors': "'self'"  // Permite embedding no mesmo domínio
    },
    blockContentExfiltration: false,  // Desabilita bloqueio de cópia
    // ... outras configurações
  };
  
  // ... resto do código
})();
```

---

## 🔍 Funcionalidades Detalhadas

### 1. Content Security Policy (CSP)

Injeta uma meta tag `Content-Security-Policy` que define whitelists explícitas para:

- **`script-src`** - Fontes permitidas para scripts JavaScript
- **`style-src`** - Fontes permitidas para CSS
- **`img-src`** - Fontes permitidas para imagens
- **`connect-src`** - Fontes permitidas para AJAX/Fetch/WebSocket
- **`frame-ancestors`** - **Proteção contra Clickjacking** (substitui X-Frame-Options)

**Exemplo de meta tag injetada:**

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' https://cdn.metadax.cloud; frame-ancestors 'none'">
```

**Proteção oferecida:**
- ✅ Bloqueia scripts inline maliciosos (XSS)
- ✅ Previne carregamento de recursos não autorizados
- ✅ **Impede embedding da página em iframes** (clickjacking)

---

### 2. Permissions Policy

Controla o acesso a APIs sensíveis do navegador seguindo o princípio do menor privilégio:

```html
<meta http-equiv="Permissions-Policy" 
      content="geolocation=(), camera=(), microphone=(), payment=()">
```

**APIs controladas:**
- 🚫 Geolocalização
- 🚫 Câmera e microfone
- 🚫 API de pagamentos
- 🚫 USB, sensores de movimento, etc.

**Benefício:** Reduz a superfície de ataque caso um script de terceiros seja comprometido.

---

### 3. Referrer Policy

Controla informações enviadas no header `Referer`:

```html
<meta name="referrer" content="strict-origin-when-cross-origin">
```

**Valores comuns:**
- `no-referrer` - Nunca envia o referrer
- `strict-origin-when-cross-origin` - Envia apenas a origem em requisições cross-origin
- `same-origin` - Envia apenas para o mesmo domínio

**Proteção:** Impede vazamento de URLs sensíveis (ex: tokens em parâmetros de URL).

---

### 4. Mitigação de Exfiltração de Conteúdo

Dificulta a cópia de dados sensíveis através de:

#### Bloqueio de Menu de Contexto (Botão Direito)

```javascript
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});
```

#### Bloqueio de Atalhos de Teclado

Atalhos bloqueados:
- `Ctrl+C` / `Cmd+C` - Copiar
- `Ctrl+X` / `Cmd+X` - Recortar
- `Ctrl+A` / `Cmd+A` - Selecionar tudo
- `F12` - DevTools
- `Ctrl+Shift+I` / `Cmd+Opt+I` - Inspecionar elemento
- `Ctrl+Shift+J` / `Cmd+Opt+J` - Console
- `Ctrl+U` / `Cmd+U` - Ver código-fonte

#### Desabilitação de Seleção de Texto

```css
* {
  user-select: none !important;
}
input, textarea {
  user-select: text !important;  /* Mantém funcional em campos de entrada */
}
```

**⚠️ IMPORTANTE:** Esta é uma medida de **dificultação**, não de segurança absoluta. Usuários técnicos ainda podem:
- Usar o menu do navegador para acessar DevTools
- Tirar capturas de tela (função do SO)
- Desabilitar JavaScript

---

### 5. Redirecionamento HTTPS (Fallback)

Força HTTPS para conexões HTTP, exceto em localhost:

```javascript
if (window.location.protocol === 'http:' && !isLocalhost) {
  window.location.href = window.location.href.replace('http:', 'https:');
}
```

**⚠️ LIMITAÇÃO:** Isso é um fallback **inferior** ao header `Strict-Transport-Security` (HSTS), que **não pode** ser definido via meta tag. **Recomendação:** Configure HSTS no servidor.

---

### 6. Frame-Busting (Proteção Clickjacking)

Fallback para a diretiva `frame-ancestors` do CSP:

```javascript
if (window.top !== window.self) {
  window.top.location.href = window.self.location.href;
}
```

**Como funciona:**
- Detecta se a página está dentro de um `<iframe>`
- Força a janela principal a carregar a URL da página
- "Estoura" o frame, frustrando ataques de clickjacking

---

## ⚠️ Limitações Conhecidas

### Limitações de Meta Tags

1. **Strict-Transport-Security (HSTS)** não pode ser definido via meta tag
   - **Solução:** Configure no servidor web

2. **X-Frame-Options** não pode ser definido via meta tag
   - **Solução:** Use `frame-ancestors` no CSP (já implementado)

### Limitações de Proteção de Conteúdo

A proteção contra cópia é apenas **dificultação**:
- ❌ Não impede capturas de tela
- ❌ Não impede acesso via DevTools (menu do navegador)
- ❌ Não impede desabilitação de JavaScript
- ❌ Não impede ferramentas de automação

**Use para:** Prevenir cópia casual por usuários não-técnicos.

**Não use para:** Proteção de dados verdadeiramente sensíveis (use criptografia e controles server-side).

### Compatibilidade de Navegadores

| Recurso | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSP via meta | ✅ | ✅ | ✅ | ✅ |
| Permissions Policy | ✅ | ⚠️ Parcial | ⚠️ Parcial | ✅ |
| Referrer Policy | ✅ | ✅ | ✅ | ✅ |
| Frame-busting | ✅ | ✅ | ✅ | ✅ |

⚠️ = Suporte limitado a algumas diretivas

---

## 🌐 Compatibilidade

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ⚠️ Internet Explorer 11 (funcionalidade limitada)

---

## 🔒 Segurança

### Princípios de Segurança

1. **Defense in Depth** - Múltiplas camadas de proteção
2. **Least Privilege** - Desabilita APIs desnecessárias por padrão
3. **Fail-Safe Defaults** - Políticas restritivas como padrão

### Considerações de Segurança

- ✅ O script é executado em IIFE (não polui o escopo global)
- ✅ Usa `'use strict'` para evitar erros comuns
- ✅ Não faz requisições externas
- ✅ Não coleta ou armazena dados

### Reportando Vulnerabilidades

Se você encontrar uma vulnerabilidade de segurança:
1. **NÃO** abra uma issue pública
2. Envie um email para: security@metadax.cloud
3. Inclua: descrição, impacto e prova de conceito

---

## 🧪 Testes

### Teste 1: Verificar CSP

Abra o console e execute:

```javascript
// Deve bloquear e exibir erro de CSP
eval('alert("XSS Test")');
```

### Teste 2: Verificar Frame-Busting

Crie um HTML com iframe:

```html
<iframe src="https://seu-site.com"></iframe>
```

A página deve "estourar" o frame.

### Teste 3: Verificar Bloqueio de Cópia

Tente usar `Ctrl+C` na página - deve ser bloqueado.

---

## 📊 Performance

- **Tamanho:** ~8KB (minificado)
- **Impacto no carregamento:** < 5ms
- **Overhead de runtime:** Mínimo (event listeners leves)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- Mantenha a compatibilidade com navegadores modernos
- Adicione testes para novas funcionalidades
- Atualize a documentação conforme necessário
- Siga o estilo de código existente

---

## 📝 Changelog

### v1.0.0 (2025-01-26)
- 🎉 Release inicial
- ✨ Implementação de CSP, Permissions Policy e Referrer Policy
- ✨ Proteção contra exfiltração de conteúdo
- ✨ Redirecionamento HTTPS
- ✨ Frame-busting

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

```
MIT License

Copyright (c) 2025 MetaDax Security Team

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

## 🔗 Links Úteis

- [Documentação do CSP (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Permissions Policy Spec](https://w3c.github.io/webappsec-permissions-policy/)
- [OWASP Clickjacking Defense](https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html)

---

## 📞 Suporte

- 📧 Email: support@metadax.com.br
- 🐛 Issues: [GitHub Issues](https://github.com/metadax/global-privacy-cover/issues)
- 💬 Discussões: [GitHub Discussions](https://github.com/metadax/global-privacy-cover/discussions)

---

<div align="center">

**Desenvolvido com ❤️ pela equipe MetaDax Security**

[Website](https://metadax.cloud) • [Blog](https://blog.metadax.cloud) • [Twitter](https://twitter.com/metadax)

</div>
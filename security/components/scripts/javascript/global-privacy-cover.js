/**
 * Global Privacy Cover - Client-Side Security Wrapper
 * Version: 1.0.0
 * Description: Defense-in-depth security layer for DOM manipulation
 * 
 * @license MIT
 * @author MetaDax Security Team
 */

(function() {
  'use strict';

  // Configuration object - customize as needed
  const CONFIG = {
    csp: {
      'default-src': "'self'",
      'script-src': "'self' 'unsafe-inline' https://cdn.metadax.cloud https://cdnjs.cloudflare.com",
      'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
      'font-src': "'self' https://fonts.gstatic.com",
      'img-src': "'self' data: https:",
      'connect-src': "'self' https://api.metadax.cloud",
      'frame-ancestors': "'none'",
      'base-uri': "'self'",
      'form-action': "'self'"
    },
    permissionsPolicy: {
      'geolocation': '()',
      'camera': '()',
      'microphone': '()',
      'payment': '()',
      'usb': '()',
      'magnetometer': '()',
      'gyroscope': '()',
      'accelerometer': '()'
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    blockContentExfiltration: true,
    forceHTTPS: true,
    frameBuilsting: true
  };

  /**
   * 1. DYNAMIC SECURITY POLICY INJECTION
   */
  function injectSecurityPolicies() {
    const head = document.head || document.getElementsByTagName('head')[0];
    
    if (!head) {
      console.warn('[Privacy Cover] Unable to find <head> element');
      return;
    }

    // Inject Content-Security-Policy
    injectCSP(head);
    
    // Inject Permissions-Policy
    injectPermissionsPolicy(head);
    
    // Inject Referrer-Policy
    injectReferrerPolicy(head);
    
    console.info('[Privacy Cover] Security policies injected successfully');
  }

  function injectCSP(head) {
    // Check if CSP meta tag already exists
    const existingCSP = head.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (existingCSP) {
      console.info('[Privacy Cover] CSP already defined, skipping injection');
      return;
    }

    const cspContent = Object.entries(CONFIG.csp)
      .map(([directive, value]) => `${directive} ${value}`)
      .join('; ');

    const metaCSP = document.createElement('meta');
    metaCSP.httpEquiv = 'Content-Security-Policy';
    metaCSP.content = cspContent;
    head.insertBefore(metaCSP, head.firstChild);
    
    console.info('[Privacy Cover] CSP injected:', cspContent);
  }

  function injectPermissionsPolicy(head) {
    const existingPermissions = head.querySelector('meta[http-equiv="Permissions-Policy"]');
    if (existingPermissions) {
      console.info('[Privacy Cover] Permissions-Policy already defined, skipping injection');
      return;
    }

    const permissionsContent = Object.entries(CONFIG.permissionsPolicy)
      .map(([feature, allowlist]) => `${feature}=${allowlist}`)
      .join(', ');

    const metaPermissions = document.createElement('meta');
    metaPermissions.httpEquiv = 'Permissions-Policy';
    metaPermissions.content = permissionsContent;
    head.appendChild(metaPermissions);
    
    console.info('[Privacy Cover] Permissions-Policy injected:', permissionsContent);
  }

  function injectReferrerPolicy(head) {
    const existingReferrer = head.querySelector('meta[name="referrer"]');
    if (existingReferrer) {
      console.info('[Privacy Cover] Referrer-Policy already defined, skipping injection');
      return;
    }

    const metaReferrer = document.createElement('meta');
    metaReferrer.name = 'referrer';
    metaReferrer.content = CONFIG.referrerPolicy;
    head.appendChild(metaReferrer);
    
    console.info('[Privacy Cover] Referrer-Policy injected:', CONFIG.referrerPolicy);
  }

  /**
   * 2. CONTENT EXFILTRATION MITIGATION
   */
  function setupContentProtection() {
    if (!CONFIG.blockContentExfiltration) {
      return;
    }

    // Block context menu (right-click)
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      console.warn('[Privacy Cover] Context menu blocked');
      return false;
    }, false);

    // Block keyboard shortcuts for copy, cut, select all, and dev tools
    document.addEventListener('keydown', function(e) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifierKey = isMac ? e.metaKey : e.ctrlKey;

      // Block Ctrl+C / Cmd+C (Copy)
      if (modifierKey && e.key === 'c') {
        e.preventDefault();
        console.warn('[Privacy Cover] Copy operation blocked');
        return false;
      }

      // Block Ctrl+X / Cmd+X (Cut)
      if (modifierKey && e.key === 'x') {
        e.preventDefault();
        console.warn('[Privacy Cover] Cut operation blocked');
        return false;
      }

      // Block Ctrl+A / Cmd+A (Select All)
      if (modifierKey && e.key === 'a') {
        e.preventDefault();
        console.warn('[Privacy Cover] Select all blocked');
        return false;
      }

      // Block F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        console.warn('[Privacy Cover] F12 blocked');
        return false;
      }

      // Block Ctrl+Shift+I / Cmd+Opt+I (Inspect Element)
      if (modifierKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        console.warn('[Privacy Cover] Inspect element blocked');
        return false;
      }

      // Block Ctrl+Shift+J / Cmd+Opt+J (Console)
      if (modifierKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        console.warn('[Privacy Cover] Console shortcut blocked');
        return false;
      }

      // Block Ctrl+Shift+C / Cmd+Opt+C (Inspect)
      if (modifierKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        console.warn('[Privacy Cover] Inspect shortcut blocked');
        return false;
      }

      // Block Ctrl+U / Cmd+U (View Source)
      if (modifierKey && e.key === 'u') {
        e.preventDefault();
        console.warn('[Privacy Cover] View source blocked');
        return false;
      }
    }, false);

    // Disable text selection via CSS
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
    `;
    document.head.appendChild(style);

    console.info('[Privacy Cover] Content protection activated');
  }

  /**
   * 3. HTTPS ENFORCEMENT (Fallback)
   */
  function enforceHTTPS() {
    if (!CONFIG.forceHTTPS) {
      return;
    }

    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.endsWith('.local');

    if (window.location.protocol === 'http:' && !isLocalhost) {
      console.warn('[Privacy Cover] Redirecting to HTTPS...');
      window.location.href = window.location.href.replace('http:', 'https:');
    }
  }

  /**
   * 4. FRAME-BUSTING (Clickjacking Protection Fallback)
   */
  function preventFrameEmbedding() {
    if (!CONFIG.frameBuilsting) {
      return;
    }

    if (window.top !== window.self) {
      console.warn('[Privacy Cover] Frame detected - attempting to bust out');
      try {
        window.top.location.href = window.self.location.href;
      } catch (e) {
        // If we can't access parent due to cross-origin, blank it
        console.error('[Privacy Cover] Unable to bust frame due to cross-origin restrictions');
        document.body.innerHTML = '<h1>Security Error</h1><p>This page cannot be displayed in a frame.</p>';
      }
    }
  }

  /**
   * INITIALIZATION
   */
  function init() {
    console.info('[Privacy Cover] Initializing security wrapper...');

    // Execute immediately
    enforceHTTPS();
    preventFrameEmbedding();

    // Inject policies as soon as possible
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        injectSecurityPolicies();
        setupContentProtection();
      });
    } else {
      // DOM already loaded
      injectSecurityPolicies();
      setupContentProtection();
    }

    console.info('[Privacy Cover] Security wrapper initialized successfully');
  }

  // Start the security wrapper
  init();

})();
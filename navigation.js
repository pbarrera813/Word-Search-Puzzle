// ==================== CONFIGURACIÓN DE RUTAS ====================

(function() {
    'use strict';
    
    // Obtener información del host actual
    const hostname = window.location.hostname;
    const port = window.location.port;
    const protocol = window.location.protocol;
    
    // Detectar entorno
    function isExternalAccess() {
        return hostname.includes('ddns.net') || 
               hostname.includes('it-mty') ||
               hostname === 'it-mty.ddns.net';
    }
    
    function isLocalAccess() {
        return hostname.startsWith('192.168.') || 
               hostname.startsWith('10.') ||
               hostname.startsWith('172.') ||
               hostname === 'localhost' || 
               hostname === '127.0.0.1';
    }
    
    // Configuración de URLs - AJUSTAR SEGÚN TU RED
    const CONFIG = {
        external: {
            snakeUrl: 'https://it-mty.ddns.net/snake',
            snakeIcon: 'https://it-mty.ddns.net/snake/favicon.ico',
            homeUrl: 'https://it-mty.ddns.net'
        },
        local: {
            snakeUrl: 'http://192.168.1.91:3003',
            snakeIcon: 'http://192.168.1.91:3003/favicon.ico',
            homeUrl: 'http://192.168.1.91:4321'
        }
    };
    
    // Obtener configuración según entorno
    function getConfig() {
        if (isExternalAccess()) {
            console.log('[NAV] Entorno: EXTERNO (ddns)');
            return CONFIG.external;
        } else if (isLocalAccess()) {
            console.log('[NAV] Entorno: LOCAL (red interna)');
            return CONFIG.local;
        } else {
            console.log('[NAV] Entorno: DESCONOCIDO, usando externo por defecto');
            return CONFIG.external;
        }
    }
    
    // Configurar navegación
    function initNavigation() {
        const config = getConfig();
        
        console.log('[NAV] Host actual:', hostname);
        console.log('[NAV] Puerto actual:', port || '(default)');
        console.log('[NAV] URLs a usar:', config);
        
        // Obtener elementos
        const snakeLink = document.getElementById('snakeLink');
        const snakeIcon = document.getElementById('snakeIcon');
        const homeLink = document.getElementById('homeLink');
        
        // Aplicar URLs
        if (snakeLink) {
            snakeLink.href = config.snakeUrl;
            console.log('[NAV] Snake link configurado:', config.snakeUrl);
        } else {
            console.error('[NAV] ERROR: No se encontró #snakeLink');
        }
        
        if (snakeIcon) {
            snakeIcon.src = config.snakeIcon;
            console.log('[NAV] Snake icon configurado:', config.snakeIcon);
        } else {
            console.error('[NAV] ERROR: No se encontró #snakeIcon');
        }
        
        if (homeLink) {
            homeLink.href = config.homeUrl;
            console.log('[NAV] Home link configurado:', config.homeUrl);
        } else {
            console.error('[NAV] ERROR: No se encontró #homeLink');
        }
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        // DOM ya está listo
        initNavigation();
    }
    
})();

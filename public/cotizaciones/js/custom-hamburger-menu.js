/* ===== MENÚ HAMBURGUESA PROFESIONAL TSC - JAVASCRIPT ===== */

(function() {
    'use strict';
    
    // Variables globales
    let hamburgerBtn, menuOverlay, menuPanel, menuLinks;
    let isMenuOpen = false;
    
    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        initHamburgerMenu();
    });
    
    function initHamburgerMenu() {
        // Obtener elementos del DOM
        hamburgerBtn = document.querySelector('.tsc-hamburger-btn');
        menuOverlay = document.querySelector('.tsc-menu-overlay');
        menuPanel = document.querySelector('.tsc-menu-panel');
        menuLinks = document.querySelectorAll('.tsc-menu-nav a');
        
        if (!hamburgerBtn || !menuOverlay || !menuPanel) {
            console.warn('TSC Hamburger Menu: Elementos del menú no encontrados');
            return;
        }
        
        // Event listeners
        setupEventListeners();
        
        // Configurar smooth scroll
        setupSmoothScroll();
        
        console.log('TSC Hamburger Menu: Inicializado correctamente');
    }
    
    function setupEventListeners() {
        // Click en botón hamburguesa
        hamburgerBtn.addEventListener('click', toggleMenu);
        
        // Click en overlay para cerrar
        menuOverlay.addEventListener('click', closeMenu);
        
        // Click en enlaces del menú
        menuLinks.forEach(link => {
            link.addEventListener('click', handleMenuLinkClick);
        });
        
        // Tecla ESC para cerrar
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
        
        // Resize window
        window.addEventListener('resize', handleWindowResize);
        
        // Prevenir scroll del body cuando el menú está abierto
        document.addEventListener('touchmove', function(e) {
            if (isMenuOpen) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    function openMenu() {
        isMenuOpen = true;
        
        // Añadir clases activas
        hamburgerBtn.classList.add('active');
        menuOverlay.classList.add('active');
        menuPanel.classList.add('active');
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        // Enfocar el primer enlace para accesibilidad
        setTimeout(() => {
            if (menuLinks.length > 0) {
                menuLinks[0].focus();
            }
        }, 300);
        
        // Trigger para analytics si es necesario
        triggerMenuEvent('menu_opened');
    }
    
    function closeMenu() {
        isMenuOpen = false;
        
        // Remover clases activas
        hamburgerBtn.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuPanel.classList.remove('active');
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
        
        // Trigger para analytics si es necesario
        triggerMenuEvent('menu_closed');
    }
    
    function handleMenuLinkClick(e) {
        const link = e.currentTarget;
        const href = link.getAttribute('href');
        
        // Si es un enlace interno (anchor)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Cerrar menú primero
                closeMenu();
                
                // Scroll suave al elemento
                setTimeout(() => {
                    scrollToElement(targetElement);
                }, 300);
                
                // Trigger para analytics
                triggerMenuEvent('menu_link_clicked', { section: targetId });
            }
        } else {
            // Para enlaces externos, cerrar menú y permitir navegación normal
            closeMenu();
            triggerMenuEvent('menu_external_link_clicked', { url: href });
        }
    }
    
    function scrollToElement(element) {
        const headerHeight = 80; // Ajustar según la altura del header
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    function setupSmoothScroll() {
        // Configurar smooth scroll para todos los enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    scrollToElement(targetElement);
                }
            });
        });
    }
    
    function handleWindowResize() {
        // Cerrar menú si se cambia a desktop
        if (window.innerWidth > 991 && isMenuOpen) {
            closeMenu();
        }
    }
    
    function triggerMenuEvent(eventName, data = {}) {
        // Para Google Analytics o tracking personalizado
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'hamburger_menu',
                ...data
            });
        }
        
        // Custom event para otros scripts
        const customEvent = new CustomEvent('tscMenuEvent', {
            detail: {
                eventName,
                data
            }
        });
        document.dispatchEvent(customEvent);
    }
    
    // API pública para controlar el menú desde otros scripts
    window.TSCHamburgerMenu = {
        open: openMenu,
        close: closeMenu,
        toggle: toggleMenu,
        isOpen: () => isMenuOpen
    };
    
    // Utilidades adicionales
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimizar resize handler
    const debouncedResize = debounce(handleWindowResize, 250);
    window.removeEventListener('resize', handleWindowResize);
    window.addEventListener('resize', debouncedResize);
    
})();
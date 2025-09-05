// TSC Sistema de Idiomas Profesional - Códigos ES/EN
// Selector limpio y claro para idiomas

(function() {
    'use strict';
    
    // Configuración del sistema de traducción
    const LanguageSystem = {
        // Idioma por defecto: ESPAÑOL
        currentLanguage: 'es',
        
        // Cache de traducciones
        translations: {},
        
        // Inicializar el sistema
        async init() {
            console.log('🌐 Iniciando sistema de idiomas profesional...');
            
            // Detectar idioma inicial (por defecto español)
            this.currentLanguage = this.detectInitialLanguage();
            
            // Cargar traducciones
            await this.loadTranslations(this.currentLanguage);
            
            // Configurar eventos de los botones
            this.setupEventListeners();
            
            // Aplicar traducciones iniciales
            this.applyTranslations();
            
            // Actualizar interfaz
            this.updateUI();
            
            console.log(`✅ Sistema iniciado en: ${this.currentLanguage.toUpperCase()}`);
        },
        
        // Detectar idioma inicial
        detectInitialLanguage() {
            // 1. Preferencia guardada
            const savedLang = localStorage.getItem('tsc-language');
            if (savedLang && ['es', 'en'].includes(savedLang)) {
                return savedLang;
            }
            
            // 2. Idioma del navegador
            const browserLang = navigator.language.toLowerCase();
            if (browserLang.startsWith('es')) return 'es';
            if (browserLang.startsWith('en')) return 'en';
            
            // 3. Por defecto: español
            return 'es';
        },
        
        // Cargar traducciones
        async loadTranslations(lang) {
            if (this.translations[lang]) return; // Ya cargado
            
            try {
                const response = await fetch(`./locales/${lang}.json`);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                
                this.translations[lang] = await response.json();
                console.log(`📄 Traducciones cargadas: ${lang.toUpperCase()}`);
            } catch (error) {
                console.error(`❌ Error cargando ${lang}:`, error);
                
                // Fallback a español si falla inglés
                if (lang === 'en') {
                    await this.loadTranslations('es');
                    this.currentLanguage = 'es';
                }
            }
        },
        
        // Configurar eventos
        setupEventListeners() {
            // Botones desktop header
            const desktopButtons = document.querySelectorAll('.lang-btn');
            desktopButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const lang = e.target.getAttribute('data-lang');
                    if (lang) this.changeLanguage(lang);
                });
            });
            
            // Botones mobile menu
            const mobileButtons = document.querySelectorAll('.mobile-lang-btn');
            mobileButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const lang = e.currentTarget.getAttribute('data-lang');
                    if (lang) this.changeLanguage(lang);
                });
            });
        },
        
        // Cambiar idioma
        async changeLanguage(newLang) {
            if (newLang === this.currentLanguage) return;
            
            console.log(`🔄 Cambiando idioma: ${this.currentLanguage} → ${newLang}`);
            
            // Mostrar estado de carga
            this.setLoadingState(true);
            
            // Cargar traducciones si no existen
            await this.loadTranslations(newLang);
            
            // Actualizar idioma actual
            this.currentLanguage = newLang;
            
            // Guardar preferencia
            localStorage.setItem('tsc-language', newLang);
            
            // Aplicar traducciones
            this.applyTranslations();
            
            // Actualizar interfaz
            this.updateUI();
            
            // Ocultar estado de carga
            this.setLoadingState(false);
            
            console.log(`✅ Idioma cambiado a: ${newLang.toUpperCase()}`);
        },
        
        // Aplicar traducciones
        applyTranslations() {
            const elements = document.querySelectorAll('[data-i18n]');
            const translations = this.translations[this.currentLanguage];
            
            if (!translations) {
                console.warn(`⚠️ No hay traducciones para: ${this.currentLanguage}`);
                return;
            }
            
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = this.getNestedTranslation(translations, key);
                
                if (translation) {
                    if (element.tagName === 'INPUT' && element.type !== 'submit') {
                        element.placeholder = translation;
                    } else {
                        element.textContent = translation;
                    }
                }
            });
        },
        
        // Obtener traducción anidada
        getNestedTranslation(obj, path) {
            return path.split('.').reduce((current, key) => {
                return current && current[key] !== undefined ? current[key] : null;
            }, obj);
        },
        
        // Actualizar interfaz de idiomas
        updateUI() {
            // Actualizar botones desktop
            const desktopButtons = document.querySelectorAll('.lang-btn');
            desktopButtons.forEach(btn => {
                const lang = btn.getAttribute('data-lang');
                btn.classList.toggle('active', lang === this.currentLanguage);
            });
            
            // Actualizar botones mobile
            const mobileButtons = document.querySelectorAll('.mobile-lang-btn');
            mobileButtons.forEach(btn => {
                const lang = btn.getAttribute('data-lang');
                btn.classList.toggle('active', lang === this.currentLanguage);
            });
        },
        
        // Estado de carga
        setLoadingState(loading) {
            const buttons = document.querySelectorAll('.lang-btn, .mobile-lang-btn');
            buttons.forEach(btn => {
                btn.classList.toggle('language-loading', loading);
                btn.disabled = loading;
            });
        }
    };
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => LanguageSystem.init());
    } else {
        LanguageSystem.init();
    }
    
    // Exponer globalmente para debugging
    window.TSCLanguageSystem = LanguageSystem;
    
})(); 
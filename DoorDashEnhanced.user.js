// ==UserScript==
// @name         DoorDash Enhanced
// @namespace    https://github.com/SysAdminDoc
// @version      2.9.0
// @description  Comprehensive DoorDash enhancer: dark mode, ad/promo blocking, fee transparency, checkout automation, and UI cleanup.
// @author       SysAdminDoc
// @match        https://www.doordash.com/*
// @match        https://doordash.com/*
// @match        https://www.doordash.ca/*
// @match        https://doordash.ca/*
// @match        https://www.doordash.com.au/*
// @match        https://doordash.com.au/*
// @match        https://www.dash.com/*
// @match        https://dash.com/*
// @match        https://dasher.doordash.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @run-at       document-start
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAyVBMVEX/////MAj///7xj374JADunIj//f//LQD/7+n9////JADwRCn/LwX///z9MAj75dvnKwD7//v/+/b6//vvHgDzJgD/8OX///j2GwD6MwX/9u32wLf1u7XtJAD/LQ3sLwD1pprzj3/ylYT4ppT9s6P639T5z8DmOA3oRCbtZVDsOhvwbVjvsqH10sbwf2boblnqemnxqZPnXED93c32vavuoYnqhW7xmYPvYUfrTTb2xb3qXDvqlYrphXXlOBroZkv/6uvlcFToTzpo9Jb4AAAIc0lEQVR4nO2cC1fbOhLHZUVIllfjxEkcJ2FtHi2Q8CiXR3vb3nsLy/f/UDtjh245W2IIlk3OmR+0h/a0sf+WNC+NLATDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMM1j8Qt/t94vJKEELyVBer/aL0AGidR4Xe+sLqiFtAn4f6K/gg81aUHhSqcUWrcqD0cvgRavKWkwIUlau6CwWoPQLazDR+QvM7YVEiBT0+ol2xUoNPT3e72DXlsc7nz4uHs0H7Yo8fhkGqmoPZSa5oPF8mC3DzicCa4SMj9Ac9ePNRgulAti54IWcc4YlZ+enU9KWQl6ELTnvrzkxdi5IjZtClzJNCY9+XSRZUlleQAtgi+FQRwX7SuMYxcU0fjyQtJkBZqtfiSGe8bF7etDhTiM8Sw26R9HaO/kCBV6mqbnuQvcrBORpQFwanA1tDJJfK1DDVfjoP1RLE1bXH2b9PoG0OB4UohR9xWNYlAErQ6k++UnZwa3ZdQB0mIE2XBAkGib7Y9djAu/k5laYfLPmRgByoNENByz4vrW4gNKJIvanUaTfsHFiBGyGDWrT1Aqg2vgQ+ocuozOFLqimH4aYmwjKRVoVqEUo0RLnKimG3u6oojjKY6izmTjmQeIBGeHhp1xOYodEc/QuE57mQWwSdasQotuSOPkIIndDWJMjjEYX2F0Q9OqYSjExyUud1KHgVQctBqEP8HsHVOhyo9fTDRkO1MS2OVqNIsQmnYWj1ApQ9BaLLoUWUT/ZOCpZqTRRqPEtEDf3908jV2+27i3WGExP8OJ+nc+m3UljxQG5mHuKYkCWToN+Semi506xvRj81FNBUVM6G3hcOq6HMXAnYS+SnGYZVt6eodpUDqNVYbTLvhwpx/wcZelGy8yKdM4nGIIPuvG2mCCYxZztAm4GD2li/TZB1N8lh0MIHoLNOUuvaUCHPiqaWhcjNBLg45imwIfrPuaaUqk/GAxgLOj7BADuJZrqCX0WOM4v8BBBE8SQVsMb+ywN43LZd+ywBnF4IHqoV2HhjOMRzDTsFpqDV8o0+hgntLUMd/meCOexhDnP0Y3ADrrTUlgk1OVfFBZXSvWlKBjqvvlmGJ4cvuPgLDDw2lV6m9KYvwYKZVzY+2nqj+97/eR88/OB2pV1GxMY1yNUZ0VM9cgPEWnj1CeAdDvnY6VUqlqEEPV0VlNVc8M+mhMvSoU2YiiJju/OL/6vNMcvbNFXjdFETe+JYvuVSGG4FokzVa9aDMdwu/Lca2rddGO8LwSdbm1D1QU0k3Fh+Umr7Z2+Dk3dYs7+gTl5f0hQevHbUtJtaEGoGdFn2XF7l6NwthcD1tuZ2gQnP6wn9asRLMIMc3p+lY3hGLq4V81u+pmcOSr5NYCgGb6drxeoUsvRMutb02Ca3F4un4QnTreYoVaJiK7jNYPotr1a0p9Iinqhb9VjcJ/b69CKCu+6xXGpLDVLttGoQ1C+KduHe6K7R1ESrKz65qwTX3v+jY3h0I36Oc1Y5get9wR2iCS9pYOp+vH0OQ3oummk/aALOkPzPrA1Pzob+8Y4o3P79T6joHYfJt3qc8CAJpDDP7p++fXkx8f//jzr8uOJ/x/+FeTS+XWJxcuustsl+5CWqjC4tcdQxBlnR6Ov1G5ee0kDaKe7NBbgCxDxvC1TCb39/dHH8/yyNUMYRBPb7tSV2JFpr8v/7UJp3u5os6kuMaUDo58NX2/BI0z9HigzEZQkbmobYYwi8x6riauJRN6aah+/UpWVoR2XmsWYnQghfTV9v0CJHVOb1InrrpmY1fXe+Xy72hJfRdM15DA/AcqdNSn5Yx7KdX4VdOzxt8vQjS93cU0uECg6p4K6oz+BuBHFqonki7dIXpDMbyMylb7xiXG8Swo9i6qB9kh1s7/Qyls0fwg4iI1S8yS2z7+9VQfNd7M71KMLZveQqVDJnG6W7YpdKkQKGgLL5WHFj/8SPOQoUJf/XsvAdchaKvl/Kyucr2BQFQ43sWoHrPI7irCtNOvaZc4XKqfY9iQVlqFd0Bxr+y+5o3LZH6pqsfeWE8DOtj8psOI9AkZPurwTFGM0pzTKGK1A936if8hNa6UkJJZvK+mOm9icx2+mwINZesZzK9T15zTcIbaocQ7maU2KVM4NDeusX4NN963nvd+X0WCnl+IybIxp+FUD/2Er6OkG2CtzHAYw2X0Jonx6vfYqbO50PCOFK5AvxgFb5ioMR0JwszfRdeTrrX8DgAJuBZnpdMIXn1uquySqp6OevDW4P0mML4ZiXsyN26zTKNq4isCtZy8F1f/FKqEZhA+UDK10XLE6UnudHoZyi6j7TVgmIoyw68bOg06uDoLzPhwCN5b2TaEDkwBOQ210eE+jPhmTp2eS/luFVZOQ8jwa/Qqha6sgtBPZnp3Q41m1MLwnrHhQ0R37OoLVG51GL88tGqiwc6865t/CVpm6DTKeVc/eNU/Ixsaq/yPo63YKZT0Dpb7a0X++wVOERdfmY6o/PIY46JtUEhOA2CCTuOF9gbnqFH5lxst7CjbivYnSeUbO7mbGlOsP6jh3GzmTKTyv6761f/1dvKgSdAQgkaVw/1FHj1f6S/3nyKV7i3Oro5oE5ReFNf8CXwfWHpbIL3WQoT7Z4uTwXOc/Pi2vDw4P5rQv7dV/7Gns9vewCAu7D/LZBJSUtnpJv2boEKuHY2eL1hTCl++IG4LVt5vqc4Mal32dYvVr/KLvqsjhav3XnV7o2+AXrz2zHHz8nWCICuzsgW25feghGff9wQ4jJIcg279xYLNQTdOJf/fIavXGmw5Eh47ov4fm1Suoe1XXzIMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAM84T/AnqWqa1aUynCAAAAAElFTkSuQmCC
// @downloadURL  https://github.com/SysAdminDoc/Doordash-Enhanced/raw/refs/heads/main/DoorDashEnhanced.user.js
// @updateURL    https://github.com/SysAdminDoc/Doordash-Enhanced/raw/refs/heads/main/DoorDashEnhanced.user.js
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    var SCRIPT_ID = 'dd-enhanced';
    var VERSION   = '2.9.0';

    var DEFAULT_SETTINGS = {
        darkMode:            true,
        blockDashPassPromos: true,
        blockPopups:         true,
        blockSponsoredCards: true,
        feeHighlighter:      true,
        hideHeroCarousel:    false,
        cleanFooter:         true,
        quickSearch:         true,
        priceCalculator:     true,
        wideLayout:          false,
        stickyCart:          true,
        autoExpandFees:      true,
        hideTurnstile:       true,
        visualFlair:         true,
        hideElectronics:     true,
        tipDefault:          'off',  // 'off', 'remember', or dollar amount like '5.00'
        checkoutFlair:       true,
        storePolish:         true,
        theme:               'mocha', // 'mocha', 'frappe', 'macchiato', 'latte'
        cardDensity:         'comfortable', // 'comfortable', 'compact', 'dense'
        maxDeliveryFee:      'off', // 'off' or dollar amount like '5.00'
        minimalistMode:      false,
        unitPriceCalculator: true,
        allergenFilter:      '',
        deliveryFeeBaseline: true,
        priceIncreaseDetector: true,
        reorderLast:         true,
        orderHistory:        true,
        portionCalculator:   true,
        stickyOrderSummary:  true,
        feeDropIndicator:    true,
        syncUrl:             '',
        language:            'en', // 'en', 'es', 'fr', or 'ca-en'
        promoCodes:          '', // comma-separated user-supplied codes
    };

    var UI_COPY = {
        en: {
            language: 'Language', languageDescription: 'Choose the settings-panel language',
            en: 'English', es: 'Español', fr: 'Français', caEn: 'Canadian English',
            Appearance: 'Appearance', AdBlocking: 'Ad Blocking', Transparency: 'Transparency', Checkout: 'Checkout',
            Utilities: 'Utilities', 'UI Cleanup': 'UI Cleanup', Persistence: 'Persistence',
            off: 'Off', rememberLast: 'Remember last', fixedAmount: 'Fixed amount', amountPlaceholder: '0.00',
            comfortable: 'Comfortable', compact: 'Compact', dense: 'Dense', enable: 'Enable', pull: 'Pull',
            rawGistUrl: 'raw Gist URL', allergenPlaceholder: 'peanut, shellfish', exportSettings: 'Export Settings',
            importSettings: 'Import Settings', orderSummary: 'Order Summary', resetSettings: 'Reset All Settings',
            close: 'Close', lastTip: 'last: $', summaryTitle: 'Order Summary', invalidSettings: 'Invalid settings file: ',
            promoLabel: 'Local codes', promoTry: 'Try codes', promoTryingButton: 'Trying…', promoTrying: 'Trying ', promoAccepted: 'Accepted ', promoNoMatch: 'No code was accepted', promoFieldMissing: 'Promo field is not visible', promoApplyMissing: 'Apply button is not visible', promoConfigure: 'Add comma-separated codes in Settings first', promoPlaceholder: 'SAVE10, WELCOME',
            promoLabel: 'Local codes', promoTry: 'Try codes', promoTryingButton: 'Trying…', promoTrying: 'Trying ', promoAccepted: 'Accepted ', promoNoMatch: 'No code was accepted', promoFieldMissing: 'Promo field is not visible', promoApplyMissing: 'Apply button is not visible', promoConfigure: 'Add comma-separated codes in Settings first', promoPlaceholder: 'SAVE10, WELCOME',
        },
        es: {
            language: 'Idioma', languageDescription: 'Elige el idioma del panel de ajustes',
            en: 'English', es: 'Español', fr: 'Français', caEn: 'Inglés canadiense',
            Appearance: 'Apariencia', AdBlocking: 'Bloqueo de anuncios', Transparency: 'Transparencia', Checkout: 'Pago',
            Utilities: 'Utilidades', 'UI Cleanup': 'Limpieza de interfaz', Persistence: 'Persistencia',
            off: 'Desactivado', rememberLast: 'Recordar el último', fixedAmount: 'Cantidad fija', amountPlaceholder: '0,00',
            comfortable: 'Cómoda', compact: 'Compacta', dense: 'Densa', enable: 'Activar', pull: 'Cargar',
            rawGistUrl: 'URL de Gist sin formato', allergenPlaceholder: 'cacahuate, mariscos', exportSettings: 'Exportar ajustes',
            importSettings: 'Importar ajustes', orderSummary: 'Resumen de pedidos', resetSettings: 'Restablecer ajustes',
            close: 'Cerrar', lastTip: 'último: $', summaryTitle: 'Resumen de pedidos', invalidSettings: 'Archivo de ajustes no válido: ',
            promoLabel: 'Códigos locales', promoTry: 'Probar códigos', promoTryingButton: 'Probando…', promoTrying: 'Probando ', promoAccepted: 'Aceptado ', promoNoMatch: 'No se aceptó ningún código', promoFieldMissing: 'El campo de promoción no está visible', promoApplyMissing: 'El botón Aplicar no está visible', promoConfigure: 'Añade códigos separados por comas en Ajustes', promoPlaceholder: 'AHORRO10, BIENVENIDA',
            promoLabel: 'Códigos locales', promoTry: 'Probar códigos', promoTryingButton: 'Probando…', promoTrying: 'Probando ', promoAccepted: 'Aceptado ', promoNoMatch: 'No se aceptó ningún código', promoFieldMissing: 'El campo de promoción no está visible', promoApplyMissing: 'El botón Aplicar no está visible', promoConfigure: 'Añade códigos separados por comas en Ajustes', promoPlaceholder: 'AHORRO10, BIENVENIDA',
        },
        fr: {
            language: 'Langue', languageDescription: 'Choisissez la langue du panneau de réglages',
            en: 'English', es: 'Español', fr: 'Français', caEn: 'Anglais canadien',
            Appearance: 'Apparence', AdBlocking: 'Blocage publicitaire', Transparency: 'Transparence', Checkout: 'Paiement',
            Utilities: 'Utilitaires', 'UI Cleanup': 'Nettoyage de l’interface', Persistence: 'Persistance',
            off: 'Désactivé', rememberLast: 'Mémoriser le dernier', fixedAmount: 'Montant fixe', amountPlaceholder: '0,00',
            comfortable: 'Confortable', compact: 'Compact', dense: 'Dense', enable: 'Activer', pull: 'Charger',
            rawGistUrl: 'URL Gist brute', allergenPlaceholder: 'arachide, fruits de mer', exportSettings: 'Exporter les réglages',
            importSettings: 'Importer les réglages', orderSummary: 'Résumé des commandes', resetSettings: 'Réinitialiser les réglages',
            close: 'Fermer', lastTip: 'dernier : $', summaryTitle: 'Résumé des commandes', invalidSettings: 'Fichier de réglages invalide : ',
            promoLabel: 'Codes locaux', promoTry: 'Essayer les codes', promoTryingButton: 'Essai…', promoTrying: 'Essai de ', promoAccepted: 'Accepté : ', promoNoMatch: 'Aucun code accepté', promoFieldMissing: 'Le champ promo est invisible', promoApplyMissing: 'Le bouton Appliquer est invisible', promoConfigure: 'Ajoutez des codes séparés par des virgules dans les réglages', promoPlaceholder: 'RABAIS10, BIENVENUE',
            promoLabel: 'Codes locaux', promoTry: 'Essayer les codes', promoTryingButton: 'Essai…', promoTrying: 'Essai de ', promoAccepted: 'Accepté : ', promoNoMatch: 'Aucun code accepté', promoFieldMissing: 'Le champ promo est invisible', promoApplyMissing: 'Le bouton Appliquer est invisible', promoConfigure: 'Ajoutez des codes séparés par des virgules dans les réglages', promoPlaceholder: 'RABAIS10, BIENVENUE',
        },
        'ca-en': {
            language: 'Language', languageDescription: 'Choose the settings-panel language',
            en: 'English', es: 'Español', fr: 'Français', caEn: 'Canadian English',
            Appearance: 'Appearance', AdBlocking: 'Ad Blocking', Transparency: 'Transparency', Checkout: 'Checkout',
            Utilities: 'Utilities', 'UI Cleanup': 'UI Cleanup', Persistence: 'Persistence',
            off: 'Off', rememberLast: 'Remember last', fixedAmount: 'Fixed amount', amountPlaceholder: '0.00',
            comfortable: 'Comfortable', compact: 'Compact', dense: 'Dense', enable: 'Enable', pull: 'Pull',
            rawGistUrl: 'raw Gist URL', allergenPlaceholder: 'peanut, shellfish', exportSettings: 'Export Settings',
            importSettings: 'Import Settings', orderSummary: 'Order Summary', resetSettings: 'Reset All Settings',
            close: 'Close', lastTip: 'last: $', summaryTitle: 'Order Summary', invalidSettings: 'Invalid settings file: ',
            promoLabel: 'Local codes', promoTry: 'Try codes', promoTryingButton: 'Trying…', promoTrying: 'Trying ', promoAccepted: 'Accepted ', promoNoMatch: 'No code was accepted', promoFieldMissing: 'Promo field is not visible', promoApplyMissing: 'Apply button is not visible', promoConfigure: 'Add comma-separated codes in Settings first', promoPlaceholder: 'SAVE10, WELCOME',
            promoLabel: 'Local codes', promoTry: 'Try codes', promoTryingButton: 'Trying…', promoTrying: 'Trying ', promoAccepted: 'Accepted ', promoNoMatch: 'No code was accepted', promoFieldMissing: 'Promo field is not visible', promoApplyMissing: 'Apply button is not visible', promoConfigure: 'Add comma-separated codes in Settings first', promoPlaceholder: 'SAVE10, WELCOME',
        },
    };

    var FEATURE_COPY = {
        es: {
            darkMode: ['Modo oscuro', 'Tema oscuro completo mediante variables Prism'], wideLayout: ['Diseño amplio', 'Usa todo el ancho del navegador'],
            blockDashPassPromos: ['Bloquear promociones de DashPass', 'Oculta banners y promociones de DashPass'], blockPopups: ['Bloquear ventanas emergentes', 'Cierra automáticamente modales y hojas promocionales'],
            blockSponsoredCards: ['Ocultar anuncios patrocinados', 'Elimina tarjetas, carruseles y artículos patrocinados'], feeHighlighter: ['Resaltador de tarifas', 'Colorea las tarifas en la página de pago'], autoExpandFees: ['Expandir tarifas automáticamente', 'Expande el desglose de tarifas en el pago'],
            priceCalculator: ['Calculadora de precio acumulado', 'Muestra el total estimado al explorar un menú'], hideHeroCarousel: ['Ocultar carrusel principal', 'Elimina el carrusel promocional de la página de inicio'], cleanFooter: ['Limpiar pie de página', 'Simplifica el pie de página'], hideTurnstile: ['Ocultar banners de Turnstile', 'Oculta banners de verificación cuando no son necesarios'], stickyCart: ['Botón de carrito fijo', 'Mantén visible el botón del carrito'],
            quickSearch: ['Historial de búsqueda', 'Recuerda y sugiere búsquedas anteriores'], hideElectronics: ['Ocultar electrónica', 'Elimina la categoría Electrónica de la barra lateral'], tipDefault: ['Propina predeterminada', 'Selecciona automáticamente tu propina preferida'], checkoutFlair: ['Estilo de pago', 'Aspecto refinado para la página de pago'], storePolish: ['Pulido de tienda', 'Mejora el diseño de tiendas y el modo oscuro'], visualFlair: ['Detalles visuales y animaciones', 'Insignias animadas y microinteracciones'],
            theme: ['Tema', 'Paleta de colores: Mocha, Frappé, Macchiato o Latte'], cardDensity: ['Densidad de tarjetas', 'Diseño de tarjetas cómodo, compacto o denso'], maxDeliveryFee: ['Ocultar tarifas de entrega altas', 'Oculta restaurantes sobre tu límite'], minimalistMode: ['Modo minimalista', 'Oculta insignias e imágenes para una vista más limpia'], unitPriceCalculator: ['Calculadora por unidad', 'Muestra el precio por onza o por 100 g'], allergenFilter: ['Filtro de alérgenos', 'Atenúa artículos que coinciden con tu lista'], deliveryFeeBaseline: ['Referencia de tarifa de entrega', 'Compara tarifas visibles con tu mediana'], priceIncreaseDetector: ['Detector de aumentos', 'Resalta artículos más caros que la última vez'], reorderLast: ['Repetir último pedido', 'Muestra un botón para tu restaurante visitado más reciente'], orderHistory: ['Historial de pedidos', 'Recuerda entradas visibles y permite exportarlas'], portionCalculator: ['Precio por porción', 'Estima el precio por persona en pedidos grupales'], stickyOrderSummary: ['Resumen de pedido fijo', 'Mantén visible el resumen durante el desplazamiento'], feeDropIndicator: ['Indicador de reducción', 'Marca las tarifas que bajan durante la sesión'], syncUrl: ['URL de sincronización', 'Carga ajustes desde un Gist JSON configurado'], promoCodes: ['Ayudante de códigos promocionales', 'Prueba tus propios códigos sin servicios de afiliados'], language: ['Idioma', 'Elige el idioma del panel de ajustes'],
        },
        fr: {
            darkMode: ['Mode sombre', 'Thème sombre complet via les variables Prism'], wideLayout: ['Mise en page large', 'Utilise toute la largeur du navigateur'], blockDashPassPromos: ['Bloquer les promotions DashPass', 'Masque les bannières et promotions DashPass'], blockPopups: ['Bloquer les fenêtres promotionnelles', 'Ferme les modales et panneaux promotionnels'], blockSponsoredCards: ['Masquer les annonces sponsorisées', 'Supprime les cartes, carrousels et articles sponsorisés'], feeHighlighter: ['Surlignage des frais', 'Colore les frais sur la page de paiement'], autoExpandFees: ['Développer les frais automatiquement', 'Développe le détail des frais au paiement'], priceCalculator: ['Calculateur de prix courant', 'Affiche le total estimé pendant la navigation'], hideHeroCarousel: ['Masquer le carrousel principal', 'Supprime le carrousel promotionnel de l’accueil'], cleanFooter: ['Nettoyer le pied de page', 'Simplifie le pied de page'], hideTurnstile: ['Masquer les bannières Turnstile', 'Masque les bannières de vérification inutiles'], stickyCart: ['Bouton panier fixe', 'Garde le bouton panier visible'], quickSearch: ['Historique des recherches', 'Mémorise et suggère les recherches précédentes'], hideElectronics: ['Masquer l’électronique', 'Supprime la catégorie Électronique'], tipDefault: ['Pourboire par défaut', 'Sélectionne automatiquement votre pourboire'], checkoutFlair: ['Style du paiement', 'Aspect soigné pour le paiement'], storePolish: ['Finition de la boutique', 'Améliore la mise en page des boutiques'], visualFlair: ['Détails visuels et animations', 'Badges animés et micro-interactions'], theme: ['Thème', 'Palette Mocha, Frappé, Macchiato ou Latte'], cardDensity: ['Densité des cartes', 'Mise en page confortable, compacte ou dense'], maxDeliveryFee: ['Masquer les frais élevés', 'Masque les restaurants au-dessus du seuil'], minimalistMode: ['Mode minimaliste', 'Masque les badges et images'], unitPriceCalculator: ['Calculateur à l’unité', 'Affiche le prix à l’once ou pour 100 g'], allergenFilter: ['Filtre d’allergènes', 'Atténue les articles correspondant à votre liste'], deliveryFeeBaseline: ['Référence des frais', 'Compare les frais visibles à votre médiane'], priceIncreaseDetector: ['Détecteur de hausse', 'Surligne les articles plus chers qu’avant'], reorderLast: ['Recommander le dernier', 'Affiche un bouton pour votre dernier restaurant'], orderHistory: ['Historique des commandes', 'Mémorise les commandes visibles et les exporte'], portionCalculator: ['Prix par portion', 'Estime le prix par personne pour les commandes groupées'], stickyOrderSummary: ['Résumé fixe', 'Garde le résumé visible pendant le défilement'], feeDropIndicator: ['Indicateur de baisse', 'Signale les frais réduits pendant la session'], syncUrl: ['URL de synchronisation', 'Charge les réglages depuis un Gist JSON'], promoCodes: ['Assistant de codes promotionnels', 'Essaie vos propres codes sans services affiliés'], language: ['Langue', 'Choisissez la langue du panneau'],
        },
        'ca-en': {
            orderHistory: ['Order History Log', 'Remember visible Orders-page entries and export them locally'], portionCalculator: ['Price per Portion', 'Estimate the per-person price on group-order items'], promoCodes: ['Local Promo Code Helper', 'Try your own codes without affiliate services'], language: ['Language', 'Choose the settings-panel language'],
        },
    };

    function activeLocale() {
        var language = String(GM_getValue(SCRIPT_ID + '_language', DEFAULT_SETTINGS.language) || 'en');
        return UI_COPY[language] ? language : 'en';
    }
    function t(key, fallback) {
        var copy = UI_COPY[activeLocale()];
        return copy[key] || fallback;
    }
    function localizedFeature(feature) {
        var copy = FEATURE_COPY[activeLocale()] && FEATURE_COPY[activeLocale()][feature.key];
        return copy || [feature.name, feature.desc];
    }

    function getSetting(key) { return GM_getValue(SCRIPT_ID + '_' + key, DEFAULT_SETTINGS[key]); }
    function setSetting(key, val) { GM_setValue(SCRIPT_ID + '_' + key, val); }

    // =====================================================================
    //  TRUSTED TYPES POLICY
    //  Guard all innerHTML writes so the script works if DoorDash ships CSP
    //  with a require-trusted-types-for 'script' directive.
    // =====================================================================
    var _ttPolicy = null;
    if (typeof window.trustedTypes !== 'undefined' && window.trustedTypes.createPolicy) {
        try {
            _ttPolicy = window.trustedTypes.createPolicy('doordash-enhanced', {
                createHTML: function(s) { return s; },
                createScript: function(s) { return s; },
                createScriptURL: function(s) { return s; },
            });
        } catch(e) {
            // Policy name may already exist or CSP blocks creation; fall through
            console.warn('[DD Enhanced] Trusted Types policy creation failed:', e);
        }
    }
    /** Wrap a raw HTML string for safe innerHTML assignment. */
    function trustedHTML(rawHTML) {
        return _ttPolicy ? _ttPolicy.createHTML(rawHTML) : rawHTML;
    }

    // =====================================================================
    //  FEATURES
    // =====================================================================
    var features = [

        // -- DARK MODE ----------------------------------------------------
        {
            key: 'darkMode',
            name: 'Dark Mode',
            group: 'Appearance',
            desc: 'Full dark theme via Prism variable overrides',
            cssFactory: function() { return darkModeCSS(); },
            init: function() { refreshCssBundle(); },
            destroy: function() { refreshCssBundle(); }
        },

        // -- WIDE LAYOUT --------------------------------------------------
        {
            key: 'wideLayout',
            name: 'Wide Layout',
            group: 'Appearance',
            desc: 'Use full browser width for content',
            cssFactory: function() {
                return '[data-testid="ThemingWrapper"] > div > div { max-width: 100% !important; padding-left: 24px !important; padding-right: 24px !important; }';
            },
            init: function() { refreshCssBundle(); },
            destroy: function() { refreshCssBundle(); }
        },

        // -- BLOCK DASHPASS PROMOS ----------------------------------------
        {
            key: 'blockDashPassPromos',
            name: 'Block DashPass Promos',
            group: 'Ad Blocking',
            desc: 'Hide DashPass upsell banners and promotions',
            styleId: SCRIPT_ID + '-dashpass',
            init: function() {
                injectStyle(this.styleId, [
                    '[data-testid*="dashpass" i],',
                    '[data-testid*="DashPass" i],',
                    '[data-testid="homepage-banner-button"],',
                    '[data-testid="homepage-banner-link"],',
                    '[aria-label*="DashPass" i],',
                    'a[href*="dashpass"],',
                    'a[href*="/consumer/membership"] {',
                    '  display: none !important;',
                    '}',
                ].join('\n'));
                this._obs = safeObserver(function(node) {
                    var text = node.textContent || '';
                    if (text.length < 5 || text.length > 250) return;
                    if (node.querySelector && node.querySelector('[data-testid="card.store"], [data-anchor-id="StoreCard"]')) return;
                    if (node.querySelectorAll && node.querySelectorAll('a[href]').length > 6) return;
                    if (/(try dashpass|get dashpass|join dashpass|dashpass free|free.{0,10}delivery.{0,10}30 days|upgrade to dashpass)/i.test(text)) {
                        node.style.setProperty('display', 'none', 'important');
                    }
                });
            },
            destroy: function() { removeStyle(this.styleId); if (this._obs) this._obs.disconnect(); }
        },

        // -- BLOCK POPUPS -------------------------------------------------
        {
            key: 'blockPopups',
            name: 'Block Popups & Overlays',
            group: 'Ad Blocking',
            desc: 'Auto-close promotional modals and sheets',
            init: function() {
                this._obs = safeObserver(function(node) {
                    if (!node.matches || !node.matches('[data-testid="LAYER-MANAGER-MODAL"], [data-testid="LAYER-MANAGER-SHEET"]')) return;
                    var inner = node.querySelector('[data-testid="overlay-content"]');
                    if (!inner) return;
                    var text = inner.textContent || '';
                    if (text.length < 500 && /(dashpass|free delivery|sign up|promo|get \$|% off your|exclusive offer|limited.time)/i.test(text)) {
                        var btn = node.querySelector('button[aria-label="Close"], button[aria-label="close"], [data-testid*="close" i]');
                        if (btn) btn.click(); else node.style.setProperty('display', 'none', 'important');
                    }
                });
            },
            destroy: function() { if (this._obs) this._obs.disconnect(); }
        },

        // -- BLOCK SPONSORED ----------------------------------------------
        {
            key: 'blockSponsoredCards',
            name: 'Hide Sponsored Listings',
            group: 'Ad Blocking',
            desc: 'Remove sponsored/promoted store cards, carousels, and retail items',
            styleId: SCRIPT_ID + '-nosponsor',
            init: function() {
                injectStyle(this.styleId, '.' + SCRIPT_ID + '-sponsored-hidden { display: none !important; }');

                var self = this;
                function isCardBoundary(el) {
                    if (!el) return false;
                    var tid = (el.dataset && (el.dataset.testid || '')) || '';
                    // Store card wrappers (homepage)
                    if (/^sc-615f47d9-2\b/.test(el.className || '') ||
                        /sc-2c225cf6-\d/.test(el.className || '')) return true;
                    // Retail item cards
                    if (tid === 'RetailItemCardCardContent') return true;
                    // Sponsored carousel section
                    if (tid === 'LegoStandardCarouselContainer') return true;
                    // Generic carousel card wrapper with min-height (sc-51d1bf93-0)
                    if (/sc-51d1bf93-0\b/.test(el.className || '') && el.style && el.style.minHeight) return true;
                    return false;
                }

                function sweep() {
                    // Find EVERY "Sponsored" text node on the page via TreeWalker
                    var walker = document.createTreeWalker(
                        document.body, NodeFilter.SHOW_TEXT,
                        { acceptNode: function(n) {
                            return n.textContent.trim() === 'Sponsored' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                        }}
                    );
                    var node;
                    while ((node = walker.nextNode())) {
                        var el = node.parentElement;
                        if (!el) continue;
                        // Walk up to find the card boundary
                        var p = el;
                        for (var i = 0; i < 25 && p && p !== document.body; i++) {
                            if (isCardBoundary(p)) {
                                if (!p.classList.contains(SCRIPT_ID + '-sponsored-hidden')) {
                                    p.classList.add(SCRIPT_ID + '-sponsored-hidden');
                                    console.log('[DD Enhanced] Hid sponsored: ' + (p.dataset.testid || p.className.split(' ')[0]));
                                }
                                break;
                            }
                            p = p.parentElement;
                        }
                    }
                }

                // Run immediately + on mutations (batched via requestIdleCallback)
                sweep();
                var _sweepScheduled = false;
                self._obs = safeObserver(function() {
                    if (_sweepScheduled) return;
                    _sweepScheduled = true;
                    var ric = window.requestIdleCallback || function(cb) { setTimeout(cb, 80); };
                    ric(function() { _sweepScheduled = false; sweep(); });
                });
            },
            destroy: function() {
                removeStyle(this.styleId);
                if (this._obs) this._obs.disconnect();
                document.querySelectorAll('.' + SCRIPT_ID + '-sponsored-hidden').forEach(function(el) {
                    el.classList.remove(SCRIPT_ID + '-sponsored-hidden');
                });
            }
        },

        // -- FEE HIGHLIGHTER (checkout/cart only) -------------------------
        {
            key: 'feeHighlighter',
            name: 'Fee Highlighter',
            group: 'Transparency',
            desc: 'Color-code fees on checkout page',
            styleId: SCRIPT_ID + '-fees',
            entryMatcher: isCheckoutPage,
            init: function() {
                injectStyle(this.styleId, feeHighlighterCSS());
                this._obs = safeObserver(function() { annotateFees(); });
                annotateFees();
            },
            destroy: function() {
                removeStyle(this.styleId);
                if (this._obs) this._obs.disconnect();
                document.querySelectorAll('.' + SCRIPT_ID + '-fee-tag').forEach(function(t) { t.remove(); });
                document.querySelectorAll('[data-' + SCRIPT_ID + '-tagged]').forEach(function(el) { el.removeAttribute('data-' + SCRIPT_ID + '-tagged'); });
            }
        },

        // -- AUTO-EXPAND FEES ---------------------------------------------
        {
            key: 'autoExpandFees',
            name: 'Auto-Expand Fee Details',
            group: 'Transparency',
            desc: 'Automatically expand fee breakdowns on checkout',
            entryMatcher: isCheckoutPage,
            init: function() {
                this._obs = safeObserver(function(node) {
                    if (!isCheckoutPage()) return;
                    var buttons = node.querySelectorAll ? node.querySelectorAll('button') : [];
                    buttons.forEach(function(btn) {
                        if (/fees.*estimated.*tax|estimated.*tax.*fees/i.test(btn.textContent || '') &&
                            btn.getAttribute('aria-expanded') === 'false') btn.click();
                    });
                });
            },
            destroy: function() { if (this._obs) this._obs.disconnect(); }
        },

        // -- PRICE CALCULATOR ---------------------------------------------
        {
            key: 'priceCalculator',
            name: 'Running Price Calculator',
            group: 'Utilities',
            desc: 'Show estimated total while browsing a store menu',
            entryMatcher: isStorePage,
            init: function() {
                this._loop = setInterval(function() {
                    if (!isStorePage()) { var el = document.getElementById(SCRIPT_ID + '-calc'); if (el) el.remove(); return; }
                    updatePriceCalc();
                }, 2000);
            },
            onNavigate: function() { if (!isStorePage()) { var el = document.getElementById(SCRIPT_ID + '-calc'); if (el) el.remove(); } },
            destroy: function() { clearInterval(this._loop); var el = document.getElementById(SCRIPT_ID + '-calc'); if (el) el.remove(); }
        },

        // -- HIDE HERO CAROUSEL -------------------------------------------
        {
            key: 'hideHeroCarousel',
            name: 'Hide Hero Carousel',
            group: 'UI Cleanup',
            desc: 'Remove the promotional carousel at the top of homepage',
            entryMatcher: isRestaurantListPage,
            cssFactory: function() {
                return '[data-testid="horizontal-linear-content-wrapper"], [data-testid="HeroImageContainer"] { display: none !important; }';
            },
            init: function() { refreshCssBundle(); },
            destroy: function() { refreshCssBundle(); }
        },

        // -- CLEAN FOOTER -------------------------------------------------
        {
            key: 'cleanFooter',
            name: 'Clean Footer',
            group: 'UI Cleanup',
            desc: 'Simplify the cluttered footer',
            cssFactory: function() {
                return '[data-testid="Footer"], footer, [role="contentinfo"] { max-height: 200px !important; overflow: hidden !important; }';
            },
            init: function() { refreshCssBundle(); },
            destroy: function() { refreshCssBundle(); }
        },

        // -- HIDE TURNSTILE -----------------------------------------------
        {
            key: 'hideTurnstile',
            name: 'Hide Turnstile Banners',
            group: 'UI Cleanup',
            desc: 'Hide Cloudflare turnstile banners when not needed',
            cssFactory: function() { return [
                    '[data-testid="turnstile/banner"]:not(:has(iframe)),',
                    '[data-testid="turnstile/overlay"]:not(:has(iframe)),',
                    '[data-testid="turnstile/widget"]:not(:has(iframe)) { display: none !important; }',
                ].join('\n'); },
            init: function() { refreshCssBundle(); },
            destroy: function() { refreshCssBundle(); }
        },

        // -- STICKY CART --------------------------------------------------
        {
            key: 'stickyCart',
            name: 'Sticky Cart Button',
            group: 'Utilities',
            desc: 'Keep the cart button visible while scrolling',
            cssFactory: function() {
                return '[data-testid="OrderCartIconButton"] { position: sticky !important; top: 80px !important; z-index: 1000 !important; }';
            },
            init: function() { refreshCssBundle(); },
            destroy: function() { refreshCssBundle(); }
        },

        // -- SEARCH HISTORY -----------------------------------------------
        {
            key: 'quickSearch',
            name: 'Search History',
            group: 'Utilities',
            desc: 'Remember and suggest previous searches',
            init: function() {
                var self = this;
                self._inputs = [];
                function enhanceInput(input) {
                    if (!input || input.dataset.ddEnhanced) return;
                    input.dataset.ddEnhanced = 'true';
                    var onFocus = function() {
                        var h = getJsonValue('search_history', []);
                        if (h.length > 0) showSearchHistory(input, h);
                    };
                    var onKeydown = function(e) {
                        if (e.key === 'Enter' && input.value.trim()) {
                            var h = getJsonValue('search_history', []);
                            var val = input.value.trim();
                            setJsonValue('search_history', [val].concat(h.filter(function(x) { return x !== val; })).slice(0, 10));
                        }
                    };
                    input.addEventListener('focus', onFocus);
                    input.addEventListener('keydown', onKeydown);
                    self._inputs.push({ input: input, onFocus: onFocus, onKeydown: onKeydown });
                }
                this._obs = safeObserver(function(node) {
                    var input = (node.matches && node.matches('[data-anchor-id="HeaderSearchInputField"]')) ? node :
                                (node.querySelector ? node.querySelector('[data-anchor-id="HeaderSearchInputField"]') : null);
                    enhanceInput(input);
                });
            },
            destroy: function() {
                if (this._obs) this._obs.disconnect();
                (this._inputs || []).forEach(function(binding) {
                    binding.input.removeEventListener('focus', binding.onFocus);
                    binding.input.removeEventListener('keydown', binding.onKeydown);
                    delete binding.input.dataset.ddEnhanced;
                });
                this._inputs = [];
                var el = document.getElementById(SCRIPT_ID + '-search-history');
                if (el) el.remove();
            }
        },

        // -- HIDE ELECTRONICS SIDEBAR -------------------------------------
        {
            key: 'hideElectronics',
            name: 'Hide Electronics',
            group: 'UI Cleanup',
            desc: 'Remove Electronics category from the sidebar',
            styleId: SCRIPT_ID + '-noelec',
            init: function() { injectStyle(this.styleId, '#Electronics { display: none !important; }'); },
            destroy: function() { removeStyle(this.styleId); }
        },

        // -- DEFAULT TIP --------------------------------------------------
        {
            key: 'tipDefault',
            name: 'Default Tip',
            group: 'Checkout',
            desc: 'Auto-select your preferred tip on checkout',
            custom: true,
            entryMatcher: isCheckoutPage,
            init: function() { initTipDefault(); },
            destroy: function() { destroyTipDefault(); }
        },

        // -- LOCAL PROMO CODE HELPER --------------------------------------
        {
            key: 'promoCodes',
            name: 'Local Promo Code Helper',
            group: 'Checkout',
            desc: 'Try your own comma-separated promo codes without affiliate services',
            custom: true,
            entryMatcher: isCheckoutPage,
            init: function() {
                renderPromoHelper();
                this._obs = safeObserver(function() { renderPromoHelper(); });
            },
            destroy: function() {
                _promoRunToken++;
                _promoRunning = false;
                if (this._obs) this._obs.disconnect();
                var helper = document.getElementById(SCRIPT_ID + '-promo-helper');
                if (helper) helper.remove();
            }
        },

        // -- CHECKOUT FLAIR -----------------------------------------------
        {
            key: 'checkoutFlair',
            name: 'Checkout Page Styling',
            group: 'Appearance',
            desc: 'Premium look for checkout: glassmorphism, animated totals, polished layout',
            entryMatcher: isCheckoutPage,
            cssFactory: function() { return checkoutFlairCSS(); },
            init: function() { refreshCssBundle(); },
            destroy: function() { refreshCssBundle(); }
        },

        // -- STORE PAGE POLISH ---------------------------------------------
        {
            key: 'storePolish',
            name: 'Store Page Polish',
            group: 'Appearance',
            desc: 'Enhanced convenience/retail store layout, compact spacing, and dark mode fixes',
            entryMatcher: isStorePage,
            cssFactory: function() { return storePolishCSS(); },
            init: function() { refreshCssBundle(); },
            destroy: function() { refreshCssBundle(); }
        },

        // -- VISUAL FLAIR -------------------------------------------------
        {
            key: 'visualFlair',
            name: 'Visual Flair & Animations',
            group: 'Appearance',
            desc: 'Animated badges, card hovers, sparkles, and micro-interactions',
            styleId: SCRIPT_ID + '-flair',
            init: function() {
                injectStyle(this.styleId, visualFlairCSS());
                this._obs = safeObserver(function(node) { applyFlairAttributes(node); });
                applyFlairAttributes(document.body);
            },
            destroy: function() { removeStyle(this.styleId); if (this._obs) this._obs.disconnect(); }
        },

        // -- SETTINGS LANGUAGE --------------------------------------------
        {
            key: 'language',
            name: 'Language',
            group: 'Appearance',
            desc: 'Choose the settings-panel language',
            custom: true,
            init: function() {},
            destroy: function() {}
        },

        // -- THEME PICKER (Catppuccin) ------------------------------------
        {
            key: 'theme',
            name: 'Theme',
            group: 'Appearance',
            desc: 'Color palette: Mocha (dark), Frappé, Macchiato, or Latte (light)',
            custom: true,
            cssFactory: function() { return catppuccinThemeCSS(getSetting('theme') || 'mocha'); },
            init: function() { refreshCssBundle(); },
            destroy: function() { refreshCssBundle(); }
        },

        // -- CARD DENSITY SLIDER ------------------------------------------
        {
            key: 'cardDensity',
            name: 'Restaurant Card Density',
            group: 'Appearance',
            desc: 'Comfortable, compact, or dense card layout',
            custom: true,
            cssFactory: function() { return cardDensityCSS(getSetting('cardDensity') || 'comfortable'); },
            init: function() { refreshCssBundle(); },
            destroy: function() { refreshCssBundle(); }
        },

        // -- MAX DELIVERY FEE FILTER --------------------------------------
        {
            key: 'maxDeliveryFee',
            name: 'Hide High Delivery Fees',
            group: 'Utilities',
            desc: 'Hide restaurants with delivery fees above your threshold',
            custom: true,
            entryMatcher: isRestaurantListPage,
            init: function() {
                var self = this;
                function filterByFee() {
                    var max = getSetting('maxDeliveryFee');
                    if (!max || max === 'off') return;
                    var maxVal = parseFloat(max);
                    if (isNaN(maxVal)) return;
                    document.querySelectorAll('[data-anchor-id="StoreCard"], [data-testid="card.store"]').forEach(function(card) {
                        if (card.dataset.ddFeeFiltered === 'checked') return;
                        card.dataset.ddFeeFiltered = 'checked';
                        var text = card.textContent || '';
                        var feeMatch = text.match(/\$(\d+\.?\d*)\s*delivery\s*fee/i);
                        if (feeMatch) {
                            var fee = parseFloat(feeMatch[1]);
                            if (fee > maxVal) {
                                card.style.setProperty('display', 'none', 'important');
                                card.dataset.ddFeeHidden = 'true';
                            }
                        }
                    });
                }
                filterByFee();
                self._obs = safeObserver(function() {
                    var ric = window.requestIdleCallback || function(cb) { setTimeout(cb, 80); };
                    ric(filterByFee);
                });
            },
            destroy: function() {
                if (this._obs) this._obs.disconnect();
                document.querySelectorAll('[data-dd-fee-filtered]').forEach(function(card) {
                    card.style.removeProperty('display');
                    delete card.dataset.ddFeeHidden;
                    delete card.dataset.ddFeeFiltered;
                });
            }
        },

        // -- MINIMALIST MODE ----------------------------------------------
        {
            key: 'minimalistMode',
            name: 'Minimalist Mode',
            group: 'Appearance',
            desc: 'Hide badges and list images for a quieter browsing view',
            cssFactory: function() { return minimalistModeCSS(); },
            init: function() { refreshCssBundle(); },
            destroy: function() { refreshCssBundle(); }
        },

        // -- UNIT PRICE CALCULATOR ----------------------------------------
        {
            key: 'unitPriceCalculator',
            name: 'Unit Price Calculator',
            group: 'Transparency',
            desc: 'Show price per ounce or per 100g on retail items',
            entryMatcher: isStorePage,
            init: function() {
                applyUnitPrices(document.body);
                this._obs = safeObserver(function(node) { applyUnitPrices(node); });
            },
            destroy: function() {
                if (this._obs) this._obs.disconnect();
                document.querySelectorAll('.' + SCRIPT_ID + '-unit-price').forEach(function(el) { el.remove(); });
                document.querySelectorAll('[data-' + SCRIPT_ID + '-unit-priced]').forEach(function(el) { el.removeAttribute('data-' + SCRIPT_ID + '-unit-priced'); });
            }
        },

        // -- ALLERGEN FILTER ----------------------------------------------
        {
            key: 'allergenFilter',
            name: 'Allergen Filter',
            group: 'Transparency',
            desc: 'Grey menu items that match your comma-separated allergen list',
            custom: true,
            styleId: SCRIPT_ID + '-allergens',
            entryMatcher: isStorePage,
            init: function() {
                injectStyle(this.styleId, allergenFilterCSS());
                applyAllergenFilter(document.body);
                this._obs = safeObserver(function(node) { applyAllergenFilter(node); });
            },
            destroy: function() {
                removeStyle(this.styleId);
                if (this._obs) this._obs.disconnect();
                document.querySelectorAll('[data-' + SCRIPT_ID + '-allergen]').forEach(function(el) {
                    el.removeAttribute('data-' + SCRIPT_ID + '-allergen');
                });
                document.querySelectorAll('.' + SCRIPT_ID + '-allergen-badge').forEach(function(el) { el.remove(); });
            }
        },

        // -- DELIVERY FEE BASELINE ----------------------------------------
        {
            key: 'deliveryFeeBaseline',
            name: 'Delivery Fee Baseline',
            group: 'Transparency',
            desc: 'Compare visible delivery fees against your rolling median',
            entryMatcher: isCheckoutPage,
            init: function() {
                updateDeliveryFeeInsights();
                this._obs = safeObserver(function() { updateDeliveryFeeInsights(); });
            },
            destroy: function() {
                if (this._obs) this._obs.disconnect();
                document.querySelectorAll('.' + SCRIPT_ID + '-fee-baseline').forEach(function(el) { el.remove(); });
            }
        },

        // -- PRICE INCREASE DETECTOR --------------------------------------
        {
            key: 'priceIncreaseDetector',
            name: 'Price Increase Detector',
            group: 'Transparency',
            desc: 'Highlight menu items that cost more than last time you viewed them',
            entryMatcher: isStorePage,
            init: function() {
                scanPriceIncreases(document.body);
                this._obs = safeObserver(function(node) { scanPriceIncreases(node); });
            },
            onNavigate: function() { scanPriceIncreases(document.body); },
            destroy: function() {
                if (this._obs) this._obs.disconnect();
                document.querySelectorAll('[data-' + SCRIPT_ID + '-price-increase]').forEach(function(el) {
                    el.removeAttribute('data-' + SCRIPT_ID + '-price-increase');
                });
                document.querySelectorAll('.' + SCRIPT_ID + '-price-increase').forEach(function(el) { el.remove(); });
            }
        },

        // -- REORDER LAST --------------------------------------------------
        {
            key: 'reorderLast',
            name: 'Reorder Last',
            group: 'Utilities',
            desc: 'Show a sticky home-page button for your last visited restaurant',
            entryMatcher: isRestaurantListPage,
            init: function() {
                updateLastRestaurant();
                renderReorderButton();
                this._obs = safeObserver(function() {
                    updateLastRestaurant();
                    renderReorderButton();
                });
            },
            onNavigate: function() {
                updateLastRestaurant();
                renderReorderButton();
            },
            destroy: function() {
                if (this._obs) this._obs.disconnect();
                var btn = document.getElementById(SCRIPT_ID + '-reorder-last');
                if (btn) btn.remove();
            }
        },

        // -- ORDER HISTORY -------------------------------------------------
        {
            key: 'orderHistory',
            name: 'Order History Log',
            group: 'Utilities',
            desc: 'Remember visible Orders-page entries and export them locally',
            entryMatcher: isOrdersPage,
            init: function() {
                collectOrderHistory();
                renderOrderHistoryToolbar();
                this._obs = safeObserver(function() {
                    collectOrderHistory();
                    renderOrderHistoryToolbar();
                });
            },
            onNavigate: function() {
                collectOrderHistory();
                renderOrderHistoryToolbar();
            },
            destroy: function() {
                if (this._obs) this._obs.disconnect();
                var toolbar = document.getElementById(SCRIPT_ID + '-order-tools');
                if (toolbar) toolbar.remove();
                var dashboard = document.getElementById(SCRIPT_ID + '-order-dashboard');
                if (dashboard) dashboard.remove();
            }
        },

        // -- GROUP ORDER PORTION PRICE -------------------------------------
        {
            key: 'portionCalculator',
            name: 'Price per Portion',
            group: 'Transparency',
            desc: 'Estimate the per-person price on group-order items',
            entryMatcher: isGroupOrderPage,
            init: function() {
                applyPortionPrices(document.body);
                this._obs = safeObserver(function(node) { applyPortionPrices(node); });
            },
            destroy: function() {
                if (this._obs) this._obs.disconnect();
                document.querySelectorAll('.' + SCRIPT_ID + '-portion-price').forEach(function(el) { el.remove(); });
                document.querySelectorAll('[data-' + SCRIPT_ID + '-portion-priced]').forEach(function(el) { el.removeAttribute('data-' + SCRIPT_ID + '-portion-priced'); });
            }
        },

        // -- STICKY ORDER SUMMARY -----------------------------------------
        {
            key: 'stickyOrderSummary',
            name: 'Sticky Order Summary',
            group: 'Checkout',
            desc: 'Keep the checkout order summary visible while scrolling',
            entryMatcher: isCheckoutPage,
            cssFactory: function() { return stickyOrderSummaryCSS(); },
            init: function() { refreshCssBundle(); },
            destroy: function() { refreshCssBundle(); }
        },

        // -- FEE DROP INDICATOR -------------------------------------------
        {
            key: 'feeDropIndicator',
            name: 'Fee Drop Indicator',
            group: 'Transparency',
            desc: 'Mark visible delivery fees that drop during the session',
            entryMatcher: isCheckoutPage,
            init: function() {
                updateFeeDropIndicator();
                this._obs = safeObserver(function() { updateFeeDropIndicator(); });
            },
            destroy: function() {
                if (this._obs) this._obs.disconnect();
                document.querySelectorAll('.' + SCRIPT_ID + '-fee-drop').forEach(function(el) { el.remove(); });
            }
        },

        // -- SETTINGS SYNC URL --------------------------------------------
        {
            key: 'syncUrl',
            name: 'Settings Sync URL',
            group: 'Persistence',
            desc: 'Pull settings from a user-configured raw Gist JSON URL',
            custom: true,
            init: function() { pullSettingsSync(false); },
            destroy: function() {}
        },
    ];


    // =====================================================================
    //  DARK MODE CSS - Override DoorDash Prism Design Token Variables
    // =====================================================================
    function darkModeCSS() {
        return [
        '.prism-theme.prism-theme,',
        '[data-testid="ThemingWrapper"][data-testid="ThemingWrapper"] {',
        '  --base-color-white:      #111118ff !important;',
        '  --base-color-neutral-0:  #1a1a22ff !important;',
        '  --base-color-neutral-5:  #1e1e28ff !important;',
        '  --base-color-neutral-10: #2a2a35ff !important;',
        '  --base-color-neutral-20: #3a3a45ff !important;',
        '  --base-color-neutral-30: #4a4a55ff !important;',
        '  --base-color-neutral-40: #5a5a65ff !important;',
        '  --base-color-neutral-50: #7a7a85ff !important;',
        '  --base-color-neutral-60: #8a8a95ff !important;',
        '  --base-color-neutral-70: #9a9aa5ff !important;',
        '  --base-color-neutral-80: #b0b0bbff !important;',
        '  --base-color-neutral-90: #c8c8d0ff !important;',
        '  --base-color-neutral-95: #d8d8e0ff !important;',
        '  --base-color-neutral-100: #e8e8f0ff !important;',
        '  --base-color-black:      #ffffffff !important;',
        '  --usage-color-border-default: #2a2a35ff !important;',
        '  --usage-color-border-focused: #e8e8f0a8 !important;',
        '  color-scheme: dark !important;',
        '}',
        'html, body { background-color: #111118 !important; color: #e8e8f0 !important; }',
        'div[style*="background-color: rgb(255, 255, 255)"],',
        'div[style*="background-color: white"],',
        'div[style*="background: white"],',
        'div[style*="background: rgb(255, 255, 255)"] { background-color: #111118 !important; }',
        'div[style*="background-color: rgb(247"],',
        'div[style*="background-color: rgb(248"],',
        'div[style*="background-color: rgb(249"],',
        'div[style*="background-color: rgb(250"],',
        'div[style*="background-color: rgb(251"],',
        'div[style*="background-color: rgb(252"],',
        'div[style*="background-color: rgb(253"],',
        'div[style*="background-color: rgb(254"],',
        'div[style*="background-color: rgb(241"],',
        'div[style*="background-color: rgb(242"],',
        'div[style*="background-color: rgb(243"],',
        'div[style*="background-color: rgb(244"],',
        'div[style*="background-color: rgb(245"] { background-color: #1a1a22 !important; }',
        '::-webkit-scrollbar { width: 10px; height: 10px; }',
        '::-webkit-scrollbar-track { background: #111118; }',
        '::-webkit-scrollbar-thumb { background: #3a3a45; border-radius: 5px; }',
        '::-webkit-scrollbar-thumb:hover { background: #4a4a55; }',
        'img { border-radius: 8px; }',
        '.mapboxgl-map { filter: invert(1) hue-rotate(180deg) brightness(1.1) contrast(0.9) !important; }',
        '.mapboxgl-marker, .mapboxgl-ctrl, .mapboxgl-ctrl-logo, .mapboxgl-popup,',
        '[data-testid="MarkerContainer"], [data-testid="ZoomControl"] {',
        '  filter: invert(1) hue-rotate(180deg) !important;',
        '}',
        'html[data-' + SCRIPT_ID + '-site="dasher"] [data-testid="app"],',
        'html[data-' + SCRIPT_ID + '-site="dasher"] #root,',
        'html[data-' + SCRIPT_ID + '-site="dasher"] [role="main"] {',
        '  background-color: #111118 !important; color: #e8e8f0 !important;',
        '}',
        'html[data-' + SCRIPT_ID + '-site="dasher"] input,',
        'html[data-' + SCRIPT_ID + '-site="dasher"] textarea,',
        'html[data-' + SCRIPT_ID + '-site="dasher"] [role="dialog"] {',
        '  background-color: #1a1a22 !important; color: #e8e8f0 !important; border-color: #3a3a45 !important;',
        '}',
        ].join('\n');
    }


    // =====================================================================
    //  FEE HIGHLIGHTER
    // =====================================================================
    function feeHighlighterCSS() {
        var s = SCRIPT_ID;
        return [
        '.' + s + '-fee-tag { display:inline-block; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; margin-left:6px; vertical-align:middle; letter-spacing:0.3px; }',
        '.' + s + '-fee-tag.platform  { background:rgba(255,80,40,0.15); color:#ff5028; border:1px solid rgba(255,80,40,0.3); }',
        '.' + s + '-fee-tag.delivery  { background:rgba(255,180,0,0.15); color:#e6a200; border:1px solid rgba(255,180,0,0.3); }',
        '.' + s + '-fee-tag.regulatory{ background:rgba(100,100,255,0.15); color:#8888ff; border:1px solid rgba(100,100,255,0.3); }',
        '.' + s + '-fee-tag.tax       { background:rgba(100,200,100,0.15); color:#60c060; border:1px solid rgba(100,200,100,0.3); }',
        ].join('\n');
    }

    var FEE_PATTERNS = [
        { regex: /service\s*fee/i,       type: 'platform',   label: 'PLATFORM FEE' },
        { regex: /delivery\s*fee/i,      type: 'delivery',   label: 'DELIVERY' },
        { regex: /small\s*order\s*fee/i, type: 'platform',   label: 'SMALL ORDER' },
        { regex: /regulatory.*fee/i,     type: 'regulatory', label: 'NOT A TAX' },
        { regex: /chicago\s*fee/i,       type: 'regulatory', label: 'NOT A TAX' },
        { regex: /expanded\s*range/i,    type: 'delivery',   label: 'DISTANCE FEE' },
        { regex: /priority.*fee/i,       type: 'delivery',   label: 'PRIORITY FEE' },
        { regex: /express.*fee/i,        type: 'delivery',   label: 'EXPRESS FEE' },
    ];

    function annotateFees() {
        var lineItems = document.querySelector('[data-testid="LineItems"]');
        if (!lineItems) return;
        lineItems.querySelectorAll('[data-testid]').forEach(function(el) {
            if (el.getAttribute('data-' + SCRIPT_ID + '-tagged')) return;
            var testId = el.getAttribute('data-testid') || '';
            var text = el.textContent || '';
            if (text.length > 300) return;
            for (var i = 0; i < FEE_PATTERNS.length; i++) {
                var p = FEE_PATTERNS[i];
                if (p.regex.test(text) || p.regex.test(testId)) {
                    el.setAttribute('data-' + SCRIPT_ID + '-tagged', 'true');
                    var labelEl = el.querySelector('span') || el;
                    if (!labelEl.querySelector('.' + SCRIPT_ID + '-fee-tag')) {
                        var tag = document.createElement('span');
                        tag.className = SCRIPT_ID + '-fee-tag ' + p.type;
                        tag.textContent = p.label;
                        labelEl.appendChild(tag);
                    }
                    break;
                }
            }
        });
    }


    // =====================================================================
    //  VISUAL FLAIR - Animations & Micro-interactions
    // =====================================================================
    function visualFlairCSS() {
        return [

        // --- KEYFRAME ANIMATIONS ---
        '@keyframes dd-shimmer {',
        '  0% { background-position: -200% center; }',
        '  100% { background-position: 200% center; }',
        '}',
        '@keyframes dd-glow-pulse {',
        '  0%, 100% { box-shadow: 0 0 4px rgba(0,184,148,0.3), 0 0 0px rgba(0,184,148,0); }',
        '  50% { box-shadow: 0 0 8px rgba(0,184,148,0.5), 0 0 20px rgba(0,184,148,0.15); }',
        '}',
        '@keyframes dd-badge-entrance {',
        '  0% { opacity: 0; transform: scale(0.6) translateY(4px); }',
        '  50% { transform: scale(1.08) translateY(-1px); }',
        '  100% { opacity: 1; transform: scale(1) translateY(0); }',
        '}',
        '@keyframes dd-card-entrance {',
        '  from { opacity: 0; transform: translateY(16px); }',
        '  to   { opacity: 1; transform: translateY(0); }',
        '}',
        '@keyframes dd-sparkle {',
        '  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }',
        '  50% { opacity: 1; transform: scale(1) rotate(180deg); }',
        '}',
        '@keyframes dd-float {',
        '  0%, 100% { transform: translateY(0); }',
        '  50% { transform: translateY(-3px); }',
        '}',
        '@keyframes dd-ring-pulse {',
        '  0% { box-shadow: 0 0 0 0 rgba(255,48,8,0.4); }',
        '  70% { box-shadow: 0 0 0 8px rgba(255,48,8,0); }',
        '  100% { box-shadow: 0 0 0 0 rgba(255,48,8,0); }',
        '}',

        // --- BADGE SHIMMER (Top Dasher, On Time, etc) ---
        '[class*="TagWrapper-sc-"] {',
        '  position: relative;',
        '  animation: dd-badge-entrance 0.5s ease-out both, dd-glow-pulse 3s ease-in-out infinite 1s;',
        '  transition: transform 0.2s ease, box-shadow 0.2s ease;',
        '  overflow: hidden;',
        '}',
        '[class*="TagWrapper-sc-"]::after {',
        '  content: "";',
        '  position: absolute; inset: 0;',
        '  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 60%, transparent 100%);',
        '  background-size: 200% 100%;',
        '  animation: dd-shimmer 3s ease-in-out infinite;',
        '  pointer-events: none;',
        '  border-radius: inherit;',
        '}',
        '[class*="TagWrapper-sc-"]:hover {',
        '  transform: scale(1.08);',
        '  box-shadow: 0 0 12px rgba(0,184,148,0.5), 0 2px 8px rgba(0,0,0,0.2);',
        '}',

        // --- STORE CARDS - Lift & Glow on Hover ---
        '[data-anchor-id="StoreCard"],',
        '[data-testid="card.store"] {',
        '  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),',
        '              box-shadow 0.3s ease !important;',
        '  animation: dd-card-entrance 0.4s ease-out both;',
        '}',
        '[data-anchor-id="StoreCard"]:hover,',
        '[data-testid="card.store"]:hover {',
        '  transform: translateY(-6px) scale(1.02) !important;',
        '  box-shadow: 0 12px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1) !important;',
        '  z-index: 10 !important;',
        '}',

        // --- STORE CARD IMAGE - Subtle Zoom ---
        '[data-anchor-id="StoreCard"] img,',
        '[data-testid="card.store"] img {',
        '  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;',
        '}',
        '[data-anchor-id="StoreCard"]:hover img,',
        '[data-testid="card.store"]:hover img {',
        '  transform: scale(1.06) !important;',
        '}',

        // --- STAGGERED CARD ENTRANCE (applied via JS) ---
        '[data-dd-flair-stagger] { animation-delay: var(--dd-stagger, 0ms); }',

        // --- MENU ITEM CARDS ---
        '[data-testid="GenericItemCard"] {',
        '  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease !important;',
        '  border-radius: 12px;',
        '}',
        '[data-testid="GenericItemCard"]:hover {',
        '  transform: translateX(4px) !important;',
        '  background: var(--usage-color-background-hovered, rgba(0,0,0,0.03)) !important;',
        '}',

        // --- PRICE TEXT GLOW ON HOVER ---
        '[data-testid="GenericItemCard"]:hover [class*="sc-62d4eb3a-10"] {',
        '  text-shadow: 0 0 8px rgba(255,48,8,0.4);',
        '  transition: text-shadow 0.3s ease;',
        '}',

        // --- BUTTONS - Micro Bounce ---
        '[class*="ButtonRoot-sc-"] {',
        '  transition: transform 0.15s ease, box-shadow 0.2s ease !important;',
        '}',
        '[class*="ButtonRoot-sc-"]:hover {',
        '  transform: translateY(-1px) !important;',
        '}',
        '[class*="ButtonRoot-sc-"]:active {',
        '  transform: translateY(1px) scale(0.97) !important;',
        '}',

        // --- CART BUTTON - Pulse Ring ---
        '[data-testid="OrderCartIconButton"] {',
        '  animation: dd-ring-pulse 2.5s ease-in-out infinite;',
        '  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease !important;',
        '}',
        '[data-testid="OrderCartIconButton"]:hover {',
        '  transform: scale(1.08) !important;',
        '  animation: none;',
        '}',

        // --- DASHER PROFILE - Float ---
        '[data-testid="DasherPreferredProfileDetails"] {',
        '  animation: dd-float 4s ease-in-out infinite;',
        '}',

        // --- RATING STARS/VALUES ---
        '[data-testid="DasherPreferredProfileDetails"] [class*="Text-sc-"]:first-child {',
        '  position: relative;',
        '}',

        // --- DELIVERY SECTION - Subtle entrance ---
        '[data-testid="DeliverySection"],',
        '[data-testid="OrderStatusSection"] {',
        '  animation: dd-card-entrance 0.5s ease-out both;',
        '}',

        // --- HERO CAROUSEL ITEMS ---
        '[data-testid="horizontal-linear-content-wrapper"] > * {',
        '  transition: transform 0.3s ease !important;',
        '}',
        '[data-testid="horizontal-linear-content-wrapper"] > *:hover {',
        '  transform: scale(1.04) !important;',
        '}',

        // --- NOTIFICATION BELL - Wiggle on Hover ---
        '[data-testid="HeaderNotificationBellIcon"]:hover svg {',
        '  animation: dd-wiggle 0.5s ease;',
        '}',
        '@keyframes dd-wiggle {',
        '  0%, 100% { transform: rotate(0deg); }',
        '  20% { transform: rotate(12deg); }',
        '  40% { transform: rotate(-10deg); }',
        '  60% { transform: rotate(6deg); }',
        '  80% { transform: rotate(-4deg); }',
        '}',

        // --- SEARCH INPUT - Glow Focus ---
        '[data-anchor-id="HeaderSearchInputField"]:focus {',
        '  box-shadow: 0 0 0 3px rgba(255,48,8,0.2), 0 0 16px rgba(255,48,8,0.1) !important;',
        '  transition: box-shadow 0.3s ease !important;',
        '}',

        // --- SMOOTH SCROLL ---
        'html { scroll-behavior: smooth; }',

        // --- OUR INJECTED HEADER BUTTONS ---
        '#' + SCRIPT_ID + '-hdr-btns button:hover svg {',
        '  transform: rotate(20deg);',
        '  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);',
        '}',
        '#' + SCRIPT_ID + '-btn-dark:hover svg {',
        '  transform: rotate(-20deg) scale(1.1);',
        '}',

        // --- FOOTER LINKS ---
        'footer a, [data-testid="Footer"] a {',
        '  transition: color 0.2s ease, transform 0.2s ease !important;',
        '  display: inline-block;',
        '}',
        'footer a:hover, [data-testid="Footer"] a:hover {',
        '  transform: translateY(-1px) !important;',
        '}',

        ].join('\n');
    }

    function applyFlairAttributes(root) {
        if (!root || !root.querySelectorAll) return;
        // Stagger store card entrances
        var cards = root.querySelectorAll('[data-anchor-id="StoreCard"]:not([data-dd-flair-stagger]), [data-testid="card.store"]:not([data-dd-flair-stagger])');
        cards.forEach(function(card, i) {
            card.setAttribute('data-dd-flair-stagger', 'true');
            card.style.setProperty('--dd-stagger', (i * 60) + 'ms');
        });
        // Stagger menu items
        var items = root.querySelectorAll('[data-testid="GenericItemCard"]:not([data-dd-flair-stagger])');
        items.forEach(function(item, i) {
            item.setAttribute('data-dd-flair-stagger', 'true');
            item.style.setProperty('--dd-stagger', (i * 40) + 'ms');
        });
    }


    // =====================================================================
    //  CHECKOUT PAGE STYLING
    // =====================================================================
    function checkoutFlairCSS() {
        var S = SCRIPT_ID;
        return [

        // --- Keyframes ---
        '@keyframes dd-ck-slide-in {',
        '  from { opacity: 0; transform: translateY(20px); }',
        '  to   { opacity: 1; transform: translateY(0); }',
        '}',
        '@keyframes dd-ck-total-glow {',
        '  0%, 100% { text-shadow: 0 0 6px rgba(255,48,8,0.2); }',
        '  50% { text-shadow: 0 0 16px rgba(255,48,8,0.45), 0 0 30px rgba(255,48,8,0.1); }',
        '}',
        '@keyframes dd-ck-progress-shine {',
        '  0% { background-position: -200% center; }',
        '  100% { background-position: 200% center; }',
        '}',
        '@keyframes dd-ck-bounce-in {',
        '  0% { opacity: 0; transform: scale(0.85); }',
        '  60% { transform: scale(1.04); }',
        '  100% { opacity: 1; transform: scale(1); }',
        '}',
        '@keyframes dd-ck-pulse-border {',
        '  0%, 100% { border-color: rgba(255,48,8,0.3); }',
        '  50% { border-color: rgba(255,48,8,0.7); }',
        '}',

        // --- Vertical Stepper Sections (Account, Shipping, Payment) ---',
        '[data-testid^="Checkout-vertical-stepper-"] {',
        '  animation: dd-ck-slide-in 0.4s ease-out both;',
        '  transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;',
        '  border-radius: 14px !important;',
        '  padding: 16px !important;',
        '  margin-bottom: 8px !important;',
        '  border: 1px solid var(--usage-color-border-default, #e0e0e0) !important;',
        '}',
        '[data-testid^="Checkout-vertical-stepper-"][aria-expanded="true"] {',
        '  background: var(--usage-color-background-elevated-default, rgba(255,255,255,0.6)) !important;',
        '  box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04) !important;',
        '  border-color: rgba(255,48,8,0.25) !important;',
        '}',
        // Stagger the stepper sections
        '[data-anchor-id="ACCOUNT_DETAILS"] { animation-delay: 0ms; }',
        '[data-anchor-id="SHIPPING_DETAILS"] { animation-delay: 100ms; }',
        '[data-anchor-id="PAYMENT_DETAILS"]  { animation-delay: 200ms; }',

        // --- Step Labels ---
        '[data-anchor-id="step-label"] {',
        '  font-weight: 700 !important;',
        '  letter-spacing: 0.3px;',
        '}',

        // --- Place Order Button ---
        '[data-testid="PlaceOrderButton"] {',
        '  border-radius: 14px !important;',
        '  font-size: 16px !important;',
        '  font-weight: 700 !important;',
        '  letter-spacing: 0.5px;',
        '  min-height: 52px !important;',
        '  position: relative;',
        '  overflow: hidden;',
        '  animation: dd-ck-bounce-in 0.5s ease-out 0.3s both;',
        '  transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease !important;',
        '  box-shadow: 0 4px 16px rgba(255,48,8,0.3), 0 2px 4px rgba(255,48,8,0.2) !important;',
        '}',
        '[data-testid="PlaceOrderButton"]:hover {',
        '  transform: translateY(-2px) scale(1.01) !important;',
        '  box-shadow: 0 8px 28px rgba(255,48,8,0.4), 0 4px 8px rgba(255,48,8,0.25) !important;',
        '}',
        '[data-testid="PlaceOrderButton"]:active {',
        '  transform: translateY(1px) scale(0.98) !important;',
        '}',
        // Shimmer sweep on Place Order button
        '[data-testid="PlaceOrderButton"]::after {',
        '  content: "";',
        '  position: absolute; inset: 0;',
        '  background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.2) 55%, transparent 65%);',
        '  background-size: 250% 100%;',
        '  animation: dd-ck-progress-shine 4s ease-in-out infinite;',
        '  pointer-events: none;',
        '  border-radius: inherit;',
        '}',

        // --- Order Total in button ---
        '[data-testid="OrderCartTotal"] {',
        '  font-weight: 800 !important;',
        '}',

        // --- Cart Item Cards ---
        '[data-anchor-id="OrderItemContainer"] {',
        '  transition: transform 0.2s ease, background 0.25s ease !important;',
        '  border-radius: 12px !important;',
        '  padding: 8px !important;',
        '}',
        '[data-anchor-id="OrderItemContainer"]:hover {',
        '  background: var(--usage-color-background-hovered, rgba(0,0,0,0.03)) !important;',
        '  transform: translateX(4px) !important;',
        '}',

        // --- Cart Item Images ---
        '[data-anchor-id="OrderItemContainer"] picture img {',
        '  border-radius: 10px !important;',
        '  transition: transform 0.3s ease, box-shadow 0.3s ease !important;',
        '}',
        '[data-anchor-id="OrderItemContainer"]:hover picture img {',
        '  transform: scale(1.08) !important;',
        '  box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;',
        '}',

        // --- Quantity Stepper ---
        '[data-testid="QuantityContainer"] {',
        '  border-radius: 10px !important;',
        '  transition: box-shadow 0.2s ease !important;',
        '}',
        '[data-testid="QuantityContainer"]:hover {',
        '  box-shadow: 0 0 0 2px rgba(255,48,8,0.2) !important;',
        '}',
        '[data-testid="stepper-expanded-quantity"] {',
        '  font-weight: 700 !important;',
        '  transition: transform 0.15s ease;',
        '}',
        '[data-testid="stepper-increment-button"]:active ~ [data-testid="stepper-expanded-quantity"],',
        '[data-testid="stepper-decrement-button"]:active ~ [data-testid="stepper-expanded-quantity"] {',
        '  transform: scale(1.2);',
        '}',

        // --- Line Items Section ---
        '[data-testid="LineItems"] {',
        '  border-radius: 14px !important;',
        '  padding: 12px 16px !important;',
        '  border: 1px solid var(--usage-color-border-default, #e0e0e0) !important;',
        '  background: var(--usage-color-background-elevated-default, rgba(255,255,255,0.5)) !important;',
        '  animation: dd-ck-slide-in 0.4s ease-out 0.15s both;',
        '}',

        // --- Individual Line Items ---
        '[data-testid="Subtotal"],',
        '[data-testid="Delivery Fee"],',
        '[data-testid="Fees & Estimated Tax"],',
        '[data-testid="Dasher Tip"] {',
        '  padding: 6px 0 !important;',
        '  transition: background 0.2s ease, padding-left 0.2s ease !important;',
        '  border-radius: 6px;',
        '}',
        '[data-testid="Subtotal"]:hover,',
        '[data-testid="Delivery Fee"]:hover,',
        '[data-testid="Fees & Estimated Tax"]:hover,',
        '[data-testid="Dasher Tip"]:hover {',
        '  background: var(--usage-color-background-hovered, rgba(0,0,0,0.02)) !important;',
        '  padding-left: 6px !important;',
        '}',

        // --- Total Line - Hero Treatment ---
        '[data-testid="Total"] {',
        '  padding: 12px 0 4px !important;',
        '  margin-top: 4px !important;',
        '  border-top: 2px solid var(--usage-color-border-default, #e0e0e0) !important;',
        '}',
        '[data-testid="Total"] [class*="Text-sc-"]:last-child {',
        '  font-size: 20px !important;',
        '  font-weight: 800 !important;',
        '  animation: dd-ck-total-glow 3s ease-in-out infinite;',
        '}',

        // --- Tip Picker Buttons ---
        '[data-anchor-id="TipPickerOption"] {',
        '  border-radius: 12px !important;',
        '  transition: transform 0.15s ease, box-shadow 0.2s ease !important;',
        '  min-width: 56px;',
        '}',
        '[data-anchor-id="TipPickerOption"]:hover {',
        '  transform: translateY(-2px) !important;',
        '  box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;',
        '}',
        '[data-anchor-id="TipPickerOption"]:active {',
        '  transform: scale(0.95) !important;',
        '}',
        // Active tip button glow
        '[data-anchor-id="TipPickerOption"][aria-checked="true"] {',
        '  box-shadow: 0 2px 12px rgba(255,48,8,0.25) !important;',
        '}',

        // --- Delivery Time Options ---
        '[class*="sc-4851ec00-0"] {',
        '  border-radius: 14px !important;',
        '  transition: transform 0.2s ease, box-shadow 0.2s ease !important;',
        '}',
        '[class*="sc-4851ec00-0"]:hover {',
        '  transform: translateY(-2px) !important;',
        '  box-shadow: 0 4px 16px rgba(0,0,0,0.08) !important;',
        '}',
        '[class*="sc-4851ec00-0"][aria-checked="true"] {',
        '  box-shadow: 0 2px 12px rgba(255,48,8,0.2) !important;',
        '}',

        // --- Time Range Badge ---
        '[data-testid="time-range"] {',
        '  font-weight: 700 !important;',
        '  letter-spacing: 0.2px;',
        '}',

        // --- Loyalty Rewards Banner ---
        '[data-testid="store-loyalty-banner"] {',
        '  border-radius: 14px !important;',
        '  padding: 14px 16px !important;',
        '  position: relative;',
        '  overflow: hidden;',
        '  animation: dd-ck-slide-in 0.4s ease-out 0.2s both;',
        '  transition: transform 0.2s ease, box-shadow 0.2s ease !important;',
        '}',
        '[data-testid="store-loyalty-banner"]:hover {',
        '  transform: translateY(-2px) !important;',
        '  box-shadow: 0 4px 16px rgba(0,0,0,0.1) !important;',
        '}',
        '[data-testid="store-loyalty-banner-title"] {',
        '  font-weight: 700 !important;',
        '}',

        // --- Progress Bar - Animated Shine ---
        '[data-testid="ProgressBar"] {',
        '  border-radius: 20px !important;',
        '  overflow: hidden;',
        '  position: relative;',
        '}',
        '[data-testid="ProgressBar"]::after {',
        '  content: "";',
        '  position: absolute; inset: 0;',
        '  background: linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%);',
        '  background-size: 200% 100%;',
        '  animation: dd-ck-progress-shine 2.5s ease-in-out infinite;',
        '  pointer-events: none;',
        '}',

        // --- Store Logo ---
        '[data-testid="StoreLogo"] {',
        '  border-radius: 12px !important;',
        '  transition: transform 0.3s ease, box-shadow 0.3s ease !important;',
        '  box-shadow: 0 2px 8px rgba(0,0,0,0.1);',
        '}',
        '[data-testid="StoreLogo"]:hover {',
        '  transform: scale(1.08) rotate(2deg) !important;',
        '  box-shadow: 0 4px 16px rgba(0,0,0,0.2) !important;',
        '}',

        // --- Gift Option Cell ---
        '[data-testid="giftListCell"] {',
        '  border-radius: 14px !important;',
        '  transition: transform 0.2s ease, background 0.2s ease !important;',
        '}',
        '[data-testid="giftListCell"]:hover {',
        '  transform: translateX(4px) !important;',
        '  background: var(--usage-color-background-hovered, rgba(0,0,0,0.03)) !important;',
        '}',

        // --- Edit Buttons ---
        '[data-testid$="-edit-button"] {',
        '  border-radius: 10px !important;',
        '  transition: transform 0.15s ease, background 0.2s ease !important;',
        '}',
        '[data-testid$="-edit-button"]:hover {',
        '  transform: scale(1.05) !important;',
        '}',

        // --- Promo Code Button ---
        '[data-anchor-id="OpenPromoCodeModalButton"] {',
        '  border-radius: 10px !important;',
        '  transition: transform 0.2s ease, color 0.2s ease !important;',
        '}',
        '[data-anchor-id="OpenPromoCodeModalButton"]:hover {',
        '  transform: translateX(3px) !important;',
        '}',
        '[data-anchor-id="OpenPromoCodeModalButton"]:hover svg {',
        '  transform: rotate(8deg) scale(1.1); transition: transform 0.3s ease;',
        '}',

        // --- Checkout Food Item Cells ---
        '[class*="ListCellContainer-sc-f56khb"][aria-label*="click to open modal"] {',
        '  transition: transform 0.2s ease, background 0.2s ease !important;',
        '  border-radius: 10px !important;',
        '}',
        '[class*="ListCellContainer-sc-f56khb"][aria-label*="click to open modal"]:hover {',
        '  transform: translateX(4px) !important;',
        '  background: var(--usage-color-background-hovered, rgba(0,0,0,0.03)) !important;',
        '}',
        '[class*="ListCellContainer-sc-f56khb"][aria-label*="click to open modal"]:hover picture img {',
        '  transform: scale(1.08); transition: transform 0.3s ease;',
        '}',

        // --- Loyalty Banner Shimmer Sweep ---
        '[data-testid="store-loyalty-banner"]::after {',
        '  content: ""; position: absolute; inset: 0;',
        '  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 100%);',
        '  background-size: 200% 100%;',
        '  animation: dd-ck-progress-shine 5s ease-in-out infinite;',
        '  pointer-events: none;',
        '}',

        // --- Checkout Columns Staggered Entrance ---
        '[class*="sc-c6cb4208-1"] {',
        '  animation: dd-ck-slide-in 0.5s ease-out 0.1s both;',
        '}',
        '[class*="sc-c6cb4208-2"] {',
        '  animation: dd-ck-slide-in 0.5s ease-out 0.25s both;',
        '}',

        // --- Checkout Items Wrapper ---
        '[data-testid="checkoutItemDetailsWrapper"] {',
        '  border-radius: 14px !important; overflow: hidden;',
        '}',

        // --- Mapbox on checkout ---
        '.mapboxgl-map {',
        '  border-radius: 14px !important;',
        '  overflow: hidden !important;',
        '  box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important;',
        '}',

        ].join('\n');
    }


    // =====================================================================
    //  DEFAULT TIP - Auto-select preferred tip on checkout
    // =====================================================================
    var _tipObs = null;
    var _tipGroup = null;
    var _tipWatchHandler = null;
    var _tipApplied = false;

    function initTipDefault() {
        destroyTipDefault();
        _tipApplied = false;
        _tipObs = safeObserver(function() { applyTipDefault(); });
        applyTipDefault();
    }

    function destroyTipDefault() {
        if (_tipObs) { _tipObs.disconnect(); _tipObs = null; }
        if (_tipGroup && _tipWatchHandler) {
            _tipGroup.removeEventListener('click', _tipWatchHandler);
            delete _tipGroup.dataset.ddTipWatching;
        }
        _tipGroup = null;
        _tipWatchHandler = null;
        _tipApplied = false;
    }

    function applyTipDefault() {
        if (_tipApplied) return;
        var mode = getSetting('tipDefault');
        if (!mode || mode === 'off') return;

        var group = document.querySelector('[role="radiogroup"][aria-label="Tip Amount"]');
        if (!group) return;

        // Attach save-on-click listeners (for "remember" mode)
        if (_tipGroup !== group) {
            if (_tipGroup && _tipWatchHandler) {
                _tipGroup.removeEventListener('click', _tipWatchHandler);
                delete _tipGroup.dataset.ddTipWatching;
            }
            _tipGroup = group;
            _tipGroup.dataset.ddTipWatching = '1';
            _tipWatchHandler = function(e) {
                var btn = e.target.closest('[data-anchor-id="TipPickerOption"]');
                if (!btn) return;
                setTimeout(function() {
                    var text = btn.textContent.trim();
                    if (text && text !== 'Other' && text.startsWith('$')) {
                        var amount = text.replace('$', '');
                        var perRestaurant = getJsonValue('tip_by_restaurant', {});
                        perRestaurant[getStoreKey()] = amount;
                        setJsonValue('tip_by_restaurant', perRestaurant);
                        GM_setValue(SCRIPT_ID + '_tipLastAmount', amount);
                    }
                }, 100);
            };
            _tipGroup.addEventListener('click', _tipWatchHandler);
        }

        var targetAmount;
        if (mode === 'remember') {
            targetAmount = getJsonValue('tip_by_restaurant', {})[getStoreKey()] || GM_getValue(SCRIPT_ID + '_tipLastAmount', null);
            if (!targetAmount) return; // Nothing remembered yet
        } else {
            targetAmount = mode; // Direct dollar amount like "5.00"
        }

        // Check if the target is already selected
        var buttons = group.querySelectorAll('[data-anchor-id="TipPickerOption"]');
        var matched = false;
        var otherBtn = null;
        var targetFloat = parseFloat(targetAmount);
        var nearestBtn = null;
        var nearestDiff = Infinity;

        buttons.forEach(function(btn) {
            var text = btn.textContent.trim();
            if (text === 'Other') { otherBtn = btn; return; }
            var val = parseFloat(text.replace('$', ''));
            if (!isNaN(val)) {
                var diff = Math.abs(val - targetFloat);
                if (diff < nearestDiff) {
                    nearestDiff = diff;
                    nearestBtn = btn;
                }
            }
            if (!isNaN(val) && Math.abs(val - targetFloat) < 0.01) {
                if (btn.getAttribute('aria-checked') !== 'true') {
                    btn.click();
                    console.log('[DD Enhanced] Tip auto-selected: $' + targetAmount);
                }
                matched = true;
            }
        });

        if (!matched && nearestBtn && nearestDiff <= 0.50) {
            nearestBtn.click();
            matched = true;
            console.log('[DD Enhanced] Tip snapped to nearest preset for $' + targetAmount);
        }

        if (!matched && otherBtn) {
            // Click "Other" to open custom input
            if (otherBtn.getAttribute('aria-checked') !== 'true') {
                otherBtn.click();
            }
            // Wait for the input field to appear then fill it
            setTimeout(function() {
                var input = group.closest('[class*="sc-a1750b88"]');
                if (!input) input = group.parentElement;
                var allInputs = input ? input.querySelectorAll('input') : document.querySelectorAll('[role="radiogroup"][aria-label="Tip Amount"] ~ * input, [class*="sc-a1750b88"] input');
                if (!allInputs.length) {
                    // Broader search near the tip section
                    var tipSection = group.closest('[class*="StyledStackChildren"]') || group.parentElement.parentElement;
                    if (tipSection) allInputs = tipSection.querySelectorAll('input[type="text"], input[type="number"], input:not([type])');
                }
                if (allInputs.length) {
                    var tipInput = allInputs[allInputs.length - 1]; // Usually the last/newest input
                    var nativeSet = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                    nativeSet.call(tipInput, targetAmount);
                    tipInput.dispatchEvent(new Event('input', { bubbles: true }));
                    tipInput.dispatchEvent(new Event('change', { bubbles: true }));
                    tipInput.blur();
                    // Find a nearby apply/update button without synthesizing keyboard input.
                    setTimeout(function() {
                        var parent = tipInput.closest('div[class*="sc-"]') || tipInput.parentElement;
                        if (parent) {
                            var applyBtn = parent.querySelector('button');
                            if (applyBtn) applyBtn.click();
                        }
                    }, 100);
                    console.log('[DD Enhanced] Tip custom amount set: $' + targetAmount);
                } else {
                    console.log('[DD Enhanced] Tip input field not found after clicking Other');
                }
            }, 400);
        }

        _tipApplied = true;
        // Save the amount we just applied (for "remember" mode feedback)
        if (mode !== 'remember') {
            var fixedTips = getJsonValue('tip_by_restaurant', {});
            fixedTips[getStoreKey()] = targetAmount;
            setJsonValue('tip_by_restaurant', fixedTips);
            GM_setValue(SCRIPT_ID + '_tipLastAmount', targetAmount);
        }
    }


    // =====================================================================
    //  STORE PAGE POLISH
    // =====================================================================
    function storePolishCSS() {
        return [

        // --- Keyframes ---
        '@keyframes dd-sp-slide-up {',
        '  from { opacity: 0; transform: translateY(14px); }',
        '  to   { opacity: 1; transform: translateY(0); }',
        '}',
        '@keyframes dd-sp-pop {',
        '  0% { transform: scale(0.92); opacity: 0; }',
        '  60% { transform: scale(1.03); }',
        '  100% { transform: scale(1); opacity: 1; }',
        '}',

        // ==========================================
        //  STORE HEADER - Compact & Clean
        // ==========================================

        // Store header wrapper - tighten vertical space
        '[class*="sc-dd3a85f9-2"] {',
        '  margin-top: 70px !important;',
        '  margin-bottom: 0 !important;',
        '}',

        // Inner header container - remove excess padding
        '[class*="sc-9ef7f31f-1"] {',
        '  padding: 0 !important;',
        '  margin: 0 !important;',
        '}',

        // Store logo - rounded with subtle shadow
        '[data-anchor-id="ConvenienceStoreHeaderLogo"] {',
        '  border-radius: 14px !important;',
        '  overflow: hidden;',
        '  box-shadow: 0 2px 12px rgba(0,0,0,0.12);',
        '  transition: transform 0.3s ease, box-shadow 0.3s ease;',
        '}',
        '[data-anchor-id="ConvenienceStoreHeaderLogo"]:hover {',
        '  transform: scale(1.05);',
        '  box-shadow: 0 4px 20px rgba(0,0,0,0.18);',
        '}',
        '[data-anchor-id="ConvenienceStoreHeaderLogo"] img {',
        '  border-radius: 14px !important;',
        '}',

        // Delivery info row - compact
        '[data-testid="CurrentOrderInfoDetail"] {',
        '  padding: 4px 0 !important;',
        '}',

        // Delivery fee badge
        '[data-testid="delivery-fee-container"] {',
        '  border-radius: 10px !important;',
        '  transition: transform 0.2s ease;',
        '}',
        '[data-testid="delivery-fee-container"]:hover {',
        '  transform: translateY(-1px);',
        '}',

        // Rating badge - warm amber glow
        '[class*="StyledInlineChildren-sc-1dbwnk9-0"][class*="eVPsWJ"] {',
        '  background: linear-gradient(135deg, #92700a, #b8860b) !important;',
        '  border-radius: 8px !important; padding: 2px 8px !important;',
        '  box-shadow: 0 2px 8px rgba(184,134,11,0.3);',
        '  transition: transform 0.2s ease, box-shadow 0.2s ease;',
        '}',
        '[class*="StyledInlineChildren-sc-1dbwnk9-0"][class*="eVPsWJ"]:hover {',
        '  transform: scale(1.08);',
        '  box-shadow: 0 4px 14px rgba(184,134,11,0.4);',
        '}',
        '[class*="StyledInlineChildren-sc-1dbwnk9-0"][class*="eVPsWJ"] span {',
        '  color: #fff !important; font-weight: 700 !important;',
        '}',

        // ==========================================
        //  SIDEBAR NAVIGATION - Dark Mode Fixes
        // ==========================================

        // Sidebar nav text
        '[class*="StyledMotionBody-sc-wwjeiz"] {',
        '  color: var(--usage-color-text-default, inherit);',
        '}',

        // Sidebar active indicator dots
        '[class*="sc-e91617d-4"] {',
        '  color: var(--usage-color-text-default, inherit);',
        '}',

        // Sidebar nav item hover
        '.prism-side-nav-item a {',
        '  transition: background 0.2s ease, transform 0.15s ease !important;',
        '  border-radius: 10px !important;',
        '}',
        '.prism-side-nav-item a:hover {',
        '  background: var(--usage-color-background-hovered, rgba(0,0,0,0.05)) !important;',
        '}',

        // Sidebar nav item text styling
        '[class*="StyledText-sc-1ypoh6y-0"] {',
        '  color: var(--usage-color-text-default, inherit) !important;',
        '}',

        // ==========================================
        //  CATEGORY CAROUSEL TABS
        // ==========================================

        // Tab container - compact padding
        '[class*="StyledInlineChildren-sc-1dbwnk9-0"][class*="eFINKY"] {',
        '  padding: 0 !important; margin: 0 !important;',
        '}',

        // Individual category tab
        '[data-testid="ConvenienceStorePageCarouselItem"] {',
        '  transition: transform 0.2s ease;',
        '}',
        '[data-testid="ConvenienceStorePageCarouselItem"]:hover {',
        '  transform: translateY(-2px);',
        '}',

        // Tab icons
        '[class*="sc-76f6277e-3"] img {',
        '  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);',
        '}',
        '[data-testid="ConvenienceStorePageCarouselItem"]:hover [class*="sc-76f6277e-3"] img {',
        '  transform: scale(1.15) rotate(-5deg);',
        '}',

        // Selected tab indicator
        '[data-testid="ConvenienceStorePageCarouselItem"][data-is-selected="true"] [class*="sc-76f6277e-2"] {',
        '  box-shadow: 0 2px 8px rgba(255,48,8,0.2);',
        '}',

        // Carousel pagination dots - compact
        '[class*="Root-sc-nmoa4y-4"] {',
        '  padding: 0 !important; margin: 0 !important;',
        '}',

        // ==========================================
        //  CATEGORY SECTIONS
        // ==========================================

        // Section wrapper - compact
        '[class*="sc-1fe87388-0"] {',
        '  padding: 0 !important; margin: 0 !important;',
        '}',

        // Section title
        '[data-anchor-id="CarouselControllerTitleContent"] {',
        '  transition: color 0.2s ease;',
        '}',

        // "See all" link hover
        '[class*="sc-1fe87388-1"] a:hover {',
        '  text-decoration: none !important;',
        '  opacity: 0.8;',
        '}',

        // ==========================================
        //  RETAIL ITEM CARDS
        // ==========================================

        // Card container
        '[data-testid="RetailItemCardCardContent"] {',
        '  border-radius: 14px !important;',
        '  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),',
        '              box-shadow 0.25s ease !important;',
        '  animation: dd-sp-slide-up 0.4s ease-out both;',
        '  overflow: hidden;',
        '}',
        '[data-testid="RetailItemCardCardContent"]:hover {',
        '  transform: translateY(-4px) scale(1.02) !important;',
        '  box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;',
        '  z-index: 5 !important; position: relative;',
        '}',

        // Card images - zoom on hover
        '[data-testid="RetailItemCardImageWithOptionalStepper"] img {',
        '  transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94) !important;',
        '  border-radius: 10px !important;',
        '}',
        '[data-testid="RetailItemCardCardContent"]:hover [data-testid="RetailItemCardImageWithOptionalStepper"] img {',
        '  transform: scale(1.06) !important;',
        '}',

        // Price text
        '[class*="sc-85923f71-0"] {',
        '  font-weight: 700 !important;',
        '}',

        // Item name on hover - subtle shift
        '[data-testid="price-name-info-opacity-wrapper"] {',
        '  transition: transform 0.2s ease;',
        '}',
        '[data-testid="RetailItemCardCardContent"]:hover [data-testid="price-name-info-opacity-wrapper"] {',
        '  transform: translateY(-1px);',
        '}',

        // Add button - vibrant green with pop animation
        '[data-testid="add-button-label"] {',
        '  transition: transform 0.15s ease;',
        '}',
        '[class*="sc-76322cb4-4"][class*="ffjZqa"] {',
        '  background: linear-gradient(135deg, #2d9a06, #3eae0a) !important;',
        '  color: #fff !important;',
        '  border-radius: 8px !important;',
        '  box-shadow: 0 2px 8px rgba(62,174,10,0.3);',
        '  transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1),',
        '              box-shadow 0.2s ease !important;',
        '}',
        '[class*="sc-76322cb4-4"][class*="ffjZqa"]:hover {',
        '  transform: scale(1.08) !important;',
        '  box-shadow: 0 4px 14px rgba(62,174,10,0.45) !important;',
        '}',

        // "Add" text styling
        '[class*="Text-sc-1nn8hom-0"][class*="dfSikg"] {',
        '  font-weight: 600 !important;',
        '}',

        // Quantity stepper on cards
        '[data-testid="RetailItemCardStepperContainer"] {',
        '  transition: opacity 0.2s ease;',
        '}',
        '[data-testid="RetailItemCardQuantityStepperContainer"] [data-testid="QuantityContainer"] {',
        '  border-radius: 10px !important;',
        '  transition: box-shadow 0.2s ease;',
        '}',
        '[data-testid="RetailItemCardQuantityStepperContainer"] [data-testid="QuantityContainer"]:hover {',
        '  box-shadow: 0 0 0 2px rgba(255,48,8,0.2);',
        '}',

        // ==========================================
        //  SEARCH BAR
        // ==========================================

        '[data-testid="sticky-store-search-v2"] [class*="InputContainer-sc-"] {',
        '  border-radius: 12px !important;',
        '  transition: box-shadow 0.3s ease !important;',
        '}',
        '[data-testid="sticky-store-search-v2"] input:focus {',
        '  box-shadow: 0 0 0 3px rgba(255,48,8,0.15) !important;',
        '}',

        // ==========================================
        //  LEGO SECTION (grid layouts)
        // ==========================================

        // Lego facet cards (sponsored/featured brand cards)
        '[data-testid="lego-facet-card-creative-cell"] {',
        '  border-radius: 14px !important;',
        '  overflow: hidden;',
        '  transition: transform 0.25s ease, box-shadow 0.25s ease !important;',
        '}',
        '[data-testid="lego-facet-card-creative-cell"]:hover {',
        '  transform: translateY(-3px) !important;',
        '  box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;',
        '}',

        // Lego section container
        '[data-testid="ConvenienceLegoSectionContainer"] {',
        '  animation: dd-sp-slide-up 0.5s ease-out both;',
        '}',

        // ==========================================
        //  GLOBAL SPACING REDUCTION
        // ==========================================

        // Reduce triple-nested div padding bloat
        '[class*="sc-dd3a85f9"] > div > div {',
        '  margin-bottom: 0 !important;',
        '}',

        // Carousel navigation arrow buttons
        '[data-testid*="carousel-left-button"], [data-testid*="carousel-right-button"] {',
        '  transition: transform 0.15s ease, opacity 0.2s ease !important;',
        '}',
        '[data-testid*="carousel-left-button"]:hover, [data-testid*="carousel-right-button"]:hover {',
        '  transform: scale(1.15) !important;',
        '}',
        '[data-testid*="carousel-left-button"]:active, [data-testid*="carousel-right-button"]:active {',
        '  transform: scale(0.9) !important;',
        '}',

        // ==========================================
        //  "BEST VALUE" / BADGE TAGS
        // ==========================================
        '[data-testid*="best_value"] {',
        '  animation: dd-sp-pop 0.4s ease-out both;',
        '}',

        // ==========================================
        //  TEXT COLOR FIXES (dark mode compat)
        // ==========================================

        // PlaceOrder button inner text
        '[class*="StyledInlineChildren-sc-1dbwnk9-0"][class*="bApFGz"] {',
        '  color: #ffffff !important;',
        '}',

        // Transparent background fix
        '[class*="StyledStackChildren-sc-yj3wxb-0"][class*="sc-afac318a-0"] {',
        '  background-color: transparent !important;',
        '}',

        ].join("\n");
    }


    // =====================================================================
    //  CATPPUCCIN THEME PALETTES
    //  https://github.com/catppuccin/catppuccin
    // =====================================================================
    var CATPPUCCIN = {
        mocha: {
            base: '#1e1e2e', mantle: '#181825', crust: '#11111b',
            surface0: '#313244', surface1: '#45475a', surface2: '#585b70',
            overlay0: '#6c7086', overlay1: '#7f849c', overlay2: '#9399b2',
            text: '#cdd6f4', subtext0: '#a6adc8', subtext1: '#bac2de',
            red: '#f38ba8', green: '#a6e3a1', blue: '#89b4fa',
            yellow: '#f9e2af', peach: '#fab387', mauve: '#cba6f7',
            teal: '#94e2d5', lavender: '#b4befe', flamingo: '#f2cdcd',
            rosewater: '#f5e0dc', sapphire: '#74c7ec', sky: '#89dceb',
            maroon: '#eba0ac', pink: '#f5c2e7',
        },
        frappe: {
            base: '#303446', mantle: '#292c3c', crust: '#232634',
            surface0: '#414559', surface1: '#51576d', surface2: '#626880',
            overlay0: '#737994', overlay1: '#838ba7', overlay2: '#949cbb',
            text: '#c6d0f5', subtext0: '#a5adce', subtext1: '#b5bfe2',
            red: '#e78284', green: '#a6d189', blue: '#8caaee',
            yellow: '#e5c890', peach: '#ef9f76', mauve: '#ca9ee6',
            teal: '#81c8be', lavender: '#babbf1', flamingo: '#eebebe',
            rosewater: '#f2d5cf', sapphire: '#85c1dc', sky: '#99d1db',
            maroon: '#ea999c', pink: '#f4b8e4',
        },
        macchiato: {
            base: '#24273a', mantle: '#1e2030', crust: '#181926',
            surface0: '#363a4f', surface1: '#494d64', surface2: '#5b6078',
            overlay0: '#6e738d', overlay1: '#8087a2', overlay2: '#939ab7',
            text: '#cad3f5', subtext0: '#a5adcb', subtext1: '#b8c0e0',
            red: '#ed8796', green: '#a6da95', blue: '#8aadf4',
            yellow: '#eed49f', peach: '#f5a97f', mauve: '#c6a0f6',
            teal: '#8bd5ca', lavender: '#b7bdf8', flamingo: '#f0c6c6',
            rosewater: '#f4dbd6', sapphire: '#7dc4e4', sky: '#91d7e3',
            maroon: '#ee99a0', pink: '#f5bde6',
        },
        latte: {
            base: '#eff1f5', mantle: '#e6e9ef', crust: '#dce0e8',
            surface0: '#ccd0da', surface1: '#bcc0cc', surface2: '#acb0be',
            overlay0: '#9ca0b0', overlay1: '#8c8fa1', overlay2: '#7c7f93',
            text: '#4c4f69', subtext0: '#6c6f85', subtext1: '#5c5f77',
            red: '#d20f39', green: '#40a02b', blue: '#1e66f5',
            yellow: '#df8e1d', peach: '#fe640b', mauve: '#8839ef',
            teal: '#179299', lavender: '#7287fd', flamingo: '#dd7878',
            rosewater: '#dc8a78', sapphire: '#209fb5', sky: '#04a5e5',
            maroon: '#e64553', pink: '#ea76cb',
        },
    };

    function catppuccinThemeCSS(themeName) {
        var t = CATPPUCCIN[themeName] || CATPPUCCIN.mocha;
        var isLight = themeName === 'latte';
        return [
        '.prism-theme.prism-theme,',
        '[data-testid="ThemingWrapper"][data-testid="ThemingWrapper"] {',
        '  --base-color-white:      ' + t.base + 'ff !important;',
        '  --base-color-neutral-0:  ' + t.mantle + 'ff !important;',
        '  --base-color-neutral-5:  ' + t.crust + 'ff !important;',
        '  --base-color-neutral-10: ' + t.surface0 + 'ff !important;',
        '  --base-color-neutral-20: ' + t.surface1 + 'ff !important;',
        '  --base-color-neutral-30: ' + t.surface2 + 'ff !important;',
        '  --base-color-neutral-40: ' + t.overlay0 + 'ff !important;',
        '  --base-color-neutral-50: ' + t.overlay1 + 'ff !important;',
        '  --base-color-neutral-60: ' + t.overlay2 + 'ff !important;',
        '  --base-color-neutral-70: ' + t.subtext0 + 'ff !important;',
        '  --base-color-neutral-80: ' + t.subtext1 + 'ff !important;',
        '  --base-color-neutral-90: ' + t.text + 'ff !important;',
        '  --base-color-neutral-95: ' + t.text + 'ff !important;',
        '  --base-color-neutral-100: ' + t.text + 'ff !important;',
        '  --base-color-black:      ' + t.text + 'ff !important;',
        '  --usage-color-border-default: ' + t.surface0 + 'ff !important;',
        '  --usage-color-border-focused: ' + t.lavender + 'a8 !important;',
        '  color-scheme: ' + (isLight ? 'light' : 'dark') + ' !important;',
        '}',
        ].join('\n');
    }


    // =====================================================================
    //  CARD DENSITY
    // =====================================================================
    function cardDensityCSS(density) {
        if (density === 'compact') {
            return [
            '[data-anchor-id="StoreCard"], [data-testid="card.store"] {',
            '  padding: 8px !important;',
            '}',
            '[data-anchor-id="StoreCard"] img, [data-testid="card.store"] img {',
            '  max-height: 120px !important; object-fit: cover !important;',
            '}',
            ].join('\n');
        }
        if (density === 'dense') {
            return [
            '[data-anchor-id="StoreCard"], [data-testid="card.store"] {',
            '  padding: 4px !important;',
            '}',
            '[data-anchor-id="StoreCard"] img, [data-testid="card.store"] img {',
            '  max-height: 80px !important; object-fit: cover !important;',
            '}',
            '[data-anchor-id="StoreCard"] [class*="Text-sc-"]:not(:first-child),',
            '[data-testid="card.store"] [class*="Text-sc-"]:not(:first-child) {',
            '  font-size: 12px !important; line-height: 1.3 !important;',
            '}',
            ].join('\n');
        }
        return ''; // comfortable = default, no overrides
    }


    // =====================================================================
    //  ROADMAP FEATURE HELPERS
    // =====================================================================
    var _deliveryBaselineLastSample = '';
    var _feeDropLast = null;

    function minimalistModeCSS() {
        return [
        '[data-anchor-id="StoreCard"] img, [data-testid="card.store"] img, [data-testid="GenericItemCard"] img {',
        '  display: none !important;',
        '}',
        '[class*="TagWrapper-sc-"], [data-testid*="badge" i], [data-anchor-id*="badge" i] {',
        '  display: none !important;',
        '}',
        '[data-anchor-id="StoreCard"], [data-testid="card.store"], [data-testid="GenericItemCard"] {',
        '  min-height: auto !important;',
        '}',
        ].join('\n');
    }

    function allergenFilterCSS() {
        return [
        '[data-' + SCRIPT_ID + '-allergen="true"] {',
        '  opacity: 0.42 !important;',
        '  filter: grayscale(0.8) !important;',
        '}',
        '.' + SCRIPT_ID + '-allergen-badge, .' + SCRIPT_ID + '-unit-price, .' + SCRIPT_ID + '-price-increase, .' + SCRIPT_ID + '-fee-baseline, .' + SCRIPT_ID + '-fee-drop {',
        '  display: inline-flex;',
        '  align-items: center;',
        '  margin-left: 6px;',
        '  padding: 2px 6px;',
        '  border-radius: 6px;',
        '  font-size: 10px;',
        '  font-weight: 700;',
        '  line-height: 1.2;',
        '}',
        '.' + SCRIPT_ID + '-allergen-badge { background: rgba(255, 80, 40, 0.14); color: #ff5028; border: 1px solid rgba(255, 80, 40, 0.28); }',
        '.' + SCRIPT_ID + '-unit-price { background: rgba(30, 136, 229, 0.14); color: #4aa3ff; border: 1px solid rgba(30, 136, 229, 0.28); }',
        '.' + SCRIPT_ID + '-price-increase { background: rgba(255, 80, 40, 0.16); color: #ff5028; border: 1px solid rgba(255, 80, 40, 0.32); }',
        '.' + SCRIPT_ID + '-fee-baseline { background: rgba(137, 180, 250, 0.16); color: #89b4fa; border: 1px solid rgba(137, 180, 250, 0.32); }',
        '.' + SCRIPT_ID + '-fee-drop { background: rgba(166, 227, 161, 0.16); color: #5ac85a; border: 1px solid rgba(166, 227, 161, 0.32); }',
        ].join('\n');
    }

    function stickyOrderSummaryCSS() {
        return [
        '[data-testid="LineItems"],',
        '[data-testid="OrderSummary"],',
        '[data-testid="CheckoutCart"],',
        '[data-anchor-id="OrderCartContainer"] {',
        '  position: sticky !important;',
        '  top: 84px !important;',
        '  align-self: flex-start !important;',
        '  z-index: 30 !important;',
        '}',
        ].join('\n');
    }

    function parseMoney(text) {
        var match = (text || '').match(/\$(\d+(?:\.\d{1,2})?)/);
        return match ? parseFloat(match[1]) : null;
    }

    function getJsonValue(key, fallback) {
        try {
            var raw = GM_getValue(SCRIPT_ID + '_' + key, '');
            return raw ? JSON.parse(raw) : fallback;
        } catch(e) {
            return fallback;
        }
    }

    function setJsonValue(key, value) {
        GM_setValue(SCRIPT_ID + '_' + key, JSON.stringify(value));
    }

    function getStoreKey() {
        var match = location.pathname.match(/\/store\/([^/?#]+)/i);
        if (match) return decodeURIComponent(match[1]).toLowerCase();
        var title = (document.title || '').replace(/\s*-\s*DoorDash.*$/i, '').trim();
        return title ? title.toLowerCase() : 'unknown-store';
    }

    function getStoreName() {
        var heading = document.querySelector('h1, [data-testid="storeHeaderName"], [data-anchor-id="StoreHeaderName"]');
        var text = heading ? heading.textContent.trim() : '';
        if (text) return text;
        return (document.title || 'Last restaurant').replace(/\s*-\s*DoorDash.*$/i, '').trim() || 'Last restaurant';
    }

    function itemCards(root) {
        var scope = root && root.querySelectorAll ? root : document;
        return scope.querySelectorAll('[data-testid="GenericItemCard"], [data-anchor-id="StoreCard"], [data-testid="card.store"]');
    }

    function itemName(card) {
        var candidate = card.querySelector('[data-testid*="name" i], [data-anchor-id*="name" i], h2, h3');
        var text = candidate ? candidate.textContent : card.textContent;
        return (text || '')
            .replace(/\$\d+(?:\.\d{1,2})?/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 96);
    }

    function appendInlineBadge(target, className, text) {
        if (!target || target.querySelector('.' + className)) return;
        var badge = document.createElement('span');
        badge.className = className;
        badge.textContent = text;
        target.appendChild(badge);
    }

    function applyUnitPrices(root) {
        itemCards(root).forEach(function(card) {
            if (card.getAttribute('data-' + SCRIPT_ID + '-unit-priced')) return;
            var text = card.textContent || '';
            var price = parseMoney(text);
            if (!price) return;
            var unit = text.match(/(\d+(?:\.\d+)?)\s*(oz|ounce|ounces|lb|lbs|g|gram|grams|kg)\b/i);
            if (!unit) return;
            var qty = parseFloat(unit[1]);
            var label = unit[2].toLowerCase();
            if (!qty || isNaN(qty)) return;
            var unitText = '';
            if (/^lb/.test(label)) unitText = '$' + (price / (qty * 16)).toFixed(2) + '/oz';
            else if (/^oz|ounce/.test(label)) unitText = '$' + (price / qty).toFixed(2) + '/oz';
            else if (label === 'kg') unitText = '$' + (price / (qty * 10)).toFixed(2) + '/100g';
            else unitText = '$' + (price / (qty / 100)).toFixed(2) + '/100g';
            var priceNode = Array.prototype.find.call(card.querySelectorAll('*'), function(el) {
                return /\$\d+(?:\.\d{1,2})?/.test(el.textContent || '') && el.children.length === 0;
            }) || card;
            appendInlineBadge(priceNode.parentElement || card, SCRIPT_ID + '-unit-price', unitText);
            card.setAttribute('data-' + SCRIPT_ID + '-unit-priced', 'true');
        });
    }

    function portionCards(root) {
        var scope = root && root.querySelectorAll ? root : document;
        return scope.querySelectorAll('[data-testid="GenericItemCard"], [data-anchor-id="StoreCard"], [data-testid*="GroupOrder" i], [role="listitem"]');
    }

    function applyPortionPrices(root) {
        portionCards(root).forEach(function(card) {
            if (card.getAttribute('data-' + SCRIPT_ID + '-portion-priced')) return;
            var text = card.textContent || '';
            var price = parseMoney(text);
            if (!price) return;
            var serves = text.match(/\b(?:serves?|feeds?|makes?)\s*(\d+)(?:\s*[-–]\s*(\d+))?\s*(?:people|persons|portions|servings)?/i) ||
                         text.match(/\b(\d+)(?:\s*[-–]\s*(\d+))?\s*(?:people|persons|portions|servings)\b/i);
            if (!serves) return;
            var low = parseInt(serves[1], 10);
            var high = serves[2] ? parseInt(serves[2], 10) : low;
            if (!low || !high || low > high) return;
            var unitText = low === high
                ? '$' + (price / low).toFixed(2) + '/portion'
                : '$' + (price / high).toFixed(2) + '–$' + (price / low).toFixed(2) + '/portion';
            var priceNode = Array.prototype.find.call(card.querySelectorAll('*'), function(el) {
                return /\$\d+(?:\.\d{1,2})?/.test(el.textContent || '') && el.children.length === 0;
            }) || card;
            appendInlineBadge(priceNode.parentElement || card, SCRIPT_ID + '-portion-price', unitText);
            card.setAttribute('data-' + SCRIPT_ID + '-portion-priced', 'true');
        });
    }

    function allergenTerms() {
        return String(getSetting('allergenFilter') || '')
            .split(',')
            .map(function(s) { return s.trim().toLowerCase(); })
            .filter(Boolean);
    }

    function applyAllergenFilter(root) {
        var terms = allergenTerms();
        if (!terms.length) return;
        itemCards(root).forEach(function(card) {
            var text = (card.textContent || '').toLowerCase();
            var hit = terms.find(function(term) { return text.indexOf(term) !== -1; });
            if (!hit) return;
            card.setAttribute('data-' + SCRIPT_ID + '-allergen', 'true');
            appendInlineBadge(card, SCRIPT_ID + '-allergen-badge', 'Contains ' + hit);
        });
    }

    function findDeliveryFeeLine() {
        var candidates = document.querySelectorAll('[data-testid], [data-anchor-id], div, span');
        for (var i = 0; i < candidates.length; i++) {
            var el = candidates[i];
            var text = el.textContent || '';
            if (text.length > 180 || !/delivery\s*fee/i.test(text)) continue;
            var fee = parseMoney(text);
            if (fee !== null) return { el: el, fee: fee };
        }
        return null;
    }

    function median(values) {
        if (!values.length) return null;
        var sorted = values.slice().sort(function(a, b) { return a - b; });
        var mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }

    function updateDeliveryFeeInsights() {
        if (!isCheckoutPage()) return;
        var found = findDeliveryFeeLine();
        if (!found) return;
        var samples = getJsonValue('delivery_fee_samples', []);
        var sampleKey = location.pathname + ':' + found.fee.toFixed(2);
        if (_deliveryBaselineLastSample !== sampleKey) {
            samples.push(found.fee);
            samples = samples.slice(-50);
            setJsonValue('delivery_fee_samples', samples);
            _deliveryBaselineLastSample = sampleKey;
        }
        if (samples.length < 5) return;
        var med = median(samples);
        var delta = found.fee - med;
        var label = (delta >= 0 ? '+' : '-') + '$' + Math.abs(delta).toFixed(2) + ' vs median';
        appendInlineBadge(found.el, SCRIPT_ID + '-fee-baseline', label);
    }

    function scanPriceIncreases(root) {
        if (!isStorePage()) return;
        var key = 'price_history_' + getStoreKey();
        var prior = getJsonValue(key, {});
        var next = Object.assign({}, prior);
        itemCards(root).forEach(function(card) {
            var name = itemName(card);
            var price = parseMoney(card.textContent || '');
            if (!name || !price) return;
            var old = prior[name];
            if (typeof old === 'number' && price > old + 0.01) {
                card.setAttribute('data-' + SCRIPT_ID + '-price-increase', 'true');
                appendInlineBadge(card, SCRIPT_ID + '-price-increase', '+$' + (price - old).toFixed(2));
            }
            next[name] = price;
        });
        setJsonValue(key, next);
    }

    function updateLastRestaurant() {
        if (!isStorePage()) return;
        setJsonValue('last_restaurant', {
            name: getStoreName(),
            url: location.href,
            savedAt: Date.now()
        });
    }

    function renderReorderButton() {
        var existing = document.getElementById(SCRIPT_ID + '-reorder-last');
        if (isStorePage() || !/^\/(?:|home|consumer|search)/i.test(location.pathname)) {
            if (existing) existing.remove();
            return;
        }
        var last = getJsonValue('last_restaurant', null);
        if (!last || !last.url) { if (existing) existing.remove(); return; }
        var btn = existing || document.createElement('button');
        btn.id = SCRIPT_ID + '-reorder-last';
        btn.textContent = 'Reorder ' + (last.name || 'last');
        Object.assign(btn.style, {
            position: 'fixed', left: '18px', bottom: '24px', zIndex: '99998',
            border: '1px solid rgba(255, 48, 8, 0.35)', borderRadius: '12px',
            background: 'var(--usage-color-background-elevated-default, #1e1e2e)',
            color: 'var(--usage-color-text-default, #fff)', padding: '10px 14px',
            boxShadow: '0 10px 28px rgba(0,0,0,0.24)', cursor: 'pointer',
            fontSize: '13px', fontWeight: '700',
        });
        btn.onclick = function() { location.href = last.url; };
        if (!existing) document.body.appendChild(btn);
    }

    function updateFeeDropIndicator() {
        if (!isCheckoutPage()) return;
        var found = findDeliveryFeeLine();
        if (!found) return;
        if (_feeDropLast !== null && found.fee < _feeDropLast - 0.01) {
            appendInlineBadge(found.el, SCRIPT_ID + '-fee-drop', 'Dropped $' + (_feeDropLast - found.fee).toFixed(2));
        }
        _feeDropLast = found.fee;
    }

    function orderHistoryCards() {
        var cards = [];
        var candidates = document.querySelectorAll('a[href*="/orders/"], a[href*="/order/"], [data-testid*="Order"], [data-anchor-id*="Order"]');
        candidates.forEach(function(candidate) {
            var card = candidate.closest('article, li') || candidate.parentElement;
            for (var i = 0; card && i < 8 && card !== document.body; i++, card = card.parentElement) {
                var text = (card.textContent || '').replace(/\s+/g, ' ').trim();
                if (text.length >= 30 && text.length <= 1200 && /\$\d+(?:\.\d{1,2})?/.test(text)) {
                    if (cards.indexOf(card) === -1) cards.push(card);
                    break;
                }
            }
        });
        return cards;
    }

    function orderHash(text) {
        var hash = 0;
        for (var i = 0; i < text.length; i++) hash = ((hash << 5) - hash) + text.charCodeAt(i) | 0;
        return 'dom-' + Math.abs(hash).toString(36);
    }

    function extractOrderEntry(card) {
        var text = (card.textContent || '').replace(/\s+/g, ' ').trim();
        if (!text || !/\$\d+(?:\.\d{1,2})?/.test(text)) return null;
        var link = card.querySelector('a[href*="/orders/"], a[href*="/order/"]');
        var date = (text.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(?:,\s*\d{4})?|\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/i) || [])[0] || '';
        var totalMatch = text.match(/(?:total|paid|order)[^$]{0,24}\$(\d+(?:\.\d{1,2})?)/i);
        var money = text.match(/\$(\d+(?:\.\d{1,2})?)/g) || [];
        var total = totalMatch ? parseFloat(totalMatch[1]) : (money.length ? parseFloat(money[money.length - 1].slice(1)) : null);
        var tipMatch = text.match(/(?:tip|gratuity)[^$]{0,20}\$(\d+(?:\.\d{1,2})?)/i);
        var nameNode = card.querySelector('h1, h2, h3, [data-testid*="Restaurant"], [data-testid*="Store"]');
        var restaurant = nameNode ? nameNode.textContent.trim() : (text.split(/\$|\b(?:delivered|cancelled|canceled|scheduled)\b/i)[0] || '').trim();
        restaurant = restaurant.replace(/^(?:order|reorder)\s*[:\-]?\s*/i, '').slice(0, 120);
        var statusMatch = text.match(/\b(delivered|cancelled|canceled|scheduled|in progress|picked up|refunded)\b/i);
        var key = link ? link.href : orderHash(text);
        return {
            id: key,
            restaurant: restaurant || 'Unknown restaurant',
            date: date,
            total: total === null || isNaN(total) ? null : total,
            tip: tipMatch ? parseFloat(tipMatch[1]) : null,
            status: statusMatch ? statusMatch[1] : '',
            url: link ? link.href : '',
            observedAt: Date.now()
        };
    }

    function collectOrderHistory() {
        if (!isOrdersPage()) return;
        var current = getJsonValue('order_history', []);
        var byId = {};
        current.forEach(function(entry) { if (entry && entry.id) byId[entry.id] = entry; });
        orderHistoryCards().forEach(function(card) {
            var entry = extractOrderEntry(card);
            if (!entry) return;
            var previous = byId[entry.id];
            byId[entry.id] = Object.assign({}, previous || {}, entry, { firstSeenAt: previous && previous.firstSeenAt || entry.observedAt });
        });
        var next = Object.keys(byId).map(function(id) { return byId[id]; })
            .sort(function(a, b) { return (b.observedAt || 0) - (a.observedAt || 0); })
            .slice(0, 500);
        if (JSON.stringify(next) !== JSON.stringify(current)) setJsonValue('order_history', next);
    }

    function orderHistoryEntries() {
        return getJsonValue('order_history', []).filter(function(entry) { return entry && entry.id; });
    }

    function csvCell(value) { return '"' + String(value === null || value === undefined ? '' : value).replace(/"/g, '""') + '"'; }

    function downloadText(filename, content, type) {
        var blob = new Blob([content], { type: type || 'text/plain;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
    }

    function exportOrderHistory(format) {
        var entries = orderHistoryEntries();
        if (format === 'json') {
            downloadText('doordash-enhanced-orders.json', JSON.stringify(entries, null, 2), 'application/json;charset=utf-8');
        } else {
            var columns = ['date', 'restaurant', 'total', 'tip', 'status', 'url'];
            var rows = [columns.join(',')].concat(entries.map(function(entry) {
                return columns.map(function(column) { return csvCell(entry[column]); }).join(',');
            }));
            downloadText('doordash-enhanced-orders.csv', rows.join('\n'), 'text/csv;charset=utf-8');
        }
        showToast('Exported ' + entries.length + ' order entr' + (entries.length === 1 ? 'y' : 'ies'));
    }

    function renderOrderHistoryToolbar() {
        var existing = document.getElementById(SCRIPT_ID + '-order-tools');
        if (!isOrdersPage()) { if (existing) existing.remove(); return; }
        var entries = orderHistoryEntries();
        if (!existing) {
            existing = document.createElement('div');
            existing.id = SCRIPT_ID + '-order-tools';
            Object.assign(existing.style, {
                position: 'fixed', right: '18px', bottom: '24px', zIndex: '99998',
                display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap',
                padding: '10px', borderRadius: '12px',
                background: 'var(--usage-color-background-elevated-default, #1e1e2e)',
                color: 'var(--usage-color-text-default, #fff)',
                boxShadow: '0 10px 28px rgba(0,0,0,0.24)',
            });
            var label = document.createElement('span');
            label.id = SCRIPT_ID + '-order-count';
            label.style.cssText = 'font-size:12px;font-weight:700;margin-right:4px';
            existing.appendChild(label);
            [['CSV', 'csv'], ['JSON', 'json'], ['Summary', 'summary']].forEach(function(action) {
                var button = document.createElement('button');
                button.textContent = action[0];
                Object.assign(button.style, {
                    border: '1px solid rgba(255,48,8,0.35)', borderRadius: '7px', padding: '5px 8px',
                    background: 'transparent', color: 'inherit', cursor: 'pointer', fontSize: '11px', fontWeight: '700'
                });
                button.addEventListener('click', function() {
                    if (action[1] === 'summary') showOrderDashboard();
                    else exportOrderHistory(action[1]);
                });
                existing.appendChild(button);
            });
            document.body.appendChild(existing);
        }
        var count = document.getElementById(SCRIPT_ID + '-order-count');
        if (count) count.textContent = entries.length + ' logged';
    }

    function showOrderDashboard() {
        var old = document.getElementById(SCRIPT_ID + '-order-dashboard');
        if (old) { old.remove(); return; }
        var entries = orderHistoryEntries();
        var total = entries.reduce(function(sum, entry) { return sum + (typeof entry.total === 'number' ? entry.total : 0); }, 0);
        var tips = entries.filter(function(entry) { return typeof entry.tip === 'number'; });
        var tipTotal = tips.reduce(function(sum, entry) { return sum + entry.tip; }, 0);
        var restaurants = {};
        entries.forEach(function(entry) { restaurants[entry.restaurant] = (restaurants[entry.restaurant] || 0) + 1; });
        var top = Object.keys(restaurants).sort(function(a, b) { return restaurants[b] - restaurants[a]; }).slice(0, 5);
        var host = document.createElement('div');
        host.id = SCRIPT_ID + '-order-dashboard';
        var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
        var backdrop = document.createElement('div');
        Object.assign(backdrop.style, { position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.55)', zIndex: '100001' });
        var panel = document.createElement('div');
        Object.assign(panel.style, {
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: '100002',
            width: 'min(420px, calc(100vw - 32px))', maxHeight: '80vh', overflowY: 'auto', padding: '22px',
            borderRadius: '16px', background: getSetting('darkMode') ? '#1a1a25' : '#fff',
            color: getSetting('darkMode') ? '#e0e0e8' : '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
        });
        var title = document.createElement('h2');
        title.textContent = 'Order Summary';
        title.style.margin = '0 0 16px';
        panel.appendChild(title);
        [['Orders logged', String(entries.length)], ['Tracked spend', '$' + total.toFixed(2)], ['Tracked tips', '$' + tipTotal.toFixed(2)], ['Average tip', tips.length ? '$' + (tipTotal / tips.length).toFixed(2) : 'No tip data']].forEach(function(row) {
            var line = document.createElement('div');
            line.style.cssText = 'display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(128,128,128,0.22);font-size:13px';
            var label = document.createElement('span'); label.textContent = row[0];
            var value = document.createElement('strong'); value.textContent = row[1];
            line.appendChild(label); line.appendChild(value); panel.appendChild(line);
        });
        var topHeading = document.createElement('h3');
        topHeading.textContent = 'Most frequent restaurants';
        topHeading.style.cssText = 'font-size:13px;margin:18px 0 8px';
        panel.appendChild(topHeading);
        if (!top.length) {
            var empty = document.createElement('div'); empty.textContent = 'No Orders-page entries have been observed yet.'; empty.style.fontSize = '13px'; panel.appendChild(empty);
        } else {
            top.forEach(function(name) {
                var item = document.createElement('div'); item.textContent = name + ' · ' + restaurants[name]; item.style.cssText = 'padding:4px 0;font-size:13px'; panel.appendChild(item);
            });
        }
        var actions = document.createElement('div'); actions.style.cssText = 'display:flex;gap:8px;margin-top:18px';
        [['Export CSV', 'csv'], ['Export JSON', 'json']].forEach(function(action) {
            var button = document.createElement('button'); button.textContent = action[0];
            Object.assign(button.style, { flex: '1', padding: '8px', border: '1px solid rgba(255,48,8,0.4)', borderRadius: '8px', background: 'transparent', color: 'inherit', cursor: 'pointer' });
            button.addEventListener('click', function() { exportOrderHistory(action[1]); }); actions.appendChild(button);
        });
        var close = document.createElement('button'); close.textContent = 'Close';
        Object.assign(close.style, { width: '100%', padding: '8px', marginTop: '8px', border: '0', borderRadius: '8px', background: '#ff3008', color: '#fff', cursor: 'pointer' });
        close.addEventListener('click', function() { host.remove(); });
        actions.appendChild(close); panel.appendChild(actions);
        backdrop.addEventListener('click', function() { host.remove(); });
        root.appendChild(backdrop); root.appendChild(panel); document.body.appendChild(host);
    }

    var _promoRunning = false;
    var _promoRunToken = 0;

    function configuredPromoCodes() {
        return String(getSetting('promoCodes') || '').split(',').map(function(code) { return code.trim(); }).filter(Boolean).slice(0, 20);
    }

    function findPromoInput() {
        return document.querySelector('input[placeholder*="promo" i], input[aria-label*="promo" i], input[name*="promo" i], input[data-testid*="promo" i]');
    }

    function findPromoApplyButton(input) {
        var area = input && (input.closest('form') || input.parentElement);
        var buttons = area ? area.querySelectorAll('button') : document.querySelectorAll('button');
        for (var i = 0; i < buttons.length; i++) {
            if (/(apply|redeem|add|save)/i.test(buttons[i].textContent || '') && !buttons[i].disabled) return buttons[i];
        }
        return null;
    }

    function setPromoInput(input, value) {
        var setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
        if (setter && setter.set) setter.set.call(input, value); else input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function promoStatus(text) {
        var status = document.getElementById(SCRIPT_ID + '-promo-status');
        if (status) status.textContent = text;
    }

    function tryNextPromoCode(codes, index, token) {
        if (token !== _promoRunToken || !_promoRunning) return;
        if (index >= codes.length) {
            _promoRunning = false;
            promoStatus(t('promoNoMatch', 'No code was accepted'));
            renderPromoHelper();
            return;
        }
        var input = findPromoInput();
        if (!input) {
            _promoRunning = false;
            promoStatus(t('promoFieldMissing', 'Promo field is not visible'));
            renderPromoHelper();
            return;
        }
        var code = codes[index];
        promoStatus(t('promoTrying', 'Trying ') + code + ' (' + (index + 1) + '/' + codes.length + ')');
        setPromoInput(input, code);
        var apply = findPromoApplyButton(input);
        if (!apply) {
            _promoRunning = false;
            promoStatus(t('promoApplyMissing', 'Apply button is not visible'));
            renderPromoHelper();
            return;
        }
        apply.click();
        setTimeout(function() {
            if (token !== _promoRunToken || !_promoRunning) return;
            var area = input.closest('form') || input.parentElement || document.body;
            var text = area.textContent || '';
            var rejected = /(invalid|expired|not valid|does not work|doesn't work|unable)/i.test(text);
            var accepted = !rejected && /(applied|discount|saved|free delivery|promo code added)/i.test(text);
            if (accepted) {
                _promoRunning = false;
                promoStatus(t('promoAccepted', 'Accepted ') + code);
                renderPromoHelper();
            } else {
                tryNextPromoCode(codes, index + 1, token);
            }
        }, 900);
    }

    function runPromoCodeTrial() {
        var codes = configuredPromoCodes();
        if (!codes.length) { showToast(t('promoConfigure', 'Add comma-separated codes in Settings first'), true); return; }
        _promoRunning = true;
        _promoRunToken++;
        tryNextPromoCode(codes, 0, _promoRunToken);
        renderPromoHelper();
    }

    function renderPromoHelper() {
        var existing = document.getElementById(SCRIPT_ID + '-promo-helper');
        if (!isCheckoutPage() || !configuredPromoCodes().length) {
            if (existing) existing.remove();
            return;
        }
        if (!existing) {
            existing = document.createElement('div');
            existing.id = SCRIPT_ID + '-promo-helper';
            Object.assign(existing.style, {
                position: 'fixed', left: '18px', bottom: '24px', zIndex: '99998',
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '12px',
                background: 'var(--usage-color-background-elevated-default, #1e1e2e)',
                color: 'var(--usage-color-text-default, #fff)', boxShadow: '0 10px 28px rgba(0,0,0,0.24)',
            });
            var label = document.createElement('span');
            label.textContent = t('promoLabel', 'Local codes');
            label.style.cssText = 'font-size:12px;font-weight:700';
            var status = document.createElement('span');
            status.id = SCRIPT_ID + '-promo-status';
            status.style.cssText = 'font-size:11px;color:#aaa;max-width:180px';
            var button = document.createElement('button');
            button.id = SCRIPT_ID + '-promo-run';
            Object.assign(button.style, { border: '1px solid rgba(255,48,8,0.4)', borderRadius: '7px', padding: '5px 8px', background: 'transparent', color: 'inherit', cursor: 'pointer', fontSize: '11px', fontWeight: '700' });
            button.addEventListener('click', runPromoCodeTrial);
            existing.appendChild(label); existing.appendChild(status); existing.appendChild(button); document.body.appendChild(existing);
        }
        var runButton = document.getElementById(SCRIPT_ID + '-promo-run');
        if (runButton) {
            runButton.disabled = _promoRunning;
            runButton.textContent = _promoRunning ? t('promoTryingButton', 'Trying…') : t('promoTry', 'Try codes');
            runButton.style.opacity = _promoRunning ? '0.55' : '1';
        }
    }

    function pullSettingsSync(showSuccess) {
        var url = String(getSetting('syncUrl') || '').trim();
        if (!url || !/^https:\/\/gist\.githubusercontent\.com\//i.test(url)) return;
        fetch(url, { credentials: 'omit', cache: 'no-store' })
            .then(function(res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.json();
            })
            .then(function(data) {
                Object.keys(data || {}).forEach(function(key) {
                    if (key in DEFAULT_SETTINGS && key !== 'syncUrl') setSetting(key, data[key]);
                });
                if (showSuccess) showToast('Settings synced from Gist');
            })
            .catch(function(err) {
                showToast('Settings sync failed: ' + err.message, true);
            });
    }


    // =====================================================================
    //  SEARCH HISTORY
    // =====================================================================
    function showSearchHistory(inputEl, history) {
        var old = document.getElementById(SCRIPT_ID + '-search-history');
        if (old) old.remove();
        var isDark = getSetting('darkMode');
        var bg = isDark ? '#222230' : '#fff';
        var fg = isDark ? '#e0e0e8' : '#333';
        var hoverBg = isDark ? '#2a2a35' : '#f0f0f0';
        var bdr = isDark ? '#3a3a45' : '#ddd';

        var dropdown = document.createElement('div');
        dropdown.id = SCRIPT_ID + '-search-history';
        Object.assign(dropdown.style, {
            position: 'absolute', top: (inputEl.offsetHeight + 4) + 'px', left: '0', right: '0',
            background: bg, border: '1px solid ' + bdr, borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)', zIndex: '99999', maxHeight: '300px', overflowY: 'auto',
        });
        var title = document.createElement('div');
        title.textContent = 'Recent Searches';
        Object.assign(title.style, { padding: '8px 12px', fontSize: '11px', color: '#888', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' });
        dropdown.appendChild(title);
        history.forEach(function(term) {
            var item = document.createElement('div');
            item.textContent = term;
            Object.assign(item.style, { padding: '8px 12px', cursor: 'pointer', fontSize: '14px', color: fg, transition: 'background 0.15s' });
            item.onmouseenter = function() { item.style.background = hoverBg; };
            item.onmouseleave = function() { item.style.background = 'transparent'; };
            item.onclick = function() { inputEl.value = term; inputEl.dispatchEvent(new Event('input', { bubbles: true })); dropdown.remove(); };
            dropdown.appendChild(item);
        });
        var wrapper = inputEl.closest('[data-testid="SearchInput"]') || inputEl.parentElement;
        if (wrapper) { wrapper.style.position = 'relative'; wrapper.appendChild(dropdown); }
        setTimeout(function() {
            document.addEventListener('click', function handler(e) {
                if (!dropdown.contains(e.target) && e.target !== inputEl) { dropdown.remove(); document.removeEventListener('click', handler); }
            });
        }, 100);
    }


    // =====================================================================
    //  PRICE CALCULATOR
    // =====================================================================
    function updatePriceCalc() {
        var subtotal = 0, itemCount = 0;
        var subtotalEl = document.querySelector('[data-testid="Subtotal"]');
        if (subtotalEl) {
            var m = (subtotalEl.textContent || '').match(/\$(\d+\.?\d*)/);
            if (m) { subtotal = parseFloat(m[1]); itemCount = 1; }
        }
        if (itemCount === 0) {
            document.querySelectorAll('[data-testid="GenericItemCard"]').forEach(function(card) {
                var pm = (card.textContent || '').match(/\$(\d+\.?\d*)/);
                if (pm) { subtotal += parseFloat(pm[1]); itemCount++; }
            });
        }
        var calc = document.getElementById(SCRIPT_ID + '-calc');
        if (itemCount === 0) { if (calc) calc.remove(); return; }

        var sf = subtotal * 0.15, df = 3.99, tx = subtotal * 0.10, total = subtotal + sf + df + tx;
        var isDark = getSetting('darkMode');
        var bgC = isDark ? '#1c1c25' : '#fff', fgC = isDark ? '#e0e0e8' : '#333';
        var bc = isDark ? '#2a2a35' : '#e0e0e0', fb = isDark ? 'rgba(255,80,40,0.08)' : 'rgba(255,80,40,0.05)';
        if (!calc) {
            calc = document.createElement('div');
            calc.id = SCRIPT_ID + '-calc';
            Object.assign(calc.style, {
                position: 'fixed', bottom: '80px', right: '20px', zIndex: '99998',
                background: bgC, borderRadius: '12px', padding: '16px', border: '1px solid ' + bc,
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)', minWidth: '220px', fontSize: '13px', color: fgC,
            });
            document.body.appendChild(calc);
        }
        calc.innerHTML = trustedHTML(
            '<div style="font-weight:700;font-size:14px;margin-bottom:8px">Estimated Total</div>' +
            '<div style="display:flex;justify-content:space-between;padding:4px 0"><span>Subtotal</span><span>$' + subtotal.toFixed(2) + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:4px 0;color:#ff5028;background:' + fb + ';margin:0 -16px;padding:4px 16px"><span>~Service Fee (15%)</span><span>$' + sf.toFixed(2) + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:4px 0;color:#e6a200"><span>~Delivery</span><span>$' + df.toFixed(2) + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:4px 0"><span>~Tax (10%)</span><span>$' + tx.toFixed(2) + '</span></div>' +
            '<div style="height:1px;background:' + bc + ';margin:8px 0"></div>' +
            '<div style="display:flex;justify-content:space-between;padding:4px 0;font-weight:700;font-size:15px"><span>Grand Total</span><span>$' + total.toFixed(2) + '</span></div>' +
            '<div style="font-size:10px;color:#888;margin-top:8px;text-align:center">Estimates only. Actual fees may vary.</div>');
    }


    // =====================================================================
    //  UTILITIES
    // =====================================================================
    function setAttributeIfChanged(element, name, value) {
        if (!element) return false;
        var next = String(value);
        if (element.getAttribute(name) === next) return false;
        element.setAttribute(name, next);
        return true;
    }

    var CSS_BUNDLE_ID = SCRIPT_ID + '-styles';
    function refreshCssBundle() {
        var rules = [];
        features.forEach(function(feature) {
            if (!feature.cssFactory || !settingEnabled(feature) || !featureMatches(feature)) return;
            try { rules.push('/* ' + feature.key + ' */\n' + feature.cssFactory()); }
            catch(e) { console.error('[DD Enhanced] CSS ' + feature.key + ':', e); }
        });
        if (rules.length) injectStyle(CSS_BUNDLE_ID, rules.join('\n\n'));
        else removeStyle(CSS_BUNDLE_ID);
    }

    function injectStyle(id, css) {
        var existing = document.getElementById(id);
        if (existing && existing.textContent === css) return existing;
        removeStyle(id);
        var el = document.createElement('style');
        el.id = id;
        el.textContent = css;
        (document.head || document.documentElement).appendChild(el);
        return el;
    }
    function removeStyle(id) { var el = document.getElementById(id); if (el) el.remove(); }
    function isStorePage() { return /\/store\//.test(location.pathname); }
    function isCheckoutPage() { return /\/checkout/i.test(location.pathname) || !!document.querySelector('[data-testid="LineItems"]'); }
    function isRestaurantListPage() {
        return !isStorePage() && /^(?:\/$|\/home(?:\/|$)|\/consumer(?:\/|$)|\/search(?:\/|$))/i.test(location.pathname);
    }
    function isOrdersPage() { return /\/(?:orders?|order-history)(?:\/|$)/i.test(location.pathname); }
    function isGroupOrderPage() { return /group[\-_ ]?order|group[\-_ ]?ordering/i.test(location.pathname + location.search); }
    function siteVariant() {
        var host = location.hostname.toLowerCase();
        if (host === 'dasher.doordash.com') return 'dasher';
        if (host.endsWith('doordash.ca')) return 'ca';
        if (host.endsWith('doordash.com.au')) return 'au';
        if (host.endsWith('dash.com')) return 'dash';
        return 'us';
    }

    function runIdle(callback, timeout) {
        var cancelled = false;
        var idleId = null;
        var timerId = null;
        var ric = window.requestIdleCallback;
        var invoke = function(deadline) {
            if (cancelled) return;
            try { callback(deadline); } catch(e) { console.error('[DD Enhanced] idle task:', e); }
        };
        if (typeof ric === 'function') {
            idleId = ric.call(window, invoke, { timeout: timeout || 700 });
        } else {
            timerId = setTimeout(function() {
                invoke({ didTimeout: true, timeRemaining: function() { return 0; } });
            }, 80);
        }
        return {
            cancel: function() {
                cancelled = true;
                if (idleId !== null && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId);
                if (timerId !== null) clearTimeout(timerId);
            }
        };
    }

    function scheduleDomWrite(callback, timeout) {
        var cancelled = false;
        var readyHandler = null;
        var idleHandle = null;
        function schedule() {
            if (cancelled) return;
            idleHandle = runIdle(function(deadline) {
                idleHandle = null;
                if (!cancelled) callback(deadline);
            }, timeout);
        }
        if (document.body && document.readyState !== 'loading') {
            schedule();
        } else {
            readyHandler = function() {
                readyHandler = null;
                schedule();
            };
            document.addEventListener('DOMContentLoaded', readyHandler, { once: true });
        }
        return {
            cancel: function() {
                cancelled = true;
                if (readyHandler) document.removeEventListener('DOMContentLoaded', readyHandler);
                if (idleHandle) idleHandle.cancel();
                readyHandler = null;
                idleHandle = null;
            }
        };
    }

    function settingEnabled(feature) {
        var val = getSetting(feature.key);
        return feature.custom ? !!val && val !== 'off' : !!val;
    }

    function featureMatches(feature) {
        try { return !feature.entryMatcher || feature.entryMatcher(); }
        catch(e) { console.error('[DD Enhanced] Matcher ' + feature.key + ':', e); return false; }
    }

    function mountFeature(feature) {
        if (feature._mountHandle) feature._mountHandle.cancel();
        if (feature._mounted) unmountFeature(feature);
        if (!settingEnabled(feature) || !featureMatches(feature)) return;
        var token = (feature._mountToken || 0) + 1;
        feature._mountToken = token;
        var apply = function() {
            feature._mountHandle = null;
            if (feature._mountToken !== token || feature._mounted || !settingEnabled(feature)) return;
            try {
                feature.init();
                feature._mounted = true;
            } catch(e) {
                console.error('[DD Enhanced] Init ' + feature.key + ':', e);
            }
        };
        feature._mountHandle = scheduleDomWrite(apply, 900);
    }

    function unmountFeature(feature) {
        if (feature._mountHandle) feature._mountHandle.cancel();
        feature._mountHandle = null;
        feature._mountToken = (feature._mountToken || 0) + 1;
        try { feature.destroy(); } catch(e) { console.error('[DD Enhanced] Destroy ' + feature.key + ':', e); }
        feature._mounted = false;
    }

    function refreshFeature(feature) {
        unmountFeature(feature);
        mountFeature(feature);
    }

    function closeSettingsPanel() {
        var host = document.getElementById(SCRIPT_ID + '-settings');
        var backdrop = document.getElementById(SCRIPT_ID + '-backdrop');
        if (host) host.remove();
        if (backdrop) backdrop.remove();
    }

    function showToast(message, isError) {
        var toast = document.createElement('div');
        toast.textContent = message;
        Object.assign(toast.style, {
            position: 'fixed', right: '18px', bottom: '24px', zIndex: '100002',
            maxWidth: '320px', padding: '10px 12px', borderRadius: '8px',
            background: isError ? '#3b1616' : '#182818',
            color: isError ? '#ffb4b4' : '#c8f7c5',
            border: '1px solid ' + (isError ? 'rgba(255,80,80,0.38)' : 'rgba(90,200,90,0.38)'),
            boxShadow: '0 10px 28px rgba(0,0,0,0.28)', fontSize: '13px', fontWeight: '600',
        });
        document.body.appendChild(toast);
        setTimeout(function() { toast.remove(); }, 2600);
    }

    function safeObserver(callback) {
        var queue = [];
        var scheduled = false;
        var scheduledHandle = null;
        var disconnected = false;
        function flush() {
            scheduled = false;
            scheduledHandle = null;
            if (disconnected) return;
            var nodes = queue.splice(0, queue.length);
            nodes.forEach(function(node) {
                try { callback(node); } catch(e) { console.error('[DD Enhanced] observer:', e); }
            });
        }
        var obs = new MutationObserver(function(mutations) {
            if (disconnected) return;
            for (var i = 0; i < mutations.length; i++) {
                var added = mutations[i].addedNodes;
                for (var j = 0; j < added.length; j++) {
                    if (added[j].nodeType !== 1) continue;
                    if (queue.indexOf(added[j]) === -1) queue.push(added[j]);
                }
            }
            if (!scheduled && queue.length) {
                scheduled = true;
                scheduledHandle = runIdle(flush);
            }
        });
        var connectHandle = scheduleDomWrite(function() {
            if (!disconnected && document.body) obs.observe(document.body, { childList: true, subtree: true });
        }, 1200);
        var originalDisconnect = obs.disconnect.bind(obs);
        obs.disconnect = function() {
            disconnected = true;
            queue.length = 0;
            if (scheduledHandle) scheduledHandle.cancel();
            if (connectHandle) connectHandle.cancel();
            originalDisconnect();
        };
        return obs;
    }


    // =====================================================================
    //  SPA NAVIGATION
    // =====================================================================
    function setupSPAHandler() {
        var origPush = history.pushState;
        var origReplace = history.replaceState;
        var _navDebounce = null;
        function fireNav() {
            // Debounce to 50ms to avoid double-mount on SPA nav
            if (_navDebounce) clearTimeout(_navDebounce);
            _navDebounce = setTimeout(function() { window.dispatchEvent(new Event('dd-nav')); }, 50);
        }
        history.pushState = function() { origPush.apply(this, arguments); fireNav(); };
        history.replaceState = function() { origReplace.apply(this, arguments); fireNav(); };
        window.addEventListener('popstate', fireNav);
        window.addEventListener('dd-nav', function() {
            _tipApplied = false; // Reset so tip can re-apply on new checkout
            setTimeout(function() {
                scheduleDomWrite(function() {
                    features.forEach(function(f) {
                        if (!settingEnabled(f) || !featureMatches(f)) {
                            if (f._mounted || f._mountHandle) unmountFeature(f);
                            return;
                        }
                        if (!f._mounted && !f._mountHandle) mountFeature(f);
                        if (f.onNavigate) f.onNavigate();
                    });
                    var feeFeature = features.find(function(f) { return f.key === 'feeHighlighter'; });
                    if (feeFeature && settingEnabled(feeFeature)) annotateFees();
                }, 1400);
            }, 500);
        });
    }


    // =====================================================================
    //  HEADER BUTTONS (injected into the top bar next to notifications)
    //
    //  DoorDash header DOM (store/checkout pages):
    //    <header data-testid="Header">
    //      <div class="...">                              <- flex row
    //        <div>  hamburger  </div>
    //        <div>  logo       </div>
    //        ...address / search...
    //        <div>                                         <- bell wrapper
    //          <div data-testid="NotificationBell">
    //            <button data-testid="HeaderNotificationBellIcon">
    //        </div>
    //        <div style="display:inline-flex">             <- cart wrapper
    //          <button data-testid="OrderCartIconButton">
    //        </div>
    //      </div>
    //    </header>
    //
    //  Homepage has NO <header data-testid="Header"> and no bell,
    //  so we fall back to a fixed top-right pill.
    // =====================================================================

    var MOON_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    var GEAR_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>';

    function initHeaderButtons() {
        scheduleDomWrite(placeHeaderButtons, 1200);
        // Re-inject after SPA navigation (React re-renders header)
        window.addEventListener('dd-nav', function() {
            setTimeout(function() { scheduleDomWrite(placeHeaderButtons, 1200); }, 600);
        });
        // Watch for header appearing after initial React render
        safeObserver(function(node) {
            var existing = document.getElementById(SCRIPT_ID + '-hdr-btns');
            if (existing && document.contains(existing)) return;
            if ((node.matches && node.matches('[data-testid="Header"], header')) ||
                (node.querySelector && node.querySelector('[data-testid="Header"], [data-testid="NotificationBell"]'))) {
                placeHeaderButtons();
            }
        });
    }

    function placeHeaderButtons() {
        var existing = document.getElementById(SCRIPT_ID + '-hdr-btns');
        if (existing && document.contains(existing)) return;
        if (existing) existing.remove();

        var container = document.createElement('div');
        container.id = SCRIPT_ID + '-hdr-btns';

        var darkBtn = document.createElement('button');
        darkBtn.title = 'Toggle Dark Mode';
        darkBtn.setAttribute('aria-label', 'Toggle Dark Mode');
        darkBtn.innerHTML = trustedHTML(MOON_SVG);
        darkBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var cur = getSetting('darkMode');
            setSetting('darkMode', !cur);
            var f = features.find(function(feat) { return feat.key === 'darkMode'; });
            if (cur) unmountFeature(f); else mountFeature(f);
        });

        var settingsBtn = document.createElement('button');
        settingsBtn.title = 'DoorDash Enhanced Settings';
        settingsBtn.setAttribute('aria-label', 'DoorDash Enhanced Settings');
        settingsBtn.innerHTML = trustedHTML(GEAR_SVG);
        settingsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSettingsPanel();
        });

        container.appendChild(darkBtn);
        container.appendChild(settingsBtn);

        // Strategy 1: Insert before the NotificationBell wrapper div
        var bellEl = document.querySelector('[data-testid="NotificationBell"]');
        if (bellEl && bellEl.parentElement && bellEl.parentElement.parentElement) {
            bellEl.parentElement.parentElement.insertBefore(container, bellEl.parentElement);
            return;
        }

        // Strategy 2: Insert before the cart button wrapper
        var cartEl = document.querySelector('[data-testid="OrderCartIconButton"]');
        if (cartEl) {
            var cartWrapper = cartEl.closest('div[style*="inline-flex"]') || cartEl.parentElement;
            if (cartWrapper && cartWrapper.parentElement) {
                cartWrapper.parentElement.insertBefore(container, cartWrapper);
                return;
            }
        }

        // Strategy 3: Append to the header row
        var header = document.querySelector('[data-testid="Header"]') || document.querySelector('header');
        if (header) {
            var headerRow = header.querySelector(':scope > div') || header;
            headerRow.appendChild(container);
            return;
        }

        // Strategy 4: Fixed top-right fallback (homepage)
        container.classList.add(SCRIPT_ID + '-fixed-fallback');
        document.body.appendChild(container);
    }


    // =====================================================================
    //  SETTINGS PANEL
    // =====================================================================
    function toggleSettingsPanel() {
        var existing = document.getElementById(SCRIPT_ID + '-settings');
        if (existing) { closeSettingsPanel(); return; }

        var isDark = getSetting('darkMode');
        var bg = isDark ? '#1a1a25' : '#fff';
        var fg = isDark ? '#e0e0e8' : '#333';
        var borderC = isDark ? '#2a2a35' : '#e0e0e0';
        var groupBg = isDark ? '#141420' : '#f8f8f8';
        var rowHov = isDark ? '#222230' : '#f0f0f0';

        var host = document.createElement('div');
        host.id = SCRIPT_ID + '-settings';
        var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;

        var panel = document.createElement('div');
        panel.id = SCRIPT_ID + '-settings-panel';
        Object.assign(panel.style, {
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            background: bg, color: fg, borderRadius: '16px', zIndex: '100000',
            width: '440px', maxHeight: '80vh', overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '1px solid ' + borderC,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        });

        var hdr = document.createElement('div');
        Object.assign(hdr.style, { padding: '20px 24px', borderBottom: '1px solid ' + borderC, display: 'flex', justifyContent: 'space-between', alignItems: 'center' });
        hdr.innerHTML = trustedHTML('<div><div style="font-size:18px;font-weight:700">DoorDash Enhanced</div><div style="font-size:12px;color:#888;margin-top:2px">v' + VERSION + '</div></div>');
        var closeBtn = document.createElement('button');
        Object.assign(closeBtn.style, { background: 'transparent', border: 'none', color: fg, cursor: 'pointer', fontSize: '24px', padding: '4px 8px', lineHeight: '1' });
        closeBtn.textContent = '\u00D7';
        closeBtn.addEventListener('click', closeSettingsPanel);
        hdr.appendChild(closeBtn);
        panel.appendChild(hdr);

        var groups = {};
        features.forEach(function(f) { if (!groups[f.group]) groups[f.group] = []; groups[f.group].push(f); });

        var content = document.createElement('div');
        content.style.padding = '16px 24px';

        Object.keys(groups).forEach(function(groupName) {
            var items = groups[groupName];
            var groupEl = document.createElement('div');
            groupEl.style.marginBottom = '16px';
            var titleEl = document.createElement('div');
            Object.assign(titleEl.style, { fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', marginBottom: '8px' });
            titleEl.textContent = t(groupName, groupName);
            groupEl.appendChild(titleEl);

            var box = document.createElement('div');
            Object.assign(box.style, { background: groupBg, borderRadius: '10px', border: '1px solid ' + borderC, overflow: 'hidden' });

            items.forEach(function(f, idx) {
                var row = document.createElement('div');
                Object.assign(row.style, {
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 14px', cursor: f.custom ? 'default' : 'pointer',
                    borderBottom: idx < items.length - 1 ? '1px solid ' + borderC : 'none',
                    transition: 'background 0.15s',
                });
                if (!f.custom) {
                    row.onmouseenter = function() { row.style.background = rowHov; };
                    row.onmouseleave = function() { row.style.background = 'transparent'; };
                }

                var label = document.createElement('div');
                label.style.flex = '1';
                var featureCopy = localizedFeature(f);
                label.innerHTML = trustedHTML('<div style="font-size:14px;font-weight:500">' + featureCopy[0] + '</div><div style="font-size:11px;color:#888;margin-top:2px">' + featureCopy[1] + '</div>');

                // --- Custom UI for language ---
                if (f.key === 'language') {
                    var languageSel = document.createElement('select');
                    Object.assign(languageSel.style, {
                        background: isDark ? '#222230' : '#f0f0f0', color: fg,
                        border: '1px solid ' + borderC, borderRadius: '8px',
                        padding: '6px 8px', fontSize: '13px', cursor: 'pointer',
                        outline: 'none', flexShrink: '0', marginLeft: '12px',
                    });
                    [['en', 'en'], ['es', 'es'], ['fr', 'fr'], ['ca-en', 'caEn']].forEach(function(option) {
                        var opt = document.createElement('option');
                        opt.value = option[0]; opt.textContent = t(option[1], option[0]);
                        if (option[0] === activeLocale()) opt.selected = true;
                        languageSel.appendChild(opt);
                    });
                    languageSel.addEventListener('change', function() {
                        setSetting('language', languageSel.value);
                        closeSettingsPanel();
                        setTimeout(toggleSettingsPanel, 0);
                    });
                    row.appendChild(label);
                    row.appendChild(languageSel);
                    box.appendChild(row);
                    return;
                }

                // --- Custom UI for tipDefault ---
                if (f.key === 'tipDefault') {
                    var tipVal = getSetting('tipDefault') || 'off';
                    var ctrl = document.createElement('div');
                    ctrl.style.cssText = 'flex-shrink:0;margin-left:12px;display:flex;align-items:center;gap:6px';

                    var sel = document.createElement('select');
                    Object.assign(sel.style, {
                        background: isDark ? '#222230' : '#f0f0f0', color: fg,
                        border: '1px solid ' + borderC, borderRadius: '8px',
                        padding: '6px 8px', fontSize: '13px', cursor: 'pointer',
                        outline: 'none',
                    });
                    var opts = [
                        { val: 'off', text: t('off', 'Off') },
                        { val: 'remember', text: t('rememberLast', 'Remember last') },
                        { val: 'custom', text: t('fixedAmount', 'Fixed amount') },
                    ];
                    opts.forEach(function(o) {
                        var opt = document.createElement('option');
                        opt.value = o.val; opt.textContent = o.text;
                        if (o.val === 'off' && tipVal === 'off') opt.selected = true;
                        if (o.val === 'remember' && tipVal === 'remember') opt.selected = true;
                        if (o.val === 'custom' && tipVal !== 'off' && tipVal !== 'remember') opt.selected = true;
                        sel.appendChild(opt);
                    });

                    var amtWrap = document.createElement('div');
                    amtWrap.style.cssText = 'display:flex;align-items:center;gap:2px';
                    var dollar = document.createElement('span');
                    dollar.textContent = '$';
                    dollar.style.cssText = 'font-size:14px;font-weight:600;color:' + fg;
                    var amtInput = document.createElement('input');
                    Object.assign(amtInput.style, {
                        width: '60px', background: isDark ? '#222230' : '#f0f0f0', color: fg,
                        border: '1px solid ' + borderC, borderRadius: '8px',
                        padding: '6px 8px', fontSize: '13px', outline: 'none',
                    });
                    amtInput.type = 'text'; amtInput.placeholder = t('amountPlaceholder', '0.00');
                    if (tipVal !== 'off' && tipVal !== 'remember') amtInput.value = tipVal;

                    function toggleAmtInput() {
                        var show = sel.value === 'custom';
                        amtWrap.style.display = show ? 'flex' : 'none';
                    }
                    toggleAmtInput();

                    function saveTipSetting() {
                        var v = sel.value;
                        if (v === 'custom') {
                            var amt = amtInput.value.replace(/[^0-9.]/g, '');
                            if (!amt || isNaN(parseFloat(amt))) amt = '0';
                            v = parseFloat(amt).toFixed(2);
                            amtInput.value = v;
                        }
                        setSetting('tipDefault', v);
                        _tipApplied = false;
                        var tipFeature = features.find(function(feat) { return feat.key === 'tipDefault'; });
                        refreshFeature(tipFeature);
                    }

                    sel.addEventListener('change', function() { toggleAmtInput(); saveTipSetting(); });
                    amtInput.addEventListener('change', saveTipSetting);
                    amtInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') saveTipSetting(); });

                    var remembered = GM_getValue(SCRIPT_ID + '_tipLastAmount', null);
                    if (remembered && tipVal === 'remember') {
                        label.querySelector('div:last-child').textContent = featureCopy[1] + ' (' + t('lastTip', 'last: $') + remembered + ')';
                    }

                    amtWrap.appendChild(dollar);
                    amtWrap.appendChild(amtInput);
                    ctrl.appendChild(sel);
                    ctrl.appendChild(amtWrap);
                    row.appendChild(label);
                    row.appendChild(ctrl);
                    box.appendChild(row);
                    return;
                }

                // --- Custom UI for theme picker ---
                if (f.key === 'theme') {
                    var themeVal = getSetting('theme') || 'mocha';
                    var themeSel = document.createElement('select');
                    Object.assign(themeSel.style, {
                        background: isDark ? '#222230' : '#f0f0f0', color: fg,
                        border: '1px solid ' + borderC, borderRadius: '8px',
                        padding: '6px 8px', fontSize: '13px', cursor: 'pointer',
                        outline: 'none', flexShrink: '0', marginLeft: '12px',
                    });
                    [
                        { val: 'mocha', text: 'Mocha (dark)' },
                        { val: 'frappe', text: 'Frappé' },
                        { val: 'macchiato', text: 'Macchiato' },
                        { val: 'latte', text: 'Latte (light)' },
                    ].forEach(function(o) {
                        var opt = document.createElement('option');
                        opt.value = o.val; opt.textContent = o.text;
                        if (o.val === themeVal) opt.selected = true;
                        themeSel.appendChild(opt);
                    });
                    themeSel.addEventListener('change', function() {
                        setSetting('theme', themeSel.value);
                        refreshFeature(f);
                    });
                    row.appendChild(label);
                    row.appendChild(themeSel);
                    box.appendChild(row);
                    return;
                }

                // --- Custom UI for card density ---
                if (f.key === 'cardDensity') {
                    var densityVal = getSetting('cardDensity') || 'comfortable';
                    var densitySel = document.createElement('select');
                    Object.assign(densitySel.style, {
                        background: isDark ? '#222230' : '#f0f0f0', color: fg,
                        border: '1px solid ' + borderC, borderRadius: '8px',
                        padding: '6px 8px', fontSize: '13px', cursor: 'pointer',
                        outline: 'none', flexShrink: '0', marginLeft: '12px',
                    });
                    [
                        { val: 'comfortable', text: t('comfortable', 'Comfortable') },
                        { val: 'compact', text: t('compact', 'Compact') },
                        { val: 'dense', text: t('dense', 'Dense') },
                    ].forEach(function(o) {
                        var opt = document.createElement('option');
                        opt.value = o.val; opt.textContent = o.text;
                        if (o.val === densityVal) opt.selected = true;
                        densitySel.appendChild(opt);
                    });
                    densitySel.addEventListener('change', function() {
                        setSetting('cardDensity', densitySel.value);
                        refreshFeature(f);
                    });
                    row.appendChild(label);
                    row.appendChild(densitySel);
                    box.appendChild(row);
                    return;
                }

                // --- Custom UI for max delivery fee filter ---
                if (f.key === 'maxDeliveryFee') {
                    var feeVal = getSetting('maxDeliveryFee') || 'off';
                    var feeCtrl = document.createElement('div');
                    feeCtrl.style.cssText = 'flex-shrink:0;margin-left:12px;display:flex;align-items:center;gap:8px;min-width:190px';
                    var feeToggle = document.createElement('button');
                    Object.assign(feeToggle.style, {
                        background: 'transparent', color: fg, border: '1px solid ' + borderC,
                        borderRadius: '8px', padding: '6px 8px', fontSize: '12px', cursor: 'pointer',
                    });
                    var feeInput = document.createElement('input');
                    feeInput.type = 'range';
                    feeInput.min = '0';
                    feeInput.max = '15';
                    feeInput.step = '0.50';
                    feeInput.value = feeVal === 'off' ? '5.00' : feeVal;
                    feeInput.style.flex = '1';
                    var feeOut = document.createElement('span');
                    feeOut.style.cssText = 'min-width:46px;text-align:right;font-size:12px;font-weight:700;color:' + fg;
                    function renderFeeSlider() {
                        var off = getSetting('maxDeliveryFee') === 'off';
                        feeInput.disabled = off;
                        feeInput.style.opacity = off ? '0.45' : '1';
                        feeToggle.textContent = off ? t('enable', 'Enable') : t('off', 'Off');
                        feeOut.textContent = off ? t('off', 'Off') : '$' + parseFloat(feeInput.value).toFixed(2);
                    }
                    function saveFeeSetting() {
                        var v = parseFloat(feeInput.value).toFixed(2);
                        setSetting('maxDeliveryFee', v);
                        renderFeeSlider();
                        refreshFeature(f);
                    }
                    feeToggle.addEventListener('click', function() {
                        if (getSetting('maxDeliveryFee') === 'off') saveFeeSetting();
                        else { setSetting('maxDeliveryFee', 'off'); renderFeeSlider(); refreshFeature(f); }
                    });
                    feeInput.addEventListener('input', saveFeeSetting);
                    renderFeeSlider();
                    feeCtrl.appendChild(feeToggle);
                    feeCtrl.appendChild(feeInput);
                    feeCtrl.appendChild(feeOut);
                    row.appendChild(label);
                    row.appendChild(feeCtrl);
                    box.appendChild(row);
                    return;
                }

                // --- Custom UI for allergen filter ---
                if (f.key === 'allergenFilter') {
                    var allergyInput = document.createElement('input');
                    Object.assign(allergyInput.style, {
                        width: '170px', background: isDark ? '#222230' : '#f0f0f0', color: fg,
                        border: '1px solid ' + borderC, borderRadius: '8px',
                        padding: '6px 8px', fontSize: '13px', outline: 'none', marginLeft: '12px',
                    });
                    allergyInput.type = 'text';
                    allergyInput.placeholder = t('allergenPlaceholder', 'peanut, shellfish');
                    allergyInput.value = getSetting('allergenFilter') || '';
                    allergyInput.addEventListener('change', function() {
                        setSetting('allergenFilter', allergyInput.value.trim());
                        refreshFeature(f);
                    });
                    row.appendChild(label);
                    row.appendChild(allergyInput);
                    box.appendChild(row);
                    return;
                }

                // --- Custom UI for local promo codes ---
                if (f.key === 'promoCodes') {
                    var promoInput = document.createElement('input');
                    Object.assign(promoInput.style, {
                        width: '175px', background: isDark ? '#222230' : '#f0f0f0', color: fg,
                        border: '1px solid ' + borderC, borderRadius: '8px',
                        padding: '6px 8px', fontSize: '13px', outline: 'none', marginLeft: '12px',
                    });
                    promoInput.type = 'text';
                    promoInput.placeholder = t('promoPlaceholder', 'SAVE10, WELCOME');
                    promoInput.value = getSetting('promoCodes') || '';
                    promoInput.addEventListener('change', function() {
                        setSetting('promoCodes', promoInput.value.trim());
                        refreshFeature(f);
                    });
                    row.appendChild(label);
                    row.appendChild(promoInput);
                    box.appendChild(row);
                    return;
                }

                // --- Custom UI for settings sync URL ---
                if (f.key === 'syncUrl') {
                    var syncCtrl = document.createElement('div');
                    syncCtrl.style.cssText = 'flex-shrink:0;margin-left:12px;display:flex;align-items:center;gap:6px';
                    var syncInput = document.createElement('input');
                    Object.assign(syncInput.style, {
                        width: '170px', background: isDark ? '#222230' : '#f0f0f0', color: fg,
                        border: '1px solid ' + borderC, borderRadius: '8px',
                        padding: '6px 8px', fontSize: '13px', outline: 'none',
                    });
                    syncInput.type = 'url';
                    syncInput.placeholder = t('rawGistUrl', 'raw Gist URL');
                    syncInput.value = getSetting('syncUrl') || '';
                    var syncBtn = document.createElement('button');
                    Object.assign(syncBtn.style, {
                        background: 'transparent', color: fg, border: '1px solid ' + borderC,
                        borderRadius: '8px', padding: '6px 8px', fontSize: '12px', cursor: 'pointer',
                    });
                    syncBtn.textContent = t('pull', 'Pull');
                    syncInput.addEventListener('change', function() {
                        setSetting('syncUrl', syncInput.value.trim());
                        refreshFeature(f);
                    });
                    syncBtn.addEventListener('click', function() {
                        setSetting('syncUrl', syncInput.value.trim());
                        pullSettingsSync(true);
                    });
                    syncCtrl.appendChild(syncInput);
                    syncCtrl.appendChild(syncBtn);
                    row.appendChild(label);
                    row.appendChild(syncCtrl);
                    box.appendChild(row);
                    return;
                }

                // --- Standard boolean toggle ---
                var toggle = document.createElement('div');
                toggle.style.cssText = 'flex-shrink:0;margin-left:12px';
                function renderToggle(on) {
                    toggle.innerHTML = trustedHTML('<div style="width:44px;height:24px;border-radius:12px;background:' + (on ? '#ff3008' : '#555') + ';position:relative;transition:background 0.2s">' +
                        '<div style="width:20px;height:20px;border-radius:50%;background:#fff;position:absolute;top:2px;left:' + (on ? '22px' : '2px') + ';transition:left 0.2s;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></div></div>');
                }
                renderToggle(getSetting(f.key));
                row.addEventListener('click', function() {
                    var cur = getSetting(f.key);
                    setSetting(f.key, !cur);
                    renderToggle(!cur);
                    refreshFeature(f);
                });
                row.appendChild(label);
                row.appendChild(toggle);
                box.appendChild(row);
            });
            groupEl.appendChild(box);
            content.appendChild(groupEl);
        });

        // --- Export / Import Buttons ---
        var eiWrap = document.createElement('div');
        eiWrap.style.cssText = 'display:flex;gap:8px;margin:8px 0;flex-wrap:wrap';

        var exportBtn = document.createElement('button');
        Object.assign(exportBtn.style, {
            flex: '1', padding: '10px', background: 'transparent',
            border: '1px solid ' + borderC, borderRadius: '8px',
            color: fg, cursor: 'pointer', fontSize: '13px', fontWeight: '500',
        });
        exportBtn.textContent = t('exportSettings', 'Export Settings');
        exportBtn.addEventListener('click', function() {
            var data = {};
            features.forEach(function(f) { data[f.key] = getSetting(f.key); });
            var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'doordash-enhanced-settings.json';
            a.click();
            URL.revokeObjectURL(a.href);
        });

        var importBtn = document.createElement('button');
        Object.assign(importBtn.style, {
            flex: '1', padding: '10px', background: 'transparent',
            border: '1px solid ' + borderC, borderRadius: '8px',
            color: fg, cursor: 'pointer', fontSize: '13px', fontWeight: '500',
        });
        importBtn.textContent = t('importSettings', 'Import Settings');
        importBtn.addEventListener('click', function() {
            var input = document.createElement('input');
            input.type = 'file'; input.accept = '.json';
            input.addEventListener('change', function() {
                if (!input.files.length) return;
                var reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        var data = JSON.parse(e.target.result);
                        features.forEach(function(f) { unmountFeature(f); });
                        Object.keys(data).forEach(function(key) {
                            if (key in DEFAULT_SETTINGS) setSetting(key, data[key]);
                        });
                        closeSettingsPanel();
                        location.reload();
                    } catch(err) {
                        showToast(t('invalidSettings', 'Invalid settings file: ') + err.message, true);
                    }
                };
                reader.readAsText(input.files[0]);
            });
            input.click();
        });

        var summaryBtn = document.createElement('button');
        Object.assign(summaryBtn.style, {
            flex: '1', minWidth: '120px', padding: '10px', background: 'transparent',
            border: '1px solid ' + borderC, borderRadius: '8px',
            color: fg, cursor: 'pointer', fontSize: '13px', fontWeight: '500',
        });
        summaryBtn.textContent = t('orderSummary', 'Order Summary');
        summaryBtn.addEventListener('click', showOrderDashboard);

        eiWrap.appendChild(exportBtn);
        eiWrap.appendChild(importBtn);
        eiWrap.appendChild(summaryBtn);
        content.appendChild(eiWrap);

        var resetBtn = document.createElement('button');
        Object.assign(resetBtn.style, {
            width: '100%', padding: '10px', background: 'transparent',
            border: '1px solid ' + borderC, borderRadius: '8px',
            color: '#ff3008', cursor: 'pointer', fontSize: '13px', fontWeight: '500', margin: '8px 0',
        });
        resetBtn.textContent = t('resetSettings', 'Reset All Settings');
        resetBtn.addEventListener('click', function() {
            features.forEach(function(f) { unmountFeature(f); setSetting(f.key, DEFAULT_SETTINGS[f.key]); });
            closeSettingsPanel();
            showToast('Settings reset');
            location.reload();
        });
        content.appendChild(resetBtn);
        panel.appendChild(content);

        var backdrop = document.createElement('div');
        Object.assign(backdrop.style, { position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.5)', zIndex: '99999' });
        backdrop.id = SCRIPT_ID + '-backdrop';
        backdrop.addEventListener('click', closeSettingsPanel);
        document.body.appendChild(backdrop);
        root.appendChild(panel);
        document.body.appendChild(host);
    }


    // =====================================================================
    //  INIT
    // =====================================================================
    function init() {
        setupSPAHandler();
        scheduleDomWrite(function() {
        setAttributeIfChanged(document.documentElement, 'data-' + SCRIPT_ID + '-site', siteVariant());
        injectStyle(SCRIPT_ID + '-core', [
            '/* Custom overrides */',
            '.' + SCRIPT_ID + '-allergen-badge, .' + SCRIPT_ID + '-unit-price, .' + SCRIPT_ID + '-portion-price, .' + SCRIPT_ID + '-price-increase, .' + SCRIPT_ID + '-fee-baseline, .' + SCRIPT_ID + '-fee-drop {',
            '  display: inline-flex;',
            '  align-items: center;',
            '  margin-left: 6px;',
            '  padding: 2px 6px;',
            '  border-radius: 6px;',
            '  font-size: 10px;',
            '  font-weight: 700;',
            '  line-height: 1.2;',
            '}',
            '.' + SCRIPT_ID + '-allergen-badge { background: rgba(255, 80, 40, 0.14); color: #ff5028; border: 1px solid rgba(255, 80, 40, 0.28); }',
            '.' + SCRIPT_ID + '-unit-price { background: rgba(30, 136, 229, 0.14); color: #4aa3ff; border: 1px solid rgba(30, 136, 229, 0.28); }',
            '.' + SCRIPT_ID + '-portion-price { background: rgba(166, 120, 220, 0.16); color: #b98cff; border: 1px solid rgba(166, 120, 220, 0.32); }',
            '.' + SCRIPT_ID + '-price-increase { background: rgba(255, 80, 40, 0.16); color: #ff5028; border: 1px solid rgba(255, 80, 40, 0.32); }',
            '.' + SCRIPT_ID + '-fee-baseline { background: rgba(137, 180, 250, 0.16); color: #89b4fa; border: 1px solid rgba(137, 180, 250, 0.32); }',
            '.' + SCRIPT_ID + '-fee-drop { background: rgba(166, 227, 161, 0.16); color: #5ac85a; border: 1px solid rgba(166, 227, 161, 0.32); }',
            '[data-' + SCRIPT_ID + '-price-increase="true"] {',
            '  outline: 1px solid rgba(255, 80, 40, 0.32) !important;',
            '  outline-offset: 2px !important;',
            '}',
            'div.StyledStackChildren-sc-yj3wxb-0.jNPkjN.sc-afac318a-0.dhGsxO {',
            '  background-color: transparent !important;',
            '}',
            'div.StyledInlineChildren-sc-1dbwnk9-0.bApFGz {',
            '  color: #ffffff !important;',
            '}',
            '/* Sidebar icon slots - blue accent */',
            '.lbSHmf.IconSlot-sc-194ujhf-0 {',
            '  background-color: #1e88e5 !important;',
            '  border-radius: 8px;',
            '}',
            '/* Sidebar nav flex containers - blue accent */',
            'div.StyledInlineChildren-sc-1dbwnk9-0.gDVtOg.Flex-sc-194ujhf-3.fCagsf {',
            '  background-color: #1e88e5 !important;',
            '  border-radius: 10px;',
            '}',
            '/* Hide misc promo element */',
            'div.sc-b24365ad-0.jWrhwp {',
            '  display: none !important;',
            '}',
            '/* Hide ALL CMS promotional banners */',
            '[class*="sc-34f18914-0"],',
            '[class*="sc-34f18914-1"],',
            '[class*="sc-34f18914-2"],',
            '[class*="sc-34f18914-4"],',
            '[class*="sc-34f18914-5"] {',
            '  display: none !important;',
            '}',
            '/* Hide carousel pagination dots */',
            'div.Root-sc-nmoa4y-4.cAkoGG {',
            '  display: none !important;',
            '}',
            '#' + SCRIPT_ID + '-hdr-btns {',
            '  display: inline-flex; align-items: center; gap: 2px;',
            '}',
            '#' + SCRIPT_ID + '-hdr-btns button {',
            '  width: 36px; height: 36px; border: none; border-radius: 50%;',
            '  background: transparent; color: var(--usage-color-icon-default, #191919);',
            '  cursor: pointer; display: flex; align-items: center; justify-content: center;',
            '  transition: background 0.15s; padding: 0;',
            '}',
            '#' + SCRIPT_ID + '-hdr-btns button:hover {',
            '  background: var(--usage-color-background-hovered, rgba(0,0,0,0.06));',
            '}',
            '#' + SCRIPT_ID + '-hdr-btns.' + SCRIPT_ID + '-fixed-fallback {',
            '  position: fixed; top: 12px; right: 16px; z-index: 99999;',
            '  background: var(--usage-color-background-elevated-default, #fff);',
            '  border-radius: 20px; padding: 2px 4px;',
            '  box-shadow: 0 2px 8px rgba(0,0,0,0.15);',
            '  border: 1px solid var(--usage-color-border-default, #e4e4e4);',
            '}',
        ].join('\n'));

        features.forEach(function(f) { mountFeature(f); });
        initHeaderButtons();
        }, 1400);

        GM_registerMenuCommand('Open Settings', toggleSettingsPanel);
        registerFeatureMenuCommands();
        GM_registerMenuCommand('Focus Search', function() {
            var el = document.querySelector('[data-anchor-id="HeaderSearchInputField"]');
            if (el) el.focus();
        });
        GM_registerMenuCommand('Open Cart', function() {
            var el = document.querySelector('[data-testid="OrderCartIconButton"], a[href*="/cart"]');
            if (el) el.click();
        });
        GM_registerMenuCommand('Go to Home', function() { window.location.href = '/home'; });
        GM_registerMenuCommand('Go to Orders', function() { window.location.href = '/orders'; });

        console.log('[DoorDash Enhanced] v' + VERSION + ' loaded. Click the gear icon or use Tampermonkey menu for settings.');
    }

    function registerFeatureMenuCommands() {
        features.forEach(function(feature) {
            if (feature.custom) return;
            GM_registerMenuCommand('Toggle ' + localizedFeature(feature)[0], function() {
                var current = !!getSetting(feature.key);
                setSetting(feature.key, !current);
                if (current) unmountFeature(feature); else mountFeature(feature);
            });
        });
    }

    init();

})();

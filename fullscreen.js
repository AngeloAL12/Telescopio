document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de pantalla completa inicializado');

    let ggbApp = new GGBApplet({
        "filename": "telescopio.ggb",
        "showToolbar": false,
        "showAlgebraInput": false,
        "showMenuBar": false,
        "errorDialogsActive": true,
        "useBrowserForJS": true
    }, true);

    const ggbElement = document.getElementById('ggb-element');
    const backBtn = document.getElementById('back-btn');

    if (ggbElement) {
        ggbApp.inject('ggb-element');
    } else {
        console.error('Elemento ggb-element no encontrado');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script inicializado');

    let ggbApp = new GGBApplet({
        "filename": "telescopio.ggb",
        "showToolbar": false,
        "showAlgebraInput": false,
        "showMenuBar": false,
        "errorDialogsActive": true,
        "useBrowserForJS": true
    }, true);

    let valorM = 0;
    let valorF = 0;
    let valorS = 0;

    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const ggbElement = document.getElementById('ggb-element');
    const listObjectsBtn = document.getElementById('list-objects-btn');

    if (ggbElement) {
        ggbApp.inject('ggb-element');
    } else {
        console.error('Elemento ggb-element no encontrado');
    }

    if (listObjectsBtn) {
        listObjectsBtn.addEventListener("click", function() {
            const applet = ggbApp.getAppletObject();
            if (applet) {
                var objectNames = applet.getAllObjectNames();
                console.log(objectNames);
            } else {
                console.error('Applet no inicializado');
            }
        });
    }
});
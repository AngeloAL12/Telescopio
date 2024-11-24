let ggbApp = new GGBApplet({
    "filename": "telescopio.ggb", // Ruta a tu archivo .ggb
    "width": 600,
    "height": 300,
    "showToolbar": false,
    "showAlgebraInput": false,
    "showMenuBar": false
}, true);

let valorM = 0;
let valorF = 0;
let valorS = 0;

window.addEventListener("load", function() {
    ggbApp.inject('ggb-element');
});

// Listar todos los objetos disponibles en el applet de GeoGebra
document.getElementById("list-objects-btn").addEventListener("click", function() {
    var objectNames = ggbApp.getAppletObject().getAllObjectNames();
    console.log(objectNames);
});

function manipularDeslizadorM() {
    // Establecer el valor inicial del deslizador
    ggbApplet.setValue("m", valorM);
    console.log(`Valor inicial de m: ${ggbApplet.getValue("m")}`);
    
    // Cambiar los límites del deslizador
    ggbApplet.setInterval("m", -0.2, 0.2);
    
    // Habilitar y comenzar la animación
    ggbApplet.setAnimating("m", true);
    ggbApplet.setAnimationSpeed("m", 1); // Velocidad normal
    ggbApplet.startAnimation();

    // Detener la animación después de 5 segundos
    setTimeout(() => {
        ggbApplet.stopAnimation();
        valorM = ggbApplet.getValue("m");
        console.log(`Animación detenida. Valor final de m: ${valorM}`);
    }, 5000);
}

function manipularDeslizadorF() {
    // Establecer el valor inicial del deslizador
    ggbApplet.setValue("f", valorF);
    console.log(`Valor inicial de f: ${ggbApplet.getValue("f")}`);
    
    // Cambiar los límites del deslizador
    ggbApplet.setInterval("f", 0, 10);
    
    // Habilitar y comenzar la animación
    ggbApplet.setAnimating("f", true);
    ggbApplet.setAnimationSpeed("f", 1); // Velocidad normal
    ggbApplet.startAnimation();

    // Detener la animación después de 5 segundos
    setTimeout(() => {
        ggbApplet.stopAnimation();
        valorF = ggbApplet.getValue("f");
        console.log(`Animación de f detenida. Valor final de f: ${valorF}`);
    }, 5000);
}

function manipularDeslizadorS() {
    // Establecer el valor inicial del deslizador
    ggbApplet.setValue("s", valorS);
    console.log(`Valor inicial de s: ${ggbApplet.getValue("s")}`);
    
    // Cambiar los límites del deslizador
    ggbApplet.setInterval("s", 0, 8);
    
    // Habilitar y comenzar la animación
    ggbApplet.setAnimating("s", true);
    ggbApplet.setAnimationSpeed("s", 1); // Velocidad normal
    ggbApplet.startAnimation();

    // Detener la animación después de 5 segundos
    setTimeout(() => {
        ggbApplet.stopAnimation();
        valorS = ggbApplet.getValue("s");
        console.log(`Animación de s detenida. Valor final de s: ${valorS}`);
    }, 5000);
}
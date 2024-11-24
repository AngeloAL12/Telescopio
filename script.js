const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();

let offsetX = 0;
let offsetY = 0;
let targetX = 0; // Objetivo de la posición X
let targetY = 0; // Objetivo de la posición Y
let isDragging = false;
let smoothness = 0.1; // Cuánto se acerca la imagen a la nueva posición en cada frame

// Cargar imagen inicial
img.src = "img/Luna.png"; // Cambiar a PNG
img.onload = () => {
  drawImage();
};

function drawImage() {
    const apparentField = parseFloat(
        document.getElementById("apparentField").value
    );
    const baseSize = 500; // Tamaño base del canvas
    canvas.width = baseSize * (apparentField / 70);
    canvas.height = baseSize * (apparentField / 70);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const focalTelescope = parseFloat(
        document.getElementById("focalTelescope").value
    );
    const focalEyepiece = parseFloat(
        document.getElementById("focalEyepiece").value
    );
    const barlow = parseFloat(document.getElementById("barlow").value);
    const curvatureRadius = parseFloat(
        document.getElementById("curvatureRadius").value
    );

    // Calcular la distancia focal usando el radio de curvatura
    const focalLength = curvatureRadius / 2;

    const magnification = (focalTelescope / focalLength) * barlow; // Usar la distancia focal calculada
    const trueField = apparentField / magnification;

    const maxRadius = canvas.width / 2;
    const radius = maxRadius * (apparentField / 100);

    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.clip();

    // Escalado de la imagen según el aumento
    const scaleFactor =
        Math.max(canvas.width / img.width, canvas.height / img.height) *
        (magnification / 100);
    const width = img.width * scaleFactor;
    const height = img.height * scaleFactor;

    // Dibujar la imagen sin fondo y permitir el movimiento libre
    ctx.drawImage(
        img,
        (canvas.width - width) / 2 + offsetX,
        (canvas.height - height) / 2 + offsetY,
        width,
        height
    );

    ctx.restore();

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.font = "16px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText(`Aumento: ${magnification.toFixed(1)}x`, 10, 20);
    ctx.fillText(`Campo Real: ${trueField.toFixed(2)}°`, 10, 40);

    if (isDragging) {
        // Sin restricciones de límites en el movimiento
        offsetX += (targetX - offsetX) * smoothness;
        offsetY += (targetY - offsetY) * smoothness;
    }
    requestAnimationFrame(drawImage); // Animación continua para suavizar el movimiento
    }

    function updateImage() {
    const planet = document.getElementById("planet").value;
    img.src = `img/${planet}`; // Cambiar la imagen dependiendo de la selección
    img.onload = () => {
        drawImage();
    };
    }

    // Función para iniciar el arrastre
    canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    targetX = mouseX - canvas.width / 2;
    targetY = mouseY - canvas.height / 2;
    });

    // Función para mover la imagen
    canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
        targetX = e.offsetX - canvas.width / 2;
        targetY = e.offsetY - canvas.height / 2;
    }
    });

    // Función para detener el arrastre
    canvas.addEventListener("mouseup", () => {
    isDragging = false;
    });

    // Función para detener el arrastre si se sale del área del canvas
    canvas.addEventListener("mouseleave", () => {
    isDragging = false;
    });

    // Actualización de la imagen cuando se cambia la selección
    document.getElementById("planet").addEventListener("change", updateImage);
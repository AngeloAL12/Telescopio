const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();

let offsetX = 0;
let offsetY = 0;
let targetX = 0;
let targetY = 0;
let isDragging = false;
let smoothness = 0.1;

img.src = "img/Luna.png";
img.onload = () => {
  drawImage();
};

function drawImage() {
    // Validación de entradas
    const apparentField = parseFloat(document.getElementById("apparentField").value);
    const focalTelescope = parseFloat(document.getElementById("focalTelescope").value);
    const focalEyepiece = parseFloat(document.getElementById("focalEyepiece").value);
    const barlow = parseFloat(document.getElementById("barlow").value);
    const curvatureRadius = parseFloat(document.getElementById("curvatureRadius").value);

    const baseSize = 500;
    canvas.width = baseSize * (apparentField / 70);
    canvas.height = baseSize * (apparentField / 70);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cálculos de óptica
    const focalLength = curvatureRadius / 2;
    const magnification = (focalTelescope / focalLength) * barlow;
    const trueField = apparentField / magnification;

    const maxRadius = canvas.width / 2;
    const radius = maxRadius * (apparentField / 100);

    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.clip();

    // Escalado de la imagen
    const scaleFactor =
        Math.max(canvas.width / img.width, canvas.height / img.height) * (magnification / 100);
    const width = img.width * scaleFactor;
    const height = img.height * scaleFactor;

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
        offsetX += (targetX - offsetX) * smoothness;
        offsetY += (targetY - offsetY) * smoothness;
        requestAnimationFrame(drawImage); // Animar solo durante el arrastre
    }
}

// Actualizar la imagen cuando cambian los valores
const inputs = document.querySelectorAll("#controls input, #controls select");
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        drawImage();
    });
});

// Eventos de arrastre
canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    targetX = mouseX - canvas.width / 2;
    targetY = mouseY - canvas.height / 2;
    drawImage();
});

canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
        targetX = e.offsetX - canvas.width / 2;
        targetY = e.offsetY - canvas.height / 2;
        drawImage();
    }
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
});

canvas.addEventListener("mouseleave", () => {
    isDragging = false;
});

// Actualizar la imagen cuando se cambia la selección
function updateImage() {
    const planet = document.getElementById("planet").value;
    img.src = `img/${planet}`;
    img.onload = () => {
        drawImage();
    };
}
document.getElementById("planet").addEventListener("change", updateImage);
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("wheelCanvas");
    const context = canvas.getContext("2d");
    const spinButton = document.getElementById("spinButton");

    const segments = ["Prix 1", "Prix 2", "Prix 3", "Prix 4", "Prix 5", "Prix 6"];
    const colors = ["#FF0000", "#FF8000", "#FFFF00", "#80FF00", "#00FF00", "#00FF80"];
    let startAngle = 0;
    let arc = Math.PI / (segments.length / 2);
    let spinTimeout = null;

    function drawRouletteWheel() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "#000000";
        context.lineWidth = 2;

        for (let i = 0; i < segments.length; i++) {
            let angle = startAngle + i * arc;
            context.fillStyle = colors[i];
            context.beginPath();
            context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, angle, angle + arc, false);
            context.lineTo(canvas.width / 2, canvas.height / 2);
            context.fill();
            context.stroke();
            context.save();
            context.translate(canvas.width / 2 + Math.cos(angle + arc / 2) * (canvas.width / 2 - 50), canvas.height / 2 + Math.sin(angle + arc / 2) * (canvas.height / 2 - 50));
            context.rotate(angle + arc / 2 + Math.PI / 2);
            context.fillStyle = "#000000";
            context.fillText(segments[i], -context.measureText(segments[i]).width / 2, 0);
            context.restore();
        }
    }

    function rotateWheel() {
        startAngle += 30 * Math.PI / 180;
        drawRouletteWheel();
        spinTimeout = requestAnimationFrame(rotateWheel);
    }

    function stopRotateWheel() {
        cancelAnimationFrame(spinTimeout);
        spinTimeout = null;
    }

    spinButton.addEventListener("click", function() {
        if (spinTimeout === null) {
            rotateWheel();
            setTimeout(stopRotateWheel, 3000);
        }
    });

    drawRouletteWheel();
});
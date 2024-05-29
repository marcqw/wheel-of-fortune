document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("wheelCanvas");
    const context = canvas.getContext("2d");
    const spinButton = document.getElementById("spinButton");
    const resultDiv = document.getElementById("result");

    const segments = ["Prix 1", "Prix 2", "Prix 3", "Prix 4", "Prix 5", "Prix 6"];
    const colors = ["#FF0000", "#FF8000", "#FFFF00", "#80FF00", "#00FF00", "#00FF80"];
    let startAngle = 0;
    const arc = Math.PI / (segments.length / 2);
    let spinTimeout = null;
    let spinAngleStart = 0;
    let spinTime = 0;
    let spinTimeTotal = 0;

    function drawRouletteWheel() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "#000000";
        context.lineWidth = 2;

        for (let i = 0; i < segments.length; i++) {
            const angle = startAngle + i * arc;
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
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
            stopRotateWheel();
            return;
        }
        const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        startAngle += (spinAngle * Math.PI / 180);
        drawRouletteWheel();
        spinTimeout = requestAnimationFrame(rotateWheel);
    }

    function stopRotateWheel() {
        cancelAnimationFrame(spinTimeout);
        spinTimeout = null;
        const degrees = startAngle * 180 / Math.PI + 90;
        const arcd = arc * 180 / Math.PI;
        const index = Math.floor((360 - degrees % 360) / arcd);
        resultDiv.innerText = "Résultat: " + segments[index];
    }

    function easeOut(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    }

    spinButton.addEventListener("click", function() {
        if (spinTimeout === null) {
            spinAngleStart = Math.random() * 10 + 10;
            spinTime = 0;
            spinTimeTotal = Math.random() * 3000 + 4000;
            rotateWheel();
        }
    });

    drawRouletteWheel();
});
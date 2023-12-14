window.onload = () => {
    const CANVAS = document.getElementsByTagName("canvas")[0];
    const CTX = CANVAS.getContext("2d");

    
    CTX.beginPath();
    CTX.fillStyle = "#0000ff";
    CTX.font = "30" + "px monospace";
    // CTX.fillText(".", 300, 300);
    // CTX.fillText(".", 303, 303);
    // CTX.fillText(".", 297, 297);
    // CTX.fillText(".", 297, 303);
    // CTX.fillText(".", 303, 297);
    // CTX.font = "40" + "px monospace";
    // CTX.fillText("*", 320, 297);

    
    CTX.fill();
    CTX.closePath();
}
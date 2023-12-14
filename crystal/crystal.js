
window.onload = () => {
  const TATTU = document.getElementById("tattu");
  const CANVAS = document.getElementById("canvas");
  const CTX = CANVAS.getContext("2d");

  //crystal ball
  const CHARS = [];
  const MAX_CHARS = 600;
  const SEPARATION = 0.5;
  
  let ww, wh, camera;

  class Vector {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    rotate(dir, ang) {
      const X = this.x;
      const Y = this.y;
      const Z = this.z;

      const SIN = Math.sin(ang);
      const COS = Math.cos(ang);

      if (dir === "x") {
        this.y = Y * COS - Z * SIN;
        this.z = Y * SIN + Z * COS;
      } else if (dir === "y") {
        this.x = X * COS - Z * SIN;
        this.z = X * SIN + Z * COS;
      }
    }

    project() {
      const ZP = this.z + camera.z;
      const DIV = ZP / wh;
      const XP = (this.x + camera.x) / DIV;
      const YP = (this.y + camera.y) / DIV;
      const CENTER = getCenter();
      return [XP + CENTER[0], YP + CENTER[1], ZP];
    }
  }
  
  class Char {
    constructor(letter, pos) {
      this.letter = letter;
      this.pos = pos;
      this.start = Math.random() * 1000;
    }

    rotate(dir, ang) {
      this.pos.rotate(dir, ang);
    }

    render() {
      const PIXEL = this.pos.project();
      const XP = PIXEL[0];
      const YP = PIXEL[1];
      const MAX_SIZE = 25;
      const SIZE = (1 / PIXEL[2] * MAX_SIZE) | 0;
      const BRIGHTNESS = SIZE / MAX_SIZE;
      const COL = `rgba(255, 255, ${255 * BRIGHTNESS | 0 + 150}, ${BRIGHTNESS * BRIGHTNESS})`;
      // const radius = Math.min(ww/2, wh/2) * 0.8;
      // const distX = (XP - (ww/2)) / (radius*2);
      // const distY = (YP - (wh/2)) / (radius*2);
      //console.log(distX, distY, this.pos)
      const skewX = this.pos.x*this.pos.x*this.pos.x;
      const skewY = this.pos.y*this.pos.y*this.pos.y;

      CTX.save();
      CTX.transform(1, skewX, skewY, 1, skewX, skewY);
      CTX.beginPath();
      let anim = ((time + this.start) % 1000) / 500;
      anim = anim > 1 ? 2 - anim : anim;
      //anim = anim === 0 ? 0 : Math.pow(2, 10 * anim - 10);
      anim = anim * anim * anim;
      let starGradient = CTX.createRadialGradient(XP, YP, 0, XP , YP, SIZE * anim);
      starGradient.addColorStop(0, COL);
      starGradient.addColorStop(1, `hsla(360, 100%, 100%, 0)`);
      CTX.fillStyle = starGradient;
      CTX.arc(XP, YP, SIZE, 0, 2 * Math.PI);
      CTX.fill();
      //star
      CTX.beginPath();
      CTX.fillStyle = COL;
      //CTX.font = SIZE + "px monospace";
      //CTX.fillText(this.letter, XP, YP);
      drawStar(CTX, XP, YP, SIZE/3 * anim, this.start + time%1000 / 1000);
      //CTX.fill();
      //restore transform
      CTX.restore();
    }
  }

  function drawStar(ctx, x, y, r, a) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.rotate((Math.PI * 2) * a);
    ctx.moveTo(r, 0);
    for (let i = 0; i < 9; i++) {
      ctx.rotate(Math.PI / 5);
      if (i % 2 === 0) {
        ctx.lineTo((r / 0.525731) * 0.200811, 0);
      } else {
        ctx.lineTo(r, 0);
      }
    }
    ctx.rotate(2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  
  function getCenter() {
    return [ww / 2, wh / 2];
  }

  function signedRandom() {
    return Math.random() - Math.random();
  }

  function render() {
    for (let i = 0; i < CHARS.length; i++) {
      CHARS[i].render();
    }
  }
  
  let time = 0;
  function update() {
    CTX.clearRect(0, 0, ww, wh);
    const center = getCenter();
    const centerX = center[0]; //ww / 2;
    const centerY = center[1]; //wh / 2;
    const radius = Math.min(ww/2, wh/2) * 0.6;
    let anim = ((time % 2000) / 1000);
    anim = anim > 1 ? 2 - anim : Math.max(anim, 0.001);
    const deepBlue = 38 + (66 * anim);
  
    // Set the clipping path
    CTX.beginPath();
    CTX.strokeStyle = `rgba(255,255,255,0.8)`;
    CTX.lineWidth = 20;
    CTX.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    CTX.stroke();
    let palantirGradient = CTX.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius/2 + (radius * anim));
    palantirGradient.addColorStop(0, "#77001f");
    palantirGradient.addColorStop(1, `rgba(0, 0, ${deepBlue}, 1.0)`);
    CTX.fillStyle = palantirGradient;
    CTX.fill();
    CTX.save();
    CTX.clip();
    
    for (let i = 0; i < CHARS.length; i++) {
      const DX = 0.001 * Math.sin(time * 0.001);
      const DY = 0.001 * Math.cos(time * 0.001);
      CHARS[i].rotate("x", DX);
      CHARS[i].rotate("y", DY);
    }
    
    CTX.beginPath();
    let specGradient = CTX.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 0.9)
    specGradient.addColorStop(0.95, `rgba(255, 255, 255, 0)`)
    specGradient.addColorStop(1, `rgba(255, 255, 255, 0.5)`)
    CTX.fillStyle = specGradient;
    CTX.arc(centerX, centerY, radius * 0.9, -Math.PI/2.5, -Math.PI/7);
    //CTX.arcTo(centerX + (radius*0.5), centerY - (radius * 0.5), centerX + (radius * 0.5), centerY-(radius*0.5), radius * 0.5)
    CTX.fill();
    //second specularity
    CTX.beginPath();
    let spec2Gradient = CTX.createRadialGradient(centerX + (radius * 0.5), centerY - (radius * 0.5),
     0, centerX + (radius * 0.25), centerY - (radius * 0.25), radius)
     spec2Gradient.addColorStop(0, `rgba(255, 255, 255, 0.1)`)
     spec2Gradient.addColorStop(0.5, `rgba(255, 255, 255, 0.2)`)
     spec2Gradient.addColorStop(1, `rgba(0, 0, 55, 0.2)`)
    CTX.fillStyle = spec2Gradient;
    CTX.moveTo(centerX, centerY);
    CTX.arc(centerX, centerY, radius, 0, Math.PI*2);
    CTX.fill();

    CTX.beginPath();
    let edgeGradient = CTX.createRadialGradient(centerX, centerY + (radius * 0.2), 0, centerX, centerY, radius)
    edgeGradient.addColorStop(0.9, `rgba(0, 0, 0, 0)`)
    edgeGradient.addColorStop(1, `rgba(0, 0, 33, 0.5)`)
    CTX.fillStyle = edgeGradient;
    CTX.arc(centerX, centerY, radius, 0, Math.PI*2);
    CTX.fill();

    ++time;
  }

  function loop() {
    window.requestAnimationFrame(loop);
    update();
    render();
  }
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function createChars() {
    for (let i = 0; i < MAX_CHARS; i++) {
      //const CHARACTER = String.fromCharCode(Math.random() > 0.33 ? 68 : Math.random() > 0.66 ?  77 : 79);
      //const CHARACTER = String.fromCharCode(42);  //✧ ✦ •
      const CHARACTER = "✦";
      const X = signedRandom() * SEPARATION;
      const Y = signedRandom() * SEPARATION;
      const Z = signedRandom() * SEPARATION;
      const POS = new Vector(X, Y, Z);
      const CHAR = new Char(CHARACTER, POS);
      CHARS.push(CHAR);
    }
  }

  function setDim() {
    ww = window.innerWidth;
    wh = window.innerHeight;
    CANVAS.width = ww * window.devicePixelRatio | 0;
    CANVAS.height = wh * window.devicePixelRatio | 0;
    CTX.scale(devicePixelRatio, devicePixelRatio);

  }

  function initCamera() {
    camera = new Vector(0, 0, SEPARATION + 1);
  }

  window.onresize = setDim;

  (() => {
    setDim();
    initCamera();
    createChars();
    loop();
  })();
};

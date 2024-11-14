import {tales} from "./fragments.js";

//const merlinTest = "WELCOME young apprentice, DARE ye enter mine shoppe? For I am MERLINE and this is MY SHOPPE! Behold I am Testing Brother Merline's FINE empoareum of Verily Good Goods ETC and long writing test for wraparound function thanks to mizir. Lo! What item of the Magi wish ye to behold? And such and so forth and et cetera... We can fit even more text here and so, let us do so";
//const merlinTest = "Quite unlike you to be so LATE in your return, mine Apprentice... I have heard that you are Quite Frustrating to the mayor of our local TOWNE, wherein I keep mine EMPOREUM of Arcaine Objekts..."
//const merlinTest = "Howdy stranger! Shoot, times sure do be darn tootin' and tough all round an' heck, why don'tcha come on over here, give Merline a big ol' sloppy KISS!"
//const merlinTest = "It has been several DAYS since my last Encounter with the wicked DAEDALUS, my apprentice... I am still weary from the strain of our Great Battle atop the ancient Mountain Of Misterie. Allow me time to recover my STRENGTH"

const merlinIntro = [
  "Ah, greetings my apprentice. It is so very GOOD to welcome you here to mine EMPOREUM of Mysterious Objeckts...",
    "Would you like to hear a tale from the great beyond?",
    "Let me see, here..."
]
  
const merlinTest = "Ah, young apprentice! 'Tis a task I have for thee, an errand of utmost importance, \
fraught with peril and adventure. Listen closely as I paint the scene"

const merlinTest1 = "In a distant forest, shrouded in darkness and myst'ry, lies a hidden grove known as the \
Whisp'ring Woods. 'Tis said that within its ancient depths, a rare herb, \
known as the Glim'm'ring Bloom, doth flourish"

const merlinTest2 = "Its petals, imbued with potent MAGICK, possess the power to heal the most grievous wounds and cure afflictions unknown"

const merlinTest3 = "Go forth, noble apprentice, armed with naught but thy wits and a satchel to carry this precious bounty. Traverse the treacherous terrain, where gnarled roots tangle beneath thy feet and unseen creatures rustle amidst the underbrush"

const merlinTest4 = "Beware, for guardians protect this hallowed ground. Luminous sprites, mischievous tricksters of the forest, shall test thy resolve. They may lead thee astray with their playful antics or seek to unravel thy focus with illusions both grand and beguiling. Stay steadfast, young one, and let not their enchantments distract thee from thy task"

const merlinTest5 = "Seek the Glim'm'ring Bloom in the heart of the grove, nestled amongst verdant foliage and illuminated by beams of ethereal light. Gently pluck its petals, careful not to disrupt its harmonious balance, and place them within thy satchel, for they are as fragile as a whisper"

const merlinTest6 = "Return to me, triumphant apprentice, bearing the Glim'm'ring Bloom, and I shall weave its essence into a potion of great potency. This elixir shall grant thee newfound resilience and grant thee a deeper connection to the mystical realms"

const merlinTest7 = "Go forth now, my apprentice, into the Whisp'ring Woods, and may fortune smile upon thy path as thou embark upon this sacred errand. May the light of magick guide thee, and may thy steps be guided by the wisdom of those who came before"

const chatGPTStory = [merlinTest, merlinTest1, merlinTest2, merlinTest3, merlinTest4, merlinTest5, merlinTest6, merlinTest7]

const alphabet = [
  "Amazing",
  "Before", 
  "Could",
  "Don't",
  "Every",
  "Frequent",
  "Glowered",
  "HILL",
  "Immitated",
  "Joncular",
  "Krytonic",
  "Liminal",
  "Mixes",
  "Nox",
  "Opera",
  "Pernicious",
  "Quill",
  "Rusty",
  "Sorcerer",
  "Trout",
  "Unbelievable",
  "Villainous",
  "Winged",
  "Xenon",
  "Yearning",
  "Zoratum",
]


let time = 0;
let textTime = 0;



function splitStringAtLastSpace(str, chunkSize) {
  let result = [];
  let start = 0;

  while (start < str.length) {
      let end = Math.min(start + chunkSize, str.length);
      let chunk = str.substring(start, end);

      // Find the last space in the current chunk
      let lastSpaceIndex = chunk.lastIndexOf(' ');
      let firstTabIndex = chunk.indexOf('	'); //poem detector
      let lastDotIndex = chunk.lastIndexOf('.');
      let lastBangIndex = chunk.lastIndexOf('!');
      let lastQMarkIndex = chunk.lastIndexOf('?');

      // If there's a space, split at that space; otherwise, split at chunkSize
      if (firstTabIndex !== -1) {
        end = start + firstTabIndex;
        while(str.charAt(end+1) === '	') {
          end++
        }
      } else if (lastDotIndex !== -1) {
        end = start + lastDotIndex;
      } else if (lastBangIndex !== -1){
        end = start + lastBangIndex;
      } else if (lastQMarkIndex !== -1){
        end = start + lastQMarkIndex;
      } else if (lastSpaceIndex !== -1){
        end = start + lastSpaceIndex;
      }

      end = str.charAt(end+1) === "\"" ? end+2 : end;
      end = str.charAt(end+1) === "\'" ? end+2 : end;
      end = str.charAt(end+1) === "\)" ? end+2 : end;
      end = str.charAt(end+1) === "\]" ? end+2 : end;
      end = str.charAt(end+1) === "\}" ? end+2 : end;

      end++; 
      result.push(str.substring(start, end).trim());
      start = end;
  }

  return result;
}


// const tale = Math.floor(tales.length * Math.random());
// const newStory = splitStringAtLastSpace(tales[tale], 296)

// let textSubject = newStory;
let textSubject = merlinIntro;
let textParagraph = 0;
let readyNext;

//thanks to mizar and crazy2be
function getLines(ctx, text, maxWidth, extra) {
  var words = text.split(" ");
  var lines = [];
  var currentLine = words[0];
  //console.log("maxwidth", maxWidth);

  for (var i = 1; i < words.length; i++) {
      var word = words[i];
      var width = ctx.measureText(currentLine + " " + word).width;
      if (i === words.length - 1){
        width += ctx.measureText(extra).width;
        if(readyNext){
          width += ctx.measureText(".?.?.?").width;
          // const dotLen = ctx.measureText(".").width;
          // console.log(dotLen)
          // let elipseAnim = ((textTime % 48) / 12);
          // width -= Math.floor(elipseAnim) * 22;
        }
      }
      const push = lines.length >= 2 ? 10 : 100;
      if (width < maxWidth - (i + push + (lines.length * 20))) {
          currentLine += " " + word;
      } else {
      //console.log("width", width);
      //console.log("max", maxWidth - (i + push + (lines.length * 20)));
          lines.push(currentLine);
          currentLine = word;
      }
  }
  lines.push(currentLine);
  
  return lines;
}

//const merlinTest = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 1 2 3 4 5 6 7 8 9 0"

window.onload = () => {
  const CANVAS = document.getElementById("canvas");
  const MERLINE = document.getElementById("merline");
  const MERLINESHAND = document.getElementById("merlineshand");
  const MERLINESTEXT = document.getElementById("merlinsText");
  const CTX = CANVAS.getContext("2d");
  const MRL = MERLINE.getContext("2d");
  const MRLHD = MERLINESHAND.getContext("2d");
  const MRLTXT = MERLINESTEXT.getContext("2d");
  const merlinbg = document.getElementById("merlin");
  const merlinshand = document.getElementById("merlinshand");

  
  //merlin background
  // MERLINE.height = window.innerHeight;
  // MERLINE.width = window.innerWidth;
  MRL.drawImage(merlinbg,0,0);





  function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
  }

  function isCapitalLetter(c) {
    return isLetter(c) && c != c.toLowerCase();
  }



  //Nice fonts

  //Courgette + Aclonica (current)
  //medievals:
  // Almendra Display : Astloch : Eagle Lake : Felipa : Lancelot : Macondo Swash Caps : Pirata One : 
  // Srisakdi : Unical Antiqua : Unifrakturcook : Unifrakturmaguntia

  //text handler
  //pop the first letter always and set special font + double size 
  function drawText(curString){
      MRLTXT.beginPath();
      const fontSize = 80;
      let elipseAnim = ((textTime % 48) / 12);
      //elipseAnim = elipseAnim > 1 ? 1 - elipseAnim : elipseAnim;
      //console.log(elipseAnim)
      var wordLength = "";
      for(let i=0;i<25;i++){
        const nextChar = curString.charAt(Math.round(textTime/2) + i);
        if(nextChar === " " || nextChar === "."){
          i = 26;
        } else {
          wordLength += nextChar;
        }
      }

      //console.log(curString.charAt(curString.length - 1))
      const lastChar = curString.charAt(curString.length - 1);
      const lastChar2 = curString.charAt(curString.length - 2);
      const lastChar3 = curString.charAt(curString.length - 3);
      const lastChar4 = curString.charAt(curString.length - 4);
      var endEll = "."
      var erasePunct = 0;
      if (lastChar === "." || lastChar === "?" || lastChar === "," || lastChar === "!" ) {
        endEll = lastChar;
        erasePunct++;
        erasePunct += lastChar2 === "." || lastChar2 === "…" ? 1 : 0; 
        erasePunct += lastChar3 === "." ? 1 : 0; 
        erasePunct += lastChar4 === "." ? 1 : 0; 
        console.log(lastChar, lastChar2, lastChar3, lastChar4, erasePunct)    
      }

      erasePunct += lastChar === "…" ? 1 : 0;


      curString = curString.slice(0, curString.length - erasePunct);

      if (lastChar != "\"" && lastChar != ":" && lastChar != ";" && lastChar != ")" && lastChar != "]" && lastChar != "}") {
        curString += elipseAnim > 1 ? "." : "";
        curString += elipseAnim > 2 ? "." : "";
        curString += elipseAnim > 3 ? endEll : "";
      }
      var string = curString.slice(0, Math.round(textTime/2));
      const dropChar = string.charAt(0);
      const dropOffsetPre = dropChar === "J" ? 30 : 20;
      let lines;
      let dropLength = 0;
      const cutString = string.slice(1);
      MRLTXT.font = fontSize + "px Aclonica";

      if (isCapitalLetter(dropChar)) {      
        var dropOffsetPost = 0;
        dropOffsetPost += dropChar === "H" 
                        || dropChar === "F"
                        || dropChar === "K"
                        || dropChar === "M"
                        || dropChar === "P"
                        || dropChar === "R"
                        || dropChar === "V"
                        || dropChar === "Z" ? 5 : 0;
        dropOffsetPost += dropChar === "E" 
                        || dropChar === "I"
                        || dropChar === "T"
                        || dropChar === "L"
                        || dropChar === "N"
                        || dropChar === "V"
                        || dropChar === "W"
                        || dropChar === "Y" ? 10 : 0;
        dropOffsetPost += dropChar === "J" ? 20 : 0;
        dropLength = MRLTXT.measureText(dropChar).width + dropOffsetPost;
        lines = getLines(MRLTXT, cutString, MERLINESTEXT.width - 66 - dropLength, wordLength);
      } else {
        lines = getLines(MRLTXT, string, MERLINESTEXT.width - 66, wordLength);
      }
      lines.forEach(function(line, i) {
        
        MRLTXT.fillStyle = i%2 === 0 ? "#ffff00" : "#eedd00";
        const drop = i === 0 || i === 1 ? dropLength : 0;
        const push = i > 1 ? i * 20 : 0;
        //console.log(drop)
        //MRLTXT.shadowBlur = 5;
        MRLTXT.strokeText(line, push + drop * 2, (i + 1) * fontSize + 5);
        //MRLTXT.shadowBlur = 0;
        MRLTXT.fillText(line, push + drop * 2, (i + 1) * fontSize);
      });
   
          MRLTXT.strokeStyle = "#000";
          MRLTXT.lineWidth = 10;
      if(isCapitalLetter(dropChar))
      {
        MRLTXT.font = fontSize * 2 + "px Courgette";
        MRLTXT.fillStyle = "yellow";
          //MRLTXT.shadowColor = "#000";
          //MRLTXT.shadowBlur = 5;
        
        MRLTXT.strokeText(dropChar, dropOffsetPre, fontSize * 1.7 + 5);
        //MRLTXT.shadowBlur = 0;
        MRLTXT.fillText(dropChar, dropOffsetPre, fontSize * 1.7);
      }
      if(curString.length < Math.round(textTime/2) && !readyNext) {
        //console.log("Text finished animating")
        readyNext = true;
      }
    }
  //MRLTXT.fill();

  
document.addEventListener("touchstart", touchStart);
function touchStart(e) {
  if (readyNext) {
      readyNext = !readyNext;
      textTime = 0;
      if (textSubject.length === textParagraph + 1){
        console.log(tales.length)
        const rtale = Math.floor(tales.length * Math.random());
        textSubject = splitStringAtLastSpace(tales[rtale], 296)
        textParagraph = 0;
      } else {
      textParagraph++;
      }
  }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("click", touchStart, false);
function keyDownHandler(e) {
  //shift-swing
  if (e.key === " " && readyNext) {
      e.preventDefault();
      readyNext = !readyNext;
      textTime = 0;
      if (textSubject.length === textParagraph + 1){
        console.log(tales.length)
        const rtale = Math.floor(tales.length * Math.random());
        textSubject = splitStringAtLastSpace(tales[rtale], 296)
        textParagraph = 0;
      } else {
      textParagraph++;
      }
  }
}


  //crystal ball
  const CHARS = [];
  const MAX_CHARS = 200;
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
      const MAX_SIZE = Math.min(ww, wh) / 42; //25
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
      anim = anim === 0 ? 0 : Math.pow(2, 10 * anim - 10);
      //anim = anim * anim * anim;
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
      drawStar(CTX, XP, YP, SIZE/1.5 * Math.max(anim, 0.5), this.start + time%1000 / 1000);
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
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  function getCenter() {
    //return [ww / 2, wh / 2];
    return [10 + MERLINE.width / 2, 10 + MERLINE.height / 2];
  }

  function signedRandom() {
    return Math.random() - Math.random();
  }

  function render() {
    for (let i = 0; i < CHARS.length; i++) {
      CHARS[i].render();
    }
  }
  
  function update() {
  //merlin hand
  //future: small anim
  MRLHD.clearRect(0,0, merlinshand.width*2, merlinshand.height)
  const handlingW = merlinshand.width/1.4
  const handlingH = merlinshand.height/1.2
  let handlingAnim = ((time % 500) / 250);
  handlingAnim = handlingAnim > 1 ? 1 - handlingAnim : handlingAnim;
  
  MRLHD.translate(handlingW, handlingH)
  MRLHD.rotate(Math.sign(handlingAnim) * 0.0005)
  MRLHD.translate(-handlingW, -handlingH)
  CTX.restore();
  CTX.translate(handlingW, handlingH)
  CTX.rotate(Math.sign(handlingAnim) * 0.0005)
  CTX.translate(-handlingW, -handlingH)
  MRLHD.drawImage(merlinshand,0,0);
  // MRLHD.rect(merlinshand.width/1.4, merlinshand.height/1.2, 20, 20);
  // MRLHD.fillStyle = "#ff0000";
  // MRLHD.fill();

    MRLTXT.clearRect(0, 0, MERLINESTEXT.width, MERLINESTEXT.height);
    //console.log(MRLTXT.width, MRLTXT.height)
    drawText(textSubject[textParagraph]);

    CTX.clearRect(0, 0, ww*2, wh*2);
    const center = getCenter();
    const centerX = center[0]; //ww / 2;
    const centerY = center[1]; //wh / 2;
    const radius = Math.min(ww/2, wh/2) * 0.8;
    let anim = ((time % 2000) / 1000);
    anim = anim > 1 ? 2 - anim : Math.max(anim, 0.001);
    const deepBlue = 38 + (66 * anim);
  
    // Set the clipping path
    CTX.beginPath();
    let edgeGradient = CTX.createRadialGradient(centerX, centerY + (radius * 0.2), 0, centerX, centerY, radius)
    edgeGradient.addColorStop(0, `rgba(0, 0, 0, 1)`)
    edgeGradient.addColorStop(0.8, `rgba(0, 0, 0, 0.9)`)
    edgeGradient.addColorStop(0.9, `rgba(0, 0, 0, 0.5)`)
    edgeGradient.addColorStop(1, `rgba(0, 0, 0, 1.0)`)
    CTX.fillStyle = edgeGradient;
    CTX.arc(centerX, centerY, radius, 0, Math.PI*2);
    CTX.fill();

    CTX.beginPath();
    CTX.strokeStyle = `rgba(255,255,255,0.8)`;
    CTX.lineWidth = Math.min(centerX, centerY) / 42;
    CTX.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    CTX.stroke();
    let palantirGradient = CTX.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius/2 + (radius * anim));
    palantirGradient.addColorStop(0, `rgba(119, 0, 31, 1.0)`);
    palantirGradient.addColorStop(1, `rgba(0, 0, ${deepBlue}, 0.8)`);
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
    spec2Gradient.addColorStop(1, `rgba(0, 0, 25, 0.2)`)
    CTX.fillStyle = spec2Gradient;
    CTX.moveTo(centerX, centerY);
    CTX.arc(centerX, centerY, radius, 0, Math.PI*2);
    CTX.fill();

    ++time;
    ++textTime;
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
    // ww = window.innerWidth/2.3;
    // wh = window.innerHeight/2.3;
    // ww = 580;
    // wh = 340;
    ww = MERLINE.width/2;
    wh = MERLINE.height/2;
    // CANVAS.width = ww*2 * window.devicePixelRatio | 0;
    // CANVAS.height = wh*2 * window.devicePixelRatio | 0;
    // CTX.scale(devicePixelRatio, devicePixelRatio);

    
    // MERLINE.width = 1305;
    // MERLINE.height = 734;
    //MRL.scale(devicePixelRatio, devicePixelRatio);
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

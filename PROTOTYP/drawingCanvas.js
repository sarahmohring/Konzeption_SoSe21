//*♦—◊——◊——◊—〈  C A N V A S F U N K T I O N E N  〉—◊——◊——◊—♦*//

const canvas = document.querySelector("#canvas");
canvas.width = 0.65 * window.innerWidth;

if (window.innerWidth < 850)
    canvas.height = 0.2 * window.innerHeight;
else
    canvas.height = 0.7 * window.innerHeight;

let context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

let startBackgroundColor = "white";
let drawColor = "black";
let drawWidth = "2";
let isDrawing = false;

let undoButton = document.querySelector("#undo");
undoButton.addEventListener("pointerup", undoLast);
let clearButton = document.querySelector("#clear");
clearButton.addEventListener("pointerup", clearCanvas);
let saveButton = document.querySelector("#save");
saveButton.addEventListener("pointerup", save);

let restoreArray = [];
let index = -1;


/* ----———————————————〈 E V E N T - L I S T E N E R 〉———————————————-—--- */

/*   for    */ /*      Tablet      *//*    user    */
// canvas.addEventListener("touchstart", start, false);
// canvas.addEventListener("touchmove", draw, false);
// canvas.addEventListener("touchend", stop, false);
// canvas.addEventListener("touchcancel", stop, false);
// /*  for Tablet user *//*  for Tablet user *//*  for Tablet user */

// canvas.addEventListener("mousedown", start, false);
// canvas.addEventListener("mousemove", draw, false);
// canvas.addEventListener("mouseup", stop, false);
// canvas.addEventListener("mouseout", stop, false);

canvas.addEventListener("pointerdown", start, false);
canvas.addEventListener("pointermove", draw, false);
canvas.addEventListener("pointerup", stop, false);
canvas.addEventListener("pointerout", stop, false);

// source: G. Rausch
var colorPickers = document.querySelectorAll(".color-field");
for (var i = 0; i < colorPickers.length; i++) {
    var colorPicker = colorPickers[i];
    // this click handler is going to be adapted for touch, thus a separate handle
    // is not needed
    colorPicker.addEventListener("pointerup", changeColor, false);
}

/* ----———————————————〈 F U N C T I O N S 〉———————————————-—--- */

/*———————————---------* START *---------———————————*/

function start(_event) { // prepare to draw
    isDrawing = true;
    let rect = canvas.getBoundingClientRect();
    context.beginPath();
    context.moveTo(_event.clientX - canvas.getBoundingClientRect().left,
        _event.clientY - canvas.getBoundingClientRect().top);
    _event.preventDefault();
}
/*———————————---------* DRAW *---------————————————*/

function draw(_event) {  // actually draw
    if (isDrawing) {
        context.lineTo(_event.clientX - canvas.getBoundingClientRect().left, // line is drawn where clicked not on full x y axis
            _event.clientY - canvas.getBoundingClientRect().top); // offset = distance between beginning of obj. and clicked point
        context.strokeStyle = drawColor; // defined in
        context.lineWidth = drawWidth;
        context.lineCap = "round"; // stokepath (procreate)
        context.lineJoin = "round";
        context.stroke();
    }
    _event.preventDefault();

}
/*——————————---------* STOP *---------—————————————*/

function stop(_event) {
    if (isDrawing) {
        context.stroke();
        context.closePath();
        isDrawing = false;
    }
    _event.preventDefault();

    if (_event.type !== "pointerout") {
        restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        // console.log(restoreArray);
    }
}

/*——————————---------* CLEAR *---------————————————*/

function clearCanvas() {
    context.fillStyle = startBackgroundColor;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    restoreArray = [];
    index = -1;
    // console.log("♦—◊—◊〈successfully renewed canvas〉◊—◊—♦");
}

/*——————————---------* UNDO *---------————————————*/

function undoLast() {
    if (index <= 0) {
        clearCanvas();
    } else {
        index -= 1;
        restoreArray.pop();
        context.putImageData(restoreArray[index], 0, 0);
    }
}

// source: G. Rausch
function changeColor(_event) {
    var thisColor = _event.target.getAttribute("datacolor");
    setColor(thisColor);
}
function setColor(color) {
    drawColor = color;
}
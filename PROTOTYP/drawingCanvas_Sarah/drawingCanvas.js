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

let start_background_color = "white";
let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

let undoButton = document.querySelector("#undo");
undoButton.addEventListener("pointerup", undo_last);
let clearButton = document.querySelector("#clear");
clearButton.addEventListener("pointerup", clear_canvas);
let saveButton = document.querySelector("#save");
saveButton.addEventListener("pointerup", save);

// function change_color(element) {         /* Color from Html */
//     draw_color = element.style.background;
// }

let restore_array = [];
let index = -1;


/* ----———————————————〈 E V E N T - L I S T E N E R 〉———————————————-—--- */

/*   for    */ /*      Tablet      *//*    user    */
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("touchcancel", stop, false);
/*  for Tablet user *//*  for Tablet user *//*  for Tablet user */

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

// rausch
var colorPickers = document.querySelectorAll(".color-field");
for (var i = 0; i < colorPickers.length; i++) {
    var colorPicker = colorPickers[i];
    // this click handler is going to be adapted for touch, thus a separate handle
    // is not needed
    colorPicker.addEventListener("click", change_color, false);
}
// ende rausch


/* ----———————————————〈 F U N C T I O N S 〉———————————————-—--- */

/*———————————---------* START *---------———————————*/

function start(event) { /* prepare to draw */
    is_drawing = true;
    let rect = canvas.getBoundingClientRect();
    context.beginPath();
    context.moveTo(event.clientX - canvas.getBoundingClientRect().left,
        event.clientY - canvas.getBoundingClientRect().top);
    event.preventDefault();
}
/*———————————---------* DRAW *---------————————————*/

function draw(event) {  /* actually draw */
    if (is_drawing) {
        context.lineTo(event.clientX - canvas.getBoundingClientRect().left, /* line is drawn where clicked not on full x y axis */
            event.clientY - canvas.getBoundingClientRect().top); /* offset = distance between beginning of obj. and clicked point */
        context.strokeStyle = draw_color; /* defined in */
        context.lineWidth = draw_width;
        context.lineCap = "round"; /* stokepath (procreate) */
        context.lineJoin = "round";
        context.stroke();
    }
    event.preventDefault();

}
/*——————————---------* STOP *---------—————————————*/

function stop(event) {
    if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault();

    if (event.type !== 'mouseout') {
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        console.log(restore_array);
    }
}

/*——————————---------* CLEAR *---------————————————*/

function clear_canvas() {
    context.fillStyle = start_background_color;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    restore_array = [];
    index = -1;
    console.log("♦—◊—◊〈successfully renewed canvas〉◊—◊—♦");
}

/*——————————---------* UNDO *---------————————————*/

function undo_last() {
    if (index <= 0) {
        clear_canvas();
    } else {
        index -= 1;
        restore_array.pop();
        context.putImageData(restore_array[index], 0, 0);
    }
}

// rausch
function change_color(e) {
    var thisColor = e.target.getAttribute("datacolor");
    setColor(thisColor);
}
function setColor(color) {
    draw_color = color;
}

// ende rausch

function save() {
    console.log("save image");
}
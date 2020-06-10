const canvas = document.getElementById("jsCanvas");
canvas.width = 500;
canvas.height = 470;

const ctx = canvas.getContext("2d");
const INITIAL_COLOR = "black";

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 0.1;
ctx.fillStyle = INITIAL_COLOR;

const colors = document.querySelector(".controls__colors");
const color = colors.querySelectorAll(".controls__color");

const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

let painting = false;
let filling = false;

function changeColor(event) {
  const a = event.target;
  console.log(a);
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}
function stopPainting() {
  painting = false;
}
function onMouseLeave(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (x < 0 && y < 0) {
    painting = false;
  } else {
    stopPainting();
  }
}

function handleColorClick(event) {
  const color = event.target.style.background;
  console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const range = event.target.value;
  console.log(range);
  ctx.lineWidth = range;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.preventDefault();
}
function handleSaveClick(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", onMouseLeave);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(color).forEach((what) =>
  what.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

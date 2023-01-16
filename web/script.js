// create canvas
const canvas = document.createElement("canvas", {
    "width": 100,
    "height": 100
});
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// convert number to string
function str(num) {
    return num.toString();
}

// print given text to the console
function log(text) {
    console.log(text);
}

// set canvas size
function setCanvasSize(width, height) {
    canvas.width = width;
    canvas.height = height;
}

// set page title
function setTitle(title) {
    document.getElementByTagName("title").innerText = title;
}

// IMAGE FUNCTIONS

// stores all loaded images
let images = [];

// load image
function loadImage(uri) {
    fetch(uri).then(() => {
        let img = document.createElement("img", {
            "src": uri
        });
        img.style.display = "none";
        document.head.appendChild(img);
    });
    images += img;
}

// renders image at coordinates
function drawImage(id, x, y) {
    ctx.drawImage(images[id], x, y);
}

// SHAPE FUNCTIONS

// draws rectangle at position with given size and color
function drawRect(color, x, y, width, height) {}

// sent to WASM
let imports = {
    "env": {
        "str": str,
        "log": log,
        "setCanvasSize": setCanvasSize,
        "setTitle": setTitle,
        "loadImage": loadImage,
        "drawImage": drawImage
    }
};
// create WASM instance
WebAssembly.instantiateStreaming(fetch("main.wasm"), imports).then(
    (obj) => {
        // unpack imports here
        const { fib } = obj.instance.exports;
        console.log(obj.instance.exports);

        // use imports here
        fib(10);
    }
);

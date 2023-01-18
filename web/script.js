// create canvas
const canvas = document.createElement("canvas", {
    "width": 100,
    "height": 100
});
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// memory array
let memoryGlobal;

// gets null-terminated string from memory buffer
function getStr(ptr) {
    let len = ptr - (new Uint8Array(memoryGlobal.buffer).findIndex(item => item === 0));
    let arr = new Uint8Array(memoryGlobal.buffer, ptr, len);
    return new TextDecoder().decode(arr);
}

// convert number to string
function str(num) {
    return num.toString();
}

// print given text to the console
function log(text) {
    console.log(getStr(text));
}

// set canvas size
function setCanvasSize(width, height) {
    canvas.width = width;
    canvas.height = height;
}

// set page title
function setTitle(title) {
    document.getElementById("title").innerText = getStr(title);
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
    return images.length - 1;
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
        const { memory, setup, update } = obj.instance.exports;
        console.log(obj.instance.exports);

        memoryGlobal = memory;
        log(memoryGlobal);

        // sets up the game
        setup();
        // starts the game loop
        const gameLoop = (dt) => {
            update(dt);
            requestAnimationFrame(gameLoop);
        };
        gameLoop(0);
    }
);

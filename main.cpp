#include <lib.h>

const char* title = "Game";

// runs once at the beginning
WASM_EXPORT void setup() {
    setTitle(title);
}


// runs every frame update
WASM_EXPORT void update(int deltaTime) {

}

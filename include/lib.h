#define WASM_IMPORT extern "C"
#define WASM_EXPORT __attribute__((visibility("default"))) \
    extern "C"

// imports
WASM_IMPORT char* str(int num);
WASM_IMPORT void log(char* text);

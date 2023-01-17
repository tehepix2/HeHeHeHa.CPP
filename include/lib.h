#define WASM_EXPORT extern "C" __attribute__((visibility("default")))

extern "C" {
    // imports
    char* str(int num);
    void log(char* text);

    void setCanvasSize(int width, int height);
    void setTitle(char* title);

    int loadImage(char* uri);
    void drawImage(int id, int x, int y);
}

// exports
WASM_EXPORT void setup();
WASM_EXPORT void update(int deltaTime);

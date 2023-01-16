from flask import Flask, Response

app = Flask("WASM App Server")

# reads all text from specified file and returns it
def webfile(filename:str) -> str:
    with open("web/" + filename, "rb") as file:
        return file.read()

@app.route("/")
def root() -> str:
    return webfile("index.html")

@app.route("/<resourceName>")
def get_resource(resourceName:str) -> str:
    return Response(webfile(resourceName), 200, mimetype="application/wasm")

app.run()

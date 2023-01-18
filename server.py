# for running commands
from os import system
from sys import platform
# web server
from flask import Flask, Response

# app class
app = Flask("WASM App **DEBUG** Server")

# stores C++ code to rapidly deploy changes
cpp = ""

# reads all text from specified file and returns it
def readFile(filename:str) -> str:
    with open(filename, "rb") as file:
        return file.read()

def webfile(filename:str) -> str:
    try:
        return readFile("web/" + filename)
    except FileNotFoundError:
        print(f"File {filename} not found in 'web' directory.")
        return "Resource not found. Check the file system to make sure it exists and is in the correct location."

# root page (index)
@app.route("/")
def root() -> str:
    return webfile("index.html")

# dynamic routing (returns resource)
@app.route("/<resourceName>")
def get_resource(resourceName:str) -> str:
    global cpp
    # checks for changes in the C++ file
    if cpp != readFile("main.cpp"):
        # if the file was modified, recompile it
        if platform == "win32":
            # Windows
            system("compile")
        else:
            # Mac and Linux
            system("bash compile.sh")
    # updates C++ code
    cpp = readFile("main.cpp")
    
    # return the resource
    return Response(webfile(resourceName), 200, mimetype="application/wasm")

# gets C++ code
cpp = readFile("main.cpp")
app.run(host="127.0.0.1", port=8080)

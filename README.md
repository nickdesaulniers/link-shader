# Link-Shader
Used to link two shaders into a shader program in WebGL.

## Usage
`npm i link-shader`

```js
var shaderCompiler = require('shader-compiler');
var shaderLinker = require('link-shader');

var gl = document.createElement('canvas').getContext('webgl');
var vertexShader = shaderCompiler(gl, ..., ...);
var fragmentShader = shaderCompiler(gl, ..., ...);
var shaderProgram = shaderLinker(gl, vertexShader, fragmentShader);

gl.useProgram(shaderProgram);
```

This module is meant to be incorporated via [browserify](http://browserify.org/).

## Testing
`npm t`


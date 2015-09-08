# Link-Shader
Used to link two shaders into a shader program in WebGL.

## Usage
`npm i link-shader`

```js
var compile = require('compile-shader');
var link = require('link-shader');

var gl = document.createElement('canvas').getContext('webgl');
var vertexShader = compile(gl, ..., ...);
var fragmentShader = compile(gl, ..., ...);
var shaderProgram = link(gl, vertexShader, fragmentShader);

gl.useProgram(shaderProgram);
```

This module is meant to be incorporated via [browserify](http://browserify.org/).

## Testing
`npm t`


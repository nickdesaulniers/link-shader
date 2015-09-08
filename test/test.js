var test = require('tape');
var shaderCompiler = require('compile-shader');
var shaderLinker = require('..');

function getGL () {
  return document.createElement('canvas').getContext('webgl');
};

test('compatible shader programs', function (t) {
  t.plan(1);

  var gl = getGL();
  var type = gl.VERTEX_SHADER;
  var src = 'varying float pass; void main () { pass = 0.5; gl_Position = vec4(0.0, 0.0, 0.0, 1.0); }';
  var vertexShader = shaderCompiler(gl, type, src);

  type = gl.FRAGMENT_SHADER;
  src = 'precision mediump float; varying float pass; void main () { gl_FragColor = vec4(0.0, 0.0, 0.0, pass); }';
  var fragmentShader = shaderCompiler(gl, type, src);

  var program = shaderLinker(gl, vertexShader, fragmentShader);
  t.ok(true, 'able to link compatible shader programs');
});

test('incompatible shader programs', function (t) {
  t.plan(1);

  var gl = getGL();
  var type = gl.VERTEX_SHADER;
  var src = 'varying float pass; void main () { pass = 0.5; gl_Position = vec4(0.0, 0.0, 0.0, 1.0); }'
  var vertexShader = shaderCompiler(gl, type, src);

  type = gl.FRAGMENT_SHADER;
  src = 'precision mediump float; varying mat4 pass; void main () { gl_FragColor = vec4(0.0, 0.0, 0.0, pass[0]); }'
  var fragmentShader = shaderCompiler(gl, type, src);

  t.throws(function () {
    var program = shaderLinker(gl, vertexShader, fragmentShader);
  });
});

window.close();


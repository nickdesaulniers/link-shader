var test = require('tape');
var compile = require('compile-shader');
var link = require('..');

function getGL () {
  return document.createElement('canvas').getContext('webgl');
};

test('compatible shader programs', function (t) {
  t.plan(1);

  var gl = getGL();
  var type = gl.VERTEX_SHADER;
  var src = 'varying float pass; void main () { pass = 0.5; gl_Position = vec4(0.0, 0.0, 0.0, 1.0); }';
  var vertexShader = compile(gl, type, src);

  type = gl.FRAGMENT_SHADER;
  src = 'precision mediump float; varying float pass; void main () { gl_FragColor = vec4(0.0, 0.0, 0.0, pass); }';
  var fragmentShader = compile(gl, type, src);

  var program = link(gl, vertexShader, fragmentShader);
  t.ok(true, 'able to link compatible shader programs');
});

test('incompatible shader programs', function (t) {
  t.plan(1);

  var gl = getGL();
  var type = gl.VERTEX_SHADER;
  var src = 'varying float pass; void main () { pass = 0.5; gl_Position = vec4(0.0, 0.0, 0.0, 1.0); }'
  var vertexShader = compile(gl, type, src);

  type = gl.FRAGMENT_SHADER;
  src = 'precision mediump float; varying mat4 pass; void main () { gl_FragColor = vec4(0.0, 0.0, 0.0, pass[0]); }'
  var fragmentShader = compile(gl, type, src);

  t.throws(function () {
    var program = link(gl, vertexShader, fragmentShader);
  });
});

window.close();


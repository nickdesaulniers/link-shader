module.exports = function (gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    var programLog = gl.getProgramInfoLog(program);
    throw Error('Failed to link shader program: ' + programLog);
  }

  return program;
};


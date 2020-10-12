function main() {
    var canvas = document.getElementById("workCanvas");
    var gl = canvas.getContext("webgl");

    // * def vertices
    /**
        * A (-0.5, 0.5); B (-0.5, -0.5); C (0.5, -0.5)
    */
    var vertices = [
        -0.5, 0.5,
        -0.5, -0.5,
         0.5, -0.5,
         0.5, 0.5
    ];

    // vertex buffer object
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
    var vertexShaderCode = document.getElementById("vertexShaderSource").text;
  
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);
  
    var fragmentShaderCode = document.getElementById("fragmentShaderSource").text;
  
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);
  
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
  
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);
  
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
    var primitive = gl.POINTS;
    var offset = 0;
    var count = 4;
    gl.drawArrays(primitive, offset, count);
}
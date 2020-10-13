function main() {
    var canvas = document.getElementById("workCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
        -0.5, 0.5, 1.0, 0.0, 0.0, // Titik A 
        -0.5, -0.5, 1.0, 1.0, 0.0, // Titik B
        0.5, -0.5, 1.0, 0.0, 0.0, // Titik C
        0.5, -0.5, 0.0, 0.0, 1.0, // Titik C
        0.5, 0.5, 0.0, 1.0, 1.0, // Titik D
        -0.5, 0.5, 0.0, 0.0, 1.0 // Titik A 
    ];

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

    // ! debug
    var compiled = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    if (!compiled) {
        console.error(gl.getShaderInfoLog(fragmentShader));
    }

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    var aColor = gl.getAttribLocation(shaderProgram, "a_Color");
    gl.vertexAttribPointer(
        aPosition,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0);
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aPosition);
    gl.enableVertexAttribArray(aColor);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // * resize canvas
    var displayWidth = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;
    
    if (canvas.width != displayWidth || canvas.height != displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }


    gl.viewport(0, 0, gl.canvas.height, gl.canvas.height);

    var primitive = gl.TRIANGLES;
    var offset = 0;
    var count = 6; // Jumlah verteks yang akan digambar
    gl.drawArrays(primitive, offset, count);
}
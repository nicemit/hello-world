window.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  var x = canvas.width / 2;
  var y = canvas.height - 30;

  var dx = 1;
  var dy = -1;

  var ballRadius = 10;

  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width - paddleWidth) / 2;

  var leftPressed = false;
  var rightPressed = false;

  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  function keyDownHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = true;
    } else if (e.keyCode == 37) {
      leftPressed = true;
    }
  }
  function keyUpHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = false;
    } else if (e.keyCode == 37) {
      leftPressed = false;
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#00AA00";
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#00AA00";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    drawPaddle();

    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
      dy = -dy;
    }

    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
      dx = -dx;
    }

    if (leftPressed == true && paddleX > 0) {
      paddleX -= 7;
    } else if (rightPressed == true && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    }

    x += dx;
    y += dy;
  }
  setInterval(draw, 10);
};

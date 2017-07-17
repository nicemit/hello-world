window.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  var x = canvas.width / 2;
  var y = canvas.height - 30;

  var dx = 1.1;
  var dy = -1.2;

  var ballRadius = 10;

  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width - paddleWidth) / 2;

  var leftPressed = false;
  var rightPressed = false;

  var brickColumnCount = 5;
  var brickRowCount = 3;
  var brickPadding = 10;
  var brickWidth = 75;
  var brickHeight = 20;
  var brickOffsetLeft = 30;
  var brickOffsetTop = 30;

  var brick = [];
  for (var c = 0; c < brickColumnCount; c++) {
    brick[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
      brick[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (brick[c][r].status == 1) {
          brick[c][r].x = c * (brickWidth + brickPadding) + brickOffsetLeft;
          brick[c][r].y = r * (brickHeight + brickPadding) + brickOffsetTop;
          ctx.beginPath();
          ctx.rect(brick[c][r].x, brick[c][r].y, brickWidth, brickHeight);
          ctx.fillStyle = "#000000";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
      for (r = 0; r < brickRowCount; r++) {
        var b = brick[c][r];
        if (b.status == 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy;
            brick[c][r].status = 0;
          }
        }
      }
    }
  }

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

    drawBricks();

    collisionDetection();

    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        document.location.reload();
      }
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

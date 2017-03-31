let windowWidth = parseInt(innerWidth*0.8);
let windowHeight = parseInt(innerHeight*0.8);
let marginLeft = Math.round(windowWidth / 10);
let marginTop = Math.round(windowHeight / 5);
let radius = Math.round(windowWidth * 4 / 5 / 108) - 1;
let date = new Date();

let balls = [];
let colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function () {
  let canvas = document.querySelector('canvas');
  let context = canvas.getContext('2d');

  canvas.width = windowWidth;
  canvas.height = windowHeight;

  setInterval(() => {
    render(context);
    update();
  }, 50);
}

function update() {
  let currentDate = new Date();
  let currentHours = currentDate.getHours();
  let currentMinutes = currentDate.getMinutes();
  let currentSeconds = currentDate.getSeconds();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (currentDate !== date) {
    if (parseInt(hours/10) !== parseInt(currentHours/10)) {
      addBalls(marginLeft, marginTop, parseInt(currentHours/10));
    }
    if (parseInt(hours%10) !== parseInt(currentHours%10)) {
      addBalls(marginLeft+15*(radius+1), marginTop, parseInt(hours%10));
    }

    if (parseInt(minutes/10) !== parseInt(currentMinutes/10)) {
      addBalls(marginLeft+39*(radius+1), marginTop, parseInt(minutes/10));
    }
    if (parseInt(minutes%10) !== parseInt(currentMinutes%10)) {
      addBalls(marginLeft+54*(radius+1), marginTop, parseInt(minutes/10));
    }

    if (parseInt(seconds/10) !== parseInt(currentSeconds/10)) {
      addBalls(marginLeft+78*(radius+1), marginTop, parseInt(minutes/10));
    }
    if (parseInt(seconds%10) !== parseInt(currentSeconds%10)) {
      addBalls(marginLeft+93*(radius+1), marginTop, parseInt(minutes/10));
    }

    date = currentDate;
  }

  updateBalls();
  console.log(balls.length);
}

function updateBalls() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    if (balls[i].y >= windowHeight-radius) {
      balls[i].y = windowHeight-radius;
      balls[i].vy = -balls[i].vy*0.75;
    }

    let cnt = 0;
    for (let i = 0; i < balls.length; i++) {
      if (balls[i].x + radius > 0 && balls[i].x - radius < windowWidth) {
        balls[cnt++] = balls[i];
      }
    }

    while (balls.length > cnt) {
      balls.pop();
    }
  }
}

// 在 x, y 位置添加数字 num
function addBalls(x, y, num) {
  for (let i = 0; i < digit[num].length; i++) {
    for (let j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        let aBall = {
          x: x + j * 2 * (radius + 1) + (radius + 1),
          y: y + i * 2 * (radius + 1) + (radius + 1),
          // g: 1.5 + Math.random(),
          g: 0.8,
          vx: Math.pow(-1, Math.round(Math.random() + 1)) * 4,
          // vy: -5,
          vy: Math.round(Math.random()*10-5),
          color: colors[Math.floor(Math.random()*colors.length)]
        };

        balls.push(aBall);
      }
    }
  }
}

// 画所有数字
function render(context) {
  context.clearRect(0, 0, windowWidth, windowHeight);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  renderDigit(marginLeft, marginTop, parseInt(hours/10), context);
  renderDigit(marginLeft+15*(radius+1), marginTop, parseInt(hours%10), context);
  renderDigit(marginLeft+30*(radius+1), marginTop, 10, context);
  renderDigit(marginLeft+39*(radius+1), marginTop, parseInt(minutes/10), context);
  renderDigit(marginLeft+54*(radius+1), marginTop, parseInt(minutes%10), context);
  renderDigit(marginLeft+69*(radius+1), marginTop, 10, context);
  renderDigit(marginLeft+78*(radius+1), marginTop, parseInt(seconds/10), context);
  renderDigit(marginLeft+93*(radius+1), marginTop, parseInt(seconds%10), context);

  for (let i = 0; i < balls.length; i++ ) {
    context.fillStyle = balls[i].color;
    context.beginPath();
    context.arc(balls[i].x, balls[i].y, radius, 0, 2*Math.PI);
    context.closePath();
    context.fill();
  }

}

// 画一个数字所需的所有圆，x, y 为该数字的起始位置，num 表示哪个数字
// 每个数字由10 * 7的数组组成，1表示该位置有颜色，0表示该位置没有颜色
function renderDigit(x, y, num, context) {
  context.fillStyle = 'blue';
  
  for (let i = 0; i < digit[num].length; i++) {
    for (let j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        context.beginPath();
        context.arc( x+j*2*(radius+1)+(radius+1), y+i*2*(radius+1)+(radius+1), radius, 0, 2*Math.PI );
        context.closePath();
        context.fill();
      }
    }
  }
}
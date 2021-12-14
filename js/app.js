const canvas = document.getElementById("LimitBreak");

const ctx = canvas.getContext("2d");

canvas.style.border = "1px solid #0ff";

//Variables
const bgImage = new Image();
// bgImage.src = //URL

const paddleHeight = 30;
const paddleWidth = 150;
const paddleMarginBot = 50;
let leftArrow = false;
let rightArrow = false;


//Event Listeners


document.addEventListener("keydown", function(event){
    if(event.keyCode == 37){
        leftArrow = true;
    }else if(event.keyCode == 39){
        rightArrow = true
    }
});

document.addEventListener("keyup", function(event){
    if(event.keyCode == 37){
        leftArrow = false;
    }else if(event.keyCode == 39){
        rightArrow = false;
    }
    
});

function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < canvas.width){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}


const paddle = {
    x: canvas.width/2 -  paddleWidth/2,
    y: canvas.height - paddleHeight - paddleMarginBot,
    width: paddleWidth,
    height: paddleHeight,
    dx: 5
}

function drawPaddle(x,y){
    ctx.fillStyle = "blue";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.strokeStyle = "lime";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}


// drawRect(325,700);
// ctx.clear(0, 0, canvas.clientWidth, canvas.height);
drawPaddle();
movePaddle();

function loop(){
    //clear canvas
    ctx.drawImage(BG_)
    draw();
    update();
    requestAnimationFrame(loop);

}
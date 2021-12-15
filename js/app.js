const canvas = document.getElementById("LimitBreak");

const ctx = canvas.getContext("2d");

canvas.style.border = "1px solid #0ff";

//Variables
const bgImage = new Image();
bgImage.src = "img/Totoro.jpeg"

//Create Paddle Object

const paddleHeight = 30;
const paddleWidth = 150;
const paddleMarginBot = 50;
let leftArrow = false;
let rightArrow = false;

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

document.addEventListener("keydown", function(event){ 
    if(event.code == "ArrowLeft"){
        leftArrow = true;
    }else if(event.code == "ArrowRight"){
        rightArrow = true;
    }
 });
 document.addEventListener("keyup", function(event){
    if(event.code == "ArrowLeft"){
        leftArrow = false;
    }else if(event.code == "ArrowRight"){
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


//Create Ball Object
const ballRad = 10;
const ball = {
    x:canvas.width/2,
    y:paddle.y- ballRad,
    radius: ballRad,
    speed:3,
    dx:3,
    dy:-3,
    image: new Image(),
    
}
ball.image.src = "https://image.pngaaa.com/239/637239-middle.png"
//Draw ball function
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    
    ctx.strokeStyle = "#8f1010";
    ctx.stroke();
    
    ctx.closePath();

}

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

//Functons/Methods


function wallCollision(){
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
        // WALL_HIT.play();
    }
    
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
        // wallHit.play();
    }
    
// //     if(ball.y + ball.radius > canvas.height){
// //         LIFE--; // LOSE LIFE
// //         LIFE_LOST.play();
//         resetBall();
// //     }
}

function resetBall(){

}

// To reset the ball
function ballReset(){
    ball.x = canvas.width/2;
    ball.y = paddle.y - ballRad;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

function draw(){
    drawPaddle();
    drawBall();
}

function update(){
    movePaddle();
    moveBall();
    wallCollision();
}

function loop(){
    //clear canvas
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    draw();
    update();
    requestAnimationFrame(loop);
}

loop();

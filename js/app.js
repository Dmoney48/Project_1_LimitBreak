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
let lives = 3;

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
    ctx.fillStyle = "red";
    ctx.fill()
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
        //sound for wall hit
    }
    
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
        //sound for wall hit
    }
    
    if(ball.y + ball.radius > canvas.height){
        lives--; // lose life sound?
        ballReset();
    }
}


// To reset the ball
function ballReset(){
    ball.x = canvas.width/2;
    ball.y = paddle.y - ballRad;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

function ballAndPaddleHit(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){
        
        // PLAY PADDLE HIT SOUND
        let ballToPaddle = ball.x - (paddle.x + paddle.width/2);
        ballToPaddle = ballToPaddle/ (paddle.width/2);
        let angle = ballToPaddle * Math.PI/3;
        
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}
//BRICKED UP
const brick = {
    row: 3,
    column: 6,
    width: 75,
    height: 20,
    offSetLeft : 35,
    offSetTop : 40,
    marginTop : 10,
    fillColor : "#47d911",
    strokeColor : "#FFF"

}
let bricks = [];

function makeBricks(){
    for(let i=0 ; i < brick.row; i++){
        bricks[i] = [];
        for(let g = 0; g < brick.column; g++){
            bricks[i][g]= {
                x : g * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                y : i * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                status : true
            }
        }
    }
}

makeBricks();

function drawBricks(){
    for(let i = 0; i < brick.row; i++){
        for(let g = 0; g < brick.column; g++){
            let brickz = bricks[i][g];
            // if the brick isn't broken
            if(brickz.status){
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(brickz.x, brickz.y, brick.width, brick.height);
                
                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(brickz.x, brickz.y, brick.width, brick.height);
            }
        }
    }
}

function ballBrickCollision(){
    for(let i = 0; i < brick.row; i++){
        for(let g = 0; g < brick.column; g++){
            let newBricks = bricks[i][g];// runs through brick array in new brick array
           // But adds conditional if status is true that it's there wall collide THEN turn itself false. 
            if(newBricks.status){//Applied wall collision params
                if(ball.x + ball.radius > newBricks.x && ball.x - ball.radius < newBricks.x + brick.width && ball.y + ball.radius > newBricks.y && ball.y - ball.radius < newBricks.y + brick.height){
                    //Brick breaking sound?
                    ball.dy = - ball.dy;
                    newBricks.status = false; // this is the conditional for the brick breaking
                    //increment score value TBD. 
                }
            }
        }
    }
}

function draw(){
    drawPaddle();
    drawBall();
    drawBricks();
}

function update(){
    movePaddle();
    moveBall();
    wallCollision();
    ballAndPaddleHit()
    ballBrickCollision();
}

function loop(){
    //clear canvas
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    draw();
    update();
    requestAnimationFrame(loop);
}

loop();

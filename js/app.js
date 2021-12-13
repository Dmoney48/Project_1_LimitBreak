const cvs = document.getElementById("LimitBreak");

const ctx = cvs.getContext("2d");

cvs.style.border = "1px solid #0ff";


function drawRect(x,y){
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, 150, 30);
}


drawRect(325,700);

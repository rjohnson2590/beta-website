(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
 
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 500,
    height = 200,
    player = {
      x : width/2,
      y : height - 5,
      width : 5,
      height : 5,
      speed: 3,
      velX: 0,
      velY: 0,
      jumping: false,
      grounded: false
    },
    keys = [],
    friction = 0.8;
    gravity = 0.2;

var blocks = [];

blocks.push({
  x:0,
  y:0,
  width: 10,
  height: height
});
blocks.push({
  x:0,
  y: height - 2,
  width: width,
  height: 50
});
blocks.push({
  x: width-10,
  y:0,
  width: 50,
  height: height
});
blocks.push({
    x: 70,
    y: 50,
    width: 40,
    height: 40
});
blocks.push({
    x: 170,
    y: 50,
    width: 80,
    height: 80
});
blocks.push({
    x: 320,
    y: 100,
    width: 80,
    height: 80
});
blocks.push({
    x: 270,
    y: 150,
    width: 40,
    height: 40
});



canvas.width = width;
canvas.height = height;
 
function update(){
  // check keys
    if (keys[38] || keys[32]) {
        // up arrow or space
      if(!player.jumping && player.grounded){
       player.jumping = true;
       player.grounded= false;
       player.velY = -player.speed*2;
      }
    }
    if (keys[39]) {
        // right arrow
        if (player.velX < player.speed) {             
            player.velX++;         
         }     
    }     
    if (keys[37]) {         
        // left arrow         
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }
 
    player.velX *= friction;
 
    player.velY += gravity;
 


  ctx.clearRect(0,0,width,height);
  ctx.fillStyle= 'black';
  ctx.beginPath();
  player.grounded= false;
  for (var i =0; i< blocks.length; i++){
    ctx.rect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height)
    
    var dir = colCheck(player, blocks[i]);
    if (dir === "l" || dir === "r") {
     player.velX = 0;
     player.jumping = false;
 } else if (dir === "b") {
     player.grounded = true;
     player.jumping = false;
 } else if (dir === "t") {
     player.velY *= -1;
 }
    
  }
  if(player.grounded){
     player.velY = 0;
}
    
  


   

 console.log(player.y)
  player.x += player.velX;
  player.y += player.velY;
  ctx.fill();

  ctx.strokeStyle='#000000';
  ctx.fillStyle= 'gold';
  ctx.beginPath();
  ctx.lineWidth="4";
  ctx.arc(90,45, 5, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);
  if(player.x>=85 && player.x<=95 && player.y>=40 && player.y<=50){
    var newUrl=['game.html']
    window.alert('Access Granted')
    window.location.replace(newUrl)
    return;
  }

  requestAnimationFrame(update);
}
 
function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null
 
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)        
     var oX = hWidths - Math.abs(vX),             oY = hHeights - Math.abs(vY);         if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
 
document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});
 
window.addEventListener("load",function(){
    update();
});


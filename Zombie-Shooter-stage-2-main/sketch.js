var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var score=0
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var bulletnum=50
var zombieGroup;
var gameState="play"
var bullet
var life=3
var lose,win,explosion


function preload(){

  lose = loadSound("assets/lose.mp3")
  win = loadSound("assets/win.mp3")
  explosion = loadSound("assets/explosion.mp3")

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
  // player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    zombieGroup = new Group();
    bulletGroup = new Group();
}

function draw() {
  background(0); 

if (gameState==="play") {
  
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  
  player.addImage(shooter_shooting)
  
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  bullet = createSprite(displayWidth-1150, player.y, 10, 10);
  bullet.velocityX = 100
  player.addImage(shooterImg)
  bulletnum=bulletnum-1
  bulletGroup.add(bullet)
  lose.play();
}



//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){

 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       life=life-1
       } 
 }
}

if (life===3) {
  heart1.visible=false
  heart2.visible=false
  heart3.visible=true
}
if (life===2) {
  heart1.visible=false
  heart2.visible=true
  heart3.visible=false
}
if (life===1) {
  heart1.visible=true
  heart2.visible=false
  heart3.visible=false
}
if (life===0) {
  heart1.visible=false
  heart2.visible=false
  heart3.visible=false
  gameState="loss"
  explosion.play();
}

if(bulletGroup.isTouching(zombieGroup)){
 

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(bulletGroup.isTouching(zombieGroup[i])){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        score=score+1
        } 
  }
 }

if (score===50) {
  gameState="won"
  win.play();
}

if (bulletnum===0) {
  gameState="bullet"
  lose.play();
}
//calling the function to spawn zombies
enemy();
}
drawSprites();
fill("white")
  text(" SCORE:" + score,displayWidth-150,100) 
  text(" BULLET:" + bulletnum,displayWidth-150,150) 

  if (gameState==="bullet") {
    textSize(105)
    text("YOU ARE BUSTED",450,500)
    player.destroy();
    bulletGroup.destroyEach();
    zombieGroup.destroyEach();
  }
  else if(gameState==="won") {
    textSize(105)
    text("YOU WON",500,500)
    player.destroy();
    bulletGroup.destroyEach();
    zombieGroup.destroyEach();
  }
  else if(gameState==="loss") {
    textSize(105)
    text("YOU LOST",500,500)
    player.destroy();
    bulletGroup.destroyEach();
    zombieGroup.destroyEach();
  }
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(1500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    //zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,1000)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}

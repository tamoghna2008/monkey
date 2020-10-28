
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var obstacleGroup;
var bananaGroup;
var survivalTime;
var score;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
 
  
   monkey=createSprite(100,550,20,20);
  monkey.addAnimation("monkeyRunning", monkey_running )
  monkey.scale=0.1
  ground=createSprite(300,580,1200,5)
  ground.x=ground.width/2;
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
  survivalTime=0;
  score=0;
  gameOver=11;
  
  
 
 
  

  
}


function draw() {
  background("red")
  text("survivalTime = "+survivalTime,100,10)
  text("score: "+score,300,10)
  monkey.collide(ground)
   if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(gameState===PLAY){
    obstacle();
    banana();
     survivalTime=Math.round(frameCount/frameRate())
  if(keyDown("space")&&monkey.y>=490){
     monkey.velocityY=-12
     }
  monkey.velocityY=monkey.velocityY+1
  ground.velocityX=-2
 
    if(bananaGroup.isTouching(monkey)){
    score=score+1; 
    bananaGroup.destroyEach()
    }
    if(obstacleGroup.isTouching(monkey)){
      gameState=END
    }
  }
  else if(gameState===END){
        ground.vlocityX=0;
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setVelocityXEach(0);
        text("gameOver",300,300);
        if(keyDown("r")){
          reset();
        }
        
    
    
  }
  
  drawSprites();
  

  
}
function obstacle(){
  if(frameCount%300===0){
  var obstacle=createSprite(600,560,30,30);
      obstacle.addImage("obstacle", obstaceleImage)
      obstacle.velocityX=-2;
      obstacle.scale=0.1;
      obstacleGroup.add(obstacle)
  }
  }
function banana(){
 if(frameCount%200===0){
    var banana=createSprite(500,200,20,20);
    banana.addImage("banana",bananaImage);
    banana.y=Math.round(random(550,400));
    banana.velocityX=-2;
    banana.scale=0.1;
    bananaGroup.add(banana);
    }
  }
function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  score=0;
  survivalTime=0;
}








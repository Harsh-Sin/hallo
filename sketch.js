var bird,birdupdown;
var cloud,cloudImage;
var num;
var cloudsGroup;
var score=0;
var obstacle1,obstacle1im;
var obstacle2,obstacle2im;
var obstacleGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver;
function preload(){
  birdupdown=loadAnimation("wingdown.png","wingup.png");
  cloudImage=loadImage("clouds.png");
  obstacle1im=loadImage("obstacle1.png");
  obstacle2im=loadImage("obstacle2.png");
  gameOver=loadAnimation("gameOver.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  bird=createSprite(windowWidth/2,windowHeight/2,20,20);
  bird.addAnimation("bird",birdupdown);
  bird.scale=windowWidth/850;
  cloudsGroup=createGroup();
  obstacleGroup=createGroup();
}

function draw() {
  background("white");
  if(gameState==PLAY){
  spawnObstacles();
    if(keyDown("right")){
      bird.x=bird.x+10;
    }
    if(keyDown("left")){
      bird.x=bird.x-10;
    }
    if(obstacleGroup.lifetime==1){
      score+=1;
    }
    text("Score: "+score,windowWidth/2.5,30);
  }
  if(bird.isTouching(obstacleGroup)){
    bird.addAnimation("bird",gameOver);
    bird.x=windowWidth/2;
    bird.y=windowHeight/2;
    gameState=END;
  }
  if(gameState==END){
    obstacleGroup.destroyEach();
  }
  textSize(30);
  
  drawSprites();
  
}

function spawnObstacles(){
  
  num=Math.round(random(1,2))
  if(frameCount%120==0){
  switch(num){
    case 1:
      obstacle1=createSprite(120,0,40,40);
      obstacle1.x=Math.round(random(0,windowWidth));
      obstacle1.velocityY=2;
      obstacle1.lifetime=200;
      obstacle1.addImage("obstacle1",obstacle1im);
      obstacle1.scale=windowWidth/700;
      
      obstacleGroup.add(obstacle1);
      break;
    case 2:
      obstacle2=createSprite(120,0,100,40);
      obstacle2.x=Math.round(random(0,windowWidth));
      obstacle2.velocityY=2;
      obstacle2.lifetime=200;
      obstacle2.addImage("obstacle1",obstacle2im);
      obstacle2.scale=windowWidth/650;
      
      obstacleGroup.add(obstacle2);
  }
  }
  
}
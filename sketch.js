var PLAY = 1;
var END = 0;
var gameState = PLAY;

var groung,groundImg
var rocket,rocketImg
var alien,alienImg,alienGroup
var star,starImg,starGroup
var gOver,gOverImg
var asteroid,asteroidImg,asteroidGroup
var laser,laserImg,laserGroup
var sound;
var score =0;
var restart,rImg
function preload(){
 groundImg=loadImage("1253115.jpg");
 rocketImg=loadImage("ROCKET.png");
 alienImg=loadImage("skull.png");
 alienGroup=new Group();
 starImg=loadImage("star.png");
 starGroup=new Group();
 asteroidImg=loadImage("do.png");
  asteroidGroup=new Group();
 laserImg=loadImage("lazer.jpg");
 gOverImg=loadImage("gover.png");
 sound=loadSound("Super.mp3");
rImg=loadImage("restart-.png");
                      
                    
}

function setup() {
 createCanvas(600,600);
 
  ground=createSprite(300,300);
ground.addImage(groundImg);
  ground.velocityY = -7;
  ground.scale = 1.3;
  
  rocket=createSprite(300,400);
  rocket.addImage(rocketImg);
  rocket.scale = 0.7;
  
  gOver=createSprite(300,200);
  gOver.addImage(gOverImg);
  gOver.visible= false;
      rocket.depth=gOver+1;

  restart=createSprite(300,450);
  restart.addImage(rImg);
  restart.visible= false;
  rocket.depth=restart+1;
//////////////////////////////////////////  
  block=createSprite(200,600,1000,20);
  block.visible= false;
//////////////////////////////////////////////  
  rocket.setCollider("rectangle",0,0,60,60);
//rocket.debug = true
  
}

function draw() {
 background("black"); 
 textSize(60);
  text("wait for score guy !",30,580);
  textSize(30);
fill("white");
text("⭐Score:"+score,5,50);
  ground.velocityY= -(6 + score/1);
////////////////////////////////////////// 
if(gameState === PLAY) {
  if(ground.y<0){
    ground.y=300;}
  if(keyDown("up_arrow")){
    rocket.velocityY = -6;}
  
  if(keyDown("left_arrow")){
    rocket.x=rocket.x -6;
  }
  if(keyDown("right_arrow")){
    rocket.x=rocket.x +6;
  }
  
  rocket.velocityY= rocket.velocityY+0.5;
  if(starGroup.isTouching(rocket)){
    starGroup.destroyEach();
    score = score+2;
    sound.play();
  }
  
  starSpawn();
  alienSpawn();
  asteroidSpawn();
  
  if(keyDown("space")){
    rocket.velocityY = -6;}
  
 

}
if(alienGroup.isTouching(rocket)||
   asteroidGroup.isTouching(rocket)||
   block.isTouching(rocket)){
 gameState=END;
  gOver.visible=true;
  restart.visible= true;
  
  
//asteroidGroup.setVelocityYEach(0);
alienGroup.setVelocityYEach(0);
alienGroup.destroyEach();
starGroup.setVelocityYEach(0);
starGroup.destroyEach(); 
rocket.velocityY = 0;
  asteroidGroup.setVelocityYEach=(0);
  asteroidGroup.destroyEach();
  rocket.visible=false;
// ground.setVelocityY(-0);
}
  

  if(mousePressedOver(restart)) {
      reset();
    rocket.x=300;
    rocket.y=300;
    rocket.visible=true;
    }
  
  
drawSprites();}
  

  
/////////////////////////////////////////////////
function starSpawn(){
  if(frameCount%150===0){
     star=createSprite(Math.round(random(50, width-50),40, 10, 10));    
    star.velocityY =4;
    star.addImage(starImg);
    //star.x=Math.round(random(80,500));
    starGroup.add(star);
    star.lifetime=200;
    star.scale=0.1;
  
  }
}
function alienSpawn(){
  if(frameCount%160===0){
    alien=createSprite(Math.round(random(50, width-50),40, 10, 10));    
    alien.velocityY =4;
    alien.addImage(alienImg);
    //alien.x=Math.round(random(70,600));
    alienGroup.add(alien);
    alien.lifetime=200;
    alien.scale=0.2;
    rocket.depth=alien.depth+1;
     }
}
function asteroidSpawn(){
if(frameCount%150===0){
  asteroid=createSprite(Math.round(random(50, width-50),40, 10, 10));    
  asteroid.velocityY=4;
  asteroid.addImage(asteroidImg);
  //asteroid.x=Math.round(random(90,550));
  asteroid.lifetime=200;
  asteroid.scale=0.4;
  asteroidGroup.add(asteroid);
}
}

function reset(){
   gameState=PLAY;
  

  
  
  
  gOver.visible=   false;
  restart.visible= false;
  starGroup.destroyEach(); 
 alienGroup .destroyEach(); 
  asteroidGroup.destroyEach(); 
  score =0;
}
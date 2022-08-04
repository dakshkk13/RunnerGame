var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("space.jpg");
  doorImg = loadImage("planet.png");
  climberImg = loadImage("bar.png");
  ghostImg = loadImage("rocket.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);


  
  tower = createSprite(300,300,100,900000);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.scale = 5.5;
   
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,50,1,1);
  ghost.addImage("standing",ghostImg);
  ghost.scale = 0.05;
 

}

function draw() {
  background(200);
  
  if (gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }
    
    if (keyDown("space")){
    ghost.velocityY = -4;
    }

    if(keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 2;
    }

    if(keyDown("left")){
      ghost.x = ghost.x-2;
    }
    
    ghost.velocityY = ghost.velocityY + 1;

    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }

    spawnDoors();    
    drawSprites();
  }

if (gameState === "end"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over",230,250);
}
  
} 
  
function spawnDoors(){
     
  if (frameCount % 300 === 0){
    
     door = createSprite(200,-50); 
     door.addImage("door",doorImg);
     door.scale = 0.1

     climber = createSprite(200,10);
     climber.addImage("climber",climberImg);
     climber.scale = 0.00000000000001;
     climber.width = 150;

     invisibleBlock = createSprite(200,15);
     invisibleBlock.width = climber.width;
     invisibleBlock.height = 2;
     

     door.x = Math.round(random(120,1600));
     door.velocityY = 1;

     climber.x = door.x;
     climber.velocityY = 1;

     invisibleBlock.x = door.x
     invisibleBlock.velocityY = 1;

     
     door.lifetime = 800;
     doorsGroup.add(door);

     climber.lifetime = 800;
     climbersGroup.add(climber);

     invisibleBlockGroup.add(invisibleBlock);
     invisibleBlock.debug = false;

     door.depth = ghost.depth;
     ghost.depth += 1;
    }
   
}

var gameState = "play";

var towerImage,tower;
var doorImage,door;
var climberImage,climber;

var ghostImage,ghost,spooky;






function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  spooky = loadSound("spooky.wav");

}

function setup(){
  createCanvas(600,600);
  spooky.loop();
  
  tower = createSprite(300,300,40,50);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  ghost = createSprite(200,300,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw(){
 background(0);
  
  if(gameState === "play"){
   
    if(tower.y>500){
   tower.y=300 
  }  
    if(keyDown ("space")){
   ghost.velocityY = -8; 
  }
  
  ghost.velocityY = ghost.velocityY+0.8;
  
  if(keyDown("left")){
  ghost.x = ghost.x-3;  
  }
   
  
  if(keyDown("right")){
  ghost.x = ghost.x +3;  
  }
    spawnDoors();
    
    if(climberGroup.isTouching(ghost)){
     ghost.velocityY = 0; 
    }
    
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
     ghost.destroy();
     gameState  = "end"; 
      
    }
  }
  
  if(gameState === "end"){
    stroke("White");
    fill("White");
    textSize(30);
    text("Game Over",300,300);
  }
  
  
  
  
  
  
  
  
  
  drawSprites();
}

function spawnDoors(){
  if(frameCount%200 === 0){
 door=createSprite(200,-50,20,20);
 door.addImage(doorImage);
 door.velocityY = 2;
 door.x=Math.round(random(120,320));
 door.lifetime =300;    
 
 climber = createSprite(180,10,20,20);
 climber.addImage(climberImage);
 climber.velocityY = 2; 
 climber.lifetime =300;
 climber.x=door.x;
 //Add each door to the group
   doorGroup.add(door);
   climberGroup.add(climber);
   
    
    ghost.depth = door.depth;
    ghost.depth=ghost.depth+1;

  var invisibleBlock = createSprite(180,15,10,2);
    invisibleBlock.velocityY = 2;
    invisibleBlockGroup.add(invisibleBlock); 
  
  
  }
}


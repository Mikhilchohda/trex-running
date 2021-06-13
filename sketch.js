var trex, trex_running, trex_collided,a;
var ground, invisibleGround, groundImage;
var jumpsound,checkpoint,die
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score
var gameState="play"
var obstacleGroup,cloudGroup

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  jumpsound=loadSound("jump.mp3")
  checkpoint=loadSound("checkPoint - Copy.mp3")
  die=loadSound("die.mp3")
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  g1=loadImage("gameOver.png");
  r1=loadImage("restart.png")
  
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  a=5
  trex = createSprite(50,height-20,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  trex.debug=false;
  trex.setCollider("circle",0,0,60)
  
  ground = createSprite(200,height-20,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX =-(4+Math.round(frameCount/100));
  
  invisibleGround = createSprite(200,height-10,400,10);
  invisibleGround.visible = false;
  
  gameover=createSprite(width/2,height/2,20,20)
  gameover.addImage(g1)
  gameover.scale=1.8
  
  restart=createSprite(width/2,height/2+30,20,20)
  restart.addImage(r1)
  restart.scale=0.5
  
  score = 0;
  
  obstacleGroup=new Group();
  cloudGroup=new Group();
}

function draw() {
  background(180);
  text("Score: "+ score, 10,50);
  console.log(a)
  if(gameState==="play")
    {
  score=score+Math.round(frameCount/200)
  
  if((touches.length>0||keyDown("space"))&& trex.y > height-60) {
    trex.velocityY = -13;
    jumpsound.play()
    touches=[]
  }
  gameover.visible=false
  restart.visible=false
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  //spawn the clouds
  spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();
      
      if(obstacleGroup.isTouching(trex)) {
        gameState="end"
        
        die.play()
    }
      if(score>0&&score%100===0){
        checkpoint.play()
      }
      
    }
      if(gameState==="end"){
        
        ground.velocityX=0
        obstacleGroup.setVelocityXEach(0)
        cloudGroup.setVelocityXEach(0)
        obstacleGroup.setLifetimeEach(-1);
        cloudGroup.setLifetimeEach(-1);
        trex.changeAnimation("collided" , trex_collided)
        gameover.visible=true
        restart.visible=true
        if(mousePressedOver(restart)){
        reset();
        }
      }
  trex.velocityY = trex.velocityY + 0.8
  trex.collide(invisibleGround);
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,height-35,10,40);
   obstacle.velocityX =-(6+Math.round(score/400));

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   obstacleGroup.add(obstacle)
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,height-100,40,10);
    cloud.y = Math.round(random(height-190,height-140));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud)
  }
  
}

function reset(){
  gameState="play"
          obstacleGroup.destroyEach();
          cloudGroup.destroyEach();
          score=0
          ground.velocityX=-3
          trex.changeAnimation("running",trex_running)
}


















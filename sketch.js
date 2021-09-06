var space, spaceImg;
var asteroid, asteroidImg, asteroidsGroup;
var star, starImg, starsGroup;
var rocket, rocketImg;
var gameOver, gameOverImg;
var gameState = "play";
var score=0;

function preload(){
    starImg=loadImage("star.png");
    asteroidImg=loadImage("asteroid.png");
    spaceImg=loadImage("spaceBackground.png");
    rocketImg=loadImage("rocketShip.png");
    gameOverImg=loadImage("gameOver.png");
}

function setup() {
 createCanvas(600,600);

 space=createSprite(300,300,600,600);
 space.addImage("space", spaceImg);
 space.scale=2
 space.velocityY=1
 
 rocket=createSprite(300,300,50,50);
 rocket.addImage("rocket",rocketImg);
 rocket.scale=0.5;
 rocket.velocityY=4;

 starsGroup=new Group();
 asteroidsGroup=new Group();
}

function draw() {
    background("black");
    
    console.log("textColorB")
    fill("yellow");
    text("Score: "+ score, 100,50);
    console.log("textDone")

    if (gameState === "play"){
     if(space.y>400){
     space.y=360;
     }

     if(keyDown("space")){
         rocket.velocityY=-5;
     }
     rocket.velocityY=rocket.velocityY+0.8;
     if(keyDown("RIGHT_ARROW")){
         rocket.velocityX=2
     }

     if (keyDown("LEFT_ARROW")){
         rocket.velocityX=-2;
     }

     if(rocket.isTouching(starsGroup)){
         score=score+1;
         starsGroup.destroyEach();
     }
     if(rocket.isTouching(asteroidsGroup)){
        gameState="end";
     }
    }
    if(gameState==="end"){
        asteroidsGroup.destroyEach();
        starsGroup.destroyEach();
        rocket.destroy();
        space.velocityY=0;
        gameOver=createSprite(300,300,100,100);
        gameOver.addImage("gameover",gameOverImg);
    }
    
    spawnAsteroid();
    spawnStar();
    drawSprites();
}

function spawnAsteroid(){
    if(frameCount%200==0){
        asteroid=createSprite(Math.round(random(10,550)),0,50,50);
        asteroid.addImage("asteroid",asteroidImg);
        asteroid.scale=0.3;
        asteroid.velocityY=3;
        asteroid.lifetime=800;
        asteroid.depth=rocket.depth;
        rocket.depth=rocket.depth+1;
        asteroidsGroup.add(asteroid);
    }
}

function spawnStar(){
    if(frameCount%300==0){
        star=createSprite(Math.round(random(10,550)),0,50,50)
        star.addImage("star",starImg);
        star.scale=0.3;
        star.velocityY=3;
        star.lifetime=800;
        star.depth=rocket.depth;
        star.depth=star.depth+1;
        starsGroup.add(star);
    }
}
// creates the variables
  var PLAY = 1;
  var END = 0;
  var gameState = 1;

  var knife, knife_animation;

  var alienGroup, alien1, alien2;
  var fruitGroup, fruit1, fruit2, fruit3, fruit4;

  var score = 0;

  var alien1_animation, alien2_animation, fruit1_animation, fruit2_animation, fruit3_aniamtion, fruit4_animation, sword_animation, gameOver_animation;

//preloads the images and the animations
  function preload(){
    alien1_animation = loadImage("alien1.png");
    alien2_animation = loadImage("alien2.png");
    fruit1_animation = loadImage("fruit1.png");
    fruit2_animation = loadImage("fruit2.png");
    fruit3_animation = loadImage("fruit3.png");
    fruit4_animation = loadImage("fruit4.png");
    sword_animation = loadImage("sword.png");
    gameOver_animation = loadImage("gameover.png");

  }

// creates the fruits and spawn them at different positions
  function fruits(){
    if(World.frameCount%80 === 0){
      fruit = createSprite(400,200,20,20);
      fruit.scale = 0.2;
      //fruit.debug = true
      r = Math.round(random(1,4));
      if(r == 1) {
        fruit.addImage(fruit1_animation);
      } else if(r == 2){
        fruit.addImage(fruit2_animation);
      } else if(r == 3){
        fruit.addImage(fruit3_animation);
      } else if(r == 4){
        fruit.addImage(fruit4_animation);
      }
      fruit.y = Math.round(random(50,340));

      fruit.velocityX = -7;
      fruit.setLifeTime = 100;

      fruitGroup.add(fruit);

      }
    }

//create the aliens and spawn them on different positions
  function aliens(){
    if(World.frameCount%200 === 0){
      alien = createSprite(400,200,20,20);
      alien.scale = 1;
      //alien.debug = true
      r = Math.round(random(1,2));
      if(r == 1){
        alien.addImage(alien1_animation);
      } else if(r == 2){
        alien.addImage(alien2_animation);
      }
      alien.y = Math.round(random(60,370));

      alien.velocityX = -8;
      alien.setLifeTime = 50;

      alienGroup.add(alien);
    }
  }


  function setup(){
    //creates the sword and add animation to it
    sword = createSprite(100,100,10,10);
    sword.addImage(sword_animation);
    sword.scale = 0.5;

    //creates the fruit and alien group
    fruitGroup = createGroup();
    alienGroup = createGroup();
    
    //set the collider for the sword
    sword.setCollider("circle",0,0,70);
    //sword.debug = true;
  }

  function draw(){
    //colors the background
    background('cyan');

    //states the conditions that should be implemented when the gamestate is PLAY
    if (gameState === PLAY){
      fruits();
      aliens();
      sword.y = World.mouseY;
      sword.x = World.mouseX;
    }

    //increases the score and destroys the fruit group when the sword touches the fruits
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score+2
    }

    //implements the statements that should be true when the alien group touches the sword
    if(alienGroup.isTouching(sword)){
      gameState = END;
      alienGroup.destroyEach();
      fruitGroup.destroyEach();
      sword.addImage(gameOver_animation);
      alienGroup.setVelocityXEach(0);
      fruitGroup.setVelocityXEach(0);
      sword.scale = 0.9;
      sword.y = 200;
      sword.x = 200;
    }
    
    //sets the life time so that the objects don't disappear after some time the game gets over
    if(gameState === END){
      alienGroup.setLifetimeEach(-1);
      fruitGroup.setLifetimeEach(-1);
    }

    //draws the sprites
    drawSprites();
    //displays the score
    text('score: ' + score,200,20);
  }
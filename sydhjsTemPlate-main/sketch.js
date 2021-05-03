var starImg,bgImg;
var star, starBody;
var fairy, fairyImage, fairySound, fairyBody;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starNight.png");
	fairyImage = loadAnimation("images/fairyImage1.png", "images/fairyImage2.png")

	fairySound = loadSound("sound/JoyMusic.mp3");
	
}

function setup() {
	createCanvas(800, 750);

	fairySound.loop();

	fairy = createSprite(150, 600);
	fairy.addAnimation("fairy", fairyImage);
	fairy.scale = 0.35;

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;


	engine = Engine.create();
	world = engine.world;
	
	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	
	var fairyOptions = {

		isStatic : true

	}

	fairyBody = Bodies.circle(190, 500, 200, fairyOptions);
	World.add(world, starBody, fairyBody);

	Engine.run(engine);

}


function draw() {
  background(bgImg);
  
  Engine.update(engine);

  star.x= starBody.position.x 
  star.y= starBody.position.y 

  fairy.position.x = fairyBody.position.x
  fairy.position.y = fairyBody.position.y;

  console.log(starBody.position.y);

  //write code to stop star in the hand of fairy
  if(fairy.x >= 460 && fairy.x <= 490 && star.y >= 460){

	Matter.Body.setStatic(starBody, true);

  }
  if(fairy.x <= 390 && star.y >= 460){

	Matter.Body.setStatic(starBody, false);

  }
  drawSprites();

}

function keyPressed() {

	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(starBody,false); 
	}

	if(keyCode === RIGHT_ARROW ) {

		fairyBody.position.x = fairyBody.position.x + 10;

	}

	if(keyCode === LEFT_ARROW) {

		fairyBody.position.x = fairyBody.position.x - 10;

	}
	
}

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var bgimg, torre, canon;
var torreimg,solo;
var bola,angulo;
var bolas = [];
function preload() {

  bgimg = loadImage("./assets/background.gif");
  torreimg = loadImage("./assets/tower.png");

}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES);
  angulo = 15
  var options ={
    isStatic:true
  }
  solo = Bodies.rectangle(0,height-1,width*2,1,options);
  World.add(world,solo)
 
  torre = Bodies.rectangle(160,350,160,310,options);
  World.add(world,torre);

  canon = new Canon(180,110,130,100,angulo);
  
 
}

function draw() {
  image(bgimg,0,0,width,height);
 
  Engine.update(engine);
  
  rect(solo.position.x,solo.position.y,2400,1); 
  push();
  imageMode(CENTER);
  image(torreimg,torre.position.x,torre.position.y,160,310);
  pop();

  canon.display();
  for(var i =0; i<bolas.length; i++){
    showBalls(bolas[i],i)
  }
}

function keyReleased(){
  if (keyCode ===DOWN_ARROW){
    bolas[bolas.length-1].shoot();
  }
}

function keyPressed(){
  if (keyCode ===DOWN_ARROW){
    bola = new Ball(canon.x, canon.y);
    bolas.push(bola);
  }
}

function showBalls(bola,i){
  if (bola){bola.display();}
}
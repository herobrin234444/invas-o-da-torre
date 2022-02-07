const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var bgimg, torre, canon;
var torreimg,solo;
var bola,angulo;
var bolas = [];
var barco;
var barcos =[];
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
    showBalls(bolas[i],i);
    colisionboats(i);
  }
    
    showboats();
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
  if (bola){bola.display();
  if (bola.body.position.x>=width || bola.body.position.y>=height-50){
    bola.remove(i);
  }
  }


  
}

function showboats(){
  if (barcos.length>0){
    if( barcos[barcos.length-1]===undefined || barcos[barcos.length-1].body.position.x<width -300){
      var posicoes =[-40,-60,-70,-20];
      var pos =random(posicoes);
      barco = new Boat(width ,height -100,170,170,pos);
     barcos.push(barco);
    }
    for(var i =0; i<barcos.length; i++){
      if(barcos[i]){
      Matter.Body.setVelocity(barcos[i].body,{x:-1,y:0});
      barcos[i].display();
      }
      }
  }
  else{
    barco = new Boat(width -79,height -70,170,170,-80);
    barcos.push(barco);
  }
}

function colisionboats(index){
  for(var i =0; i<barcos.length; i++){
    if(bolas[index]!== undefined && barcos[i]!== undefined){
      var colision =Matter.SAT.collides(bolas[index].body,barcos[i].body);
      if(colision.collided){
        barcos[i].remove(i);
        Matter.World.remove(world,bolas[index].body);
        delete bolas[index];
      } 
    }
  }
}
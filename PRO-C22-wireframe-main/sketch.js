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
var boatanimation = [];
var boatspritedata, boatspriteshet, boatframes;
var brokenanimation = [];
var brokespriteshet, brokenspritedata, brokenframes;
var splashanimation = [];
var spashspriteshet, splashspritedata, splashframes;
var isGameover = false;
var backgroundsound,splashsound,explosionsound,piratesound,score = 0;

function preload() {

  bgimg = loadImage("./assets/background.gif");
  torreimg = loadImage("./assets/tower.png");
  boatspritedata = loadJSON("./assets/boat/boat.json");
  boatspriteshet = loadImage("./assets/boat/boat.png");
  brokenspritedata = loadJSON("./assets/boat/brokenBoat.json");
  brokenspriteshet = loadImage("./assets/boat/brokenBoat.png");
  splashspritedata = loadJSON("./assets/waterSplash/waterSplash.json");
  splashspriteshet = loadImage("./assets/waterSplash/waterSplash.png");
  backgroundsound = loadSound("./assets/background_music.mp3");
  splashsound = loadSound("./assets/cannon_water.mp3");
  explosionsound = loadSound("./assets/cannon_explosion.mp3");
  piratesound = loadSound("./assets/pirate_laugh.mp3");
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

  boatframes = boatspritedata.frames;
  for(var i =0;i<boatframes.length;i++){
    var pos = boatframes[i].position;
    var img = boatspriteshet.get(pos.x,pos.y,pos.w,pos.h);
    boatanimation.push(img);

  }
  brokenframes = brokenspritedata.frames;
  for(var i =0;i<brokenframes.length;i++){
    var pos = brokenframes[i].position;
    var img = brokenspriteshet.get(pos.x,pos.y,pos.w,pos.h);
    brokenanimation.push(img);
  
  }
  splashframes = splashspritedata.frames;
  for(var i =0;i<splashframes.length;i++){
    var pos = splashframes[i].position;
    var img = splashspriteshet.get(pos.x,pos.y,pos.w,pos.h);
    splashanimation.push(img);
  
  }

}

function draw() {
  image(bgimg,0,0,width,height);
  if (!backgroundsound.isPlaying()){
    backgroundsound.play();
    backgroundsound.setVolume(0.1);
  }
 
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
    fill("#6d4c41");
    textSize(40);
    text("pontuação: "+score,width - 200,50);
    textAlign(CENTER,CENTER);
}

function keyReleased(){
  if (keyCode ===DOWN_ARROW){
    bolas[bolas.length-1].shoot();
    explosionsound.play();
  }
}

function keyPressed(){
  if (keyCode ===DOWN_ARROW){
    bola = new Ball(canon.x, canon.y);
   // bola.trajectory =[];
    //Matter.Body.setAngle(bola.body,canon.angle);
    bolas.push(bola);
  }
}

function showBalls(bola,i){
  if (bola){bola.display();
    bola.animate();
  if (bola.body.position.x>=width || bola.body.position.y>=height-50){
    splashsound.play();
    bola.remove(i);
  }
  }


  
}

function showboats(){
  if (barcos.length>0){
    if( barcos[barcos.length-1]===undefined || barcos[barcos.length-1].body.position.x<width -300){
      var posicoes =[-40,-60,-70,-20];
      var pos =random(posicoes);
      barco = new Boat(width ,height -100,170,170,pos,boatanimation);
     barcos.push(barco);
    }
    for(var i =0; i<barcos.length; i++){
      if(barcos[i]){
      Matter.Body.setVelocity(barcos[i].body,{x:-1,y:0});
      barcos[i].display();
      barcos[i].animate();
      var colisao =Matter.SAT.collides(torre,barcos[i].body);
      if (colisao.collided && !barcos[i].isbroken){
        isGameover = true;
        gameover();
      }
      }
      }
  }
  else{
    barco = new Boat(width -79,height -70,170,170,-80,boatanimation);
    barcos.push(barco);
  }
}

function colisionboats(index){
  for(var i =0; i<barcos.length; i++){
    if(bolas[index]!== undefined && barcos[i]!== undefined){
      var colision =Matter.SAT.collides(bolas[index].body,barcos[i].body);
      if(colision.collided){
        score +=5;
        barcos[i].remove(i);
        Matter.World.remove(world,bolas[index].body);
        delete bolas[index];
      } 
    }
  }
}
function gameover(){
  swal({
    title:"fim de jogo",
    text:"obrigado por jogar",
    imageUrl:"https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize:"150x150",
    confirmButtonText:"jogar novamente"
  },
  function(isConfirm){
    if ( isConfirm){
      location.reload();
    }
  }
  );
}
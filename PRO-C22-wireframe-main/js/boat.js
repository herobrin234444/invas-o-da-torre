class Boat {
    constructor(x,y,w,h,bpos,boatanimation){
        this.body = Bodies.rectangle(x,y,w,h);
        this.w =w;
        this.h =h;
       // this.image = loadImage("./assets/boat.png");
        this.boatpos = bpos;
        this.animation = boatanimation;
        this.speed = 0.05;
        World.add(world,this.body);
        
    }
    remove(i){
        this.animation = brokenanimation;
        this.speed = 0.05;
        this.w = 300;
        this.h = 300;
        setTimeout(() =>{
            Matter.World.remove(world,barcos[i].body);
            delete barcos[i];
        },2000);
        

   }
   
   animate(){
    this.speed +=0.05;
   }

    display(){
        var index = floor(this.speed%this.animation.length);
        push();
        translate(this.body.position.x,this.body.position.y);
        rotate(this.body.angle);
        imageMode(CENTER);
        image(this.animation[index],0,this.boatpos,this.w,this.h);
        pop();
    }
}


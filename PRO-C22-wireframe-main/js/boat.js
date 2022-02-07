class Boat {
    constructor(x,y,w,h,bpos){
        this.body = Bodies.rectangle(x,y,w,h);
        this.w =w;
        this.h =h;
        this.image = loadImage("./assets/boat.png");
        this.boatpos = bpos;
        World.add(world,this.body);
        
    }
    remove(i){
        setTimeout(() =>{
            Matter.World.remove(world,barcos[i].body);
            delete barcos[i];
        },2000);
        
    }

    display(){
        push();
        translate(this.body.position.x,this.body.position.y);
        rotate(this.body.angle);
        imageMode(CENTER);
        image(this.image,0,this.boatpos,this.w,this.h);
        pop();
    }
}


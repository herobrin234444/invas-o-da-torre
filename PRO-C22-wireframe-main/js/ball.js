class Ball{
    constructor(x,y){

    var options = {
        isStatic:true
    }

    this.r =30;
    this.speed = 0.05;
    this.body = Bodies.circle(x,y,this.r,options);
    this.image = loadImage("./assets/cannonball.png");
    this.animation = [this.image];
    this.trajectory = [];
    this.issink = false
    World.add(world,this.body);
    }
    animate(){
        this.speed += 0.05;
    }

    remove(index){
        this.issink = true
        Matter.Body.setVelocity(this.body,{x:0,y:0})
        this.animation = splashanimation;
        this.speed = 0.05;
        this.r = 150;
        setTimeout(() =>{
            Matter.World.remove(world,this.body);
            delete bolas[index];
        },1000);
        
    }

    shoot(){
        var newangle = canon.a -28;
        newangle = newangle * (3.14/180);
        var velocidade = p5.Vector.fromAngle(newangle);
        velocidade.mult(0.5);
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{
                x:velocidade.x*(180/3.14),
                y:velocidade.y*(180/3.14)})
    }
    display(){
    var index = floor(this.speed%this.animation.length)
    var pos = this.body.position;
    push();
    imageMode(CENTER)
        image(this.animation[index],pos.x,pos.y,this.r,this.r);
        pop();

        if (this.body.velocity.x>0 && pos.x>300 && !this.issink){
           var position = [pos.x,pos.y]; 
           this.trajectory.push(position);
     }
        for(var i = 0; i<this.trajectory.length; i++){
        image(this.image,this.trajectory[i][0],this.trajectory[i][1],5,5);
        }
}
}
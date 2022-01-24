class Canon{
    constructor(x,y,w,h,a){
        this.x =x;
        this.y = y;
        this.w =w;
        this.h = h;
        this.a = a;
        this.cimg =loadImage("./assets/canon.png");
        this.cbimg =loadImage("./assets/cannonBase.png");
    }
    display(){
        if (keyIsDown(RIGHT_ARROW)&& this.a<70){
            this.a = this.a +1
        }
        if (keyIsDown(LEFT_ARROW)&& this.a>-30){
            this.a = this.a -1
        }
        push();
        translate(this.x,this.y);
        rotate(this.a);
        imageMode(CENTER);
        image(this.cimg,0,0,this.w,this.h);
        pop();
        
        image(this.cbimg,70,20,200,200);
        noFill();
    }
}
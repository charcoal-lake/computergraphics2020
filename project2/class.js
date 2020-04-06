

class Teapot{

  constructor(lv, cnt, max){
    this.lv = lv;    // level
    this.size = ( lv != 0)? (default_size*(1/(lv+1))) : default_size; // size of this teapot.
    this.rd = lv*80; // radius ; distance between teapot and the origin
    this.x = 2*PI * (cnt/max);  // angle of this teapot in the level.
    this.cnt = cnt; // id of this teapot in the level.
    this.max = max; // number of teapots in the level.
    this.rx; this.ry; // rotation value
    
  }
  
  display(){
    // draw teapots on the screen.
    // positions are calculated by sin, cos function.
    // teapots get further from the origin according to amplitude value.
    push();
    translate(sin(this.x)*(this.rd+amp.getLevel()*100*this.lv), cos(this.x)*(this.rd+amp.getLevel()*100*this.lv), 0);
    scale(this.size);
    this.rotate();
    this.circle();
    model(teapot);
    pop();
  }
  
  rotate(){ // make teapots to rotate according to mouse x, y positions.
    this.rx = map(mouseY, 0, windowWidth, radians(-50), radians(50));
    this.ry = map(mouseX, 0, windowHeight, radians(-50), radians(50));
    rotateX(this.rx);
    rotateY(this.ry);
    rotateZ(mouseY*0.01+(this.cnt/this.max));
  }
  
  circle(){ // make teapots go circle.
    // if level is odd number, teapots go counterclockwise,
    // if even number, they go clockwise by default.
    // circling direction changes when dir value is changed.
    if(this.lv%2 == 1)
      this.x += dir*radians(0.1);
    else 
      this.x -= dir*radians(0.1);
  }
}
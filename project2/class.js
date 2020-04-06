let offset = 50;


class Teapot{

  constructor(lv, cnt, max){
    this.lv = lv;    // level
    this.size = ( lv != 0)? (default_size*(1/(lv+1))) : default_size;
    this.rd = lv*80;// radius
    this.x = 2*PI * (cnt/max);
    this.cnt = cnt;
    this.max = max;
    this.rx; this.ry;
    
  }
  
  display(){
    push();
    translate(sin(this.x)*(this.rd+amp.getLevel()*100*this.lv), cos(this.x)*(this.rd+amp.getLevel()*100*this.lv), 0);
    scale(this.size);
    this.rotate();
    this.circle();
    model(teapot);
    pop();
  }
  
  rotate(){
    this.rx = map(mouseY, 0, windowWidth, radians(-50), radians(50));
    this.ry = map(mouseX, 0, windowHeight, radians(-50), radians(50));
    rotateX(this.rx);
    rotateY(this.ry);
    rotateZ(mouseY*0.01+(this.cnt/this.max));
  }
  
  circle(){
    if(this.lv%2 == 1)
      this.x += dir*radians(0.1);
    else 
      this.x -= dir*radians(0.1);
  }
}
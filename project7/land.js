

class land {
    constructor(x, y, h) {
      this.x = x;   // x position of the grid
      this.y = y;   // y position of the grid
      this.h = h;   // height of the box
      this.c = map(h, 0, max_height, 360, 0);  // coloring for the box
    }
  
    pushLand() {    // decrease box height when clicked
      if (this.x - box_size <= mouseX-offset_w && mouseX-offset_w <= this.x + box_size && this.y - box_size <= mouseY-offset_h && mouseY-offset_h <= this.y + box_size) {
        if(this.h > 0) this.h -= 5;
        this.changeColor(this.h);
      }
    }
  
    pullLand() {    // increase box height when clicked
      if (this.x - box_size <= mouseX-offset_w && mouseX-offset_w <= this.x + box_size && this.y - box_size <= mouseY-offset_h && mouseY-offset_h <= this.y + box_size) {
        if(this.h < max_height ) this.h += 5;
        this.changeColor(this.h);
      }
    }
  
    changeColor(h) {  // change box color when height is changed. (Hue value is mapped)
      this.c = map(h, 0, max_height, 300, 100);
    }
  }
  
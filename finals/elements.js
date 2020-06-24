// display funcions needed for debugging

class deer{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.r = 0;
        this.body = deer_body;
        this.head = deer_head;
        this.left_leg = deer_left_leg;
        this.right_leg = deer_right_leg;
    }

    move(x, y, r, nr){
        this.x = x;
        this.y = y;
        this.r = r;
        this.neck_r = nr;
    }

    animate(move){

        noStroke();
        fill(100);

        push();
        translate(this.x, this.y, -55);
        rotateZ(PI/2+this.r);

        scale(0.2);
            rotateY(move/10);
            push();
            scale(0.5);
            rotateX(-PI/2);
            model(this.body);
                push();
                translate(200, -150+move*10, -80)
                rotateZ(-move);
                model(this.left_leg[0]);
                translate(-5, -190, 0);
                rotateZ(move);
                model(this.left_leg[1]);
                pop();
                translate(-280, -150, -80);
                rotateZ(move/2);
                model(this.left_leg[2]);
            pop();

            push();
            scale(0.5);
            rotateX(-PI/2);
                push();
                translate(200, -150+move*10, 80)
                rotateZ(move);
                model(this.right_leg[0]);
                translate(-5, -150, 0);
                rotateZ(-move);
                model(this.right_leg[1]);
                pop();
                translate(-280, -150, 80);
                rotateZ(-move/2);
                model(this.right_leg[2]);
            pop();

            scale(0.5);
            rotateX(-PI/2);
            translate(420, 320, 0);
            rotateY(radians(this.neck_r));
            model(this.head);
        pop();

    }
}

class grass{
    constructor(x, y){
        this.x = random((x-1)*grid_size-grid_max*grid_size/2, x*grid_size-grid_max*grid_size/2);
        this.y = random((y-1)*grid_size-grid_max*grid_size/2, y*grid_size-grid_max*grid_size/2);
        this.ix = x;
        this.iy = y;
        this.rate = 0;
        this.growth = 0;
        this.offset=0;
        this.color_brightness = 48;
    }

    grow(x){
        // if(this.growth<0) grid[this.ix][this.iy] = -1;
        if(x == -1) {
            this.rate =0;
        }
        else if(x==1){
            this.rate +=1;
        }
        if(this.growth < 0 && grid[this.ix][this.iy] ==1) {
            grid[this.ix][this.iy] = -1;
        }
        if(this.offset > 0) this.offset -= 0.01;
        this.growth = 8*sin(this.rate/500);
        this.display();
    }

    display(){
        let grass_rate = constrain(this.growth, 0, 3+this.offset);
        this.color_brightness = map(grass_rate, 0, 3, 48, 88+this.offset);
        push();
        translate(this.x, this.y, 0);
        scale(grass_rate);
        noStroke();
        fill(color(121, 58, this.color_brightness));
        rotateX(PI/2);
        plane(10, 10);
        rotateY(PI/2);
        plane(10, 10);
        pop();
    }

    set_offset(offset){
        this.offset = offset;
    }
}


class tree{
    constructor(x, y){
        this.x = random((x-1)*grid_size-grid_max*grid_size/2, x*grid_size-grid_max*grid_size/2);
        this.y = random((y-1)*grid_size-grid_max*grid_size/2, y*grid_size-grid_max*grid_size/2);
        this.ix = x;
        this.iy = y;
        this.h = random(150, 240);
        this.growth = 0;
        this.rate = 0;
        this.size = random(80, 150);
        this.colorset = [];
        this.colorset.push(color(random(13, 32), random(40, 50), random(20, 40)));
        this.colorset.push([random(100, 180), random(80, 90), random(50, 60)]);
        this.offset=0;
        // random blocks
        this.blocks = [];
        this.blocks_disp = [];
        for(let i=0; i<random(1, 3); i++){
            this.blocks.push(random(50, 80));
            this.blocks_disp.push( new p5.Vector(random(-0.5, 0.5)*this.size, random(-0.5, 0.5)*this.size, random(-0.5, 0.5)*this.size) );
            this.colorset.push([random(100, 180), random(60, 80), random(60, 70)]);
        }
    }

    grow(x){
        noStroke();
        if(x == -1) {
            this.rate =0;
        }
        else if(x==1){
            this.rate +=1;
        }
        if(this.growth < 0 && grid[this.ix][this.iy] ==1) {
            grid[this.ix][this.iy] = -1;
        }
        if(this.offset > 0) this.offset -= 0.01;
        this.growth = 8*sin(this.rate/500);
        this.display();
        

    }

    display(){
        let height_rate = map(this.growth, 0, 3, 0, this.h);
        let height_growth = constrain(height_rate, 0, this.h);

        let trunk_rate = map(this.growth, 0, 3, 0, 20);
        let trunk_growth = constrain(trunk_rate, 0, 20);
        push();
        translate(this.x, this.y, -height_growth/2);
        fill(this.colorset[0]);
        box(trunk_growth, trunk_growth, -height_growth);
        pop();

        let main_rate = map(this.growth, 0.4, 5, 0, this.size+this.offset*10);
        let main_growth = constrain(main_rate, 0, this.size+this.offset*10);
        push();
        translate(this.x, this.y, -height_growth);
        fill(this.colorset[1][0], this.colorset[1][1], this.colorset[1][2]+this.offset*100);
        box(main_growth);
        pop();

        push();
        translate(this.x, this.y, -height_growth);
        for(let i=0; i<this.blocks.length; i++){
            let block_rate = map(this.growth, 3.0, 6.0, 0, this.blocks[i]+this.offset*10);
            let block_growth = constrain(block_rate, 0, this.blocks[i]+this.offset*10);
            push();
            translate(this.blocks_disp[i]);
            fill(this.colorset[2+i][0], this.colorset[2+i][1], this.colorset[2+i][2]+this.offset*100);
            box(block_growth);
            pop();    
        }
        pop();
    }
}


class flower{
    constructor(x, y){
        this.x = random((x-1)*grid_size-grid_max*grid_size/2, x*grid_size-grid_max*grid_size/2);
        this.y = random((y-1)*grid_size-grid_max*grid_size/2, y*grid_size-grid_max*grid_size/2);
        this.ix = x;
        this.iy = y;

        // rate of growth
        this.growth = 0;
        this.bloom = 0;
        this.size = random(0.8, 2.0);
        this.stem_length = random(10, 15);
        this.offset = 0;
        this.tar_offset=0;

        this.bud_rotate = [
            random(radians(-10, 10)),
            random(radians(-10, 10)),
            random(radians(-10, 10)),
        ];
        this.leaf_rotate = random(radians(-90,90));
        this.stem_point = [];
        this.stem_point.push(new p5.Vector(0, 0, 0));
        for(let i=0; i<4; i++){
            this.stem_point.push(new p5.Vector(
                random(-2.0, 2.0), random(-2.0, 2.0), -i*this.stem_length
            ));
        }

        this.rate =0;
        this.growth = 0.0
        this.colorset =[];
        this.colorset.push([random(200, 360), random(65, 85), random(50, 75)]);
    }

    display(){
        push();
        translate(this.x, this.y, 0);
        this.phase_1();
        this.phase_2();
        pop();
    }

    grow(x){
        if(x == -1) {
            this.rate =0;
        }
        else if(x==1){
            this.rate +=1;
        }
        if(this.growth < 0 && grid[this.ix][this.iy] ==1) {
            grid[this.ix][this.iy] = -1;
        }
        this.growth = 8*sin(this.rate/500);
        if(this.offset > 0) this.offset -= 0.01;
        this.display();
    }

    phase_1(){
        let stem_rate = map(this.growth, 0, 3, 0, this.stem_point.length);
        let stem_growth = constrain(stem_rate, 0, this.stem_point.length);
        let i;
        strokeWeight(5);
        stroke(color(121, 50, 50));
        noFill();
        beginShape();
        for(i=0; i<stem_growth; i++){
            curveVertex(this.stem_point[i].x, this.stem_point[i].y, this.stem_point[i].z);
        }
        endShape();
        noStroke()

        if(i>1){
            let bud_rate = map(this.growth, 2.5, 6, 0, this.size+this.offset);
            let bud_growth = constrain(bud_rate, 0, this.size+this.offset);
            push();
            translate(this.stem_point[i-2]);
            rotateX(this.bud_rotate[0]); rotateY(this.bud_rotate[1]); rotateZ(this.bud_rotate[2]);
            scale(bud_growth);
            fill(this.colorset[0][0], this.colorset[0][1], this.colorset[0][2]+this.offset*100);
            this.bud(bud_growth);
            pop();
        }
    }

    phase_2(){
        let leaf_rate = map(this.growth, 0, 3.5, 0, this.size+this.offset);
        let leaf_growth = constrain(leaf_rate, 0, this.size+this.offset);
        fill(color(121, 50, 50));
        push();
        scale(leaf_growth);
        push();
        rotateZ(this.leaf_rotate);
        this.leaf();
        rotateZ(-PI);
        this.leaf();
        pop();
        pop();
    }


    bud(x){

        let rate = map(x, 0, this.size, 45, -90);
        let rate_limit = constrain(rate, -90, 45);
        push();
        for(let i=0; i<6; i++){
           
            push();
            rotateX(PI/4);
            this.lowerPetal();
            translate(0, -10);
            rotateX(PI/4+radians(rate_limit)); // 여기를 조정해서 bloom, PI/2 ~ -PI/4
            this.upperPetal();
            pop();
            rotateZ(PI/2);
        }
        pop();
    }

    lowerPetal(){
        beginShape();
        vertex(0, 0, 0)
        vertex(-7, -10, 0);
        vertex(7, -10, 0);
        vertex(0, 0, 0);
        endShape();
    }

    upperPetal(){
        beginShape();
        vertex(-7, 0, 0);
        vertex(7, 0, 0);
        vertex(0, -10, 0);
        vertex(-7, 0, 0);
        endShape();
    }


    leaf(){
        beginShape();
        vertex(0, 0, 0);
        //bezierVertex(8, 0, 3, 8, 8*3/2, 3, 0, 8*2, 0);
        endShape();
    
        beginShape();
        vertex(0,0,0);
        //bezierVertex(-8, 0, 3, -8, -8*3/2, 3, 0, -8*2, 0);
        vertex(0, 0, 0);
        endShape();
    }
}



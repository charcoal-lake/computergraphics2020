
let myshader;
let pg;
let seed;
let dist = 100;
let music_button;

let fog_num = 3;
let fogs = [];

let sl;

let posx, posy;

function preload() {
    tree = loadModel('./assets/lowpolytree.obj');
    ground = loadImage('./assets/texture.jpeg');
    sound = loadSound('./assets/woods_ambient music_cut.mp3');
    myshader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    cnv = createCanvas(windowWidth, windowHeight*2/3, WEBGL);
    cnv.position(0, 0);
    noStroke();
    pg = createGraphics(1000, 1000, WEBGL);
    pg.noStroke();
    fogTex = createGraphics(width*2, 500);

    seed = random(0, 100);
    music_button = createButton('sound on');
    music_button.position(10, windowHeight*2/3+10);
    music_button.mousePressed(function(){
        if(sound.isPlaying()) {
            sound.stop();
        }
        else sound.play();
    });

    sl = createSlider(0, 1000);
    sl.position(10, 10);

    fogs[0] = new fogLayer(0);
    fogs[1] = new fogLayer(300);
    fogs[2] = new fogLayer(800);

}

function draw() {
    randomSeed(seed);
    orbitControl();
    background(150);

    directionalLight(255, 255, 255, 1, 0, 1);
    pointLight(255, 255, 255, mouseX-width/2, mouseY-height/2, -100);
    spotLight(255, 255, 255, mouseX-width/2, mouseY-height/2, -10, 1, 0, 1);
    camera(200, 80, (height/2.0) / tan(PI*30.0 / 180.0)-sl.value(), 0, 0, -200, 0, 1, 0);


    pg.shader(myshader);

    myshader.setUniform("u_resolution", [width,height]);
    myshader.setUniform("u_time", frameCount * 0.01);
    myshader.setUniform("u_mouse", [(width-mouseX)*2,(height-mouseY)*2]);
    myshader.setUniform("u_alpha", map(mouseX, 0, width, 0, 1));

    pg.rect(-500, -500, 1000, 1000);
    texture(pg);

    push();
    translate(-dist*10/2, 0, -dist*5/2);

    for(let j=0; j<5; j++){
        translate(0, 0, dist);
        for(let i=0; i<10; i++){
            push()
            let size = random(20, 50);
            translate(0, 100-size);
            scale(size);
            rotateX(PI);
            model(tree);
            pop();    
            translate(dist, 0, 0);
        }
        translate(-dist*10, 0, 0);
    }
    pop();

    sphere(2000);


    push();
    translate(0, 120, 0);
    rotateX(PI/2);
    texture(ground);
    plane(1000, 1000);
    pop();


    fogs[0].display();
    fogs[1].display();
    fogs[2].display();

    
/*
    fog();
    texture(fogTex);
    stroke(0);
    plane(width, 500);
 */
}

function fog(){

    let x = random(0, 1000);
    fogTex.clear();
    fogTex.stroke(255, 50);
    for(let i=0; i<fogTex.width; i++){
        let y = noise((x++)*0.005);
        fogTex.line(i, fogTex.height/2-y*200, i, fogTex.height);
    }
    
}

class fogLayer{

    constructor(start){
        this.start = start;
        fog();

    }

    display(){
        if(this.start > -800){
            this.start--;
        }
        else {
            fog();
            this.start = 800;
        }
        push();
        fill(255, 30);
        translate(0, 0, this.start);
        fog();
        texture(fogTex);
        plane(width*2, 500);
        pop();
    }

}

let myshader;
let pg;
let seed;
let dist = 100;

let posx, posy;

function preload() {
    tree = loadModel('./assets/lowpolytree.obj');
    ground = loadImage('./assets/texture.jpg');
    sound = loadSound('./assets/woods_ambient music_cut.mp3');
    // tree2 = loadModel('tree2.obj');
    myshader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    textureWrap(REPEAT);
    pg = createGraphics(1000, 1000, WEBGL);
    pg.noStroke();
    seed = random(0, 100);
}

function draw() {
    randomSeed(seed);
    orbitControl();
    background(150);
    directionalLight(255, 255, 255, 1, 0, 1);
    pointLight(255, 255, 255, mouseX-width/2, mouseY-height/2, -100);
    spotLight(255, 255, 255, mouseX-width/2, mouseY-height/2, -10, 1, 0, 1);
    camera(200, 80, (height/2.0) / tan(PI*30.0 / 180.0)-200, 0, 0, -200, 0, 1, 0);

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
    textureWrap(MIRROR);
    texture(ground);
    plane(1024, 1024);
    pop();


}
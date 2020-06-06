
let myshader;
let pg;
let seed;
let dist = 100;

let posx, posy;

function preload() {
    tree = loadModel('./assets/lowpolytree.obj');
    // tree2 = loadModel('tree2.obj');
    myshader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    textureWrap(REPEAT);
    pg = createGraphics(256, 256, WEBGL);
    pg.noStroke();
    seed = random(0, 100);
}

function draw() {
    randomSeed(seed);
    orbitControl();
    background(220);
  //  directionalLight(255, 255, 255, 1, 0, -1);
    pointLight(255, 255, 255, mouseX-width/2, mouseY-height/2, -10);
    spotLight(255, 255, 255, mouseX-width/2, mouseY-height/2, -10, 1, 0, 1);
    camera(0, 100, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);

    pg.shader(myshader);
    myshader.setUniform("u_border", map(mouseX, 0, width, 0.0, 1.0));
    myshader.setUniform('u_resolution', [width, height]);
    myshader.setUniform('u_mouse', map(mouseX, 0, width, 0, 7));
    myshader.setUniform('u_time', frameCount * 0.01);
    pg.rect(-128, -128, 256, 256);
    texture(pg);

    push();
    translate(-dist*10/2, 0, -dist*5/2);

    for(let j=0; j<5; j++){
        translate(0, 0, dist);
        for(let i=0; i<10; i++){
            push()
            let size = random(20, 50);
            translate(0, 80-size);
            scale(size);
            rotateX(PI);
            model(tree);
            pop();    
            translate(dist, 0, 0);
        }
        translate(-dist*10, 0, 0);
    }
    pop();

    push();
    translate(0, 120, 0);
    rotateX(PI/2);
    plane(1000, 1000);
    pop();
}
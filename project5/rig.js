

function rightLeg(ux, uy, uz, vx) {
  push(); // right leg
  translate(12.5, 0, 0);

  rotateX(-radians(ux));
  rotateY(-radians(uy));
  rotateZ(-radians(uz));

  translate(0, 0, -15);
  box(15, 15, 50); // upper right leg


  translate(0, 0, -25);
  rotateX(-radians(vx));

  translate(0, 0, -25);
  box(15, 15, 50); // lower right leg
  translate(0, 5, -30);
  box(15, 20, 10); // right foot
  pop();
}

function leftLeg(ux, uy, uz, vx) {
  push(); // left leg
  translate(-12.5, 0, 0);

  rotateX(radians(ux));
  rotateY(radians(uy));
  rotateZ(radians(uz));

  translate(0, 0, -15);
  box(15, 15, 50); // upper left leg

  translate(0, 0, -25);
  rotateX(-radians(vx));
  translate(0, 0, -25);
  box(15, 15, 50); // lower left leg
  translate(0, 5, -30);
  box(15, 20, 10); // left foot
  pop();

}

function rightArm(ux, uy, uz, vx) {
  push(); // right arm
  translate(25, 0, 0);

  rotateX(radians(ux));
  rotateY(-radians(uy));
  rotateZ(radians(uz));

  translate(0, 0, -20);
  box(10, 10, 40); // upper right arm
  
  translate(0,0,-20);
  rotateX(radians(vx));
  translate(0, 0, -20);
  box(10, 10, 40); // lower right arm
  pop();

}

function leftArm(ux, uy, uz, vx) {
  push(); // left arm
  translate(-25, 0, 0);

  rotateX(radians(ux));
  rotateY(radians(uy));
  rotateZ(radians(uz));

  translate(0, 0, -20);
  box(10, 10, 40); // upper left arm
  
  translate(0,0,-20);
  rotateX(radians(vx));
  translate(0, 0, -20);

  box(10, 10, 40); // lower left arm
  pop();
}

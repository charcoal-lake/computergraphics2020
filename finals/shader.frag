
precision mediump float;
uniform float uBorder;
// what passed into from rasterizer
varying vec4 vCol;
varying vec3 vNormal;
varying vec3 vLightDir;
void main() {
// toon shading
  float l = dot(vLightDir, vNormal);
  if(l>0.8){
    l = 1.0;
  }
  else if (l>= 0.8 && l>0.6){
    l = 0.8;
  }
  else if (l>= 0.6 && l > 0.4){
    l = 0.6;
  }
  else if (l>=0.4 && l > 0.2){
    l = 0.4;
  }
  else {
    l = 0.2;
  }
  //calculate final color
  gl_FragColor = vec4(l,l,l,1.) * vCol;
}
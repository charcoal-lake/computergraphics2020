// must always set precision
precision mediump float;
// p5.js built-in uniform variables
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;
uniform vec3 uLightingDirection;
uniform vec4 uMaterialColor;
// p5.js built-in attribute variables
attribute vec3 aPosition;
attribute vec3 aNormal;

varying vec4 vCol;
varying vec3 vNormal;
varying vec3 vLightDir;

void main() {
    vec4 pos = vec4(aPosition, 1.0); // position in clip space
    gl_Position = uProjectionMatrix * uModelViewMatrix * pos;
    vCol = uMaterialColor;
    // normal vector of size 1 in camera space
    vNormal = normalize(uNormalMatrix * aNormal);
    // directional light direction
    vLightDir = -normalize(uLightingDirection);
}
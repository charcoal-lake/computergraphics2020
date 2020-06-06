// must always set precision
precision mediump float;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
attribute vec3 aPosition;
void main() {
    vec4 pos = vec4(aPosition, 1.0);
    gl_Position = uProjectionMatrix * uModelViewMatrix * pos;
}
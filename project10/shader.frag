// must always set precision
precision mediump float;
// variables passed from application
uniform vec2 u_resolution; // [width,height]
uniform vec2 u_mouse; // [mouseX, mouseY]
uniform float u_time;
uniform float u_alpha;

void main() {
  vec2 st = u_mouse.xy/u_resolution.xy;  
  vec2 ms = u_mouse.xy;
//  vec2 pos = u_resolution.xy;
  vec2 pos = gl_FragCoord.xy;
  float angle;
  float dist, u_dist, max_dist;
  
  // dist = (ms.x-pos.x)^2 + (ms.y-pos.y)^2
  dist = sqrt((ms.x-pos.x)*(ms.x-pos.x) + (ms.y-pos.y)*(ms.y-pos.y));
  max_dist = sqrt(u_resolution.y*u_resolution.y + u_resolution.x*u_resolution.x);
  u_dist = dist/max_dist;
  // angle = atan((ms.x - pos.x) / (ms.y - pos.y));
  // angle
  /*
  gl_FragColor = vec4(
    (cos(angle)* vec3(0.14, 0.64, 0.45)
    + (1.0-cos(angle))*vec3(0.04,0.06,0.28)
    ), 1.0
  );
  */
  gl_FragColor = vec4(u_dist* vec3(0.14, 0.64, 0.45) + (1.0-u_dist)*vec3(0.04,0.06,0.28), 1.0);
//     gl_FragColor = vec4(
//     (cos(angle)* vec3(0.14, 0.64, 0.45)
//     + (1.0-cos(angle))*vec3(0.04,0.06,0.28)
//     )* (abs(sin(u_time)))*vec3(1.,1.,1.), 1.0
//   );
}
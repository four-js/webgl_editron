precision mediump float;
uniform vec2  resolution;    // resolution (512.0, 512.0)
uniform vec2  mouse;         // mouse      (-1.0 ~ 1.0)
uniform float time;          // time       (1second == 1.0)
uniform sampler2D prevScene; // previous scene texture

// const
const vec3 orange = vec3(1.0, 0.5, 0.1);

// define
#define dark 0.8

void main(){
	gl_FragColor = vec4(orange * dark, 1.0);
}

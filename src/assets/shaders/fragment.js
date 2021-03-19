export default `

  varying vec2 vUv;
  uniform sampler2D u_tex;
  uniform float u_time;

  void main(void) {

    vec2 uv = vUv;
    uv.y = sin(u_time) * 0.005;

    vec3 tex = texture2D(u_tex, uv).rgb;
    gl_FragColor = vec4(tex, 1.0);
  }

`;

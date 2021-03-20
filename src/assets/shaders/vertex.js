export default `

  varying vec2 vUv;
  uniform float u_time;

  void main(){

    vUv = uv;
    vUv = (uv - vec2(0.5)) * 0.9 + vec2(0.5);
    vUv.y += sin(u_time) * 0.02;

    vec3 pos = position;
    pos.y += sin(u_time) * 0.05;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0 );
  }

`;

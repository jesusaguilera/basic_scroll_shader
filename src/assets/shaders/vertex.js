export default `

  varying vec2 vUv;
  uniform float u_time;

  void main(){
    vUv = uv;
    vec3 pos = position;
    pos.y += sin(u_time) * 0.05;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0 );
  }

`;

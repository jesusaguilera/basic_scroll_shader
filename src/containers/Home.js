import React, { useEffect } from "react";
import * as THREE from 'three';

import vertex from "../assets/shaders/vertex";
import fragment from "../assets/shaders/fragment";

let camera, scene, renderer;
let geometry, material, mesh;

const Home = () => {

  useEffect(() => {
    init();
  }, [])

  const init = () =>  {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );
    document.body.appendChild( renderer.domElement );

    let uniforms = {


    }

    geometry = new THREE.PlaneGeometry(1.5, 1, 20 , 20);
    material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide
    });

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );


  }

  const animation = ( time ) => {

    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render( scene, camera );

  }

  return (
    <h1>Home</h1>
  );
}

export default Home;

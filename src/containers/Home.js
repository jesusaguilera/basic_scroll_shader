import React, { useState, useEffect } from "react";
import * as THREE from 'three';

// Shaders
import vertex from "../assets/shaders/vertex";
import fragment from "../assets/shaders/fragment";

// Images
import img_01 from "../assets/images/01_img.jpg";
import img_02 from "../assets/images/02_img.jpg";

let camera, scene, renderer;
let geometry, material, mesh;

const images = [img_01, img_02];
const materials = [];
const meshes = [];
let scY = 0;

const Home = () => {

  useEffect(() => {
    init();
    window.addEventListener("scroll", (e) => {
      scY = window.scrollY * 0.002;
    })
  }, [])

  const init = () =>  {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    camera.position.z = 2;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);

    let uniforms = {
      u_tex: { type: "t", value: null },
      u_time: { type: "f", value: 0.0 },
    };

    material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
    });

    handleImages();

    window.addEventListener("resize", resize, false);
  }

  const handleImages = () => {

    images.map((img, index) => {
      let mat = material.clone();
      mat.uniforms.u_tex.value = new THREE.TextureLoader().load(img);
      mat.needsUpdate = true;
      materials.push(mat);

      geometry = new THREE.PlaneGeometry(1.5, 1, 20, 20);
      mesh = new THREE.Mesh(geometry, mat);
      scene.add(mesh);
      mesh.position.y = -index * 1.2;
      meshes.push(mesh);
    })

  }

  const animation = ( time ) => {

    meshes.map((mesh, index) => {
      materials[index].uniforms.u_time.value = time / 3000;
      mesh.position.y = -index * 1.2 + scY;
      // mesh.rotation.y = time * 0.0003;
    })
    renderer.render( scene, camera );

  }

  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  return (
    <main style={{overflow: "hidden", overflowY: "auto"}}>
      <div style={{width: "100%", height: 3000}}>
        <h1>Home</h1>
      </div>
    </main>
  );
}

export default Home;

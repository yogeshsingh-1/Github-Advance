// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

// import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector(".canvas");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 3;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

// Orbit Controls
// const controls = new OrbitControls(
//   camera,
//   renderer.domElement
// );

// controls.enableDamping = true;

// Geometry
const geometry = new THREE.BoxGeometry();

// Different side colors
const materials = [
  new THREE.MeshBasicMaterial({ color: "red" }),
  new THREE.MeshBasicMaterial({ color: "green" }),
  new THREE.MeshBasicMaterial({ color: "blue" }),
  new THREE.MeshBasicMaterial({ color: "yellow" }),
  new THREE.MeshBasicMaterial({ color: "pink" }),
  new THREE.MeshBasicMaterial({ color: "orange" }),
];

// Mesh
const cube = new THREE.Mesh(
  geometry,
  materials
);

scene.add(cube);

// Resize
window.addEventListener("resize", () => {

  camera.aspect =
    window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
});

// Animation
function animate() {

  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

//   controls.update();

  renderer.render(scene, camera);
}

animate();
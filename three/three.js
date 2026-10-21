const canvas = document.querySelector(".canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  innerWidth / innerHeight,
  0.1,
  1000,
);
const geometory = new THREE.BoxGeometry(1, 1, 3);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometory, material);
scene.add(mesh);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(innerWidth, innerHeight);
// mesh.position.z = 3;
renderer.render(scene, camera);

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  // camera.position.z += 0.03;

  renderer.render(scene, camera);
  // camera.updateProjectionMatrix();
}

setInterval(animate);
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  // IMPORTANT
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

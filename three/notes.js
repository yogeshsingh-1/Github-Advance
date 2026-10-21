// Browser ko 3D cheez dikhane ke liye Three.js ko ye cheeze chahiye:

// Object → Scene → Camera → Renderer → Screen

// Matlab:

// Object banao
// Scene me rakho
// Camera se dekho
// Renderer screen pe draw kare

// 1. Scene — “3D duniya” - Scene ek container hai.
// Jaha tum:

// objects
// lights
// camera
// models

// sab rakhte ho.

// 2. Geometry — “shape”  -> Geometry object ka shape/skeleton hota hai.
// Socho tum mitti se toy bana rahe ho.

// Geometry = toy ka shape.
// Geometry sirf structure deta hai

// Isme:

// color nahi
// texture nahi
// shine nahi

// Sirf points & edges.

// 3. Material — “skin / look”
// Material kya hai?

// Object ka:

// color
// texture
// shine
// transparency

// define karta hai.

// Real Life Example

// Geometry = body
// Material = kapde + skin color

// 4. Mesh — “real object”

// Mesh kya hai?

// Geometry + Material combine karke
// actual visible object banta hai.

// Real Life Example

// Shape + paint = final toy

// 6. Camera — “aankh”
// Camera kya hai?

// Camera decide karta hai:

// User kya dekhega?
// Real Life Example 🎥

// Movie camera.

// Agar camera object ki taraf nahi hai,
// toh object screen pe nahi dikhega.

// Default:

// cube center pe hota hai
// camera bhi center pe hota hai

// Toh camera cube ke andar chala jata.

// Isliye camera ko piche le jate hain.
// camera.position.z = 5;

// 7. Renderer — “drawing machine”
// Renderer kya karta hai?

// Ye:

// scene leta hai
// camera leta hai
// GPU use karta hai
// pixels draw karta hai

// Renderer bolta hai:

// “Camera jo dekh raha hai usko screen pe draw karo.”

// Synax

// 1. Scene Syntax

const scene = new THREE.Scene();

// Meaning

// New 3D world create karta hai.

// 2. Camera Syntax
// Perspective Camera

// fov -> field of view (kitna area dikhega)
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
// | Parameter   | Meaning                  |
// | ----------- | ------------------------ |
// | fov         | Kitna area dikhega       |
// | aspectRatio | Screen ratio             |
// | near        | Minimum visible distance |
// | far         | Maximum visible distance |

// Camera Position
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;
// or
camera.position.set(0, 0, 5);

// 3. Geometry Syntax
// Box Geometry

const geometry = new THREE.BoxGeometry(width, height, depth);

// Sphere Geometry
const geometry1 = new THREE.SphereGeometry(
  radius,
  widthSegments,
  heightSegments,
);
// Plane Geometry
const geometry3 = new THREE.PlaneGeometry(width, height);

// 4. Material Syntax
// Basic Material
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
// 5. Mesh Syntax
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x += 0.01;

mesh.rotation.y += 0.01;
// 6. Scene Add Syntax
scene.add(mesh);

// 7. Renderer Syntax
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// Three.js me tum:

// camera move kar sakte ho
// | Camera Feature | Meaning          |
// | -------------- | ---------------- |
// | position       | kaha hai         |
// | rotation       | kidhar ghooma    |
// | lookAt         | kya dekh raha    |
// | fov            | kitna dekhe      |
// | zoom           | kitna paas       |
// | near/far       | visibility range |

// object move kar sakte ho
mesh.position.x = 2;
mesh.rotation.x += 0.01;
mesh.scale.x = 1; // width
mesh.scale.y = 1; // height
mesh.scale.z = 1; // depth

// | Property      | Kaam           |
// | ------------- | -------------- |
// | position      | Move           |
// | rotation      | Rotate         |
// | scale         | Resize         |
// | visible       | Show/Hide      |
// | material      | Look/Color     |
// | geometry      | Shape          |
// | castShadow    | Shadow dena    |
// | receiveShadow | Shadow lena    |
// | name          | Object ka naam |
// | children      | Child objects  |
// | parent        | Parent object  |

// dono move kar sakte ho

// | Property | Kaam                        |
// | -------- | --------------------------- |
// | position | Object move karta hai       |
// | rotation | Object ghumata hai          |
// | scale    | Object bada/chota karta hai |
camera.updateProjectionMatrix();

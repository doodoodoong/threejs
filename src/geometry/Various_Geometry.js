import * as THREE from "three";
import dat from "dat.gui";

// Group
function Various_Geometry() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);
  // AxisHelper
  const axesHelper = new THREE.AxesHelper(4);
  scene.add(axesHelper);
  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "hotpink",
  });

  const group1 = new THREE.Group();
  const box1 = new THREE.Mesh(geometry, material);

  const group2 = new THREE.Group();
  // const box2 = new THREE.Mesh(geometry, material)
  const box2 = box1.clone();
  box2.scale.set(0.3, 0.3, 0.3);
  group2.position.x = 2;

  const group3 = new THREE.Group();
  const box3 = box2.clone();
  box3.scale.set(0.15, 0.15, 0.15);
  box3.position.x = 0.5;
  group3.add(box3);
  group2.add(box2, group3);

  group2.add(box2);
  group1.add(box1, group2);
  scene.add(group1);

  // Dat GUI
  const gui = new dat.GUI();
  gui.add(camera.position, "x", -10, 10, 0.01).name("Camera X Position");
  gui.add(camera.position, "y", -10, 10, 0.01).name("Camera Y Position");
  gui.add(camera.position, "z", -10, 10, 0.01).name("Camera Z Position");

  const clock = new THREE.Clock();
  function draw() {
    const delta = clock.getDelta();
    group1.rotation.y += delta;
    group2.rotation.y += delta;
    group3.rotation.y += delta;
    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", setSize);
  draw();
}

export default Various_Geometry;

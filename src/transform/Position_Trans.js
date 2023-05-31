import * as THREE from "three";
import dat from "dat.gui";

function Position_Trans() {
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
    color: "seagreen",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Dat GUI
  const gui = new dat.GUI();
  gui.add(camera.position, "x", -10, 10, 0.01).name("Camera X Position");
  gui.add(camera.position, "y", -10, 10, 0.01).name("Camera Y Position");
  gui.add(camera.position, "z", -10, 10, 0.01).name("Camera Z Position");

  const clock = new THREE.Clock();
  function draw() {
    const time = clock.getElapsedTime();
    mesh.rotation.y = time;
    mesh.position.set(-1, 0, 0);
    // console.log(mesh.position.distanceTo(camera.position));
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

export default Position_Trans;

import '../styles/main.css';
import * as THREE from 'three';

configureLiveReload();

const WIDTH = 250;
const MESH_Y_POSITION = -3.0;
const LIGHT_COLOR = 0xFFFFFF;
const LIGHT_INTENSITY = 25;
const ROTATION_SPEED = 0.01;
const SCALE = 0.75;
const CAMERA_Z_POSITION = 5;
const LIGHT_DISTANCE = 10;
const FOV = 75;
const NEAR_PLANE = 0.1;
const FAR_PLANE = 1000;
const MODEL_PATH = 'models/hancock-building.json';
const BACKGROUND_COLOR = 0xA9A9A9;
const MATERIAL_COLOR = 0x000000;

const scene = createScene();
const light = createLight();
const camera = createCamera();
const renderer = createRenderer();
let meshes = []
loadModelAndAddToScene(MODEL_PATH, meshes);

scene.add(light);
render();

function createScene() {
  return new THREE.Scene();
}

function createLight() {
  const light = new THREE.PointLight(LIGHT_COLOR, LIGHT_INTENSITY);
  light.position.set(-LIGHT_DISTANCE, LIGHT_DISTANCE, LIGHT_DISTANCE);
  return light;
}

function createCamera() {
  const camera = new THREE.PerspectiveCamera(FOV, WIDTH/WIDTH, NEAR_PLANE, FAR_PLANE);
  camera.position.z = CAMERA_Z_POSITION;
  return camera;
}

function createRenderer() {
  const canvas = document.getElementById('game');
  const renderer = new THREE.WebGLRenderer({canvas: canvas});
  renderer.setSize(WIDTH, WIDTH);
  renderer.setClearColor(BACKGROUND_COLOR);
  return renderer;
}

function loadModelAndAddToScene(path, meshes) {
  path = path + '?cacheBust=' + Date.now();
  const loader = new THREE.JSONLoader();

  loader.load(path, (geometry) => {
    const mesh = createMesh(geometry);
    meshes.push(mesh);
    scene.add(mesh);
  });
}

function createMesh(geometry) {
  const material = new THREE.MeshStandardMaterial({ color: MATERIAL_COLOR });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = MESH_Y_POSITION;
  mesh.scale.set(SCALE, SCALE, SCALE);
  return mesh;
}

function render() {
  requestAnimationFrame(render);
  if (!meshes.length) { return; }
  meshes[0].rotation.y += ROTATION_SPEED;
  renderer.render(scene, camera);
}

function configureLiveReload() {
  if (ENV !== 'production') {
    console.log('Starting LiveReload...');
    document.write(
      '<script src="http://' + (location.host || 'localhost').split(':')[0] +
      ':35729/livereload.js?snipver=1"></' + 'script>'
    );
  }
}

import {
  JSONLoader,
  Mesh,
  MeshStandardMaterial,
  PointLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three';

const WIDTH = 250;
const MESH_Y_POSITION = -3.0;
const LIGHT_COLOR = 0xFFFFFF;
const LIGHT_INTENSITY = 50;
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

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.render = this.render.bind(this);
  }

  configure() {
    this.scene = this.createScene();
    this.light = this.createLight();
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();

    this.scene.add(this.light);

    this.createMeshFromPath(MODEL_PATH)
      .then((mesh) => {
        this.mesh = mesh;
        this.scene.add(mesh);
      });
  }

  start() {
    this.render();
  }

  createScene() {
    return new Scene();
  }

  createLight() {
    const light = new PointLight(LIGHT_COLOR, LIGHT_INTENSITY);
    light.position.set(-LIGHT_DISTANCE, LIGHT_DISTANCE, LIGHT_DISTANCE);
    return light;
  }

  createCamera() {
    const camera = new PerspectiveCamera(FOV, WIDTH/WIDTH, NEAR_PLANE, FAR_PLANE);
    camera.position.z = CAMERA_Z_POSITION;
    return camera;
  }

  createRenderer() {
    const renderer = new WebGLRenderer({canvas: this.canvas});
    renderer.setSize(WIDTH, WIDTH);
    renderer.setClearColor(BACKGROUND_COLOR);
    return renderer;
  }

  loadModel(path) {
    path = path + '?cacheBust=' + Date.now();
    const loader = new JSONLoader();

    return new Promise((resolve, reject) => {
      loader.load(path,
        (geometry) => resolve(geometry),
        () => {},
        (error) => reject(error))
    });
  }

  createMeshFromPath(path) {
    return this.loadModel(path).then((geometry) => this.createMesh(geometry));
  }

  createMesh(geometry) {
    const material = new MeshStandardMaterial({ color: MATERIAL_COLOR });
    const mesh = new Mesh(geometry, material);
    mesh.position.y = MESH_Y_POSITION;
    mesh.scale.set(SCALE, SCALE, SCALE);
    return mesh;
  }

  render() {
    requestAnimationFrame(this.render);
    if (!this.mesh) { return; }
    this.mesh.rotation.y += ROTATION_SPEED;
    this.renderer.render(this.scene, this.camera);
  }
}

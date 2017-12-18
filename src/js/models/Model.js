import * as THREE from 'three';

export default class Model {

  container
  src
  loadingManager
  position
  anim
  mesh

  constructor(container, src, loadingManager, position, scale, rotation) {
    this.container = container;
    this.src = src;
    position === undefined ? this.position = [0, 0, 0] : this.position = position;
    scale === undefined ? this.scale = [0, 0, 0] : this.scale = scale;
    rotation === undefined ? this.rotation = [0, 0, 0] : this.rotation = rotation;
    this.loadingManager = loadingManager;
    this.init();
  }

  init() {
    this.loader = new THREE.JSONLoader(this.loadingManager);
    this.loader.load(this.src, (geometry, materials) => {

      this.mesh = new THREE.Mesh(geometry, materials);

      this.mesh.position.set(...this.position);
      this.mesh.scale.set(...this.scale);
      this.mesh.rotation.set(...this.rotation);

      this.container.add(this.mesh);

    });
  }

  getMesh() {
    return this.mesh;
  }
}

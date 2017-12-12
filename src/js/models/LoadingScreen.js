import * as THREE from 'three';

export default class LoadingScreen {

  scene
  camera

  constructor() {

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

  }

  camera() {
    return this.camera;
  }

  scene() {
    return this.scene;
  }


}

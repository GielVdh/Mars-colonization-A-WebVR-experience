import * as THREE from 'three';

export default class LoadingScreen {

  scene
  mesh
  mat
  shieldMat
  shieldMesh
  camera
  scene
  light
  ambientLight

  constructor() {
    this.scene = new THREE.Scene();
    console.log(this.scene);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

    this.geom = new THREE.IcosahedronGeometry(.5, 1);
    this.mat = new THREE.MeshLambertMaterial({color: 0xee5624, flatShading: true});
    this.shieldMat = new THREE.MeshBasicMaterial({opacity: 0.07, transparent: true, color: 0xffffff, wireframe: true, side: THREE.DoubleSide});
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.shieldMesh = new THREE.Mesh(this.geom, this.shieldMat);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
    this.scene.add(this.shieldMesh);

    this.addLights();

  }

  addLights() {
    this.ambientLight = new THREE.AmbientLight(0x663344, 2);
    this.scene.add(this.ambientLight);

    this.light = new THREE.DirectionalLight(0xffffff, 1.5);
    this.light.position.set(200, 100, 200);
    this.light.castShadow = true;
    this.light.shadow.camera.left = - 400;
    this.light.shadow.camera.right = 400;
    this.light.shadow.camera.top = 400;
    this.light.shadow.camera.bottom = - 400;
    this.light.shadow.camera.near = 1;
    this.light.shadow.camera.far = 1000;
    this.light.shadow.mapSize.width = 2048;
    this.light.shadow.mapSize.height = 2048;


    this.scene.add(this.light);
  }


  mesh() {
    return this.mesh;
  }

  shieldMesh() {
    return this.shieldMesh;
  }

  camera() {
    return this.camera;
  }

  scene() {
    return this.scene;
  }


}

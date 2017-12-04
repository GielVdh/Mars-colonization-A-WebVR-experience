import * as THREE from 'three';

export default class Model {

  container
  src

  constructor(container, src) {
    this.container = container;
    this.src = src;
    this.init();
  }

  init() {
    this.loader = new THREE.JSONLoader();
    this.loader.load (this.src, geometry => {

      const texture = new THREE.MeshLambertMaterial({color: 0x68c3c0});
      geometry.castShadow = true;
      geometry.receiveShadow = true;
      this.mesh = new THREE.Mesh(geometry, texture);
      //console.log(mesh.scale = (.2, .2, .2));

    //mesh.position.x = 0;
      /*
this.mesh.rotation.y = 100;
      //mesh.position.y = 1.5;
      this.mesh.position.set(- 3, .5, - 15);
      this.mesh.rotation.x = - .25;*/




      this.container.add(this.mesh);

      //console.log(scene);
    });
  }

}

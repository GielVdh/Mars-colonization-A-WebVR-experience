import * as THREE from 'three';

export default class Model {

  container
  src
  loadingManager

  constructor(container, src, loadingManager) {
    this.container = container;
    this.src = src;
    this.loadingManager = loadingManager;
    this.init();
  }

  init() {
    this.loader = new THREE.JSONLoader(this.loadingManager);
    this.loader.load (this.src, (geometry, materials) => {

      //const texture = new THREE.MeshLambertMaterial({color: 0x68c3c0});

      this.mesh = new THREE.Mesh(geometry, materials);
      //console.log(mesh.scale = (.2, .2, .2));

    //mesh.position.x = 0;
      /*
this.mesh.rotation.y = 100;
      //mesh.position.y = 1.5;
      this.mesh.position.set(- 3, .5, - 15);
      this.mesh.rotation.x = - .25;*/




      this.container.add(this.mesh);

      //console.log(scene);
    }, this.onProgress);
  }

  onProgress(xhr) {
    console.log(this.src);
    if (xhr.lengthComputable) {
      const percentComplete = xhr.loaded / xhr.total * 100;
      console.log(`${Math.round(percentComplete, 2)  }% downloaded`);
    }
  }

  onError() {

  }


}

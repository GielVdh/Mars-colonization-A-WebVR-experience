import * as THREE from 'three';
import TerrainLoader from '../lib/TerrainLoader';

export default class Terrain {

  scene
  userHeight
  loadingManager

  constructor(scene, userHeight, loadingManager) {
    this.userHeight = userHeight;
    this.scene = scene;
    this.loadingManager = loadingManager;

    this.init();
  }

  init() {

    const terrainLoader = new TerrainLoader(this.loadingManager);

    terrainLoader.load(`assets/img/output.bin`, data => {
      const terrainGeom = new THREE.PlaneGeometry(60, 100, 99, 999);

      for (let i = 0, l = terrainGeom.vertices.length;i < l;i ++) {
        terrainGeom.vertices[i].z = data[i] / 65535 * 12;
      }

      const material = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader(this.loadingManager).load(`assets/img/color.jpg`)
        //color: 0x000000
      });

      const terrain = new THREE.Mesh(terrainGeom, material);
      terrain.name = `terrain`;
      terrain.receiveShadow = true;
      terrain.position.set(5, - 4, - 10);
      terrain.rotation.z = 3;
      terrain.rotation.x = - 1.5;
      this.scene.add(terrain);
    });

  }

}

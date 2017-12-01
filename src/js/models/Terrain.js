import * as THREE from 'three';
import TerrainLoader from '../lib/TerrainLoader';

export default class Terrain {

  constructor(scene, userHeight) {
    this.userHeight = userHeight;
    this.scene = scene;
    this.init();
  }

  init() {

    const terrainLoader = new TerrainLoader();

    terrainLoader.load(`../assets/img/output.bin`, data => {
      const terrainGeom = new THREE.PlaneGeometry(60, 100, 99, 999);

      for (let i = 0, l = terrainGeom.vertices.length;i < l;i ++) {
        terrainGeom.vertices[i].z = data[i] / 65535 * 12;
      }

      const material = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(`../assets/img/color.jpg`)
        //color: 0x000000
      });

      const terrain = new THREE.Mesh(terrainGeom, material);
      terrain.name = `terrain`;
      terrain.receiveShadow = true;
      terrain.position.set(5, this.userHeight - 9, - 5);
      //terrain.position.y = - 5;
      terrain.rotation.x = - 1.5;
      this.scene.add(terrain);
    });

    /*
const geometry = new THREE.PlaneGeometry(600, 600, 30, 30);

    const length = geometry.vertices.length;

    for (let i = 0;i < length;i ++) {
      geometry.vertices[i].z = Math.floor((Math.random() * 10) + 1);
    }

    const material = new THREE.MeshBasicMaterial({
     //side: THREE.DoubleSide,
     //map:     THREE.ImageUtils.loadTexture('http://thematicmapping.org/playground/terrain/jotunheimen_terrain2.png'),
     //transparent:true,
     //opacity:0.8
      wireframe: true,
      color: `blue`
    });

    const terrain =
    new THREE.Mesh(geometry, material);
    terrain.overdraw = true;
    terrain.position.z = - 100;
    terrain.rotation.x = 90;
    terrain.rotation.z = 0;

    this.scene.add(terrain);
  }*/


  }

}

import * as THREE from 'three';

export default class Text {

  constructor(scene, content) {

    this.scene = scene;
    this.content = content;

    this.init();
  }

  init() {
    const loader = new THREE.FontLoader();

    loader.load(`../assets/fonts/helvetiker_regular.typeface.json`, font => {
      console.log(font);
      const txtGeom = new THREE.TextGeometry(this.content, {
        font: font,
        size: 10,
        height: 1,
        curveSegments: 12,
        bevelEnabled: false,
      });
      const txtMaterial = new THREE.MeshPhongMaterial({color: 0x000000});

      this.txtMesh = new THREE.Mesh(txtGeom, txtMaterial);
      this.txtMesh.castShadow = true;
      this.txtMesh.receiveShadow = true;
      this.txtMesh.position.x = 200;
      this.txtMesh.rotation.y = 200;
      this.txtMesh.position.y = 0;
      this.txtMesh.position.z = - 100;

      this.scene.add(this.txtMesh);

    });
  }


}

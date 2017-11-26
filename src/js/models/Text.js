import * as THREE from 'three';

export default class Text {

  txtGeom

  constructor(scene, content, position, rotation) {

    this.position = position;
    this.rotation = rotation;
    this.scene = scene;
    this.content = content;

    this.init();
  }

  init() {
    const loader = new THREE.FontLoader();

    loader.load(`../assets/fonts/helvetiker_regular.typeface.json`, font => {
      console.log(font);
      this.txtGeom = new THREE.TextGeometry(this.content, {
        font: font,
        size: 10,
        height: 1,
        curveSegments: 12,
        bevelEnabled: false,
      });

      const txtMaterial = new THREE.MeshPhongMaterial({color: 0x000000});
      const txtMesh = new THREE.Mesh(this.txtGeom, txtMaterial);
      txtMesh.position.set(...this.position);
      txtMesh.rotation.set(...this.rotation);

      txtMesh.castShadow = true;
      txtMesh.receiveShadow = true;

      this.scene.add(txtMesh);

    });
  }


}

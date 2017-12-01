import * as THREE from 'three';

export default class Text {

  txtGeom
  txtMesh

  constructor(scene, content, position, rotation) {

    this.position = position;
    this.rotation = rotation;
    this.scene = scene;
    this.content = content;

    this.init();
  }

  init() {
    const loader = new THREE.FontLoader();
    console.log(loader);
    loader.load(`../assets/fonts/helvetiker_regular.typeface.json`, font => {
      console.log(font);
      this.txtGeom = new THREE.TextGeometry(this.content, {
        font: font,
        size: 5,
        height: 1,
        curveSegments: 12,
        bevelEnabled: false,
      });

      //console.log(this.camera.position);
      const txtMaterial = new THREE.MeshLambertMaterial({color: 0x000000});
      this.txtMesh = new THREE.Mesh(this.txtGeom, txtMaterial);
      this.txtMesh.position.set(...this.position);
      this.txtMesh.rotation.set(...this.rotation);

      this.txtMesh.name = `text`;
      this.scene.add(this.txtMesh);

    });
    console.log(this.txtMesh);
  }

  lookAt(camera) {
    console.log(camera);
    this.txtMesh.lookAt(camera.position);
  }


}

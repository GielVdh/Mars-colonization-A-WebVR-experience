import * as THREE from 'three';

export default class Text {

  txtGeom
  txtMesh

  constructor(scene, content, position) {

    this.position = position;
    //this.rotation = rotation;
    this.scene = scene;
    this.content = content;

    this.init();
  }

// TO DO: adjust for geometry text
  init() {
    const loader = new THREE.FontLoader();
    console.log(loader);
    loader.load(`../assets/fonts/neuropol_regular.json`, font => {

      const color = 0x000000;

      const txtShape = new THREE.BufferGeometry();

      const mat = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide
      });

      const shapes = font.generateShapes(this.content, .08, 2);

      const geom = new THREE.ShapeGeometry(shapes);

      geom.computeBoundingBox();

      const xMid = - .5 * (geom.boundingBox.max.x - geom.boundingBox.min.x);

      geom.translate(xMid, 0, 0);

      txtShape.fromGeometry(geom);

      const txt = new THREE.Mesh(txtShape, mat);
      txt.position.set(...this.position);
      /*
txt.position.x = .08;
      txt.position.y = .07;
      txt.position.z = .3;*/


      this.scene.add(txt);

      /*
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
      */


    });
    console.log(this.txtMesh);
  }

  lookAt(camera) {
    console.log(camera);
    this.txtMesh.lookAt(camera.position);
  }


}

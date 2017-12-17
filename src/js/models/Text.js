import * as THREE from 'three';

export default class Text {

  position
  scene
  content
  loadingManager

  constructor(scene, content, position, loadingManager) {

    this.position = position;
    //this.rotation = rotation;
    this.scene = scene;
    this.content = content;
    this.loadingManager = loadingManager;

    this.init();
  }

// TO DO: adjust for geometry text
  init() {
    const loader = new THREE.FontLoader(this.loadingManager);
    console.log(loader);
    loader.load(`../assets/fonts/DS-Digital_Bold.json`, font => {

      const color = 0xffffff;

      const txtShape = new THREE.BufferGeometry();

      const mat = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide
      });

      const shapes = font.generateShapes(this.content, .03, 2);

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
  }

  lookAt(camera) {
    console.log(camera);
    this.txtMesh.lookAt(camera.position);
  }


}

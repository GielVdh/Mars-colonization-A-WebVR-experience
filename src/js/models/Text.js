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

    loader.load(`assets/fonts/DS-Digital_Bold.json`, font => {

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

      this.scene.add(txt);

    });
  }

  lookAt(camera) {
    this.txtMesh.lookAt(camera.position);
  }


}

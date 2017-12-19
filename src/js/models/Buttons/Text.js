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
    this.loader = new THREE.FontLoader(this.loadingManager);

    this.loader.load(`assets/fonts/DS-Digital_Bold.json`, font => {

      this.color = 0xffffff;

      this.txtShape = new THREE.BufferGeometry();

      this.mat = new THREE.MeshBasicMaterial({
        color: this.color,
        side: THREE.DoubleSide
      });

      this.shapes = font.generateShapes(this.content, .03, 2);

      this.geom = new THREE.ShapeGeometry(this.shapes);

      this.geom.computeBoundingBox();

      this.xMid = - .5 * (this.geom.boundingBox.max.x - this.geom.boundingBox.min.x);

      this.geom.translate(this.xMid, 0, 0);

      this.txtShape.fromGeometry(this.geom);

      this.txt = new THREE.Mesh(this.txtShape, this.mat);
      this.txt.position.set(...this.position);

      this.scene.add(this.txt);

    });
  }
}

import {Mesh, RingBufferGeometry, MeshBasicMaterial} from 'three';

export default class CrossHair {

  constructor() {
    this.crosshair = new Mesh(
      new RingBufferGeometry(0.02, 0.04, 32),
      new MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.5,
        transparent: true
      })
  );
    return this.crosshair;

  }
}

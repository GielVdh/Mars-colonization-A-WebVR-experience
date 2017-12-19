import BufferModel from '../models/BufferModel';
import {Group} from 'three';

export default class ChimneyGroup {

  o = [{
    position: [10, 4, - 16]
  },
  {
    position: [5, 4, - 16]
  },
  {
    position: [15, 4, - 16]
  }]

  scale = [.3, .3, .3];
  rotation = [.2, - .2, 0];
  src = `assets/3dmodels/5/chimney3.json`;

  constructor(loadingManager) {

    this.loadingManager = loadingManager;
    this.container = new Group();

    for (let i = 0;i < this.o.length;i ++) {
      this.obj = new BufferModel(this.container, this.src, this.loadingManager, this.o[i].position, this.scale, this.rotation);
    }

    return this.container;

  }

}

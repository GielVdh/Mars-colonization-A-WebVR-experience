import Model from '../../models/Model';
import TreesGroup from './TreesGroup';
import {Group} from 'three';

export default class TerraFormingGroup {

  o = [{
    position: [15, 2, - 10],
    scale: [3, 3, 3],
    rotation: [0, 3.5, 0],
    src: `assets/3dmodels/6/trees_lo_poly.json`
  }]

  constructor(loadingManager) {

    this.loadingManager = loadingManager;
    this.container = new Group();

    for (let i = 0;i < this.o.length;i ++) {
      this.obj = new Model(this.container, this.o[i].src, this.loadingManager, this.o[i].position, this.o[i].scale, this.o[i].rotation);
    }

    this.trees = new TreesGroup(this.container);

    return this.container;
  }
}

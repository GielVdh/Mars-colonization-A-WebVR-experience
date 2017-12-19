import Model from '../models/Model';
import {Group} from 'three';

export default class ErvGroup {

  position = [- 15, 20, - 5];
  scale = [.7, .7, .7];
  rotation = [0, 5, 0];
  src = `assets/3dmodels/2/MarsDirect_ERV.json`;

  constructor(loadingManager) {

    this.loadingManager = loadingManager;
    this.container = new Group();
    this.container.name = `ERV`;

    this.obj = new Model(this.container, this.src, this.loadingManager, this.position, this.scale, this.rotation);

    return this.container;
  }
}

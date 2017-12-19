import Model from '../models/Model';
import {Group} from 'three';

export default class RoverGroup {

  position = [0, 0, 0];
  scale = [.5, .5, .5];
  rotation = [- .2, 0, 0];
  src = `assets/3dmodels/1/rover.json`;

  constructor(loadingManager) {

    this.loadingManager = loadingManager;
    this.container = new Group();
    this.container.name = `rover`;

    this.obj = new Model(this.container, this.src, this.loadingManager, this.position, this.scale, this.rotation);

    return this.container;
  }
}

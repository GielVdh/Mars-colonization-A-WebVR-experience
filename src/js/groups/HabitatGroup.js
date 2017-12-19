import BufferModel from '../models/BufferModel';
import {Group} from 'three';

export default class HabitatGroup {

  position = [- 20, - .5, - 1];
  scale = [.7, .7, .7];
  rotation = [.04, 0, 0];
  src = `assets/3dmodels/3/hab.json`;

  constructor(loadingManager) {

    this.loadingManager = loadingManager;
    this.container = new Group();

    this.obj = new BufferModel(this.container, this.src, this.loadingManager, this.position, this.scale, this.rotation);

    return this.container;
  }
}

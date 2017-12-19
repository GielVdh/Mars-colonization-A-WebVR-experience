import Model from '../../models/Model';
import SolarPanelGroup from './SolarPanelGroup';
import {Group} from 'three';

export default class CityGroup {

  o = [{
    position: [- 20, .7, - 25],
    scale: [1.2, 1.2, 1.2],
    rotation: [0, - .2, 0],
    src: `assets/3dmodels/4/habitats3.json`
  },
  {
    position: [10, - 1, 25],
    scale: [1.1, 1.1, 1.1],
    rotation: [.05, 5, 0],
    src: `assets/3dmodels/4/dome.json`
  }]

  constructor(loadingManager) {

    this.loadingManager = loadingManager;
    this.container = new Group();

    for (let i = 0;i < this.o.length;i ++) {
      this.obj = new Model(this.container, this.o[i].src, this.loadingManager, this.o[i].position, this.o[i].scale, this.o[i].rotation);
    }

    this.solarpanels = new SolarPanelGroup(this.container);

    return this.container;
  }
}

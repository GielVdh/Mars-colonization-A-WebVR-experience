import BufferModel from '../../models/BufferModel';
export default class SolarPanelGroup {

  o = [{
    position: [30, 0, 20],
    rotation: [.04, 0, 0]
  },
  {
    position: [36, .8, 15],
    rotation: [.04, .3, 0]
  },
  {
    position: [31, .5, 11],
    rotation: [.08, .3, .1]
  },
  {
    position: [35, .8, 5],
    rotation: [.08, .3, .1]
  }]

  scale = [.7, .7, .7];
  src = `assets/3dmodels/4/solarpanel.json`;

  constructor(container, loadingManager) {

    this.loadingManager = loadingManager;
    this.container = container;

    for (let i = 0;i < this.o.length;i ++) {
      this.obj = new BufferModel(this.container, this.src, this.loadingManager, this.o[i].position, this.scale, this.o[i].rotation);
    }
  }

}

import Model from '../models/Model';
export default class AstronautsGroup {

  o = [{
    position: [- 5, 0, - 1],
  },
  {
    position: [5, 0, 15],
  }]

  scale = [.7, .7, .7];
  rotation = [0, 3, 0];
  src = `../../assets/3dmodels/3/astronaut3.json`;

  constructor(container, loadingManager) {

    this.loadingManager = loadingManager;
    this.container = container;

    for (let i = 0;i < this.o.length;i ++) {
      this.obj = new Model(this.container, this.src, this.loadingManager, this.o[i].position, this.scale, this.rotation);
    }
  }

}

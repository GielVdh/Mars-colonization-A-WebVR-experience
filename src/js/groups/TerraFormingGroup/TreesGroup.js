import Model from '../../models/Model';
export default class TreesGroup {

  o = [{
    position: [13, 3, 0],
    scale: [.5, .5, .5]
  },
  {
    position: [12, 3, - 1],
    scale: [.7, .7, .7]
  },
  {
    position: [15, 3, 3],
    scale: [.7, .7, .7]
  },
  {
    position: [- 40, 1, - 37],
    scale: [.7, .7, .7]
  },

  {
    position: [20, 3, - 3],
    scale: [.6, .6, .6]
  },
  {
    position: [- 50, 0, - 15],
    scale: [.7, .7, .7]
  },
  {
    position: [- 43, 0, - 25],
    scale: [.9, .9, .9]
  },
  {
    position: [- 28, 1, - 32],
    scale: [.9, .9, .9]
  },
  {
    position: [- 52, 0, - 22],
    scale: [1.1, 1.1, 1.1]
  },
  {
    position: [- 20, 1, - 27],
    scale: [1.1, 1.1, 1.1]
  },
  {
    position: [- 35, 1, - 25],
    scale: [1.5, 1.5, 1.5]
  },
  {
    position: [- 25, 1, - 28],
    scale: [1.5, 1.5, 1.5]
  },
  {
    position: [- 42, 0, - 20],
    scale: [1.5, 1.5, 1.5]
  },

  {
    position: [- 55, 0, - 18],
    scale: [1.5, 1.5, 1.5]
  },
  {
    position: [- 30, 1, - 28],
    scale: [1.9, 1.9, 1.9]
  },
  {
    position: [- 45, 0, - 28],
    scale: [1.9, 1.9, 1.9]
  }]

  rotation = [0, 0, 0];
  src = `assets/3dmodels/6/low_poly2.json`;

  constructor(container, loadingManager) {

    this.loadingManager = loadingManager;
    this.container = container;

    for (let i = 0;i < this.o.length;i ++) {
      this.obj = new Model(this.container, this.src, this.loadingManager, this.o[i].position, this.o[i].scale, this.rotation);
    }
  }

}

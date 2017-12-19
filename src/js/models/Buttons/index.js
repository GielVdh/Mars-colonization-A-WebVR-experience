import Button from './Button';

export default class Buttons {

  o = [
    {
      cPos: [.06, 0, 0],
      cName: `previous`,
      bPos: [- 1.05, 1, - 1],
      bRot: [- .2, .3, 0],
      content: `PREVIOUS`,
      tPos: [.075, 0, .075]
    },
    {
      cPos: [- .06, 0, 0],
      cName: `next`,
      bPos: [1.05, 1, - 1],
      bRot: [- .2, - .3, 0],
      content: `NEXT`,
      tPos: [- .09, 0, .075]
    }
  ]

  constructor(scene, array, lm) {

    this.scene = scene;
    this.array = array;
    this.lm = lm;

    for (let i = 0;i < this.o.length;i ++) {
      console.log(this.o[i].bPos);
      this.b = new Button(this.scene, this.array, this.o[i].cPos, this.o[i].cName, this.o[i].bPos, this.o[i].bRot, this.o[i].content, this.o[i].tPos, this.lm);
    }
  }
}

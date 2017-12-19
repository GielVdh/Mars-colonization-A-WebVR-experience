import {BoxBufferGeometry, MeshLambertMaterial, Mesh, Group} from 'three';
import Text from './Text';

export default class Button {
  constructor(scene, array, cPos, cName, bPos, bRot, content, tPos, lm) {

    this.scene = scene;
    this.array = array;

    this.b = new Group();
    this.b.position.set(...bPos);
    this.b.rotation.set(...bRot);

    this.g = new BoxBufferGeometry(.3, .1, .05);
    this.m = new MeshLambertMaterial({color: 0x030a71});

    this.c = new Mesh(this.g, this.m);
    this.c.position.set(...cPos);
    this.c.name = cName;
    this.b.add(this.c);
    console.log(this.c);
    new Text(this.b, content, tPos, lm);

    this.scene.add(this.b);
    this.array.push(this.c);
  }
}

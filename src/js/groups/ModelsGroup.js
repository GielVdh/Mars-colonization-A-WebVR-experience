import CityGroup from './CityGroup/';
import TerraFormingGroup from './TerraFormingGroup/';
import ChimneyGroup from './ChimneyGroup.js';
import RoverGroup from './RoverGroup.js';
import ErvGroup from './ErvGroup.js';
import HabitatGroup from './HabitatGroup.js';
import ParticleEmitter from '../models/ParticleEmitter';

import {Group} from 'three';

export default class ModelGroup {

  mc
  pErv
  pCh
  eP = [{
    pSrc: `assets/img/icon_test.png`,
    pPos: [- 14, 19, - 5],
    pRot: [0, 0, 0],
    rangeH: 0.8,
    rangeV: 2
  }]

  eS = [
    {
      pSrc: `assets/img/smoke.png`,
      pPos: [11, 9, - 15],
      pRot: [0, 0, 9],
      rangeH: 0.8,
      rangeV: 15
    }
  ]

  constructor(scene, lm, array) {

    this.scene = scene;
    this.array = array;

    this.mc = new Group();
    this.mc.rotation.y = 100;
    this.mc.position.set(- 3, - 1, - 10);

    // add rover to te modelsContainer and push it to the models array
    this.r = new RoverGroup(lm);
    this.mc.add(this.r);
    this.array.push(this.r);

    // add ERV to te modelsContainer and push it to the models array
    this.e = new ErvGroup(lm);
    this.pErv = new ParticleEmitter(this.e, lm, this.eP[0].pSrc, this.eP[0].pPos, this.eP[0].pRot, this.eP[0].rangeH, this.eP[0].rangeV);
    console.log(this.pErv);
    this.mc.add(this.e);
    this.array.push(this.e);

    // add habitat to te modelsContainer and push it to the models array
    this.h = new HabitatGroup(lm);
    this.mc.add(this.h);
    this.array.push(this.h);

    // add buildings to te modelsContainer and push it to the models array
    this.c = new CityGroup(lm);
    this.mc.add(this.c);
    this.array.push(this.c);

    // add chimneys to te modelsContainer and push it to the models array
    this.ch = new ChimneyGroup(lm);
    this.pCh = new ParticleEmitter(this.ch, lm, this.eS[0].pSrc, this.eS[0].pPos, this.eS[0].pRot, this.eS[0].rangeH, this.eS[0].rangeV);
    this.mc.add(this.ch);
    this.array.push(this.ch);

    // add terraforming to te modelsContainer and push it to the models array
    this.t = new TerraFormingGroup(lm);
    this.mc.add(this.t);
    this.array.push(this.t);

    this.scene.add(this.mc);

  }

  ervParticles() {
    return this.pErv;
  }

  chParticles() {
    return this.pCh;
  }
}

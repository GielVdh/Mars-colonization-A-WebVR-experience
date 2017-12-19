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
    this.pErv = new ParticleEmitter(this.e, lm);
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
}

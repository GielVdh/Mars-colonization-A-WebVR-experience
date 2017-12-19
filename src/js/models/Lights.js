import {HemisphereLight, DirectionalLight} from 'three';

export default class Lights {

  scene

  constructor(scene) {
    this.scene = scene;

    // hemisphereLight is a gradient colored light
    this.hemisphereLight = new HemisphereLight(0xaaaaaa, 0x000000, .9);

    // directional light shines from a specific direction
    this.shadowLight = new DirectionalLight(0xffffff, .9);

    //set direction of the light
    this.shadowLight.position.set(150, 350, 350);

    // allow shadow casting
    this.shadowLight.castShadow = true;

    // define visible area of the projected shadow

    this.shadowLight.shadow.camera.right = 400;
    this.shadowLight.shadow.camera.top = 400;
    this.shadowLight.shadow.camera.bottom = - 400;
    this.shadowLight.shadow.camera.near = 1;
    this.shadowLight.shadow.camera.far = 10000;

    // define resolution of the shadow // less performante
    this.shadowLight.shadow.mapSize.width = 2048;
    this.shadowLight.shadow.mapSize.height = 2048;

    // activate lights
    this.scene.add(this.hemisphereLight);
    this.scene.add(this.shadowLight);
  }
}

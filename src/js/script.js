import * as THREE from 'three';
import VRControls from 'three-vrcontrols-module';
import VREffect from 'three-vreffect-module';
import * as webvrui from 'webvr-ui';
import 'webvr-polyfill/build/webvr-polyfill';
import Text from './models/Text.js';

const container = document.getElementById(`world`);

let scene, renderer, camera, WIDTH, HEIGHT, mesh, effect, controls, enterVR;

const init = () => {

  createScene();

  createLights();
  createShape();
  createText();

  createFloor();

  animate();
};

const createFloor = () => {
  const geometry = new THREE.BoxGeometry(2000, 1, 2000);
  const material = new THREE.MeshPhongMaterial({color: 0x808080, dithering: true});
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, - 1, 0);
  mesh.receiveShadow = true;
  scene.add(mesh);

};

const createText = () => {

  const content = `Dit is een test`;

  new Text(scene, content);
  /*
  const loader = new THREE.FontLoader();

  loader.load(`../assets/fonts/helvetiker_regular.typeface.json`, font => {
    console.log(font);
    txtGeom = new THREE.TextGeometry(`Hello`, {
      font: font,
      size: 10,
      height: 1,
      curveSegments: 12,
      bevelEnabled: false,
    });
    const txtMaterial = new THREE.MeshPhongMaterial({color: 0x000000});

    const txtMesh = new THREE.Mesh(txtGeom, txtMaterial);
    txtMesh.castShadow = true;
    txtMesh.receiveShadow = true;
    txtMesh.position.x = 200;
    txtMesh.rotation.y = 200;
    txtMesh.position.y = 0;
    txtMesh.position.z = - 100;

    scene.add(txtMesh);
  });  */



};

const createScene = () => {

  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  //scene
  scene = new THREE.Scene();
  //console.log(scene);


  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);

  controls = new VRControls(camera);
  controls.standing = true;
  camera.position.y = 400;

  // renderer
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

  container.appendChild(renderer.domElement);
  // Apply VR stereo rendering to renderer.
  effect = new VREffect(renderer);
  effect.setSize(WIDTH, HEIGHT);


  const options = {};
  enterVR = new webvrui.EnterVRButton(renderer.domElement, options);
  enterVR.on(`exit`, function() {
    camera.quaternion.set(0, 0, 0, 1);
    camera.position.set(0, controls.userHeight, 0);
  });
  container.appendChild(enterVR.domElement);

};

const createShape = () => {

  const loader = new THREE.BufferGeometryLoader();
  loader.load (`../assets/3dmodels/Freigther.json`, geometry => {
    const texture = new THREE.MeshLambertMaterial({color: 0x68c3c0});
    geometry.castShadow = true;
    geometry.receiveShadow = true;
    mesh = new THREE.Mesh(geometry, texture);
    //console.log(mesh.scale = (.2, .2, .2));
    mesh.position.x = 0;
    mesh.rotation.y = 100;
    mesh.position.y = 0;
    mesh.position.z = - 20;
    scene.add(mesh);
    console.log(scene);
  });


};

const createLights = () => {
    // hemisphereLight is a gradient colored light
  const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

    // directional light shines from a specific direction
  const shadowLight = new THREE.DirectionalLight(0xffffff, .9);

    //set direction of the light
  shadowLight.position.set(150, 350, 350);

    // allow shadow casting
  shadowLight.castShadow = true;

    // define visible area of the projected shadow

  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = - 400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 10000;

    // define resolution of the shadow // less performante
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

    // activate lights
  scene.add(hemisphereLight);
  scene.add(shadowLight);
};

const animate = () => {

  //mesh.rotation.x += 0.005;
  //mesh.rotation.y += 0.01;

  controls.update();
  //console.log(renderer.vr.getDevice());
  effect.render(scene, camera);
  //console.log(vrDisplay);
  requestAnimationFrame(animate);
  //console.log(vrDisplay);
};

init();

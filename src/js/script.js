import * as THREE from 'three';
import VRControls from 'three-vrcontrols-module';
import VREffect from 'three-vreffect-module';
import * as webvrui from 'webvr-ui';
import 'webvr-polyfill';
import Text from './models/Text.js';
//import Terrain from './models/Terrain.js';

const container = document.getElementById(`world`); //noHeadset = document.getElementById(`no-headset`);

let scene, renderer, camera, WIDTH, HEIGHT, mesh, effect, controls, vrDisplay, vrButton, skybox, cube;

const init = () => {
  window.addEventListener(`resize`, onResize, true);
  window.addEventListener(`vrdisplaypresentchange`, onResize, true);

  createScene();
  getVRDisplays();
  createSkyBox();

  createLights();
  createShape();
  createTitle();
  createDescription();

  //createFloor();
  //createTerrain();
  animate();
};

/*
const createFloor = () => {
  const geometry = new THREE.BoxGeometry(2000, 1, 2000);
  const material = new THREE.MeshPhongMaterial({color: 0x808080, dithering: true});
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, - 1, 0);
  mesh.receiveShadow = true;
  scene.add(mesh);

};*/

/*
const createTerrain = () => {
  new Terrain(scene);
};*/



const createTitle = () => {

  const content = `Dit is een test`;

  new Text(scene, content, [200, 0, - 100], [0, 200, 0]);


  //description.txtMesh.position.x = 300;

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

const onResize = () => {
  effect.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};


const createDescription = () => {

  const content = `Een nieuw tekstblokje`;

  const description = new Text(scene, content, [200, 0, - 10], [0, 300, 0]);
  console.log(description);
};

const createScene = () => {

  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  /*
  window.addEventListener(`resize`, handleResize, true);
  window.addEventListener(`vrdisplaypresentchange`, handleResize, true);  */


  //scene
  scene = new THREE.Scene();
  console.log(scene);


  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 10000);


  controls = new VRControls(camera);
  controls.standing = true;
  camera.position.y = controls.userHeight;
  //camera.position.x = - 0.03200000151991844;

  // renderer
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Apply VR stereo rendering to renderer.
  effect = new VREffect(renderer);
  effect.setSize(WIDTH, HEIGHT);


  /*
enterVR.on(`enter`, () => {
    enterVR.requestEnterFullscreen().then(() => {});
  });*/
  const uiOptions = {
    color: `black`,
    background: `white`,
    corners: `square`
  };
  vrButton = new webvrui.EnterVRButton(renderer.domElement, uiOptions);
  vrButton.on(`exit`, function() {
    camera.quaternion.set(0, 0, 0, 1);
    camera.position.set(0, controls.userHeight, 0);
  });
  vrButton.on(`hide`, function() {
    document.getElementById(`ui`).style.display = `none`;
  });
  vrButton.on(`show`, function() {
    document.getElementById(`ui`).style.display = `inherit`;
  });
  document.getElementById(`vr-button`).appendChild(vrButton.domElement);
  document.getElementById(`magic-window`).addEventListener(`click`, function() {
    vrButton.requestEnterFullscreen();
  });

  /*
  noHeadset.addEventListener(`click`, e => {
    e.preventDefault();
    // hotfix for enterFullscreen
    enterVR.requestEnterFullscreen().catch(e => {
      console.log(e);
      if (e.message === `e.manager.enterFullscreen(...).then is not a function`) {
        console.log(`webvr-ui fullscreen hotfix`);
      } else {
        return e;
      }
    });
  });  */


};

/*
const handleResize = () => {
  effect.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeigth;
  camera.updateProjectionMatrix();
};*/



const createShape = () => {

  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshLambertMaterial({color: 0x68c3c0});

  cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, controls.userHeight, - 1);

  scene.add(cube);

  /*
  const loader = new THREE.BufferGeometryLoader();
  loader.load (`../assets/3dmodels/Freigther.json`, geometry => {
    const texture = new THREE.MeshLambertMaterial({color: 0x68c3c0});
    geometry.castShadow = true;
    geometry.receiveShadow = true;
    mesh = new THREE.Mesh(geometry, texture);
    //console.log(mesh.scale = (.2, .2, .2));

  //mesh.position.x = 0;
    //mesh.rotation.y = 100;
    //mesh.position.y = 1.5;
    mesh.position.set(0, controls.userHeight, - 20);


    scene.add(mesh);
    console.log(scene);
  });
  */



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

const createSkyBox = () => {
  const vertexShader = document.getElementById(`sky-vertex`).textContent;
  const fragmentShader = document.getElementById(`sky-fragment`).textContent;
  const uniforms = {
    topColor: {type: `c`, value: new THREE.Color(0xb79670)}, bottomColor: {type: `c`, value: new THREE.Color(0xc48051)},
    offset: {type: `f`, value: 50}, exponent: {type: `f`, value: 0.6}
  };
  const skyMaterial = new THREE.ShaderMaterial({vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide, fog: false});

    // create Mesh with sphere geometry and add to the scene
  skybox = new THREE.Mesh(new THREE.SphereGeometry(250, 60, 40), skyMaterial);
  scene.add(skybox);

  setupStage();
};


const getVRDisplays = () => {
  vrButton.getVRDisplay()
    .then(display => {
      //console.log(display.requestAnimationFrame);
      vrDisplay = display;
      display.requestAnimationFrame(animate);
      console.log(vrDisplay);
      console.log(effect);
    })
    .catch(() => {
      // If there is no display available, fallback to window
      vrDisplay = window;
      window.requestAnimationFrame(animate);
    });

};

const setupStage = () => {
  navigator.getVRDisplays().then(function(displays) {
    if (displays.length > 0) {
      vrDisplay = displays[0];
      if (vrDisplay.stageParameters) {
        setStageDimensions(vrDisplay.stageParameters);
      }
      vrDisplay.requestAnimationFrame(animate);
    }
  });
};

function setStageDimensions(stage) {
  // Make the skybox fit the stage.
  const material = skybox.material;
  scene.remove(skybox);
  // Size the skybox according to the size of the actual stage.
  const geometry = new THREE.BoxGeometry(stage.sizeX, 5, stage.sizeZ);
  skybox = new THREE.Mesh(geometry, material);
  // Place it on the floor.
  skybox.position.y = 5 / 2;
  scene.add(skybox);
  // Place the cube in the middle of the scene, at user height.
  mesh.position.set(0, controls.userHeight, 0);
}



const animate = () => {

  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;
  if (vrButton.isPresenting()) {
    controls.update();
    //renderer.render(scene, camera);

    effect.render(scene, camera);
    //console.log(effect.cameraR.position.x);

  } else {
    renderer.render(scene, camera);
  }
  //controls.update();
  //console.log(renderer.vr.getDevice());
  //effect.render(scene, camera);
  //console.log(vrDisplay);
  window.requestAnimationFrame(animate);
  //console.log(vrDisplay);
};

init();

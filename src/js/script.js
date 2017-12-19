import * as THREE from 'three';
import * as TWEEN from 'tween.js';
import VRControls from 'three-vrcontrols-module';
import VREffect from 'three-vreffect-module';
import Stats from './vendors/stats.min';
import * as webvrui from 'webvr-ui';
import 'webvr-polyfill';

//import Text from './models/Text.js';
import Terrain from './models/Terrain';
import Lights from './models/Lights';
import LoadingScreen from './models/LoadingScreen';
<<<<<<< HEAD
import ParticleEmitter from './models/ParticleEmitter';
import SmokeEmitter from './models/SmokeEmitter';
=======
import CrossHair from './models/CrossHair';
import Buttons from './models/Buttons/';
//import ParticleEmitter from './models/ParticleEmitter';
>>>>>>> added some more Groups: City, Rover, Erv, Habitat

import CityGroup from './groups/CityGroup/';
import TerraFormingGroup from './groups/TerraFormingGroup/';
import ChimneyGroup from './groups/ChimneyGroup.js';
import RoverGroup from './groups/RoverGroup.js';
import ErvGroup from './groups/ErvGroup.js';
import HabitatGroup from './groups/HabitatGroup.js';

// NOTE: Functions will be moved to a new group model
//import fadeAnim from './animations/fadeAnim';
import tweenAnim from './animations/tweenAnim';

const container = document.getElementById(`world`),
  uiContainer = document.getElementById(`ui`),
  loadingText = document.querySelector(`.loading`),
  loaderAnim = document.querySelector(`.loader`),
  buttonArray = [],
  descriptionArray = [],
  modelsArray = [],
  mouse = new THREE.Vector2();

let scene,
  renderer,
  camera,
  WIDTH,
  HEIGHT,
  mesh,
  effect,
  controls,
  vrDisplay,
  vrButton,
  skybox,
  hudLayoutGeom,
  INTERSECTED,
  //cube,
  raycaster,
  count = 0,
  descriptions,
  loadingScreen,
  loadingManager,
  RESOURCES_LOADED = false,
  stats,
  roverRotation,
  roverTranslation,
  particles,
  smoke;
  //hudCanvas,
  //textGroup;
  //cameraHUDOrt;

const init = () => {

  createScene();
  getVRDisplays();
  createSkyBox();

  createLights();
  createHUDLayout();
  createModels();

  createButtons();

  createTerrain();
  animate();
};

const createTerrain = () => {
  new Terrain(scene, controls.userHeight, loadingManager);
};

const createScene = () => {

  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  loadingScreen = new LoadingScreen();
  //console.log(loadingText);

  // Loadingmanager to track progress of all the loaders --> extra propertie for the loaders
  loadingManager = new THREE.LoadingManager();

  loadingManager.onProgress = (item, loaded, total) => {
    console.log(item, loaded, total);
    loadingText.innerHTML = `${loaded} of ${total} assets loaded`;
  };

  loadingManager.onLoad = () => {
    console.log(`loaded all resources`);
    checkIfModelVisible();
    RESOURCES_LOADED = !RESOURCES_LOADED;
  };

  /*
  window.addEventListener(`resize`, handleResize, true);
  window.addEventListener(`vrdisplaypresentchange`, handleResize, true);  */

  //scene
  scene = new THREE.Scene();
  console.log(scene);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

  controls = new VRControls(camera);
  controls.standing = true;
  camera.position.y = controls.userHeight;
  scene.add(camera);
  //camera.position.x = - 0.03200000151991844;

  // raycaster to check which objects are intersected
  raycaster = new THREE.Raycaster();

  // renderer
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, precision: `mediump`});
  renderer.setPixelRatio(window.devicePixelRatio);

  console.log(renderer.renderList);
  // TO DO EventListener for touch event
  window.addEventListener(`touchstart`, handleCardboardTouch);

  window.addEventListener(`resize`, onResize, true);
  window.addEventListener(`vrdisplaypresentchange`, onResize, true);
  /*
  window.addEventListener(`mousedown`, handleCardboardTouch);
  window.addEventListener(`mousemove`, handleMouseMove);  */



  //renderer.autoClear = false;
  container.appendChild(renderer.domElement);

  // Apply VR stereo rendering to renderer.
  effect = new VREffect(renderer);
  effect.setSize(WIDTH, HEIGHT);

  const uiOptions = {
    color: `black`,
    background: `white`,
    corners: `square`
  };
  vrButton = new webvrui.EnterVRButton(renderer.domElement, uiOptions);
  vrButton.on(`enter`, () => {
    TWEEN.removeAll();
    roverRotation.start();
  });
  vrButton.on(`exit`, () => {
    camera.quaternion.set(0, 0, 0, 1);
    camera.position.set(0, controls.userHeight, 0);
    window.removeEventListener(`mousedown`, handleCardboardTouch);
    window.removeEventListener(`mousemove`, handleMouseMove);
  });
  vrButton.on(`hide`, () => {
    document.getElementById(`ui`).style.display = `none`;
  });
  vrButton.on(`show`, () => {
    document.getElementById(`ui`).style.display = `inherit`;
  });
  document.getElementById(`vr-button`).appendChild(vrButton.domElement);
  document.getElementById(`magic-window`).addEventListener(`click`, () => {
    if (vrDisplay === window) {
      window.addEventListener(`mousedown`, handleCardboardTouch);
      window.addEventListener(`mousemove`, handleMouseMove);
    }
    vrButton.requestEnterFullscreen().catch(e => {
      console.log(e);
      if (e.message === `e.manager.enterFullscreen(...).then is not a function`) {
        console.log(`webvr-ui fullscreen hotfix`);
      } else {
        return e;
      }
    });
  });
};

const onResize = () => {
  effect.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // make loadingScreen adapt when sizeof the screen is changed
  loadingScreen.camera.aspect = window.innerWidth / window.innerHeight;
  loadingScreen.camera.updateProjectionMatrix();
};

const handleCardboardTouch = () => {
  //e.preventDefault();
  if (INTERSECTED !== undefined) {
    scrollDescriptions();
  }
};

const handleMouseMove = e => {
  e.preventDefault();

  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
};

/*
const handleResize = () => {
  effect.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeigth;
  camera.updateProjectionMatrix();
};*/

const addCrosshair = () => {

  const crosshair = new CrossHair();

  crosshair.position.z = - 1;
  camera.add(crosshair);

};


const createModels = () => {

  const modelsContainer = new THREE.Group();
  modelsContainer.rotation.y = 100;
  modelsContainer.position.set(- 3, - 1, - 10);

  // add rover to te modelsContainer and push it to the models array
  const rover = new RoverGroup(loadingManager);
  modelsContainer.add(rover);
  modelsArray.push(rover);

  // add ERV to te modelsContainer and push it to the models array
  const erv = new ErvGroup(loadingManager);
  modelsContainer.add(erv);
  modelsArray.push(erv);

  // add habitat to te modelsContainer and push it to the models array
  const habitat = new HabitatGroup(loadingManager);
  modelsContainer.add(habitat);
  modelsArray.push(habitat);

  // add buildings to te modelsContainer and push it to the models array
  const city = new CityGroup(loadingManager);
  modelsContainer.add(city);
  modelsArray.push(city);

  // add chimneys to te modelsContainer and push it to the models array
  const chimneys = new ChimneyGroup(loadingManager);
  modelsContainer.add(chimneys);
  modelsArray.push(chimneys);

  // add terraforming to te modelsContainer and push it to the models array
  const terraforming = new TerraFormingGroup(loadingManager);
  modelsContainer.add(terraforming);
  modelsArray.push(terraforming);

  scene.add(modelsContainer);
};

// NOTE: Position property is an array with x, y, z coordinates = new Model(container, src, loadingManager, [0, 0, 0])

<<<<<<< HEAD
<<<<<<< HEAD
const createRoverModel = () => {
  const container = new THREE.Group();

  container.name = `rover`;

  const src = `assets/3dmodels/1/rover.json`;
  new Model(container, src, loadingManager, [0, 0, 0], [.5, .5, .5], [- .2, 0, 0]);

  return container;

};

const createERVModel = () => {
  const container = new THREE.Group();
  container.name = `ERV`;
  particles = new ParticleEmitter(container, loadingManager);
  const src = `assets/3dmodels/2/MarsDirect_ERV.json`;
  new Model(container, src, loadingManager, [- 15, 20, - 5], [.7, .7, .7], [0, 5, 0]);

  return container;

};

const createHabitatModel = () => {
  const container = new THREE.Group();

  const src = `assets/3dmodels/3/hab.json`;

  new BufferModel(container, src, loadingManager, [- 20, - .5, - 1], [.7, .7, .7], [.04, 0, 0]);

  return container;

};

const createCityModel = () => {
  const container = new THREE.Group();
  smoke = new SmokeEmitter(container, loadingManager);

  const src = `assets/3dmodels/4/habitats3.json`;
  const src2 = `../assets/3dmodels/4/dome.json`;

  new Model(container, src, loadingManager, [- 20, .7, - 25], [1.2, 1.2, 1.2], [0, - .2, 0]);

  new SolarPanelGroup(container, loadingManager);

  new Model(container, src2, loadingManager, [10, - 1, 25], [1.1, 1.1, 1.1], [.05, 5, 0]);

  return container;

};

const createTerraformingModel = () => {
  const container = new THREE.Group();

  const src = `assets/3dmodels/6/trees_lo_poly.json`;
  new Model(container, src, loadingManager, [15, 2, - 10], [3, 3, 3], [0, 3.5, 0]);
=======
const createTerraformingModel = () => {
  const container = new THREE.Group();
  const src2 = `assets/3dmodels/6/trees_lo_poly.json`;

  new Model(container, src2, loadingManager, [15, 2, - 10], [3, 3, 3], [0, 3.5, 0]);
>>>>>>> added some more Groups: City, Rover, Erv, Habitat

  new TreesGroup(container, loadingManager);

  return container;
};

const nextButton = () => {
  const nextButton = new THREE.Group();
  nextButton.position.set(1.05, 1, - 1);
  nextButton.rotation.set(- .2, - .3, 0);

  const geometry = new THREE.BoxBufferGeometry(.3, .1, .05);
  const material = new THREE.MeshLambertMaterial({color: 0x030a71});

  cube = new THREE.Mesh(geometry, material);
  cube.position.x = - .06;
  cube.name = `next`;
  nextButton.add(cube);

  const content = `NEXT`;

  new Text(nextButton, content, [- .09, 0, .075], loadingManager);

  scene.add(nextButton);
  buttonArray.push(cube);
};

const previousButton = () => {
  const previousButton = new THREE.Group();
  previousButton.position.set(- 1.05, 1, - 1);
  previousButton.rotation.set(- .2, .3, 0);

  const geometry = new THREE.BoxBufferGeometry(.3, .1, .05);
  const material = new THREE.MeshLambertMaterial({color: 0x030a71});

  cube = new THREE.Mesh(geometry, material);
  cube.position.x = .06;
  cube.name = `previous`;
  previousButton.add(cube);

  const content = `PREVIOUS`;


  new Text(previousButton, content, [.075, 0, .075], loadingManager);

  scene.add(previousButton);
  buttonArray.push(cube);
=======
const createButtons = () => {
  new Buttons(scene, buttonArray, loadingManager);
>>>>>>> added a modelsgroup and buttons group
};

const scrollDescriptions = () => {

  if (INTERSECTED.name === `next` && count !== 5) {
    count ++;
    checkIfDescVisible();
    checkIfModelVisible();
  } else if (INTERSECTED.name === `previous` && count !== 0) {
    count --;
    checkIfDescVisible();
    checkIfModelVisible();
  }
};

const createHUDLayout = () => {
  const textureLoader = new THREE.TextureLoader(loadingManager);
  descriptions = new THREE.Group();
  for (let i = 0;i < 6;i ++) {
    hudLayoutGeom = new THREE.PlaneBufferGeometry(1, 1);
    const hudMat = new THREE.MeshBasicMaterial({map: textureLoader.load(`assets/img/text_faces/text_face_${i}.png`, tx => {

      tx.antistropy = 0;
      tx.magFilter = THREE.NearestFilter;
      tx.minFilter = THREE.NearestFilter;

    }), transparent: true});

    const mesh = new THREE.Mesh(hudLayoutGeom, hudMat);
    mesh.position.set(0, 1, - 1);
    mesh.rotation.x = - .2;
    mesh.scale.set(1.5, .4, .8);
    descriptionArray.push(mesh);
    descriptions.add(mesh);
  }
  checkIfDescVisible();

  scene.add(descriptions);
};

const checkIfDescVisible = () => {
  descriptionArray.forEach((e, id) => {
    if (id !== count) {
      e.visible = false;
    } else {
      e.visible = true;
    }
  });
};

const checkIfModelVisible = () => {
  modelsArray.forEach((e, id) => {
    if (id === count) {
      e.visible = true;
      startAnim(e);
    } else if (id < count) {
      e.visible = true;
    } else {
      e.visible = false;
    }
  });
};


const startAnim = e => {

  if (e.name === `ERV`) {
    const target = new THREE.Vector3(0, - 20, 0);
    const ervAnim = tweenAnim(e.position, target, {
      duration: 5000,
      easing: TWEEN.Easing.Exponential.Out,
      callback: () => {
        console.log(`Completed`);
      }
    });
    ervAnim.start();
  }

  if (e.name === `rover`) {
    const obj = e.children[0];
    const target1 = new THREE.Vector3(0, - 1, 0);
    roverRotation = tweenAnim(obj.rotation, target1, {
      duration: 5000,
      easing: TWEEN.Easing.Linear.none,
      callback: () => {
        console.log(`Completed`);
      }
    });

    const target2 = new THREE.Vector3(- 3, 0, 0);
    roverTranslation = tweenAnim(obj.position, target2, {
      duration: 6000,
      easing: TWEEN.Easing.Linear.None,
      callback: () => {
        console.log(`Completed`);
      }
    });
    roverRotation.chain(roverTranslation);
    const target3 = new THREE.Vector3(0, .9, 0);
    const roverRotation2 = tweenAnim(obj.rotation, target3, {
      duration: 6000,
      easing: TWEEN.Easing.Linear.None,
      callback: () => {
        console.log(`Completed`);
      }
    });
    roverTranslation.chain(roverRotation2);

    const target4 = new THREE.Vector3(- 1, 0, 2);
    const roverRotation3 = tweenAnim(obj.position, target4, {
      duration: 6000,
      easing: TWEEN.Easing.Linear.None,
      callback: () => {
        console.log(`Completed`);
      }
    });
    roverRotation2.chain(roverRotation3);
  }

};

const createLights = () => {

  new Lights(scene);
  console.log(scene);

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
      //display.requestAnimationFrame(animate);
      display.bufferScale_ = 1;
      addCrosshair();

    })
    .catch(() => {
      // If there is no display available, fallback to window
      vrDisplay = window;
      //window.requestAnimationFrame(animate);
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

const checkRay = () => {

  // set a raycaster starting from the cam pos
  raycaster.setFromCamera(mouse, controls.camera);

  // array of objects who we want to be registered when intersected
  const intersects = raycaster.intersectObjects(buttonArray, true);

  // check if the length of the array is bigger than zero && check if the object is not the INTERSECTED object
  if (intersects.length > 0) {
    if (INTERSECTED !== intersects[0].object) {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0x508ef2);

    }
  } else {
    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    INTERSECTED = undefined;
  }
};

const animate = time => {
  stats.begin();
  renderer.clear();
  // when resources are not fully loaded = Loadingscreen and vr ui hidden
  if (RESOURCES_LOADED === false) {
    stats.begin();

    renderer.render(loadingScreen.scene, loadingScreen.camera);
    uiContainer.classList.add(`hidden`);
    window.requestAnimationFrame(animate);

    return;
  }

  if (vrButton.isPresenting()) {
    controls.update();
    //hudControls.update();
    //renderer.render(scene, camera);

    effect.render(scene, camera);

  } else {
    renderer.render(scene, camera);
  }

  checkRay();
  uiContainer.classList.remove(`hidden`);
  loadingText.classList.add(`hidden`);
  loaderAnim.classList.add(`hidden`);
  TWEEN.update(time);
  //console.log(renderer.info);
<<<<<<< HEAD
  particles.update();
  smoke.update();
  //textGroup.rotation.y = Math.atan2((camera.rotation.x - textGroup.position.x), (camera.position.z - textGroup.position.z));
  //console.log(textGroup.rotation.y);
  //renderer.render(sceneHUD, cameraHUDOrt);
  //controls.update();
  //console.log(renderer.vr.getDevice());
  //effect.render(scene, camera);
  //console.log(vrDisplay);
=======
  //particles.update();

>>>>>>> added a modelsgroup and buttons group
  stats.end();
  window.requestAnimationFrame(animate);
};

init();

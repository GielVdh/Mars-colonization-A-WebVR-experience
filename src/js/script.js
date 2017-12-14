import * as THREE from 'three';
import * as TWEEN from 'tween.js';
import VRControls from 'three-vrcontrols-module';
import VREffect from 'three-vreffect-module';
import Stats from './vendors/stats.min';
import * as webvrui from 'webvr-ui';
import 'webvr-polyfill';

import Text from './models/Text.js';
import Terrain from './models/Terrain';
import Model from './models/Model';
import LoadingScreen from './models/LoadingScreen';
//import {MeshText2D, textAlign} from 'three-text2d';

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
   //noHeadset = document.getElementById(`no-headset`);

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
  //sceneHUD,
  //hudBitmap,
  //hudMaterial,
  hudLayoutGeom,
  INTERSECTED,
  cube,
  raycaster,
  count = 0,
  descriptions,
  loadingScreen,
  loadingManager,
  RESOURCES_LOADED = false,
  stats;
  //hudCanvas,
  //textGroup;
  //cameraHUDOrt;



const init = () => {
  window.addEventListener(`resize`, onResize, true);
  window.addEventListener(`vrdisplaypresentchange`, onResize, true);

  createScene();
  getVRDisplays();
  createSkyBox();

  createLights();
  createHUDLayout();
  //createHUD();
  //createShape();
  createTitle();
  createModels();
  //createDescription();
  nextButton();
  previousButton();

  //createFloor();
  createTerrain();
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




const createTerrain = () => {
  new Terrain(scene, controls.userHeight, loadingManager);
};



const createTitle = () => {
  /*
const text = new MeshText2D(`RIGHT`, {align: textAlign.right, font: `40px Arial`, fillStyle: `#000000`, antialias: true});
  text.material.alphaTest = 0.1;
  text.position.set(0, 5, - 10);
  text.scale.set(.01, .01, .01);
  console.log(text);
  controls.camera.add(text);*/




  /*
textGroup = new THREE.Object3D();
  textGroup.position.set(0, 2, - 10);
  textGroup.rotation.set(- 3, 2, - 10);
  textGroup.scale.set(.2, .2, .2);
  const content = `blub`;
  new Text(textGroup, content, [0, 0, 0], [0, 0, 0]);
  controls.camera.add(textGroup);*/


  //scene.add(textGroup);

  //text.lookAt(camera);


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

  // make loadingScreen adapt when sizeof the screen is changed
  loadingScreen.camera.aspect = window.innerWidth / window.innerHeight;
  loadingScreen.camera.updateProjectionMatrix();
};


/*
const createDescription = () => {

  const content = `Een nieuw tekstblokje`;

  const description = new Text(scene, content, [200, 0, - 10], [0, 300, 0]);
  console.log(description);
};*/



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
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  // TO DO EventListener for touch event
  window.addEventListener(`touchstart`, handleCardboardTouch);
  /*
  window.addEventListener(`mousedown`, handleCardboardTouch);
  window.addEventListener(`mousemove`, handleMouseMove);  */



  //renderer.autoClear = false;
  container.appendChild(renderer.domElement);

  // Apply VR stereo rendering to renderer.
  effect = new VREffect(renderer);
  effect.setSize(WIDTH, HEIGHT);
  //console.log(WIDTH / HEIGHT);
  //console.log(effect.render(scene, camera));
  //console.log(effect);
  //console.log(controls.camera);
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
  vrButton.on(`enter`, () => {

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

const handleCardboardTouch = () => {
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

  const crosshair = new THREE.Mesh(
    new THREE.RingGeometry(0.02, 0.04, 32),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true
    })
);
  crosshair.position.z = - 1;
  camera.add(crosshair);

};


const createModels = () => {
  const modelsContainer = new THREE.Group();
  modelsContainer.rotation.y = 100;
  //container.position.y = 1.5;
  modelsContainer.position.set(- 3, - 1, - 10);

  // add rover to te modelsContainer and push it to the models array
  const rover = createRoverModel();
  //rover.position.set(- 10, - .5, - 10);
  //rover.rotation.set(- .3, 6, 0);
  //rover.scale.set(1, 1, 1);
  modelsContainer.add(rover);
  modelsArray.push(rover);

  // add buildings to te modelsContainer and push it to the models array
  const erv = createERVModel();
  modelsContainer.add(erv);
  modelsArray.push(erv);

  // add buildings to te modelsContainer and push it to the models array
  const habitat = createHabitatModel();
  modelsContainer.add(habitat);
  modelsArray.push(habitat);

  // add buildings to te modelsContainer and push it to the models array
  const city = createCityModel();
  modelsContainer.add(city);
  modelsArray.push(city);

  // add buildings to te modelsContainer and push it to the models array
  const chimneys = createChimneysModel();
  modelsContainer.add(chimneys);
  modelsArray.push(chimneys);

  // add rover to te modelsContainer and push it to the models array
  const terraforming = createTerraformingModel();
  // terraforming.position.set(5, 4, - 5);
  // terraforming.scale.set(2, 2, 2);
  modelsContainer.add(terraforming);
  modelsArray.push(terraforming);

  checkIfModelVisible();
  scene.add(modelsContainer);

};


/*
const createShape = () => {

  /*
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshLambertMaterial({color: 0x68c3c0});

  cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, controls.userHeight, - 1);

  scene.add(cube);




  const loader = new THREE.JSONLoader();
  loader.load (`../assets/3dmodels/model.json`, (geometry, mat) => {
    console.log(mat);
    const texture = new THREE.MeshLambertMaterial({color: 0x68c3c0});
    geometry.castShadow = true;
    geometry.receiveShadow = true;
    mesh = new THREE.Mesh(geometry, texture);
    //console.log(mesh.scale = (.2, .2, .2));

  //mesh.position.x = 0;
    mesh.rotation.y = 100;
    //mesh.position.y = 1.5;
    mesh.position.set(- 3, .5, - 15);
    mesh.rotation.x = - .25;


    scene.add(mesh);
  });
};*/

// NOTE: Position property is an array with x, y, z coordinates = new Model(container, src, loadingManager, [0, 0, 0])

const createRoverModel = () => {
  const container = new THREE.Group();

  const src = `../assets/3dmodels/1/MSL_dirty.json`;
  //new Model(container, src, loadingManager);
  new Model(container, src, loadingManager, [0, 0, 0], [.5, .5, .5], [- .2, 0, 0]);
  new Model(container, src, loadingManager, [20, .55, 10], [.5, .5, .5], [0, 0, 0]);

  return container;

};

const createERVModel = () => {
  const container = new THREE.Group();
  container.name = `ERV`;

  const src = `../assets/3dmodels/2/MarsDirect_ERV.json`;
  new Model(container, src, loadingManager, [- 15, 20, - 5], [.7, .7, .7], [0, 5, 0]);

  return container;

};

const createHabitatModel = () => {
  const container = new THREE.Group();

  const src = `../assets/3dmodels/3/hab.json`;
  const src3 = `../assets/3dmodels/3/astronaut2.json`;
  const src4 = `../assets/3dmodels/3/astronaut3.json`;

  new Model(container, src, loadingManager, [- 20, - .5, - 1], [.7, .7, .7], [.04, 0, 0]);
  new Model(container, src3, loadingManager, [- 5, 1, - 2], [.3, .3, .3], [0, 0, 0]);
  new Model(container, src4, loadingManager, [- 5, 0, - 1], [.7, .7, .7], [0, 3, 0]);
  new Model(container, src4, loadingManager, [5, 0, 15], [.7, .7, .7], [0, 3, 0]);

  return container;

};

const createCityModel = () => {
  const container = new THREE.Group();

  const src = `../assets/3dmodels/4/habitats2.json`;
  const src2 = `../assets/3dmodels/4/dome_all.json`;
  const src3 = `../assets/3dmodels/4/dome_2.json`;
  const src4 = `../assets/3dmodels/4/solarpanel.json`;

  new Model(container, src, loadingManager, [- 20, .7, - 25], [1.2, 1.2, 1.2], [0, - .2, 0]);

  new Model(container, src2, loadingManager, [5, - 7.5, 32], [1.1, 1.1, 1.1], [.05, 5, 0]);

  new Model(container, src3, loadingManager, [19, - 1, 32], [.6, .6, .6], [0, 2.5, 0]);
  new Model(container, src3, loadingManager, [15.2, - .1, 15.5], [.59, .59, .59], [0, 4.2, 0]);
  new Model(container, src3, loadingManager, [5, - .5, 19.8], [.59, .59, .59], [.05, 9.5, 0]);

  new Model(container, src4, loadingManager, [30, 0, 20], [.7, .7, .7], [.04, 0, 0]);
  new Model(container, src4, loadingManager, [36, .8, 15], [.7, .7, .7], [.04, .3, 0]);
  new Model(container, src4, loadingManager, [31, .5, 11], [.7, .7, .7], [.08, .3, .1]);
  new Model(container, src4, loadingManager, [35, .8, 5], [.7, .7, .7], [.08, .3, .1]);

  return container;

};

const createChimneysModel = () => {
  const container = new THREE.Group();

  const src2 = `../assets/3dmodels/5/chimney3.json`;

  new Model(container, src2, loadingManager, [10, 4, - 16], [.3, .3, .3], [.2, - .2, 0]);
  new Model(container, src2, loadingManager, [5, 4, - 16], [.3, .3, .3], [.2, - .2, 0]);
  new Model(container, src2, loadingManager, [15, 4, - 16], [.3, .3, .3], [.2, - .2, 0]);

  return container;

};

const createTerraformingModel = () => {
  const container = new THREE.Group();

  const src2 = `../assets/3dmodels/6/trees_lo_poly.json`;
  const src4 = `../assets/3dmodels/6/pine_tree.json`;

  new Model(container, src2, loadingManager, [15, 2, - 10], [3, 3, 3], [0, 3.5, 0]);

  //low poly pine group 2
  new Model(container, src4, loadingManager, [13, 3, 0], [.5, .5, .5], [0, 0, 0]);
  new Model(container, src4, loadingManager, [12, 3, - 1], [.7, .7, .7], [0, 0, 0]);
  new Model(container, src4, loadingManager, [15, 3, 3], [.7, .7, .7], [0, 0, 0]);
  new Model(container, src4, loadingManager, [17, 3, 5], [1, 1, 1], [0, 0, 0]);
  new Model(container, src4, loadingManager, [17, 3, - 2], [.9, .9, .9], [0, 0, 0]);
  new Model(container, src4, loadingManager, [20, 3, - 3], [.6, .6, .6], [0, 0, 0]);
  //low poly pine group 3
  new Model(container, src4, loadingManager, [- 30, 1, - 28], [1.9, 1.9, 1.9], [0, 0, 0]);
  new Model(container, src4, loadingManager, [- 35, 1, - 25], [1.5, 1.5, 1.5], [0, 0, 0]);
  new Model(container, src4, loadingManager, [- 40, 1, - 37], [.7, .7, .7], [0, 0, 0]);
  new Model(container, src4, loadingManager, [- 25, 1, - 28], [1.5, 1.5, 1.5], [0, 0, 0]);
  new Model(container, src4, loadingManager, [- 20, 1, - 27], [1.1, 1.1, 1.1], [0, 0, 0]);
  new Model(container, src4, loadingManager, [- 28, 1, - 32], [.9, .9, .9], [0, 0, 0]);

  new Model(container, src4, loadingManager, [- 45, 0, - 28], [1.9, 1.9, 1.9], [0, 0, 0]);
  new Model(container, src4, loadingManager, [- 42, 0, - 20], [1.5, 1.5, 1.5], [0, 0, 0]);
  new Model(container, src4, loadingManager, [- 50, 0, - 15], [.7, .7, .7], [0, 0, 0]);
  new Model(container, src4, loadingManager, [- 55, 0, - 18], [1.5, 1.5, 1.5], [0, 0, 0]);
  new Model(container, src4, loadingManager, [- 52, 0, - 22], [1.1, 1.1, 1.1], [0, 0, 0]);
  new Model(container, src4, loadingManager, [- 43, 0, - 25], [.9, .9, .9], [0, 0, 0]);

  return container;

};


const nextButton = () => {
  const nextButton = new THREE.Object3D();
  nextButton.position.set(1.05, 1, - 1);
  nextButton.rotation.set(- .2, - .3, 0);

  const geometry = new THREE.BoxGeometry(.3, .1, .05);
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
  const previousButton = new THREE.Object3D();
  previousButton.position.set(- 1.05, 1, - 1);
  previousButton.rotation.set(- .2, .3, 0);

  const geometry = new THREE.BoxGeometry(.3, .1, .05);
  const material = new THREE.MeshLambertMaterial({color: 0x030a71});

  cube = new THREE.Mesh(geometry, material);
  cube.position.x = .06;
  cube.name = `previous`;
  previousButton.add(cube);

  const content = `PREVIOUS`;


  new Text(previousButton, content, [.075, 0, .075], loadingManager);

  scene.add(previousButton);
  buttonArray.push(cube);
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
  descriptions = new THREE.Object3D();
  for (let i = 0;i < 6;i ++) {
    hudLayoutGeom = new THREE.PlaneGeometry(1, 1);
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
    tweenAnim(e.position, target, {
      duration: 5000,
      easing: TWEEN.Easing.Exponential.Out,
      update: d => {
        console.log(`Updating: ${  d}`);
      },

      callback: () => {
        console.log(`Completed`);
      }
    });
  }
  /*
e.children.forEach(ec => {
    console.log(ec);

    if (INTERSECTED.name !== `previous`) {

      const anim = fadeAnim(ec, `out`, {
        duration: 1000,

        easing: TWEEN.Easing.Quintic.InOut,

        callback: () => {
          console.log(`Fade complete`);
        }

      });
      anim.start();
    }
  });*/


};

// This function will probably be removed

/*const createHUD = () => {

  const hudCanvas = document.createElement(`canvas`);
  hudCanvas.width = WIDTH;
  hudCanvas.height = HEIGHT;
  hudCanvas.imageSmoothingEnabled = true;
  hudBitmap = hudCanvas.getContext(`2d`);

  hudBitmap.font = `Normal 30px Arial`;
  hudBitmap.textAlign = `center`;
  //hudBitmap.fillRect(0, 0, 600, 600);
  hudBitmap.fillStyle = `rgba(245,245,245,0.75)`;
  hudBitmap.fillText(`Initializing...`, WIDTH / 2, 50);

  //scene.add(cameraHUDOrt);
  //sceneHUD = new THREE.Scene();
  const hudTexture = new THREE.Texture(hudCanvas);
  //console.log(hudTexture.image.width);
  hudTexture.needsUpdate = true;
  //console.log(hudTexture);
  hudMaterial = new THREE.MeshBasicMaterial({map: hudTexture});
  hudMaterial.transparent = true;
  hudMaterial.alphaTest = .1;
  const planeGeometry = new THREE.PlaneGeometry(1, 1);
  const plane = new THREE.Mesh(planeGeometry, hudMaterial);
  plane.position.set(0, 0, - 2);
  plane.scale.set(2, 2, 2);
  controls.camera.add(plane);
  //scene.add(plane);



/*
// create a object3D to keep all the hud meshes together
  const hudMesh = new THREE.Object3D();
  console.log(hudMesh.layers.test);
  console.log(hudMesh);
  hudMesh.position.set(0, 0, - 1);


  const circleGeom = new THREE.CircleGeometry(.3, 50);
  const circleMat = new THREE.MeshBasicMaterial({color: 0xffff00});
  const circle = new THREE.Mesh(circleGeom, circleMat);

  circle.position.set(1, 1, - 1);
  circle.rotation.z = .5;
  circle.rotation.x = .1;
  hudMesh.add(circle);
  //scene.add(circle);
  controls.camera.add(hudMesh);
  //scene.add(hudMesh);
  //console.log(controls.camera);


};*/



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
      display.bufferScale_ = 1;
      addCrosshair();

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
  // when resources are not fully loaded = Loadingscreen and vr ui hidden
  if (RESOURCES_LOADED === false) {
    stats.begin();
    window.requestAnimationFrame(animate);
    renderer.render(loadingScreen.scene, loadingScreen.camera);
    uiContainer.classList.add(`hidden`);

    stats.end();

    return;
  }


  //cube.rotation.x += 0.005;
  //cube.rotation.y += 0.01;
  if (vrButton.isPresenting()) {
    controls.update();
    //hudControls.update();
    //renderer.render(scene, camera);

    effect.render(scene, camera);
    /*
  renderer.clear();
    hudBitmap.clearRect(0, 0, WIDTH, HEIGHT);
    hudBitmap.font = `Normal 40px Arial`;
    hudBitmap.textAlign = `center`;
    hudBitmap.fillStyle = `rgba(245,245,245,0.75)`;
    hudBitmap.fillText(`Initializing...`, WIDTH / 2, HEIGHT / 2);
    renderer.setViewport(0, 0, WIDTH / 2, HEIGHT);*/
    //effect.render(sceneHUD, cameraHUDOrt);



    /*
  renderer.setViewport(WIDTH / 2, 0, WIDTH / 2, HEIGHT);
    renderer.render(sceneHUD, cameraHUDOrt);
    renderer.fillStyle = 0;  */


    //console.log(renderer);
    //console.log(sceneHUD);
    //console.log(effect.cameraR.position.x);

  } else {
    renderer.render(scene, camera);
    //renderer.render(sceneHUD, cameraHUDOrt);
  }
  //console.log(camera.rotation);
  checkRay();
  uiContainer.classList.remove(`hidden`);
  loadingText.classList.add(`hidden`);
  loaderAnim.classList.add(`hidden`);
  TWEEN.update(time);

  //textGroup.rotation.y = Math.atan2((camera.rotation.x - textGroup.position.x), (camera.position.z - textGroup.position.z));
  //console.log(textGroup.rotation.y);
  //renderer.render(sceneHUD, cameraHUDOrt);
  //controls.update();
  //console.log(renderer.vr.getDevice());
  //effect.render(scene, camera);
  //console.log(vrDisplay);
  stats.end();
  window.requestAnimationFrame(animate);

  //console.log(vrDisplay);
};

init();

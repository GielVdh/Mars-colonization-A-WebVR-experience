import * as THREE from 'three';

export default class SmokeEmitter {

  particles
  nParticles

  constructor(container, loadingManager) {
    this.container = container;
    this.textureLoader = new THREE.TextureLoader(loadingManager);
    this.pGeo = new THREE.Geometry();

    // for (let i = 0;i > 300;i ++) {
    //   const particle = new THREE.Vector3(Math.random() * 32 - 16, Math.random() * 230, Math.random() * 32 - 16);
    //   this.pGeo.vertices.push(particle);
    // }
    //
    // const smokeTexture = THREE.ImageUtils.loadTexture(`assets/img/smoke.png`);
    // const smokeMaterial = new THREE.ParticleBasicMaterial({map: smokeTexture, transparent: true, blending: THREE.AdditiveBlending, size: 50, color: 0x111111});
    //
    // const smoke = new THREE.ParticleSystem(this.pGeo, smokeMaterial);
    // smoke.sortParticles = true;
    // smoke.position.x = - 150;
    //
    // this.scene.add(smoke);

    this.nParticles = 100;
 //    this.pMat = new THREE.PointsMaterial({
 //      color: 0xFFFFFF,
 //      size: 3,
 //      blending: THREE.AdditiveBlending,
 //      map: this.textureLoader.load(
 //   `assets/img/smoke.png`
 // ),
 //      transparent: true
 //    });

    // const smokeTexture = THREE.ImageUtils.loadTexture(`assets/img/smoke.png`);
    // this.pMat = new THREE.ParticleBasicMaterial({map: smokeTexture, transparent: true, blending: THREE.AdditiveBlending, size: 50, color: 0x111111});

    const smokeTexture = new THREE.TextureLoader().load(`assets/img/smoke.png`);
    this.pMat = new THREE.PointsMaterial({map: smokeTexture, transparent: true, blending: THREE.AdditiveBlending, size: 40, color: 0x111111});


    for (let i = 0;i < this.nParticles;i ++) {
      this.p = new THREE.Vector3(
        THREE.Math.randFloatSpread(.8),
        THREE.Math.randFloatSpread(15),
        THREE.Math.randFloatSpread(.8)
      );
      this.p.velocity = new THREE.Vector3(0, - Math.random() * .01 * 100, 0);
      this.pGeo.vertices.push(this.p);
      //this.pGeo.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
    }

    this.particles = new THREE.Points(this.pGeo, this.pMat);
    this.particles.position.set(11, 9, - 15);
    this.particles.rotation.set(0, 0, 9);
    this.particles.sortParticles = true;

    this.container.add(this.particles);

  }

  update() {

    this.pCount = this.nParticles;
    while (this.pCount--) {

      this.pS = this.particles.geometry.vertices[this.pCount];
      //console.log(this.p.y);
      if (this.pS.y < - 2 / 2) {
        this.pS.y = 2 / 2;
      }

      this.pS.y -= .01;
    }



    this.particles.geometry.verticesNeedUpdate = true;
  }


}

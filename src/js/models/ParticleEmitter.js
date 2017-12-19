import * as THREE from 'three';

export default class ParticleEmitter {

  particles
  nParticles
  p

  constructor(container, loadingManager, pSrc, pPos, pRot, rangeH, rangeV) {
    this.container = container;
    this.textureLoader = new THREE.TextureLoader(loadingManager);
    this.pGeo = new THREE.Geometry();
    this.nParticles = 100;

    this.src = this.textureLoader.load(pSrc);
    this.pMat = new THREE.PointsMaterial({
      color: pSrc === `assets/img/icon_test.png` ? 0xFFFFFF : 0x111111,
      size: pSrc === `assets/img/icon_test.png` ? 3 : 10,
      map: this.src,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    for (let i = 0;i < this.nParticles;i ++) {
      this.p = new THREE.Vector3(
        THREE.Math.randFloatSpread(rangeH),
        THREE.Math.randFloatSpread(rangeV),
        THREE.Math.randFloatSpread(rangeH)
      );
      this.p.velocity = new THREE.Vector3(0, - Math.random() * .01 * 100, 0);
      console.log(this.pGeo);
      this.pGeo.vertices.push(this.p);
      //this.pGeo.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
    }

    this.particles = new THREE.Points(this.pGeo, this.pMat);
    //this.particles.position.set(- 14, 19, - 5);
    this.particles.position.set(...pPos);
    this.particles.rotation.set(...pRot);
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

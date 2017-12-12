import * as TWEEN from 'tween.js';

export default (mesh, direction, options) => {

  options = options || {};

  const current = {percentage: direction === `in` ? 1 : 0},
    mats = mesh.material.materials ? mesh.material.materials : [mesh.material],
    originals = mesh.userData.originalOpacities,
    easing = options.easing || TWEEN.Easing.Linear.None,
    duration = options.duration || 2000;

  if (!originals) {
    console.log(`Fade error: OriginalOpacities not defined, use trackOriginalOpacities`);
    return;
  }

  const tweenOpacity = new TWEEN.Tween(current)
    .to({percentage: direction === `in` ? 0 : 1}, duration)
    .easing(easing)
    .onUpdate(() => {
      for (let i = 0;i < mats.length;i ++) {
        mats[i].opacity = originals[i] * current.percentage;
      }
    })
    .onComplete(() => {
      if (options.callback) {
        options.callback();
      }
    });

  tweenOpacity.start();

  return tweenOpacity;
};

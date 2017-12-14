import * as TWEEN from 'tween.js';

export default (obj, target, options) => {

  options = options || {};

  const easing = options.easing || TWEEN.Easing.Linear.None,
    duration = options.duration || 2000,
    to = target;



  const tween = new TWEEN.Tween(obj)
    .to({x: to.x, y: to.y, z: to.z}, duration)
    .easing(easing)
    .onUpdate(d => {
      if (options.update) {
        options.update(d);
      }
    })
    .onComplete(() => {
      if (options.callback) {
        options.callback();
      }
    });

  tween.start();

  return tween;
};

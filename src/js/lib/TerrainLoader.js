/**
 * @author Bjorn Sandvik / http://thematicmapping.org/
 * @modified Giel Vanden Herrewegen
 */

import * as THREE from 'three';

export default class TerrainLoader {


  constructor(manager) {
    this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
  }

  load(url, onLoad, onProgress, onError) {

    const scope = this;
    const request = new XMLHttpRequest();

    if (onLoad !== undefined) {

      request.addEventListener(`load`, event => {

        onLoad(new Uint16Array(event.target.response));
        scope.manager.itemEnd(url);

      }, false);

    }

    if (onProgress !== undefined) {

      request.addEventListener(`progress`, event => {

        onProgress(event);

      }, false);

    }

    if (onError !== undefined) {

      request.addEventListener(`error`, event => {

        onError(event);

      }, false);

    }

    if (this.crossOrigin !== undefined) request.crossOrigin = this.crossOrigin;

    request.open(`GET`, url, true);

    request.responseType = `arraybuffer`;

    request.send(null);

    scope.manager.itemStart(url);

  }

  setCrossOrigin(value) {

    this.crossOrigin = value;

  }

}

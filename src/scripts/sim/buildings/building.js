import * as THREE from 'three';
import { SimObject } from '../simObject';
import { BuildingStatus } from './buildingStatus';

export class Building extends SimObject {
  /**
   * The building type
   * @type {string}
   */
  type = 'building';
  /**
   * True if the terrain should not be rendered with this building type
   * @type {boolean}
   */
  hideTerrain = false;

  /**
   * The current status of the building
   * @type {string}
   */
  status = BuildingStatus.Ok;
  /**
   * Icon displayed when building status
   * @type {Sprite}
   */
  #statusIcon = new THREE.Sprite();

  constructor() {
    super();
    this.#statusIcon.visible = false;
    this.#statusIcon.material = new THREE.SpriteMaterial({ depthTest: false })
    this.#statusIcon.layers.set(1);
    this.#statusIcon.scale.set(0.5, 0.5, 0.5);
    this.add(this.#statusIcon);
  }
  
  // /**
  //  * 
  //  * @param {*} status 
  //  */
  // setStatus(status) {
  //   if (status !== this.status) {
  //     switch(status) {
  //       case BuildingStatus.NoPower:
  //         this.#statusIcon.visible = true;
  //         this.#statusIcon.material.map = window.assetManager.statusIcons[BuildingStatus.NoPower];
  //         break;
  //       case BuildingStatus.NoRoadAccess:
  //         this.#statusIcon.visible = true;
  //         this.#statusIcon.material.map = window.assetManager.statusIcons[BuildingStatus.NoRoadAccess];
  //         break;
  //       default:
  //         this.#statusIcon.visible = false;
  //     }
  //   }
  // }

  simulate(city) {
    super.simulate(city);
    
  }

  dispose() {

    super.dispose();
  }
  
  /**
   * Returns an HTML representation of this object
   * @returns {string}
   */
  toHTML() {
    let html = `
      <div class="info-heading">Building</div>
      <span class="info-label">Name </span>
      <span class="info-value">${this.name}</span>
      <br>
      <span class="info-label">Type </span>
      <span class="info-value">${this.type}</span>
      <br>`;

    // if (this.power.required > 0) {
    //   html += `
    //     <span class="info-label">Power (kW)</span>
    //     <span class="info-value">${this.power.supplied}/${this.power.required}</span>
    //     <br>`;
    // } 
    return html;
  }
}
import { Game } from './game';
import { SimObject } from './sim/simObject';
import playIconUrl from '/icons/play-color.png';
import pauseIconUrl from '/icons/pause-color.png';

export class GameUI {
  /**
   * Currently selected tool
   * @type {string}
   */
  activeToolId = 'select';
  /**
   * @type {HTMLElement | null }
   */
  selectedControl = document.getElementById('button-select');
  /**
   * True if the game is currently paused
   * @type {boolean}
   */
  isPaused = false;

  get gameWindow() {
    return document.getElementById('render-target');
  }

  showLoadingText() {
    document.getElementById('loading').style.visibility = 'visible';
  }

  hideLoadingText() {
    document.getElementById('loading').style.visibility = 'hidden';
  }

  /**
   * 
   * @param {*} event 
   */
  onToolSelected(event) {
    // Deselect previously selected button and selected this one
    if (this.selectedControl) {
      this.selectedControl.classList.remove('selected');
    }
    this.selectedControl = event.target;
    this.selectedControl.classList.add('selected');

    this.activeToolId = this.selectedControl.getAttribute('data-type');
  }

  /**
   * Toggles the pause state of the game
   */
  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      document.getElementById('pause-button-icon').src = playIconUrl;
      document.getElementById('paused-text').style.visibility = 'visible';
    } else {
      document.getElementById('pause-button-icon').src = pauseIconUrl;
      document.getElementById('paused-text').style.visibility = 'hidden';
    }
  }

  /**
   * Updates the values in the title bar
   * @param {Game} game 
   */
  updateTitleBar(game) {
    document.getElementById('city-name').innerHTML = game.city.name;
    document.getElementById('population-counter').innerHTML = game.city.population;

    const date = new Date('1/1/2023');
    date.setDate(date.getDate() + game.city.simTime);
    document.getElementById('sim-time').innerHTML = date.toLocaleDateString();
  }

  //probably shouldnot calculate here, to separate logic and display?
  updateMoney(game, moneyIn)
  {
    game.city.money += moneyIn;

    document.getElementById('label-money').innerHTML = game.city.money;
  }

  toggleBuildingButton(allowAction) {
    if(allowAction){
      document.getElementById('button-residential').disabled = false;
      document.getElementById('button-industrial').disabled = false;
    }
    else {
      document.getElementById('button-residential').disabled = true;
      document.getElementById('button-industrial').disabled = true;
    }
  }

  toggleActionButton(allowAction) {
    if(allowAction){
      document.getElementById('button-complete-action').disabled = false;
      document.getElementById('button-residential').disabled = true;
      document.getElementById('button-industrial').disabled = true;
    }
    else {
      document.getElementById('button-complete-action').disabled = true;
      document.getElementById('button-residential').disabled = false;
      document.getElementById('button-industrial').disabled = false;
    }
  }
  
  updateStatusBar(game) {
    document.getElementById('label-energy').innerHTML = game.city.energy;
    document.getElementById('label-food').innerHTML = game.city.food;
    document.getElementById('label-ghg').innerHTML = game.city.ghg;

    document.getElementById('label-money').innerHTML = game.city.money;
    document.getElementById('label-population').innerHTML = game.city.population;

    document.getElementById('label-round').innerHTML = game.round;
    document.getElementById('label-year').innerHTML = game.year;

    //document.getElementById('button-complete-action').disabled = false;
  }

  /**
   * Updates the info panel with the information in the object
   * @param {SimObject} object 
   */
  updateInfoPanel(object) {
    const infoElement = document.getElementById('info-panel')
    if (object) {
      infoElement.style.visibility = 'visible';
      infoElement.innerHTML = object.toHTML();
    } else {
      infoElement.style.visibility = 'hidden';
      infoElement.innerHTML = '';
    }
  }
}

window.ui = new GameUI();
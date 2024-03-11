/*Pasta para controlar os eventos e manter atualizadas todas as funções da aplicação.*/

import state from "./state.js";
import * as timer from "./timer.js";
import * as el from "./elements.js";
import * as sounds from "./sounds.js";

//correr ou não o timer
export function toggleRunning() {
  state.isRunning = document.documentElement.classList.toggle("running");
  timer.countdown();
  sounds.buttonPressAudio.play();
}

//quando a aplicação resetar, seja pelo botão stop ou fim do timer
export function reset() {
  state.isRunning = false;

  document.documentElement.classList.remove(
    "running",
    "music-on-tree",
    "music-on-fire",
    "music-on-cafeteria",
    "music-on-rain"
  );

  stopMusic();

  timer.updateDisplay();
  /*responsável por manter o display com tempo anteriormente colocado após o término do contador, e não 00 */
}

//para que o usuário possa editar o campo do minutes
export function set() {
  el.minutes.setAttribute("contenteditable", true);
  el.minutes.focus();
  sounds.buttonPressAudio.play();
}

//minus e plua para aumentar ou diminuir 5min
export function plusMinutes() {
  const el = document.getElementById("minutes").textContent;
  timer.updateDisplay(Number(el) + 5);
}

export function minusMinutes() {
  const el = document.getElementById("minutes").textContent;

  if (Number(el) <= 4) {
    timer.updateDisplay(0);
    return;
  }

  timer.updateDisplay(Number(el) - 5);
}

//para a múscia parar ao fim do timer
export function stopMusic() {
  const soundsToStop = ["buttonCaf", "buttonTree", "buttonFire", "buttonRain"];
  soundsToStop.forEach((sound) => {
    sounds[sound].pause();
  });
}

//sons diversos da aplicação (músicas)
export function fire() {
  state.isMute = document.documentElement.classList.toggle("music-on-fire");

  if (state.isMute) {
    sounds.buttonFire.play();
    return;
  }

  sounds.buttonFire.pause();
}

export function tree() {
  state.isMute = document.documentElement.classList.toggle("music-on-tree");

  if (state.isMute) {
    sounds.buttonTree.play();
    return;
  }

  sounds.buttonTree.pause();
}

export function rain() {
  state.isMute = document.documentElement.classList.toggle("music-on-rain");

  if (state.isMute) {
    sounds.buttonRain.play();
    return;
  }

  sounds.buttonRain.pause();
}

export function cafeteria() {
  state.isMute =
    document.documentElement.classList.toggle("music-on-cafeteria");

  if (state.isMute) {
    sounds.buttonCaf.play();
    return;
  }

  sounds.buttonCaf.pause();
}

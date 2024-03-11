/*captura de todos os eventos de click e verificação*/

import state from './state.js'
import { controls } from "./elements.js"
import { musics } from './elements.js'
import * as actions from "./actions.js"
import * as el from "./elements.js"
import { updateDisplay } from "./timer.js"

export function registerControls() {
   controls.addEventListener('click', (event) => {
    const action = event.target.dataset.action

    if(typeof actions[action] != "function"){
      return
    }
    actions[action]()
   })
  }

export function registerMusic() {
  musics.addEventListener('click', (event) => {
    const music = event.target.dataset.music
    actions[music]()
  })
}

export function setMinutes() {
  el.minutes.addEventListener('focus', () => {
    el.minutes.textContent = ""
    /*quando os minutes estiver em focus, o valor será zerado */
  })
  
  el.minutes.addEventListener('blur', (event) => {
    let time = event.currentTarget.textContent
    time = time > 60 ? 60 : time
  
    state.minutes = time
    state.seconds = 0
    updateDisplay()
    
    el.minutes.removeAttribute('contenteditable')
  })

  el.minutes.onkeypress = (event) => /\d/.test(event.key)
  /*funcionará somente números -> expressão regular ou regexp */
}


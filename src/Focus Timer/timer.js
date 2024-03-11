import state from './state.js'
import * as el from './elements.js'
import { reset, stopMusic } from './actions.js'
import { songBell } from './sounds.js'


export function countdown() {
    /*esse começo é muito importante porque o classList isRunning já está na função do stop
    e do pause, e se não tivesse teríamos uma recursão infinita */
    if(!state.isRunning) {
        return
    }

    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)

    seconds--

    if(seconds < 0) {
        seconds = 59
        minutes--
    }

    if (minutes < 0) {
        reset()
        /*reset coloca os botões na forma correta após o término do countdown */
        songBell.play()
        return
        /*return para a aplicação evitando que o countdown entre em -1min */
    }

    updateDisplay(minutes, seconds)

    setTimeout(() => countdown(), 1000)
/*a cada 1 segundo a função chama ela mesma de novo (1000 milissegundos) */
}

export function updateDisplay(minutes, seconds) {
    minutes = minutes ?? state.minutes
    seconds = seconds ?? state.seconds

    el.minutes.textContent = String(minutes).padStart(2, "0")
    el.seconds.textContent = String(seconds).padStart(2, "0")

}
/* ?? é um nullish coalesing operator e observa de o objeto é null, e se
for ele trará o valor de state.minutes e colocará antes*/
// Pensar na compartimentalização de alguns parametros (SCALA)

import Phaser from "phaser";

//Consts
import { containerGameWidth, containerGameHeight } from "../Consts/Sizes"
import { HeartBarKey, Large_DialogoBox_Key } from "../Consts/SpriteSheets";
import { DialogBox_Key, TimerKey } from "../Consts/ImagesKeys";
import { level_data } from "../Scenes/Level1"
import { text_UI } from "../Scenes/MapaMain"

var time_UI = level_data.timer
var queue = []


export default class GameBackground extends Phaser.Scene
{
    init(){
        this.textFuncCall = 0
        this.auxText = ''
        this.currentIndex = 0
        this.controlTextObj = {
            interfaceText_stt: 'paused'
        }
        

    }
    create() 
    {
    //  Moldura
        this.add.rectangle(10, 10, ( containerGameWidth - 20 ), ( containerGameHeight - 20 ), '0xffffff', 1 )
            .setOrigin( 0 )
            .setStrokeStyle( 3, '0xffffff', 1 )
            .isFilled = false

        
    //  Corações
        this.add.sprite(20, 20, HeartBarKey, 0)
            .setOrigin(0)
            .setScale(.5)
        this.add.sprite(50, 20, HeartBarKey, 0)
            .setOrigin(0)
            .setScale(.5)
        this.add.sprite(80, 20, HeartBarKey, 3)
            .setOrigin(0)
            .setScale(.5)

    //  Timer
    //      Moldura
        const graficMoldura = this.add.graphics()
        graficMoldura.fillStyle(0xffffff, 0.5)
        
        const x = containerGameWidth - 98
        const y = 15
        const width = 80
        const height = 50
        const radius = 20
        graficMoldura.fillRoundedRect(x, y, width, height, radius)
        // const molduraTimerKey = 'moldura_timer'
        // const moldura = graficMoldura.generateTexture(molduraTimerKey)
        // const molduraImage = this.add.image(200, 300, molduraTimerKey)
       
    //      Relógio(Icone)
        const iconTimer = this.add.image(containerGameWidth - 98, 23, TimerKey)
            .setOrigin(0)
            .setScale(1)
            .setTintFill("0x000000")
        
    //      Tempo(string)
        this.timer = this.add.text(containerGameWidth - 65, 23, time_UI < 10 ? `0${time_UI}`: `${time_UI}`, {
            fontSize: 35,
            color: '0x000000'
        })
            .setOrigin(0)
        
    //  Caixa de dialogo
        this.dialogBox = this.add.image( (containerGameWidth / 2) , (containerGameHeight - 70), DialogBox_Key)
            .setOrigin(0.5)
            .setScale(1.7, 0.6)

        this.dialogBox.setAlpha(0)

    //      Texto da caixa de dialogo
        this.textOnInterface = this.add.text((containerGameWidth / 2), containerGameHeight - 110, '', {
            fontSize: 20,
            color: "0xffffff",
            wordWrap: {
                width: (this.dialogBox.width * 1.7) - 40,
                useAdvancedWrap: true
            }
        }).setOrigin(.5, 0)
    }

    update(){
        this.handel_timerEl(time_UI, level_data)
        this.check_Add_textToQueue(text_UI)
        this.handel_Queue(queue, this.controlTextObj.interfaceText_stt)
    }

    check_Add_textToQueue(text){        //  VERIFICA se o texto é repetido, caso não seja ADICIONA texto na fila para renderização
       if(this.auxText != text){
           this.auxText = text
           this.addToQueue(queue, text)
       }
       return
    }


    handel_Queue(queue, state){         //  Faz a fila andar se houver elemento na 1° posição da fila E SE a maquina de escrever estiver pausada
        var isPaused = state == 'paused'

        if(queue[0] && isPaused){ // se houver elemento na 1° posição E a maquina de escrever estiver pausada
            this.currentIndex = 0

            this.displayDialogBox(this.dialogBox)
            this.writeText(queue[queue.length - 1])
        }
        else
        {
            return
        }
    }
 
    writeText(string){                  //  Recebe uma string e ADICIONA letra por letra ao texto da caixa de diálogo(textOnInterface)
        var lenght = string.length

        this.controlTextObj.interfaceText_stt = 'writing'
        this.displayDialogBox(this.dialogBox)
        this.displayDialogBox(this.textOnInterface)
        
        this.typewriter = this.time.addEvent({ 
            delay: 50, 
            callback: () => {
                this.controlTextVelocity(string)
                this.handle_endOfString(this.currentIndex, lenght)

                this.textOnInterface.text += string[this.currentIndex]
                this.currentIndex++
            },
            loop: true
        })
    }

    handle_endOfString(currentIndex, lenght){       //  VERIFICA se é a ultima letra do texto e dispara função de configuração de controles após 1 seg
        if ( currentIndex >= lenght - 1 ) 
        {
            this.typewriter.delay = 1000
            this.removeFromQueue(queue)

            this.time.removeEvent(this.typewriter)
            this.dialogBox.setAlpha(1)
            this.textOnInterface.setAlpha(1)

            this.time.addEvent(
                {
                    delay: 1000,
                    callback: () => {
                        this.controlTextObj.interfaceText_stt = 'paused'
                        this.currentIndex = 0
                        this.textOnInterface.text = ''
                    },
                    loop: false
                }
            )
            if(!queue[0]){
                this.hideDialogBox(this.dialogBox)
                this.hideDialogBox(this.textOnInterface)
            }
            
        }
        return
    }

    controlTextVelocity(text){          //  Controla a velocidade de escrita do texto da Caixa de dialogo
        if (text[this.currentIndex] == '.' || text[this.currentIndex] == '!')
        {
            this.typewriter.delay = 1000        
        }
        else
        {
            this.typewriter.delay = 50           
        }
    }

    addToQueue(queue, element) {        //  Adiciona o elemento ao final da fila
        queue.push(element);
    }

    removeFromQueue(queue) {            //  Remove e retorna o primeiro elemento da fila
        if(queue[0]){
            const removedElement = queue.shift();

            return removedElement; // Retorna o elemento removido
        }  
        return
    }

    handel_timerEl(time_str, level_data){ // Configura o timer diacordo com dados passados do modulo dos Level, e lida com renderização da str do timer
        if(time_str != level_data.timer && level_data.running){
            time_str = level_data.timer   
            this.timer.setText( time_str < 10 ? `0${time_str}`: `${time_str}`)
        }
    }

    displayDialogBox(dialogBox){    // Torna a Caixa de dialogos visivel
    var alpha = dialogBox.alpha
        if(alpha == 0){//  Se não ha caixa de dialogo
            //FADE IN
            var fadeIn = this.time.addEvent(
            {
                delay: 50,
                callback: () => {
                    if(alpha >= 1){
                        this.time.removeEvent(fadeIn)
                        return
                    }
                    alpha += 0.1
                    dialogBox.setAlpha(alpha)
                },
                loop: true
            })
        }
        return
    }

    hideDialogBox(dialog_Box){      // Retira a visibilidade da caixa de Dialogo
        var alpha = dialog_Box.alpha
        if(alpha == 1){//  Se há uma caixa de dialogo na tela
            //FADE OUT
            var fadeOut = this.time.addEvent(
            {
                delay: 50,
                callback: () => {
                    if(alpha <= 0){
                        dialog_Box.setAlpha(0)
                        this.time.removeEvent(fadeOut)
                        return
                    }
                    alpha -= 0.1
                    dialog_Box.setAlpha(alpha)
                },
                loop: true
            })
        }

        return
    }
    
}
const addToUIQueue = (text) => GameBackground.prototype.addToQueue(queue, text)
export{
    queue,
    addToUIQueue
}
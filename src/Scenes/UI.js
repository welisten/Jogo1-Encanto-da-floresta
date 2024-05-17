// Pensar na compartimentalização de alguns parametros (SCALA)

import Phaser from "phaser";

//Consts
import { containerGameWidth, containerGameHeight, mapScale } from "../Consts/Sizes"
import { HeartBarKey, Large_DialogoBox_Key } from "../Consts/SpriteSheets";
import { DialogBox_Key, TimerKey, directionsImagesObj, CityMap_Key, GuapiMapObj } from "../Consts/ImagesKeys";
import { level_data } from "../Scenes/Level1"
import { text_UI, GameState } from "../Scenes/MapaMain"

var time_UI = level_data.timer
let queue = []


export default class GameBackground extends Phaser.Scene
{
    init(){
        this.textFuncCall = 0
        this.auxText = ''
        this.currentIndex = 0
        this.controlTextObj = {
            interfaceText_stt: 'paused'
        }
        this.arrows = []

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
        
    //      Caixa de dialogo
        this.dialogBox = this.add.image( (containerGameWidth / 2) , (containerGameHeight - 70), DialogBox_Key)
            .setOrigin(0.5)
            .setScale(1.7, 0.8)

        this.dialogBox.setAlpha(0)

    //      Texto da caixa de dialogo
        this.textOnInterface = this.add.text((containerGameWidth / 2), containerGameHeight - 110, '', {
            fontSize: 24,
            color: "0xffffff",
            wordWrap: {
                width: (this.dialogBox.width * 1.7) - 40,
                useAdvancedWrap: true,
            },
            align: 'center',
        }).setOrigin(.5, 0)
        this.textOnInterface.setLineSpacing(8)

    //      Top Informations
        let CM_height = 244
        let CM_scale  = 
        this.CityMap_Information = this.add.image( (containerGameWidth / 2) , (-CM_height), CityMap_Key)
                .setOrigin(0.5, 0)
                .setAlpha(0)
                .setDepth(10)

        this.CM_tween_in = this.tweens.add({
            targets: this.CityMap_Information,
            y: 0,
            duration: 750,
            ease: 'Linear',
            repeat: 0,
            paused: true,
            persist: true
        })
        this.CM_tween_out = this.tweens.add({
            targets: this.CityMap_Information,
            y: -CM_height,
            duration: 750,
            ease: 'Linear',
            repeat: 0,
            paused: true,
            persist: true
        })
    //      Mapa Guapi
    this.GuapiMap = this.add.image( (containerGameWidth / 2) , (containerGameHeight / 2), GuapiMapObj.key)
        .setOrigin(0.5)
        .setScale(.55)
        .setAlpha(0)
    this.GuapiSign_in = this.tweens.add({
        targets: this.GuapiMap,
        alpha: 1,
        duration: 500,
        ease: 'Linear',
        repeat: 0,
        paused: true,
        persist: true
    })
    this.GuapiSign_out = this.tweens.add({
        targets: this.GuapiMap,
        alpha: 0,
        duration: 250,
        ease: 'Linear',
        repeat: 0,
        paused: true,
        persist: true
    })
    this.cursor = this.input.keyboard.createCursorKeys() 
    
    }

    update(){
        this.handel_timerEl(time_UI, level_data)
        this.check_Add_textToQueue(text_UI)
        this.handel_Queue(queue, this.controlTextObj.interfaceText_stt)
        if(GameState.isTopInformationAble) { // PASSO 2
            console.log('Top information is visible - p2')

            this.showTopInformation(GameState.topInformationType)
            GameState.isTopInformationAble = false
        }
        if(GameState.isGuapimirimSignAble){
            this.CM_tween_out.play()
            this.bringMapToScrean()
            GameState.isGuapimirimSignAble = false // está aqui para garantir que essa função seja chamada somente uma vez
        }
        if(GameState.isGuapimirimSignVisible){
            if(this.cursor.space.isDown){
                console.log('dentro')

                this.GuapiSign_out.play()
                GameState.isGuapimirimSignVisible = false
                
                GameState.isPlayerAbleToMove = true
                
                GameState.isGuapimirimSignAble = false
                GameState.isTopInformationAble = false
                this.time.addEvent({
                    delay: 3000,
                    callback: () => GameState.counter_1 = 0,
                    loop: false
                })

            }
        } 

    }

    showTopInformation(type){ // PASSO 3
        if(type == 'CityMap'){
            // console.log('Show top informations - p3')
            
            GameState.isPlayerAbleToMove = false
            this.CityMap_Information.setAlpha(1)
            this.CM_tween_in.play()
            GameState.isTopInformationVisible = true
            GameState.topInformationType = ''
            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    if(!GameState.isGuapimirimSignVisible) {
                        this.CM_tween_out.play()
                        this.time.addEvent({
                            delay: 3000,
                            callback: () => GameState.counter_1 = 0,
                            loop: false
                        })
                    } //
                    GameState.isTopInformationVisible = false
                    GameState.isGuapimirimSignAble = false
                    GameState.isPlayerAbleToMove = true

                }
            })
        }
        return
    }

    bringMapToScrean() { // PASSO 4
        console.log('Bring Map to screan - p4')
        
        GameState.isTopInformationVisible = false
        GameState.isPlayerAbleToMove = false

        this.GuapiSign_in.play()
        this.time.addEvent({
            delay: 250,
            callback: () => GameState.isGuapimirimSignVisible = true,
            loop: false
        })
                
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
            this.writeText(queue[queue.length - 1][0])
            this.textOnInterface.setAlign(queue[queue.length - 1][1])
        }
        else
        {
            return
        }
    }
 
    writeText(string){                  //  Recebe uma string e ADICIONA letra por letra ao texto da caixa de diálogo(textOnInterface)
        let obj = this.separeteString_direction(string)
        
        let indexsArr = []
        if(obj.indexsArr.length > 0){
            indexsArr = obj.indexsArr  
        } 

        let signDirections = []
        for(let index_start of indexsArr){
            let index_end = string.indexOf(']', index_start)
            signDirections.push(string.slice(index_start, index_end + 1))
        }

        console.log(signDirections, indexsArr)
        string = obj.string               
        var lenght = string.length
        
        this.controlTextObj.interfaceText_stt = 'writing'
        this.displayDialogBox(this.dialogBox)
        this.displayDialogBox(this.textOnInterface)
        
        let aux = 0
        let aux_balance = 0
        let x = (containerGameWidth - this.dialogBox.width) / 2 - 10
        let y = this.textOnInterface.y - 10
        this.typewriter = this.time.addEvent({ 
            delay: 50, 
            callback: () => {
                this.controlTextVelocity(string)
                this.handle_endOfString(this.currentIndex, lenght)
                if(indexsArr.length > 0 && aux < indexsArr.length){
                    let tracked_index = indexsArr[aux] == 0 ? indexsArr[aux] : indexsArr[aux] - aux_balance
                    let line_hight = 27 * mapScale

                    
                    if(this.currentIndex == tracked_index){
                        switch(signDirections[aux]){
                            case "[up]":
                                this.arrows.push(this.add.sprite(x, y, directionsImagesObj.up_key).setScale(.25).setOrigin(0))
                                this.tweens.add({
                                    targets: this.arrows[this.arrows.length - 1],
                                    x: x,
                                    y: y,
                                    scaleX: .28,
                                    scaleY: .28,
                                    alpha: 1,
                                    duration: 250,
                                    ease: 'Linear',
                                    repeat: -1,
                                    yoyo: true
                                }).play()
                                y += line_hight
                                aux_balance +=  signDirections[aux].length
                                aux++
                                break
                            case "[down]":
                                this.arrows.push(this.add.sprite(x, y, directionsImagesObj.down_key).setScale(.25).setOrigin(0))
                                this.tweens.add({
                                    targets: this.arrows[this.arrows.length - 1],
                                    x: x,
                                    y: y,
                                    scaleX: .28,
                                    scaleY: .28,
                                    alpha: 1,
                                    duration: 250,
                                    ease: 'Linear',
                                    repeat: -1,
                                    yoyo: true
                                }).play()
                                y += line_hight
                                aux_balance +=  signDirections[aux].length
                                aux++
                                break
                            case "[left]":
                                this.arrows.push(this.add.sprite(x, y, directionsImagesObj.left_key).setScale(.25).setOrigin(0))
                                this.tweens.add({
                                    targets: this.arrows[this.arrows.length - 1],
                                    x: x,
                                    y: y,
                                    scaleX: .28,
                                    scaleY: .28,
                                    alpha: 1,
                                    duration: 250,
                                    ease: 'Linear',
                                    repeat: -1,
                                    yoyo: true
                                }).play()
                                y += line_hight
                                aux_balance +=  signDirections[aux].length
                                aux++
                                break
                            case "[right]":
                                this.arrows.push(this.add.sprite(x, y, directionsImagesObj.right_key).setScale(.25).setOrigin(0))
                                this.tweens.add({
                                    targets: this.arrows[this.arrows.length - 1],
                                    x: x,
                                    y: y,
                                    scaleX: .28,
                                    scaleY: .28,
                                    alpha: 1,
                                    duration: 250,
                                    ease: 'Linear',
                                    repeat: -1,
                                    yoyo: true
                                }).play()
                                y += line_hight
                                aux_balance +=  signDirections[aux].length
                                aux++
                                break
                        }

                    }
                }
                this.textOnInterface.text += string[this.currentIndex]
                this.currentIndex++
            },
            loop: true
        })
    }

    separeteString_direction(string){
        let directions = ["[up]", "[down]", "[left]", "[right]"]
        let indexsArr = []
        let index = string.indexOf('[')

        if(index !== -1){
            let index       = -1
            let occurrence = this.countOccurrences(string, '[')
            const regex = /\[(up|down|left|right)\]/

            console.log(`ocorrencias ${occurrence}`)
            for(let i = 0; i < occurrence; i++){
                index = string.indexOf('[', index + 1)
                indexsArr.push(index)
            }
            for(let i = 0; i < occurrence; i++){
                string = string.replace(regex, '')
            }
        }
        return {string, indexsArr}
    }

    countOccurrences(mainString, subString) {
        // Divida a string principal com base na substring e obtenha o comprimento do array resultante
        return mainString.split(subString).length - 1;
    }
    

    handle_endOfString(currentIndex, lenght){       //  VERIFICA se é a ultima letra do texto e dispara a função de configuração de controles após 1 seg
        if ( currentIndex >= lenght - 1 ) 
        {
            this.typewriter.delay = 1000
            this.removeFromQueue(queue)

            this.time.removeEvent(this.typewriter)
            this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.arrows.forEach(arrow => {
                        arrow.destroy()
                        arrow.setAlpha(0)
                        this.hideDialogBox(arrow)
                    })
                    this.dialogBox.setAlpha(1)
                    this.textOnInterface.setAlpha(1)
                },
                loop: false
            })

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

    addToQueue(queue, text, align = 'center' ) {        //  Adiciona o elemento ao final da fila
        queue.push([text, align]);
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
const addToUIQueue = (text, align) => GameBackground.prototype.addToQueue(queue, text, align)
export{
    queue,
    // this.,
    addToUIQueue
}
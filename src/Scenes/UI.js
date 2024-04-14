// Pensar na compartimentalização de alguns parametros (SCALA)

import Phaser from "phaser";

//Consts
import { containerGameWidth, containerGameHeight } from "../Consts/Sizes"
import { HeartBarKey, Large_DialogoBox_Key } from "../Consts/SpriteSheets";
import { DialogBox_Key, TimerKey } from "../Consts/ImagesKeys";
import { levelData } from "../Scenes/Level1"
import { textUI } from "../Scenes/MapaMain"

let timeUI = levelData.timer

export default class GameBackground extends Phaser.Scene
{
    init(){
        this.textFuncCall = 0
        this.auxText = ''
        this.currentIndex = 0

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
        this.timer = this.add.text(containerGameWidth - 65, 23, timeUI < 10 ? `0${timeUI}`: `${timeUI}`, {
            fontSize: 35,
            color: '0x000000'
        })
            .setOrigin(0)
        
    //  Caixa de dialogo
        this.caixaDialogo = this.add.image( (containerGameWidth / 2) , (containerGameHeight - 70), DialogBox_Key)
            .setOrigin(0.5)
            .setScale(1.7, 0.6)

        this.caixaDialogo.setAlpha(1)

    //      Texto da caixa de dialogo
        this.textOnInterface = this.add.text((containerGameWidth / 2), containerGameHeight - 110, '', {
            fontSize: 20,
            color: "0xffffff",
            wordWrap: {
                width: (this.caixaDialogo.width * 1.7) - 40,
                useAdvancedWrap: true
            }
        }).setOrigin(.5, 0)
    }

    update(){
        //Externalizar
        if(timeUI != levelData.timer && levelData.running){
            timeUI = levelData.timer   
            this.timer.setText( timeUI < 10 ? `0${timeUI}`: `${timeUI}`)
        }

        this.handleTextInterface(textUI)
    }
    // Verifica se o text que esta sendo recebido de outros módulos, já foi renderizado ou não
    //      se não, chama a função writeText
    handleTextInterface(string){
        if ( string !== '' && this.textFuncCall == 0){
            
            this.auxText = string
            
            this.writeText(string)
            this.textFuncCall++
        } 
        else if(string == this.auxText && this.textFuncCall > 0){

            return
        }
    }

    //Recebe uma string e adiciona letra por letra ao texto da caixa de diálogo(textOnInterface)
    writeText(string){
        let lenght = string.length
        let aux = ""
        let alpha = 1
        this.textTimer = this.time.addEvent({
            delay: 50, // compartimentalizar (ou não se for ser alterado dentro desse escopo)
            callback: () => {
                if (string[this.currentIndex] == '.' || string[this.currentIndex] == '!')
                {
                    this.textTimer.delay = 1000        
                }
                else
                {
                    this.textTimer.delay = 50           
                }

                this.textOnInterface.text += string[this.currentIndex]
                this.currentIndex++

                if(this.currentIndex >= lenght){
                    this.time.removeEvent(this.textTimer)
                    this.currentIndex = 0
                    
                    this.fadeOut = this.time.addEvent({
                        delay: 100,
                        callback: () => {
                            this.caixaDialogo.setAlpha(alpha)
                            this.textOnInterface.setAlpha(alpha)
                            alpha -= .1

                            if (alpha == 0){
                                this.time.removeEvent(this.fadeOut)
                            }
                        },
                        loop: true
                    })
                }
            },
            loop: true
        })
    }
}

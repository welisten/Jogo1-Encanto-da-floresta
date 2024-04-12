import Phaser from "phaser";

//Consts
import {containerGameWidth, containerGameHeight} from "../Consts/Sizes"
import { HeartBarKey } from "../Consts/SpriteSheets";
import { TimerKey } from "../Consts/ImagesKeys";
import {levelData} from "../Scenes/Level1"

let timeUI = levelData.timer

export default class GameBackground extends Phaser.Scene
{
    create() 
    {
        //Moldura
        this.add.rectangle(10, 10, ( containerGameWidth - 20 ), ( containerGameHeight - 20 ), '0xffffff', 1 )
            .setOrigin( 0 )
            .setStrokeStyle( 3, '0xffffff', 1 )
            .isFilled = false

        
        //Corações
        this.add.sprite(20, 20, HeartBarKey, 0)
            .setOrigin(0)
            .setScale(.5)
        this.add.sprite(50, 20, HeartBarKey, 0)
            .setOrigin(0)
            .setScale(.5)
        this.add.sprite(80, 20, HeartBarKey, 3)
            .setOrigin(0)
            .setScale(.5)

        //Caixa de dialogo


        //Fase

        //  Timer
            //  Moldura
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
       
            //  Relógio
        const iconTimer = this.add.image(containerGameWidth - 98, 23, TimerKey)
            .setOrigin(0)
            .setScale(1)
            .setTintFill("0x000000")
            //  Tempo(string)
        this.timer = this.add.text(containerGameWidth - 65, 23, timeUI < 10 ? `0${timeUI}`: `${timeUI}`, {
            fontSize: 35,
            color: '0x000000'
        })
            .setOrigin(0)

    }

    update(){
        //Externalizar
        if(timeUI != levelData.timer && levelData.running){
            timeUI = levelData.timer   
            this.timer.setText( timeUI < 10 ? `0${timeUI}`: `${timeUI}`)
        }
    }
}


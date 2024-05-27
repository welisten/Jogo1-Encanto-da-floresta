import Phaser from "phaser";

import { mapaMain } from "../Consts/SceneKeys";
import { titleImages } from '../Consts/ImagesKeys'
import { titleSongs } from '../Consts/SongsKey'

export default class Title extends Phaser.Scene{
    preload(){

    }

    init(){
        const gameCanvas              = this.sys.game.canvas
        gameCanvas.style.border       = "5px solid #40A2E3";
        gameCanvas.style.borderRadius = "20px"
    }

    create(){
        this.sound.play(titleSongs.titleTheme.key)
        
        const {width, height} = this.scale

        this.bg = this.add.tileSprite(0, 0, width, height, titleImages.background.key)
                          .setTileScale(0.5)
                          .setOrigin(0)
                          
        this.rock1 = this.add.tileSprite(0, -10, width, height, titleImages.rocks_1.key)
                             .setTileScale(0.5)
                             .setOrigin(0)
        
        this.rock2 = this.add.tileSprite(0, -100, width, width, titleImages.rocks_2.key)
                             .setTileScale(0.5)
                             .setOrigin(0)
        
        this.clouds1 = this.add.tileSprite(0, -50, width, height, titleImages.clouds_1.key)
                               .setTileScale(0.5)
                               .setOrigin(0)
        
        this.clouds2 = this.add.tileSprite(0, -50, width, height, titleImages.clouds_2.key)
                               .setTileScale(0.5)
                               .setOrigin(0)
        
        this.clouds3 = this.add.tileSprite(0, -50, width, height, titleImages.clouds_3.key)
                               .setTileScale(0.5)
                               .setOrigin(0)
        
        this.clouds4 = this.add.tileSprite(0, -50, width, height, titleImages.clouds_4.key)
                               .setTileScale(0.5)
                               .setOrigin(0)
                               
        this.logo = this.add.image(width * 0.5, height * 0.4, titleImages.logo.key)
                            .setOrigin(0.5)
                            .setAlpha(0)
                            .setScale(.7)
        
        this.rec =  this.add.image(width * 0.5, height * 0.85, titleImages.recTitle.key)
                            .setOrigin(0.5)
                            .setAlpha(0)
                            .setScale(.8)
                        
        this.time.delayedCall(3000, () =>  {
            this.tweens.add({
                targets: [this.logo, this.rec],
                alpha: 1,
                duration: 3000,
                ease: 'Linear',
                yoyo: false,
                repeat: 0
            })
            this.time.delayedCall(1500, () => {
                
                this.tweens.add({
                    targets: this.rec,
                    scale: 1,
                    repeat: -1,
                    yoyo: true,
                    ease: 'Linear'
                })
            })
        })
        
    }

    update(){
        this.paralax()
        this.handleKeybord()
    }

    paralax(){
        this.bg.tilePositionX += 0.1
        this.rock1.tilePositionX += 1.9
        this.rock2.tilePositionX += 1
        this.clouds1.tilePositionX += 0.3
        this.clouds2.tilePositionX += 1.5
        this.clouds3.tilePositionX += 0.5
        this.clouds4.tilePositionX += 2.5
    }

    handleKeybord(){
        this.input.keyboard.once('keydown-SPACE', () => {
            this.sound.stopAll( )
            this.scene.start(mapaMain)
        })
    }
}
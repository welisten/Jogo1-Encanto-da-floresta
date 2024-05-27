// Ponto de entrada ()

import Phaser from 'phaser'

//  Scenes
import Preload from './Scenes/Preload'
import Title from './Scenes/Title.js'
import MapaMain from './Scenes/MapaMain.js'
import Level1 from './Scenes/Level1.js'
import UI from './Scenes/UI.js'

//  Consts
import { containerGame_Width, containerGame_Height } from './Consts/Sizes.js'
import * as SceneKeys from './Consts/SceneKeys'

const config = {
    //  width: window.innerWidth,
    //  height: window.innerHeight,
    width: containerGame_Width ,
    height: containerGame_Height,
     type: Phaser.AUTO,
     backgroundColor: 0x000000,
     parent: 'gameContainer',
     physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: false,
        }
     },
 
}

const game =  new Phaser.Game(config)

// Todas a cenas devem ser adicionadas ao jogo aqui
game.scene.add(SceneKeys.Preload, Preload)
game.scene.add(SceneKeys.Title, Title)
game.scene.add(SceneKeys.MapaMain, MapaMain)
game.scene.add(SceneKeys.MainUserInterface, UI)
game.scene.add(SceneKeys.Level1, Level1)


// Iniciar a primeira cena(Spondo qe todas elas estão encadeadas)
game.scene.start(SceneKeys.Preload)

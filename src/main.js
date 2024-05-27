// Ponto de entrada ()

import Phaser from 'phaser'

//  Scenes
import Preload from './Scenes/Preload'
import Title from './Scenes/Title.js'
import MapaMain from './Scenes/MapaMain.js'
import Level1 from './Scenes/Level1.js'
import UI from './Scenes/UI.js'

//  Consts
import { containerGame_width, containerGame_height } from './Consts/Sizes.js'
import { preload, title, mapaMain, mainUserInterface, level1 } from './Consts/SceneKeys'
import * as SceneKeys from './Consts/SceneKeys'

const config = {
    //  width: window.innerWidth,
    //  height: window.innerHeight,
    width: containerGame_width ,
    height: containerGame_height,
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
game.scene.add(preload, Preload)
game.scene.add(title, Title)
game.scene.add(mapaMain, MapaMain)
game.scene.add(mainUserInterface, UI)
game.scene.add(level1, Level1)


// Iniciar a primeira cena(Spondo qe todas elas estão encadeadas)
game.scene.start(preload)

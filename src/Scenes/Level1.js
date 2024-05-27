// Scene (Cena) principal do Jogo

import Phaser from "phaser";
// Scenes
import { MainUserInterface } from '../Consts/SceneKeys'    // ATENCION
// Constants
import {MapL1Key, L1_ObjConfigTileset, L1_LayerID, ObjectLayerKeys} from '../Consts/MapKeys'
import {L1Map_Scale, L1Map_Height, L1Map_Width } from '../Consts/Sizes'
import * as Difficulty from '../Consts/Difficulty'
import * as Animation from '../Consts/Animations'
import * as CharactersKey from '../Consts/CharacterKeys'
import * as SongsKey from '../Consts/SongsKey'

let level_data = {
    timer: 0,
    running: false,
    aux_controlDelay: 0
}

export default class Game extends Phaser.Scene
{
    /** Lembre-se que quando implementados o fim da fase e o botão de pausar 
     * devemos atualizar tanto GameStatesObj quanto currentGameState */
    init(){
        this.enableKeyboard = false
        this.GameStatesObj = {
            Running: 'running',
            Finished: 'finished',
            Paused: 'paused',
            hasBegun: false,
            isPaused: false,
            isFinished: false,
            isMapScrolling: false,
            hasMapScrolled: false
        }
        
        this.currentGameState = this.GameStatesObj.Running
        
        // styles
        const gameCanvas = this.sys.game.canvas
        gameCanvas.style.border = "5px solid #40A2E3";
        gameCanvas.style.borderRadius = "20px"

        this.GameContainerEl = document.getElementById('gameContainer')
    }

    create()
    { 
        this.cameras.main.fadeIn(1000, 0, 0, 0); // Fade a partir do preto em 1 segundo
        
        this.cameras.main.once('camerafadeoutcomplete', (camera) => {
            return
            // implementar timeline de instruçoes para level 1
        })
        
        const map = this.make.tilemap({key: MapL1Key})
        
        const tile_1 = map.addTilesetImage(L1_ObjConfigTileset[0].name, L1_ObjConfigTileset[0].key, 16, 16)
        const tile_2 = map.addTilesetImage(L1_ObjConfigTileset[1].name, L1_ObjConfigTileset[1].key, 16, 16)
        const tile_3 = map.addTilesetImage(L1_ObjConfigTileset[2].name, L1_ObjConfigTileset[2].key, 16, 16)
        const tile_4 = map.addTilesetImage(L1_ObjConfigTileset[3].name, L1_ObjConfigTileset[3].key, 16, 16)
        const tile_5 = map.addTilesetImage(L1_ObjConfigTileset[4].name, L1_ObjConfigTileset[4].key, 16, 16)
        const tile_6 = map.addTilesetImage(L1_ObjConfigTileset[5].name, L1_ObjConfigTileset[5].key, 16, 16)
        const tile_7 = map.addTilesetImage(L1_ObjConfigTileset[6].name, L1_ObjConfigTileset[6].key, 16, 16)
        
        const tilesArray = [tile_1, tile_2, tile_3, tile_4, tile_5, tile_6, tile_7]
        

        map.createLayer(L1_LayerID.layer1, tilesArray, 0, 0).setScale(L1Map_Scale)
        map.createLayer(L1_LayerID.layer2, tilesArray, 0, 0).setScale(L1Map_Scale)
        map.createLayer(L1_LayerID.layer3, tilesArray, 0, 0).setScale(L1Map_Scale)
        map.createLayer(L1_LayerID.layer4, tilesArray, 0, 0).setScale(L1Map_Scale)
        map.createLayer(L1_LayerID.layer5, tilesArray, 0, 0).setScale(L1Map_Scale)
        map.createLayer(L1_LayerID.layer6, tilesArray, 0, 0).setScale(L1Map_Scale)
        
        this.cameras.main.setBounds(0, 0, map.widthInPixels * L1Map_Scale, map.heightInPixels * L1Map_Scale) // limites da camera
        this.cameras.main.setScroll( 0, (L1Map_Height * L1Map_Scale)) // configurando posicionamento da camera
        this.physics.world.setBounds(0, 0, (map.widthInPixels * L1Map_Scale), (map.heightInPixels * L1Map_Scale))
        
        this.scene.run(MainUserInterface)
        this.scene.bringToTop(MainUserInterface)
        
        // this.createNeededAnimation() // criar apenas uma vez (mapaMain)
        
        this.player = this.physics.add.sprite( ((L1Map_Width + 40) * L1Map_Scale) / 2, (L1Map_Height - 30) * L1Map_Scale, CharactersKey.ManUpKey).setScale(L1Map_Scale * 1.8)
        this.player.setCollideWorldBounds(true);

        const mapObjects = map.getObjectLayer(ObjectLayerKeys.WallLayerKey)["objects"] 
        
        mapObjects.forEach(object => {
            switch(object.name){
                default:
                    if(object.rectangle)
                    {
                        this.objRec = this.add.rectangle((object.x * L1Map_Scale), (object.y * L1Map_Scale), (object.width * L1Map_Scale), (object.height * L1Map_Scale)).setDisplayOrigin(0)
                        this.physics.add.existing(this.objRec, true)
                        this.physics.add.collider(this.player, this.objRec)
                    }
                    else if(object.ellipse)
                    {
                        this.objEllips = this.add.circle((object.x * L1Map_Scale), (object.y * L1Map_Scale), (object.height * L1Map_Scale / 2), 0xff0000).setOrigin(0)
                        this.physics.add.existing(this.objEllips, true)
                        this.physics.add.collider(this.player, this.objEllips)
                    }
            }
        })

        this.cursor = this.input.keyboard.createCursorKeys()
        this.cronometro = this.time.addEvent({                              // QUANDO O JOGO REALMENTE COMOÇAR APENAS 
            delay: 1000,
            callback: () => {
                level_data.timer += 1
            },
            loop: true
        })
        this.GameStatesObj.hasBegun = true
    }


    update() {  // SE O FOGO ESTIVER PAUSADO OU SE ELE NÃO ESTIVER RODADNDO AS FUNÇOES DO UPDATE NÃO IRÃO SER LIDAS
        // // console.log(`    ESTADO DA FASE:
        // O Jogo começou = ${this.GameStatesObj.hasBegun}
        // O mapa ta rodando = ${this.GameStatesObj.isMapScrolling}
        // O Jogo está pausado = ${this.GameStatesObj.isPaused}
        // O Jogo termino = ${this.GameStatesObj.isFinished}
        // O Mapa terminou = ${this.GameStatesObj.hasMapScrolled}
        // // `) 
        if(this.currentGameState != this.GameStatesObj.Running && !this.GameStatesObj.hasBegun) return
        this.handleLMainCharacterMovements()
        if (this.GameStatesObj.hasMapScrolled) this.keepCharacterInCameraBounds()  
        this.time.delayedCall(Difficulty.DelayMapScrooling, () => {
            if(level_data.aux_controlDelay == 0)
            {
                level_data.aux_controlDelay ++
                this.toggleKeyboardControl()
            }
            this.handleMapScrolling()
        })
    }

    handleLMainCharacterMovements(){
        if(this.enableKeyboard){  
            const noLeftRightKey = (this.GameStatesObj.isMapScrolling && !this.cursor.left.isDown && !this.cursor.right.isDown)
            const noUpKey        = (this.GameStatesObj.isMapScrolling && this.cursor.up.isDown)
            const noDownKey      = (this.GameStatesObj.isMapScrolling && this.cursor.down.isDown)
            
            const y = !this.GameStatesObj.isMapScrolling ? 0 : -100

            if( noLeftRightKey || noUpKey || noDownKey )
            {
                    this.player.key = CharactersKey.ManUpKey
                    this.player.play({key: Animation.ManWalkUpKey, repeat: 0}, true)
                    this.player.setVelocity(0, y)
            }
            else
            {   
                if( this.cursor.left.isDown )
                {   
                    this.player.key =  CharactersKey.ManLeftKey
                    this.player.play(Animation.ManWalkLeftKey, true)
                    this.player.setVelocity(-100, y)        
                }
                else if (this.cursor.right.isDown)
                {
                    this.player.key = CharactersKey.ManRightKey
                    this.player.play(Animation.ManWalkRightKey, true)
                    this.player.setVelocity(100, y)        
                }
                else if(this.cursor.up.isDown)
                {
                    this.player.key = CharactersKey.ManUpKey
                    this.player.play({key: Animation.ManWalkUpKey, repeat: 0}, true)
                    this.player.setVelocity(0, -100)        
                } 
                else if(this.cursor.down.isDown)
                {
                    this.player.key = CharactersKey.ManDownKey
                    this.player.play(Animation.ManWalkDownKey, true)
                    this.player.setVelocity(0, 100)        
                }
                else{                                   // isMapScrolling = false
                    this.player.setVelocity(0, 0)        
                }
            }
        }
    }  
    
    keepCharacterInCameraBounds(){ // se os calculos de velocidade do boneco e velocidade de scrool do mapa estiverem ajustados corretamente essa função não será necessária
        if(this.currentGameState == 'running')
        {   
            const screenHeight = this.cameras.main.height
            if(this.player.y > screenHeight - this.player.height)
            {
                this.player.setVelocityY(-5)
            }
        }
    }

    handleMapScrolling(){
        if(this.cameras.main.scrollY > 0)
        {   
            this.cameras.main.scrollY -= Difficulty.SpeedMapScrolling
            if(!this.GameStatesObj.isMapScrolling)
            {
                this.GameStatesObj.isMapScrolling = true
                level_data.running = true
            }
        } 
        else
        {
            if(this.GameStatesObj.isMapScrolling)
            {
                this.GameStatesObj.isMapScrolling = false
                this.GameStatesObj.hasMapScrolled =  true
                this.time.removeEvent(this.cronometro)
                level_data.running = false
            }
        }

    }

    createNeededAnimation() { // criar apenas uma vez (preload)
        const ManWalkUpConfig = {
            key: Animation.ManWalkUpKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManUpKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.AnimationFrameRate, 
            repeat: 0,
        }
        this.anims.create(ManWalkUpConfig)
        
        const ManWalkLeftConfig = {
            key: Animation.ManWalkLeftKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManLeftKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.AnimationFrameRate,
            repeat: 0,
        }
        this.anims.create(ManWalkLeftConfig)
        
        const ManWalkRightConfig = {
            key: Animation.ManWalkRightKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManRightKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.AnimationFrameRate,
            repeat: 0,
        }
        this.anims.create(ManWalkRightConfig)

        const ManWalkDownConfig = {
            key: Animation.ManWalkDownKey,
            frames: this.anims.generateFrameNumbers(CharactersKey.ManDownKey, {frame: [0, 1, 2, 3]}),
            frameRate: Difficulty.AnimationFrameRate, 
            repeat: 0,
        }
        this.anims.create(ManWalkDownConfig)

    }

    toggleKeyboardControl() {
        this.enableKeyboard = !this.enableKeyboard;
    }
}

export{
    level_data
}
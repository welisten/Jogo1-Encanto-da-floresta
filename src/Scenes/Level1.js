// Scene (Cena) principal do Jogo

import Phaser from "phaser";
// Scenes
import { MainUserInterface } from '../Consts/SceneKeys'    // ATENCION
// Constants
import * as MapKeys from '../Consts/MapKeys'
import * as Sizes from '../Consts/Sizes'
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
    }

    create()
    { 
        this.cameras.main.fadeIn(1000, 0, 0, 0); // Fade a partir do preto em 1 segundo
        
        this.cameras.main.once('camerafadeoutcomplete', (camera) => {
            return
            // implementar timeline de instruçoes para level 1

        })

        const map = this.make.tilemap({key: MapKeys.MapL1Key})
        
        const tile_1 = map.addTilesetImage(MapKeys.L1_ObjConfigTileset[0].name, MapKeys.L1_ObjConfigTileset[0].key, 16, 16)
        const tile_2 = map.addTilesetImage(MapKeys.L1_ObjConfigTileset[1].name, MapKeys.L1_ObjConfigTileset[1].key, 16, 16)
        const tile_3 = map.addTilesetImage(MapKeys.L1_ObjConfigTileset[2].name, MapKeys.L1_ObjConfigTileset[2].key, 16, 16)
        const tile_4 = map.addTilesetImage(MapKeys.L1_ObjConfigTileset[3].name, MapKeys.L1_ObjConfigTileset[3].key, 16, 16)
        const tile_5 = map.addTilesetImage(MapKeys.L1_ObjConfigTileset[4].name, MapKeys.L1_ObjConfigTileset[4].key, 16, 16)
        const tile_6 = map.addTilesetImage(MapKeys.L1_ObjConfigTileset[5].name, MapKeys.L1_ObjConfigTileset[5].key, 16, 16)
        const tile_7 = map.addTilesetImage(MapKeys.L1_ObjConfigTileset[6].name, MapKeys.L1_ObjConfigTileset[6].key, 16, 16)
        
        const tilesArray = [tile_1, tile_2, tile_3, tile_4, tile_5, tile_6, tile_7]
        
        
        map.createLayer(MapKeys.L1_LayerID.layer1, tilesArray, 0, 0).setScale(Sizes.L1MapScale)
        map.createLayer(MapKeys.L1_LayerID.layer2, tilesArray, 0, 0).setScale(Sizes.L1MapScale)
        map.createLayer(MapKeys.L1_LayerID.layer3, tilesArray, 0, 0).setScale(Sizes.L1MapScale)
        map.createLayer(MapKeys.L1_LayerID.layer4, tilesArray, 0, 0).setScale(Sizes.L1MapScale)
        map.createLayer(MapKeys.L1_LayerID.layer5, tilesArray, 0, 0).setScale(Sizes.L1MapScale)
        map.createLayer(MapKeys.L1_LayerID.layer6, tilesArray, 0, 0).setScale(Sizes.L1MapScale)
        
        this.cameras.main.setBounds(0, 0, map.widthInPixels * Sizes.L1MapScale, map.heightInPixels * Sizes.L1MapScale) // limites da camera
        this.cameras.main.setScroll( 0, (Sizes.L1MapHeight * Sizes.L1MapScale)) // configurando posicionamento da camera
        this.physics.world.setBounds(0, 0, (map.widthInPixels * Sizes.L1MapScale), (map.heightInPixels * Sizes.L1MapScale))
        
        this.scene.run(MainUserInterface)
        this.scene.bringToTop(MainUserInterface)
        
        this.createNeededAnimation() // criar apenas uma vez (preload)
        
        this.player = this.physics.add.sprite( ((Sizes.L1MapWidth - 128) * Sizes.L1MapScale) / 2, (Sizes.L1MapHeight - 30) * Sizes.L1MapScale, CharactersKey.ManUpKey).setScale(Sizes.characterScale)
        this.player.setCollideWorldBounds(true);

        const mapObjects = map.getObjectLayer(MapKeys.ObjectLayerKeys.WallLayerKey)["objects"] 
        
        mapObjects.forEach(object => {
            switch(object.name){
                default:
                    if(object.rectangle)
                    {
                        this.objRec = this.add.rectangle((object.x * Sizes.L1MapScale), (object.y * Sizes.L1MapScale), (object.width * Sizes.L1MapScale), (object.height * Sizes.L1MapScale)).setDisplayOrigin(0)
                        this.physics.add.existing(this.objRec, true)
                        this.physics.add.collider(this.player, this.objRec)
                    }
                    else if(object.ellipse)
                    {
                        this.objEllips = this.add.circle((object.x * Sizes.L1MapScale), (object.y * Sizes.L1MapScale), (object.height * Sizes.L1MapScale / 2), 0xff0000).setOrigin(0)
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
        console.log(`    ESTADO DA FASE:
        O Jogo começou = ${this.GameStatesObj.hasBegun}
        O mapa ta rodando = ${this.GameStatesObj.isMapScrolling}
        O Jogo está pausado = ${this.GameStatesObj.isPaused}
        O Jogo termino = ${this.GameStatesObj.isFinished}
        O Mapa terminou = ${this.GameStatesObj.hasMapScrolled}
        `)
        
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
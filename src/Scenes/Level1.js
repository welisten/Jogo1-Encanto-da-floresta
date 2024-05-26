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

var level_data = {
    timer: 0,
    running: false
}

export default class Game extends Phaser.Scene
{
    preload(){
        
    }
   
    init(){
        this.enableKeyboard = false
        this.GameStatesObj = {
            Running: 'running',
            Finished: 'finished',
            Paused: 'paused',
            isPaused: true,
            isMapScrolling: false,
            hasMapScrolled: false
            
            //criar metodos SET()
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
        
        this.createNeededAnimation()
        
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
    }


    update() {
        // SE O FOGO ESTIVER PAUSADO OU SE ELE NÃO ESTIVER RODADNDO AS FUNÇOES DO UPDATE NÃO IRÃO SER LIDAS
         if(this.currentGameState != this.GameStatesObj.Running && !this.GameStatesObj.isPaused)
        {
            return
        }
        
        this.handleLMainCharacterMovements()
        this.keepCharacterInCameraBounds()
        // this.physics.world.collide(this.player, mapObjects);
        
        this.time.delayedCall(Difficulty.DelayMapScrooling, () => {
            this.toggleKeyboardControl()
            this.handleMapScrolling()
        })
    }

    handleLMainCharacterMovements(){
        if(this.enableKeyboard){  
            var sentence1 = (this.GameStatesObj.isMapScrolling && !this.cursor.left.isDown && !this.cursor.right.isDown)
            var sentence2 = (this.GameStatesObj.isMapScrolling && this.cursor.up.isDown)
            var sentence3 = (this.GameStatesObj.isMapScrolling && this.cursor.down.isDown)
            var y = -100

            if( sentence1 || sentence2 || sentence3 )
            {
                    this.player.key = CharactersKey.ManUpKey
                    this.player.play({key: Animation.ManWalkUpKey, repeat: 0}, true)
                    this.player.setVelocity(0, y)
            }
            else
            {
                if( this.cursor.left.isDown )
                {   
                    if(!this.GameStatesObj.isMapScrolling){
                        y = 0
                    }
                    this.player.key =  CharactersKey.ManLeftKey
                    this.player.play(Animation.ManWalkLeftKey, true)
                    this.player.setVelocity(-100, y)        
                }
                else if (this.cursor.right.isDown)
                {
                    if(!this.GameStatesObj.isMapScrolling){
                        y = 0
                    }
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
                else{
                    this.player.setVelocity(0, 0)        
                }
            }
        }
    }  
    
    keepCharacterInCameraBounds(){
        // console.log(`O Mapa terminou de descer? -> ${this.GameStatesObj.hasMapScrolled} \nO estado atual do JOGO é rodando ? -> ${this.currentGameState == 'running'}`)
        if(this.GameStatesObj.hasMapScrolled && this.currentGameState == 'running')
        {
            // console.log(`O personagem está acima do limite? -> ${this.player.y < this.cameras.main.height}`)
            if(this.player.y > this.cameras.main.height - this.player.height){
                this.player.setVelocityY(-5)
            }
        }
    }

    handleMapScrolling(){
        if(this.cameras.main.scrollY > 0)
        {   
            this.cameras.main.scrollY -= Difficulty.SpeedMapScrolling
            this.GameStatesObj.isMapScrolling = true
            this.GameStatesObj.isPaused = false
            level_data.running = true
        } 
        else
        {
            this.GameStatesObj.isPaused = true // Retirar paused e add fineshed
            this.GameStatesObj.isMapScrolling = false
            this.GameStatesObj.hasMapScrolled =  true
            this.time.removeEvent(this.cronometro)
            level_data.running = false
            

            // this.currentGameState = this.GameStatesObj.Running
        }

    }

    createNeededAnimation() {
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
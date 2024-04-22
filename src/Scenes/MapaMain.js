// Scene (Cena) principal do Jogo

import Phaser from "phaser";

// Scenes
import {MainUserInterface, Level1} from '../Consts/SceneKeys'                                                // ATENCION

// Constants
import * as MapKeys from '../Consts/MapKeys'
import * as Sizes from '../Consts/Sizes'
import * as Difficulty from '../Consts/Difficulty'
import * as Animation from '../Consts/Animations'
import * as CharactersKey from '../Consts/CharacterKeys'
import * as SongsKey from '../Consts/SongsKey'

import { addToUIQueue } from "../Scenes/UI";


var GameState = {
    Running: 'running',
    Finished: 'finished',
    isPaused: false,
    isPlayerAbleToMove: false,
    timer: 0
}
var text_UI = ''

export default class MapaMain extends Phaser.Scene
{
    constructor() {
        super({ key: 'mapaMain' });
        // this.score = 0; // Pontuação do jogo
    }

    preload(){
        
        
    }
   
    init(){
        const gameCanvas = this.sys.game.canvas
        gameCanvas.style.border = "5px solid #40A2E3";
        gameCanvas.style.borderRadius = "20px"

        this.timerUi = 0

    }

    create()
    { 
        var initStrLength = 204
        const timeline_1 = this.add.timeline([
                                                {
                                                    at:0,
                                                    run: () => this.cameras.main.fadeIn(1500, 0, 0, 0)
                                                },
                                                {
                                                    at: 1500,
                                                    run: () =>{
                                                        //204
                                                        var param ='...Ola, seja Bemvindo ao Encantos da Floresta !\nEssa é a cidade de Guapimirim, e será nela que nós teremos nossas aventuras\n'
                                                        addToUIQueue(param)

                                                    } 
                                                },
                                                {
                                                    from: initStrLength * 50 + 500,
                                                    run: () =>{ GameState.isPlayerAbleToMove = true } 
                                                
                                                }
                                            ])
        this.map = this.make.tilemap({key: MapKeys.MapKey})
        
        this.tile_1 = this.map.addTilesetImage(MapKeys.objConfigTilesetMap[0].name, MapKeys.objConfigTilesetMap[0].key, 16, 16)
        this.tile_2 = this.map.addTilesetImage(MapKeys.objConfigTilesetMap[1].name, MapKeys.objConfigTilesetMap[1].key, 16, 16)
        this.tile_3 = this.map.addTilesetImage(MapKeys.objConfigTilesetMap[2].name, MapKeys.objConfigTilesetMap[2].key, 16, 16)
        this.tile_4 = this.map.addTilesetImage(MapKeys.objConfigTilesetMap[3].name, MapKeys.objConfigTilesetMap[3].key, 16, 16)
        this.tile_5 = this.map.addTilesetImage(MapKeys.objConfigTilesetMap[4].name, MapKeys.objConfigTilesetMap[4].key, 16, 16)
        this.tile_6 = this.map.addTilesetImage(MapKeys.objConfigTilesetMap[5].name, MapKeys.objConfigTilesetMap[5].key, 16, 16)
        this.tile_7 = this.map.addTilesetImage(MapKeys.objConfigTilesetMap[6].name, MapKeys.objConfigTilesetMap[6].key, 16, 16)
        this.tile_8 = this.map.addTilesetImage(MapKeys.objConfigTilesetMap[7].name, MapKeys.objConfigTilesetMap[7].key, 16, 16)
        this.tile_9 = this.map.addTilesetImage(MapKeys.objConfigTilesetMap[8].name, MapKeys.objConfigTilesetMap[8].key, 16, 16)
        
        const tilesArray = [this.tile_1, this.tile_2, this.tile_3, this.tile_4, this.tile_5, this.tile_6, this.tile_7, this.tile_8, this.tile_9, this.tile_10]
        
        this.layer_ground = this.map.createLayer(MapKeys.mapaMainLayerID.layer1, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_levels =  this.map.createLayer(MapKeys.mapaMainLayerID.layer2, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_trunksRoots =  this.map.createLayer(MapKeys.mapaMainLayerID.layer3, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_train =  this.map.createLayer(MapKeys.mapaMainLayerID.layer4, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_floor1 =  this.map.createLayer(MapKeys.mapaMainLayerID.layer5, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_fence =  this.map.createLayer(MapKeys.mapaMainLayerID.layer6, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_vegetationf1 =  this.map.createLayer(MapKeys.mapaMainLayerID.layer7, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_floor2 =  this.map.createLayer(MapKeys.mapaMainLayerID.layer8, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_treetops1 =  this.map.createLayer(MapKeys.mapaMainLayerID.layer9, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_shadowsf2 =  this.map.createLayer(MapKeys.mapaMainLayerID.layer10, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_vegetationf2 =  this.map.createLayer(MapKeys.mapaMainLayerID.layer11, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_buildingsf2 =  this.map.createLayer(MapKeys.mapaMainLayerID.layer12, tilesArray, 0, 0).setScale(Sizes.mapScale)
        
        this.map.getObjectLayer

        this.cameras.main.setBounds(0, 0, (this.map.widthInPixels * Sizes.mapScale), (this.map.heightInPixels * Sizes.mapScale), true) // limites da camera
        this.physics.world.setBounds(0, 0, (this.map.widthInPixels * Sizes.L1MapScale), (this.map.heightInPixels * Sizes.L1MapScale))

        this.scene.run(MainUserInterface)
        this.scene.bringToTop(MainUserInterface)
        // TIMELINE
        timeline_1.play()
        this.createNeededAnimation()
        
        var initPoint = this.getObjectById(2)

        this.player = this.physics.add.sprite( (initPoint.x * Sizes.mapScale), (initPoint.y * Sizes.mapScale), CharactersKey.ManDownKey).setDepth(2).setScale(Sizes.characterScale)
        this.player.setCollideWorldBounds(true);

        this.mapObjects = this.map.getObjectLayer(MapKeys.ObjectLayerKeys.MapaMainLayer_obj1)['objects']
        this.mapObjects.forEach(object => {

            if (object.name != 'info' & object.name != 'level'){
                if(object.rectangle){
                    this.objRec = this.add.rectangle((object.x * Sizes.L1MapScale), (object.y * Sizes.L1MapScale), (object.width * Sizes.L1MapScale), (object.height * Sizes.L1MapScale)).setDisplayOrigin(0).setDepth(10)
                    this.physics.add.existing(this.objRec, true)
                    this.physics.add.collider(this.player, this.objRec)
                    
                 }else if(object.ellipse){
                     this.objEllips = this.add.circle((object.x * Sizes.L1MapScale), (object.y * Sizes.L1MapScale), (object.height * Sizes.L1MapScale / 2)).setOrigin(0)
                     this.physics.add.existing(this.objEllips, true)
                     this.physics.add.collider(this.player, this.objEllips)
                }
            }
            
        })
        
        this.physics.world.on('worldbounds', () => console.log('colidiu'), this);        // Atenção
        
        // Serão usados posteriomente para movimentação alternativa
        this.decision_breaks =  this.mapObjects.filter(obj => obj.name == 'decision_break') 
    
        this.objs_levels =  this.mapObjects.filter(obj => obj.name == 'level')
        var hasOverlapOccurred = false
        this.objs_levels.forEach(level => {
            const rec = this.add.rectangle((level.x * Sizes.L1MapScale), (level.y * Sizes.L1MapScale), (level.width * Sizes.L1MapScale), (level.height * Sizes.L1MapScale)).setDisplayOrigin(0)
            this.physics.add.existing(rec, true)
            this.physics.add.overlap(rec, this.player, () => {
                if(!hasOverlapOccurred){
                    if(this.player.x - this.player.width / 2 > rec.x && this.player.x + this.player.width / 2  < rec.x + rec.width){
                        hasOverlapOccurred = true
                        GameState.isPlayerAbleToMove = false
                        
                        this.time.addEvent({
                            delay: 1500,
                            callback: () => {
                                this.transitionToNewScene(Level1)
                                this.time.delayedCall(1000, () => GameState.isPlayerAbleToMove = true)
                            },
                            loop: false
                        })
                    }
                }
            })
        })

        this.infoObjects = this.mapObjects.filter(obj => obj.name == 'info')
        this.infoObjects.forEach(obj => {
            const rec = this.add.rectangle((obj.x * Sizes.L1MapScale), (obj.y * Sizes.L1MapScale), (obj.width * Sizes.L1MapScale), (obj.height * Sizes.L1MapScale)).setDisplayOrigin(0)
            this.physics.add.existing(rec, true)
            this.physics.add.overlap(rec, this.player,() => this.on_Info_Overlap(obj))
        })
        
        this.cameras.main.startFollow(this.player) // configurando posicionamento da camera
        this.cursor = this.input.keyboard.createCursorKeys() 
    }

    update() {
        // console.log(this.initStrLength)
        this.handleMainCharacterMovements()
        this.setLayersDepth(this.getPlayerFloor())
        this.physics.world.collide(this.player, this.mapObjects)

    }

    sendTextToInterface(string){
        text_UI = string
        // this.time.addEvent({
        //     delay: 1000,
        //     callback: () => { text_UI = '' },
        //     loop: false
        // })
    }

    getObjectById(objectId) {
        var objectLayer = this.map.getObjectLayer(MapKeys.ObjectLayerKeys.MapaMainLayer_obj1);
        if (!objectLayer) {
            console.error("Camada de objetos não encontrada.");
            return null;
        }
        
        var object = objectLayer.objects.find(obj => obj.id === objectId);
        return object;
    }

    handleMainCharacterMovements(){
        if(GameState.isPlayerAbleToMove){
            if(this.cursor.up.isDown)
            {
                this.player.key = CharactersKey.ManUpKey
                this.player.play({key: Animation.ManWalkUpKey, repeat: 0}, true)
                this.player.setVelocity(0, -100)        

            }
            else if (this.cursor.down.isDown)
            {
                this.player.key = CharactersKey.ManDownKey
                this.player.play(Animation.ManWalkDownKey, true)
                this.player.setVelocity(0, 100)        
            }
            else if( this.cursor.left.isDown )
            {   
                this.player.key =  CharactersKey.ManLeftKey
                this.player.play(Animation.ManWalkLeftKey, true)
                this.player.setVelocity(-100, 0)        
            }
            else if (this.cursor.right.isDown)
            {
                this.player.key = CharactersKey.ManRightKey
                this.player.play(Animation.ManWalkRightKey, true)
                this.player.setVelocity(100, 0)        
            }else{
                this.player.setVelocity(0)
            }


            if(!this.isScrolling && this.cursor.up.isDown)
            {
                this.player.key = CharactersKey.ManUpKey
                this.player.play({key: Animation.ManWalkUpKey, repeat: 0}, true)
                this.player.setVelocityY(-100)        
            } 
            else if(!this.isScrolling && this.cursor.down.isDown)
            {
                this.player.key = CharactersKey.ManDownKey
                this.player.play(Animation.ManWalkDownKey, true)
                this.player.setVelocityY(100)        
            }
        }
        else{
            this.player.setVelocity(0)
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
    
    getPlayerFloor(){
        var upEdge = 321 * Sizes.mapScale 
        var downEdge = 559 * Sizes.mapScale
        var leftEdge = 770 * Sizes.mapScale
        var rightEdge = 1248 * Sizes.mapScale

        

        if(this.player.x > leftEdge && this.player.x < rightEdge && this.player.y > upEdge && this.player.y < downEdge)
        {
            // console.log("O player está no SEGUNDO andar -> ",this.player.x > leftEdge && this.player.y < rightEdge && this.player.y > upEdge && this.player.y < downEdge)
            return 'floor_2'
        } 
        else 
        {
            // console.log("O player está no PRIMEIRO andar -> ", this.player.x > leftEdge && this.player.y < rightEdge && this.player.y > upEdge && this.player.y < downEdge)        
            return 'floor_1'
        }
    }

    setLayersDepth(data){
        // console.log(`data === floor_1 -> ${data === 'floor_1'}`)
        // console.log(`data === floor_2 -> ${data === 'floor_2'}`)
        if(data == 'floor_1')
        {
            this.layer_ground.setDepth(0)
            this.layer_levels.setDepth(0)
            this.layer_trunksRoots.setDepth(0)
            this.layer_train.setDepth(0)
            this.layer_floor1.setDepth(0)
            this.layer_fence.setDepth(0)
            this.layer_vegetationf1.setDepth(3)
            this.layer_floor2.setDepth(3)
            this.layer_treetops1.setDepth(3)
            this.layer_shadowsf2.setDepth(3);
            this.layer_vegetationf2.setDepth(3)
            this.layer_buildingsf2.setDepth(3)

            this.player.setDepth(2)
        }
        else if(data == 'floor_2'){
            this.layer_ground.setDepth(0)
            this.layer_levels.setDepth(0)
            this.layer_trunksRoots.setDepth(0)
            this.layer_train.setDepth(0)
            this.layer_floor1.setDepth(1)
            this.layer_fence.setDepth(1)
            this.layer_vegetationf1.setDepth(1)
            this.layer_floor2.setDepth(1)
            this.layer_treetops1.setDepth(3)
            this.layer_shadowsf2.setDepth(1)
            this.layer_vegetationf2.setDepth(1)
            this.layer_buildingsf2.setDepth(3)

            this.player.setDepth(2)

        }
    }

    on_Info_Overlap(e){
        if(e.properties[1].value == 'placa'){
            this.sendTextToInterface(e.properties[0].value)
            // console.log(e.properties[0].value)

        }
    }

    transitionToNewScene(newSceneKey) {
        this.cameras.main.fadeOut(1000, 0, 0, 0); // Fade para preto em 1 segundo
    
        this.cameras.main.once('camerafadeoutcomplete', (camera) => {
          this.scene.start(newSceneKey);
        })
    }
}

export{
    GameState,
    text_UI
}

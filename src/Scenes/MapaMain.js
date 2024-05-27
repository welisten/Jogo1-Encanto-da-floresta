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

import { addToUIQueue, bringMapToScrean, queue } from "../Scenes/UI";
import GameBackground from "../Scenes/UI";


let GameState = {
    Running: 'running',
    Finished: 'finished',
    isPaused: false,
    isPlayerAbleToMove: false,
    timer: 0,
    player_point: 'init',
    accessibleMotionControls: undefined,
    defaultMotionControls: undefined,
    General_songs_volume: 1,
    isGuapimirimSignAble: false,
    isTopInformationAble: false,
    isGuapimirimSignVisible: false,
    isTopInformationVisible: false,
    topInformationType: '',
    counter_1: 0
}

let text_UI = ''

export default class MapaMain extends Phaser.Scene
{
    constructor() {
        super({ key: 'mapaMain' });
        // this.score = 0; // Pontuação do jogo
    }

    preload(){
    //  Map
        this.load.tilemapTiledJSON(MapKeys.MapKey, MapKeys.MapURL, null, Phaser.Tilemaps.TILLED_JSON)
        
        this.load.image(MapKeys.objConfigTilesetMap[0].key, MapKeys.objConfigTilesetMap[0].url, { frameWidth: 16 })
        this.load.image(MapKeys.objConfigTilesetMap[1].key, MapKeys.objConfigTilesetMap[1].url, { frameWidth: 16 })
        this.load.image(MapKeys.objConfigTilesetMap[2].key, MapKeys.objConfigTilesetMap[2].url, { frameWidth: 16 })
        this.load.image(MapKeys.objConfigTilesetMap[3].key, MapKeys.objConfigTilesetMap[3].url, { frameWidth: 16 })
        this.load.image(MapKeys.objConfigTilesetMap[4].key, MapKeys.objConfigTilesetMap[4].url, { frameWidth: 16 })
        this.load.image(MapKeys.objConfigTilesetMap[5].key, MapKeys.objConfigTilesetMap[5].url, { frameWidth: 16 })
        this.load.image(MapKeys.objConfigTilesetMap[6].key, MapKeys.objConfigTilesetMap[6].url, { frameWidth: 16 })
        this.load.image(MapKeys.objConfigTilesetMap[7].key, MapKeys.objConfigTilesetMap[7].url, { frameWidth: 16 })        
        this.load.image(MapKeys.objConfigTilesetMap[8].key, MapKeys.objConfigTilesetMap[8].url, { frameWidth: 16 })
    }
   
    init(){
        const gameCanvas = this.sys.game.canvas
        gameCanvas.style.border = "5px solid #40A2E3";
        gameCanvas.style.borderRadius = "20px"

        this.timerUi = 0
        this.playerState = {
            isMoving: false,
            floor: 'floor_2',
            point_id: 2,
            point_x: undefined,
            point_y: undefined,
            targetID: undefined,
            targetY: undefined,
            targetX: undefined,
            isOnTarget: false,
            direction: undefined,
        }

    }

    create()
    { 
        const initStrLength = 204
        const timeline_1 = this.add.timeline(
        [      // Compartimentalizar
            {
                at:0,
                run: () => this.cameras.main.fadeIn(1500, 0, 0, 0)
            },
            {
                at: 1500,
                run: () =>{
                    //203
                    let text_1 ='...Ola, seja Bemvindo ao Encantos da Floresta ! Essa é a cidade de Guapimirim, e será nela que nós teremos nossas aventuras\n'
                    addToUIQueue(text_1, 'justify')
                } 
            },
            {
                from: initStrLength * 50 + 500, // cada letra tem 50 milisegundos + 500 de gap
                run: () =>{ GameState.isPlayerAbleToMove = true } 
            }
        ])
        const map = this.make.tilemap({key: MapKeys.MapKey})
        
        const tile_1 = map.addTilesetImage(MapKeys.objConfigTilesetMap[0].name, MapKeys.objConfigTilesetMap[0].key, 16, 16)
        const tile_2 = map.addTilesetImage(MapKeys.objConfigTilesetMap[1].name, MapKeys.objConfigTilesetMap[1].key, 16, 16)
        const tile_3 = map.addTilesetImage(MapKeys.objConfigTilesetMap[2].name, MapKeys.objConfigTilesetMap[2].key, 16, 16)
        const tile_4 = map.addTilesetImage(MapKeys.objConfigTilesetMap[3].name, MapKeys.objConfigTilesetMap[3].key, 16, 16)
        const tile_5 = map.addTilesetImage(MapKeys.objConfigTilesetMap[4].name, MapKeys.objConfigTilesetMap[4].key, 16, 16)
        const tile_6 = map.addTilesetImage(MapKeys.objConfigTilesetMap[5].name, MapKeys.objConfigTilesetMap[5].key, 16, 16)
        const tile_7 = map.addTilesetImage(MapKeys.objConfigTilesetMap[6].name, MapKeys.objConfigTilesetMap[6].key, 16, 16)
        const tile_8 = map.addTilesetImage(MapKeys.objConfigTilesetMap[7].name, MapKeys.objConfigTilesetMap[7].key, 16, 16)
        const tile_9 = map.addTilesetImage(MapKeys.objConfigTilesetMap[8].name, MapKeys.objConfigTilesetMap[8].key, 16, 16)
        
        const tilesArray = [tile_1, tile_2, tile_3, tile_4, tile_5, tile_6, tile_7, tile_8, tile_9]
        
        this.layer_ground       =  map.createLayer(MapKeys.mapaMainLayerID.layer1, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_levels       =  map.createLayer(MapKeys.mapaMainLayerID.layer2, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_trunksRoots  =  map.createLayer(MapKeys.mapaMainLayerID.layer3, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_train        =  map.createLayer(MapKeys.mapaMainLayerID.layer4, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_floor1       =  map.createLayer(MapKeys.mapaMainLayerID.layer5, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_fence        =  map.createLayer(MapKeys.mapaMainLayerID.layer6, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_vegetationf1 =  map.createLayer(MapKeys.mapaMainLayerID.layer7, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_floor2       =  map.createLayer(MapKeys.mapaMainLayerID.layer8, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_treetops1    =  map.createLayer(MapKeys.mapaMainLayerID.layer9, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_shadowsf2    =  map.createLayer(MapKeys.mapaMainLayerID.layer10, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_vegetationf2 =  map.createLayer(MapKeys.mapaMainLayerID.layer11, tilesArray, 0, 0).setScale(Sizes.mapScale)
        this.layer_buildingsf2  =  map.createLayer(MapKeys.mapaMainLayerID.layer12, tilesArray, 0, 0).setScale(Sizes.mapScale)
        
        this.cameras.main.setBounds(0, 0, (map.widthInPixels * Sizes.mapScale), (map.heightInPixels * Sizes.mapScale), true) // limites da camera
        this.physics.world.setBounds(0, 0, (map.widthInPixels * Sizes.L1MapScale), (map.heightInPixels * Sizes.L1MapScale))

        this.scene.run(MainUserInterface)
        this.scene.bringToTop(MainUserInterface)

        timeline_1.play()
        // GameState.isPlayerAbleToMove        = true                                      //retirar
        GameState.defaultMotionControls     = false
        GameState.accessibleMotionControls  = true
        
        this.createAllNeededAnimation()
        
        const initPoint = this.getObjectById(2)

        this.player = this.physics.add.sprite( Math.floor(initPoint.x * Sizes.mapScale), Math.floor(initPoint.y * Sizes.mapScale), CharactersKey.ManDownKey).setDepth(2).setScale(Sizes.characterScale)
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(4, 4)
        
        this.playerState.point_x = this.player.x
        this.playerState.point_y = this.player.y

        this.cameras.main.startFollow(this.player) // configurando posicionamento da camera
        this.cursor = this.input.keyboard.createCursorKeys() 
        
        //----------------------       MAP OBJECTS       -----------------------
        const mapObjects = map.getObjectLayer(MapKeys.ObjectLayerKeys.MapaMainLayer_obj1)['objects']

        mapObjects.forEach(object => {
            switch(object.name){
                case 'decision_break':
                    if(object.id != 2)
                    {
                        const circle = this.add.circle(Math.round(object.x * Sizes.L1MapScale), Math.round(object.y * Sizes.L1MapScale), .5).setOrigin(0)

                        this.physics.add.existing(circle, true)
                        this.physics.add.overlap(this.player, circle, () => {

                            if(this.playerState.point_id == object.id)
                            {
                                return    
                            }
                        
                            if(this.isCompletelyInside(circle, this.player))
                            {
                                this.playerState.point_id = object.id
                                switch(this.playerState.direction)
                                {
                                    case('up'):
                                        this.player.y += 1
                                        break

                                    case('down'):
                                        this.player.y += 4
                                        break

                                    case('left'):
                                        this.player.x += 1
                                        break

                                    case('right'):
                                        this.player.x += 4
                                        break
                                    
                                    default:
                                        break
                                }
                            
                                if (object.id == this.playerState.targetID)
                                {
                                    this.player.setVelocity(0, 0);
                                    this.playerState.isMoving = false;
                                    this.playerState.direction = undefined

                                    this.player.anims.stop()
                                    return
                                }
                                else
                                {
                                    this.player.setVelocity(0, 0);
                                    this.defineRoute()
                                }
                            }
                        })   
                    } 
                    break
                
                case 'level':
                    let hasOverlapOccurred = false
                    
                    const rec = this.add.rectangle((object.x * Sizes.L1MapScale), (object.y * Sizes.L1MapScale), (object.width * Sizes.L1MapScale), (object.height * Sizes.L1MapScale)).setDisplayOrigin(0)
                    
                    this.physics.add.existing(rec, true)
                    this.physics.add.overlap(rec, this.player, () => {
                        if(!hasOverlapOccurred)
                        {
                            let player_half         = this.player.x - this.player.width / 2
                            let player_other_half   = this.player.x + this.player.width / 2
                            let isPlayerCompletelyInside  = player_half > rec.x && player_other_half  < rec.x + rec.width
                            
                            if(isPlayerCompletelyInside)
                            {
                                hasOverlapOccurred = true
                                GameState.isPlayerAbleToMove = false
                                this.sendTextToUI('')
                                
                                this.time.addEvent({
                                    delay: 500,
                                    callback: () => {
                                        this.song
                                        this.transitToNewScene(Level1)
                                        this.time.delayedCall(1000, () => GameState.isPlayerAbleToMove = true)
                                    },
                                    loop: false
                                })
                            }
                        }
                    })
                    break
                    
                case 'info':
                    const recInfo = this.add.rectangle((object.x * Sizes.L1MapScale), (object.y * Sizes.L1MapScale), (object.width * Sizes.L1MapScale), (object.height * Sizes.L1MapScale)).setDisplayOrigin(0)
                    this.physics.add.existing(recInfo, true)
                    this.physics.add.overlap(recInfo, this.player, () => this.on_Info_Overlap(object))
                    break
                
                case 'fence':
                    const recFence = this.add.rectangle((object.x * Sizes.L1MapScale), (object.y * Sizes.L1MapScale), (object.width * Sizes.L1MapScale), (object.height * Sizes.L1MapScale)).setDisplayOrigin(0).setDepth(10)
                    this.physics.add.existing(recFence, true)
                    this.physics.add.collider(this.player, recFence)
                    break

                case 'cityMap':
                    const CityMap_point =  object

                    const recX = CityMap_point.x * Sizes.mapScale
                    const recY = CityMap_point.y * Sizes.mapScale
                    const recW = CityMap_point.width * Sizes.mapScale
                    const recH = CityMap_point.height * Sizes.mapScale 
                    
                    const recCityMap = this.add.rectangle(recX, recY, recW, recH).setOrigin(0)
                            
                    this.physics.add.existing(recCityMap, true)
                    this.physics.add.overlap(this.player, recCityMap, () => {
                        if(!GameState.isTopInformationAble && GameState.counter_1 == 0){
                            GameState.isTopInformationAble = true
                            GameState.topInformationType = 'CityMap'
                            GameState.counter_1++
                        }
        })
                    break

                default:
                    if(object.rectangle){
                        const objRec = this.add.rectangle((object.x * Sizes.L1MapScale), (object.y * Sizes.L1MapScale), (object.width * Sizes.L1MapScale), (object.height * Sizes.L1MapScale)).setDisplayOrigin(0).setDepth(10)
                        this.physics.add.existing(objRec, true)
                        this.physics.add.collider(this.player, objRec)
                        
                     }else if(object.ellipse){
                         const objEllips = this.add.circle((object.x * Sizes.L1MapScale), (object.y * Sizes.L1MapScale), (object.height * Sizes.L1MapScale / 2)).setOrigin(0)
                         this.physics.add.existing(objEllips, true)
                         this.physics.add.collider(this.player, objEllips)
                    }
                    break
            }
        })

        this.sound.play(SongsKey.MMMusicKey, {volume: GameState.General_songs_volume})
        
        //----------------------       DOM        -----------------------
        const accessible_btn = document.getElementById('alternativeMovements')
        const mute_btn = document.getElementById('mute')
        
        accessible_btn.onclick = () => {
            accessible_btn.classList.toggle('active')

            GameState.accessibleMotionControls = !GameState.accessibleMotionControls
            GameState.defaultMotionControls = !GameState.defaultMotionControls
        }

        mute_btn.onclick = () => {
            mute_btn.classList.toggle('active')

            const icone = document.querySelector("#mute_icon")

            icone.classList.toggle('fa-volume-high')
            icone.classList.toggle('fa-volume-xmark')
            
            if(this.sound.volume == 1)
            {
                this.sound.volume = 0
            } 
            else
            {
                this.sound.volume = 1
            }
        }
    }

    update() {

        if(GameState.accessibleMotionControls) 
        {
            this.alternativeCharacterMoveControl()   
        }

        if(GameState.defaultMotionControls)
        {
            this.handleMainCharacterMovements()
        }

        if(GameState.isTopInformationVisible && !GameState.isGuapimirimSignAble){ // caso space -> mostrar mapa
            if(this.cursor.space.isDown)
            {
                GameState.isGuapimirimSignAble = true
                GameState.isTopInformationVisible = false
            }
        }
         
        if(this.playerState.floor != this.getPlayerFloor())
        {
            this.setLayersDepth(this.getPlayerFloor())    
        }
    }

    sendTextToUI(string){
        text_UI = string
    }

    getObjectById(objectId) {
        let objectLayer = this.make.tilemap({key: MapKeys.MapKey}).getObjectLayer(MapKeys.ObjectLayerKeys.MapaMainLayer_obj1);
        
        if (!objectLayer) 
        {
            console.error("Camada de objetos não encontrada.");
            return null;
        }
        
        let object = objectLayer.objects.find(obj => obj.id === objectId);
        return object;
    }

    handleMainCharacterMovements(){
        if(GameState.isPlayerAbleToMove)
        {
            if(this.cursor.up.isDown)
            {
                this.player.key = CharactersKey.ManUpKey
                this.player.play({key: Animation.ManWalkUpKey, repeat: 0}, true)
                this.player.setVelocity(0, -Difficulty.Char_velocity)        

            }
            else if (this.cursor.down.isDown)
            {
                this.player.key = CharactersKey.ManDownKey
                this.player.play(Animation.ManWalkDownKey, true)
                this.player.setVelocity(0, Difficulty.Char_velocity)        
            }
            else if( this.cursor.left.isDown )
            {   
                this.player.key =  CharactersKey.ManLeftKey
                this.player.play(Animation.ManWalkLeftKey, true)
                this.player.setVelocity(-Difficulty.Char_velocity, 0)        
            }
            else if (this.cursor.right.isDown)
            {
                this.player.key = CharactersKey.ManRightKey
                this.player.play(Animation.ManWalkRightKey, true)
                this.player.setVelocity(Difficulty.Char_velocity, 0)        
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
        else
        {
            this.player.setVelocity(0)
        }
    }
     
    createAllNeededAnimation() {
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
        const upEdge      = 321 * Sizes.mapScale 
        const downEdge    = 559 * Sizes.mapScale
        const leftEdge    = 770 * Sizes.mapScale
        const rightEdge   = 1248 * Sizes.mapScale

        if(this.player.x > leftEdge && this.player.x < rightEdge && this.player.y > upEdge && this.player.y < downEdge)
        {
            // O player está no SEGUNDO andar
            return 'floor_2'
        } 
        else 
        {
            // O player está no PRIMEIRO andar
            return 'floor_1'
        }
    }

    setLayersDepth(data){
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
            this.playerState.floor = 'floor_1'
        }
        else if(data == 'floor_2')
        {
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
            this.playerState.floor = 'floor_2'
        }
    }

    on_Info_Overlap(e){
        if(e.properties[1].value == 'placa')
        {
            this.sendTextToUI(e.properties[0].value)
        }
    }

    transitToNewScene(newSceneKey) {
        this.cameras.main.fadeOut(1000, 0, 0, 0); // Fade para preto em 1 segundo
    
        this.cameras.main.once('camerafadeoutcomplete', (camera) => {
          this.scene.start(newSceneKey);
        })
    }

    alternativeCharacterMoveControl(){
        if(GameState.isPlayerAbleToMove){
            if(this.cursor.up.isDown & !this.playerState.isMoving)      // UP
            {   
//              Ajusta a localização do personagem no sentido da direção para criar uma contingência.
//              (dependendo da velocidade, numeros decimais podem vazar gerando erro depois de um tempo)
                this.player.y = Math.floor(this.player.y)
                
//              Identificar o ponto relativo a direção
                const current_Point =  this.getObjectById(this.playerState.point_id)
                const up_propertie = current_Point.properties.find(obj => obj.name === 'up')

//              Assegurar que existe caminho pela referida direção                
                if(!up_propertie.value){
                    console.error("caminho inexistente ! você está se equivocando")
                    return
                }

//              Resgata o ponto alvo e atualiza as coordenadas do alvo no obj de controle do jogador               
                const next_Point = this.getObjectById(up_propertie.value)

                this.playerState.targetX = Math.floor(next_Point.x * Sizes.mapScale) 
                this.playerState.targetY = Math.floor(next_Point.y * Sizes.mapScale)
                this.playerState.targetID = up_propertie.value
//              Dispara o personagem na direção desejada usando a respectiva animação
                this.player.key = CharactersKey.ManUpKey
                this.player.play({key: Animation.ManWalkUpKey, repeat: -1}, true)
                this.player.setVelocity(0, -Difficulty.Char_velocity)
                
//              Atualiza o estado do personagem em: "movimentando" e "direção"
                this.playerState.isMoving = true 
                this.playerState.direction = 'up'

            }
            else if(this.cursor.down.isDown & !this.playerState.isMoving)       // DOWN
            {
                this.player.y = Math.floor(this.player.y)

                const current_point =  this.getObjectById(this.playerState.point_id)
                const down_propertie = current_point.properties.find(obj => obj.name === 'down')
                
                if(!down_propertie.value){
                    // console.log("caminho inexistente ! você está se equivocando")
                    return
                }

                const next_Point = this.getObjectById(down_propertie.value)

                this.playerState.targetX = Math.floor(next_Point.x * Sizes.mapScale) 
                this.playerState.targetY = Math.floor(next_Point.y * Sizes.mapScale)
                this.playerState.targetID = down_propertie.value
                
                this.player.key = CharactersKey.ManDownKey
                this.player.play({key: Animation.ManWalkDownKey, repeat: -1}, true)
                this.player.setVelocity(0, Difficulty.Char_velocity)

                this.playerState.isMoving = true 
                this.playerState.direction = 'down'

                // console.log(`atual: ${this.playerState.point_id}   proximo:${this.playerState.targetID}\nplayer.x: ${this.player.x} alvo: ${this.playerState.targetX}\nplayer.y: ${this.player.y} alvo: ${this.playerState.targetY}`)
               
            }
            else if(this.cursor.left.isDown & !this.playerState.isMoving)       // LEFT
            {
                this.player.x = Math.floor(this.player.x)

                const current_Point =  this.getObjectById(this.playerState.point_id)
                const left_propertie = current_Point.properties.find(obj => obj.name === 'left')
                
                if(!left_propertie.value){
                    // console.log("caminho inexistente ! você está se equivocando")
                    return
                }
                
                const next_Point = this.getObjectById(left_propertie.value)
                
                this.playerState.targetX = Math.floor(next_Point.x * Sizes.mapScale) 
                this.playerState.targetY = Math.floor(next_Point.y * Sizes.mapScale)
                this.playerState.targetID = left_propertie.value
                
                this.player.key = CharactersKey.ManLeftKey
                this.player.play({key: Animation.ManWalkLeftKey, repeat: -1}, true)
                this.player.setVelocity(-Difficulty.Char_velocity, 0)
                
                this.playerState.isMoving = true 
                this.playerState.direction = 'left'

                // console.log(`atual: ${this.playerState.point_id}   proximo:${this.playerState.targetID}\nplayer.x: ${this.player.x} alvo: ${this.playerState.targetX}\nplayer.y: ${this.player.y} alvo: ${this.playerState.targetY}`)
            }
            else if(this.cursor.right.isDown & !this.playerState.isMoving)      // RIGHT
            {
                this.player.x = Math.floor(this.player.x)
                
                const current_Point =  this.getObjectById(this.playerState.point_id)
                const right_propertie = current_Point.properties.find(obj => obj.name === 'right')
                
                if(!right_propertie.value){
                    // console.log("caminho inexistente ! você está se equivocando")
                    return
                }

                const next_Point = this.getObjectById(right_propertie.value)

                this.playerState.targetX = Math.floor(next_Point.x * Sizes.mapScale) 
                this.playerState.targetY = Math.floor(next_Point.y * Sizes.mapScale)
                this.playerState.targetID = right_propertie.value
                
                this.player.key = CharactersKey.ManRightKey
                this.player.play({key: Animation.ManWalkRightKey, repeat: -1}, true)
                this.player.setVelocity(Difficulty.Char_velocity, 0)
                
                this.playerState.isMoving = true 
                this.playerState.direction = 'right'

                // console.log(`atual: ${this.playerState.point_id}   proximo:${this.playerState.targetID}\nplayer.x: ${this.player.x} alvo: ${this.playerState.targetX}\nplayer.y: ${this.player.y} alvo: ${this.playerState.targetY}`)
            }
        }     
    }

    defineRoute(){
        switch(this.playerState.direction)
        {// Você vai ter que concertar isso daqui sua safada .... Porque 8 ?
            case('up'):        
            if(this.player.y <= this.playerState.targetY + 8 && this.player.y >= this.playerState.targetY + 8) 
            {
                this.playerState.direction = 'up'
                this.player.key = CharactersKey.ManUpKey
                this.player.play({key: Animation.ManWalkUpKey, repeat: -1}, true)
                this.player.setVelocity(0, -Difficulty.Char_velocity)
            }
            else
            {
                if ( this.player.x > this.playerState.targetX)
                {
                    this.playerState.direction = 'left'
                    this.player.key = CharactersKey.ManLeftKey
                    this.player.play({key: Animation.ManWalkLeftKey, repeat: -1}, true)
                    this.player.setVelocity(-Difficulty.Char_velocity, 0)
                } 
                else                           
                {                                                                           
                    this.playerState.direction = 'right'
                    this.player.key = CharactersKey.ManRightKey
                    this.player.play({key: Animation.ManWalkRightKey, repeat: -1}, true)
                    this.player.setVelocity(Difficulty.Char_velocity, 0)
                }                
            }                                                                
            break
            case('down'):
            if(this.player.y <= this.playerState.targetY + 8 && this.player.y >= this.playerState.targetY + 8)
            {
                this.playerState.direction = 'down'
                this.player.key = CharactersKey.ManDownKey
                this.player.play({key: Animation.ManWalkDownKey, repeat: -1}, true)
                this.player.setVelocity(0, Difficulty.Char_velocity)
            }
            else
            {
                if(this.player.x > this.playerState.targetX)                                
                {                                   
                    this.playerState.direction = 'left'
                    this.player.key = CharactersKey.ManLeftKey
                    this.player.play({key: Animation.ManWalkLeftKey, repeat: -1}, true)
                    this.player.setVelocity(-Difficulty.Char_velocity, 0)
                } 
                else                          
                {                                                                           
                    this.playerState.direction = 'right'
                    this.player.key = CharactersKey.ManRightKey
                    this.player.play({key: Animation.ManWalkRightKey, repeat: -1}, true)
                    this.player.setVelocity(Difficulty.Char_velocity, 0)
                }
            }
            break
            case('left'): 
            if(this.player.x <= this.playerState.targetX + 8 && this.player.x >= this.playerState.targetX + 8)
            {   
                this.playerState.direction = 'left'
                this.player.key = CharactersKey.ManLeftKey
                this.player.play({key: Animation.ManWalkLeftKey, repeat: -1}, true)
                this.player.setVelocity(-Difficulty.Char_velocity, 0)

            }
            else
            {
                if(this.player.y > this.playerState.targetY)                                
                {                                                                        
                    this.playerState.direction = 'up'
                    this.player.key = CharactersKey.ManUpKey
                    this.player.play({key: Animation.ManWalkUpKey, repeat: -1}, true)
                    this.player.setVelocity(0, -Difficulty.Char_velocity)
                }
                else                           
                {                                                                           
                    this.playerState.direction = 'down'
                    this.player.key = CharactersKey.ManDownKey
                    this.player.play({key: Animation.ManWalkDownKey, repeat: -1}, true)
                    this.player.setVelocity(0, Difficulty.Char_velocity)
                }
            }                                                                     
            break
            case('right'):
            if(this.player.x <= this.playerState.targetX + 8 && this.player.x >= this.playerState.targetX + 8)
            {
                this.playerState.direction = 'right'
                this.player.key = CharactersKey.ManRightKey
                this.player.play({key: Animation.ManWalkRightKey, repeat: -1}, true)
                this.player.setVelocity(Difficulty.Char_velocity, 0)
            }
            else
            {
                if(this.player.y > this.playerState.targetY)                                
                {                                 
                    this.playerState.direction = 'up'
                    this.player.key = CharactersKey.ManUpKey
                    this.player.play({key: Animation.ManWalkUpKey, repeat: -1}, true)
                    this.player.setVelocity(0, -Difficulty.Char_velocity)
                }
                else if(this.player.y < this.playerState.targetY)                           
                {                                                                           
                    this.playerState.direction = 'down'
                    this.player.key = CharactersKey.ManDownKey
                    this.player.play({key: Animation.ManWalkDownKey, repeat: -1}, true)
                    this.player.setVelocity(0, Difficulty.Char_velocity)
                }
            }
            break
        }
    }

    isCompletelyInside(inner, outer) { // Verifica se os limites de "inner" estão dentro dos limites de "outer"
        // console.log(`${inner.x >= outer.x} - ${inner.y >= outer.y} - ${inner.x + inner.width <= outer.x + outer.width} - ${inner.y + inner.height <= outer.y + outer.height}\ni-left :  -> ${inner.x} | o-left: ${outer.x}\ni-top :  -> ${inner.y} | o-top: ${outer.y}\ni-right: ${inner.x + inner.width} | o-right: ${outer.x + outer.width}\ni-down: ${inner.y + inner.height} | o-down: ${outer.y + outer.height}\n`);
        return (
          inner.x >= (outer.x - 2) &&
          inner.y >= (outer.y - 2) &&
          inner.x + inner.width <= (outer.x - 2) + outer.width &&
          inner.y + inner.height <= (outer.y - 2) + outer.height
        );
    }
}

export{
    GameState,
    text_UI
}

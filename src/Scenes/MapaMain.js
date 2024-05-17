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


var GameState = {
    Running: 'running',
    Finished: 'finished',
    isPaused: false,
    isPlayerAbleToMove: false,
    timer: 0,
    player_point: 'init',
    alternativeMoveControls: undefined,
    originalMoveControl: undefined,
    General_songs_volume: 1,
    isGuapimirimSignAble: false,
    isTopInformationAble: false,
    isGuapimirimSignVisible: false,
    isTopInformationVisible: false,
    topInformationType: '',
    counter_1: 0
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
        this.playerState = {
            isMoving: false,
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
        var initStrLength = 204
        const timeline_1 = this.add.timeline([      // Compartimentalizar
                                                {
                                                    at:0,
                                                    run: () => this.cameras.main.fadeIn(1500, 0, 0, 0)
                                                },
                                                {
                                                    at: 1500,
                                                    run: () =>{
                                                        //203
                                                        var param ='...Ola, seja Bemvindo ao Encantos da Floresta ! Essa é a cidade de Guapimirim, e será nela que nós teremos nossas aventuras\n'
                                                        addToUIQueue(param, 'justify')

                                                    } 
                                                },
                                                {
                                                    from: initStrLength * 50 + 500, //
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
        
        this.cameras.main.setBounds(0, 0, (this.map.widthInPixels * Sizes.mapScale), (this.map.heightInPixels * Sizes.mapScale), true) // limites da camera
        this.physics.world.setBounds(0, 0, (this.map.widthInPixels * Sizes.L1MapScale), (this.map.heightInPixels * Sizes.L1MapScale))

        this.scene.run(MainUserInterface)
        this.scene.bringToTop(MainUserInterface)
        //---------------------------    TIMELINE      -------------------------------
        timeline_1.play()
        // GameState.isPlayerAbleToMove = true  //retirar
        GameState.originalMoveControl = false
        GameState.alternativeMoveControls = true
        //----------------------------------------------------------------------------
        this.createNeededAnimation()
        
        var initPoint = this.getObjectById(2)

        this.player = this.physics.add.sprite( Math.floor(initPoint.x * Sizes.mapScale), Math.floor(initPoint.y * Sizes.mapScale), CharactersKey.ManDownKey).setDepth(2).setScale(Sizes.characterScale)
        this.playerState.point_x = this.player.x
        this.playerState.point_y = this.player.y
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(4, 4)

        this.mapObjects = this.map.getObjectLayer(MapKeys.ObjectLayerKeys.MapaMainLayer_obj1)['objects']
        // console.log(this.mapObjects)

        //----------------------       FENCE       -----------------------
        //----------------------       USUAL OBJECTS       -----------------------
        this.mapObjects.forEach(object => {

            if (object.name != 'info' & object.name != 'level' & object.name != 'fence' & object.name != 'cityMap' ){// PROCESSAMENTO
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
        this.sound.play(SongsKey.MMMusicKey, {volume: GameState.General_songs_volume})
        this.physics.world.on('worldbounds', () => console.log('colidiu'), this);        // Atenção
        
        //-----------------       DECISIONS BREAKS        -----------------------
        this.decision_breaks =  this.mapObjects.filter(obj => obj.name == 'decision_break' && obj.id != 2) 
        this.decision_breaks.forEach(point => {
            const circle = this.add.circle(Math.round(point.x * Sizes.L1MapScale), Math.round(point.y * Sizes.L1MapScale), .5).setOrigin(0)
            this.physics.add.existing(circle, true)
            this.physics.add.overlap(this.player, circle, () => {
                
                if(this.playerState.point_id == point.id){
                    return    
                }
                // console.log('OVERLAP')

                if(this.isCompletelyInside(circle, this.player)){
                    // console.log('Completamente dentro')
                    this.playerState.point_id = point.id
                    switch(this.playerState.direction){
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
                        // configurar defaut
                    }

                    if (point.id == this.playerState.targetID){
                        this.player.setVelocity(0, 0);
                        this.playerState.isMoving = false;
                        this.playerState.direction = undefined
                        // console.log(`Player alcançou o alvo\nPonto atual: ${this.playerState.point_id}   alvo:${this.playerState.targetID}`)
                        
                        this.player.anims.stop()
                        // if(this.playerState.point_id == 334){ // PASSO 1
                        //     console.log('Id 34 - p1')

                        //     GameState.isTopInformationAble = true
                        //     GameState.topInformationType = 'CityMap'
                        // }
                        return
                    }
                    else
                        // console.log(`Ainda nao !!!    REDEFININDO ROTA\nPonto atual: ${this.playerState.point_id}   alvo:${this.playerState.targetID}\nplayer.x: ${this.player.x} alvo: ${this.playerState.targetX}\nplayer.y: ${this.player.y} alvo: ${this.playerState.targetY}`)
                        this.player.setVelocity(0, 0);
                        this.defineRoute()

                }
            })
        })
           
        //----------------------       CityMap        -----------------------
        const CityMap_point = this.mapObjects.filter( obj => obj.id == 335)[0]
        console.log(CityMap_point)
        let recX = CityMap_point.x * Sizes.mapScale
        let recY = CityMap_point.y * Sizes.mapScale
        let recW = CityMap_point.width * Sizes.mapScale
        let recH = CityMap_point.height * Sizes.mapScale 
        let rec = this.add.rectangle(recX, recY, recW, recH).setOrigin(0)
        
        this.physics.add.existing(rec, true)
        this.physics.add.overlap(this.player, rec, () => {
            if(!GameState.isTopInformationAble && GameState.counter_1 == 0){
                GameState.isTopInformationAble = true
                GameState.topInformationType = 'CityMap'
                GameState.counter_1++
            }
        })
        //----------------------       LEVELS        -----------------------
        this.objs_levels =  this.mapObjects.filter(obj => obj.name == 'level')
        
        var hasOverlapOccurred = false
        
        this.objs_levels.forEach(level => {
            const rec = this.add.rectangle((level.x * Sizes.L1MapScale), (level.y * Sizes.L1MapScale), (level.width * Sizes.L1MapScale), (level.height * Sizes.L1MapScale)).setDisplayOrigin(0)
            this.physics.add.existing(rec, true)
            this.physics.add.overlap(rec, this.player, () => {
                if(!hasOverlapOccurred){
                    if(this.player.x - this.player.width / 2 > rec.x && this.player.x + this.player.width / 2  < rec.x + rec.width){// melhorar legibilidade
                        hasOverlapOccurred = true
                        GameState.isPlayerAbleToMove = false
                        this.sendTextToInterface('')
                        // queue = []
                        
                        this.time.addEvent({
                            delay: 500,
                            callback: () => {
                                this.song
                                this.transitionToNewScene(Level1)
                                this.time.delayedCall(1000, () => GameState.isPlayerAbleToMove = true)
                            },
                            loop: false
                        })
                    }
                }
            })
        })
        //----------------------       SIGNS        -----------------------
        this.infoObjects = this.mapObjects.filter(obj => obj.name == 'info')
        this.infoObjects.forEach(obj => {
            const rec = this.add.rectangle((obj.x * Sizes.L1MapScale), (obj.y * Sizes.L1MapScale), (obj.width * Sizes.L1MapScale), (obj.height * Sizes.L1MapScale)).setDisplayOrigin(0)
            this.physics.add.existing(rec, true)
            this.physics.add.overlap(rec, this.player, () => this.on_Info_Overlap(obj))
        })

        //------------------------------------------------------------------
        
        this.cameras.main.startFollow(this.player) // configurando posicionamento da camera
        this.cursor = this.input.keyboard.createCursorKeys() 

        const accessible_btn = document.getElementById('alternativeMovements')
        accessible_btn.onclick = () => {
            accessible_btn.classList.toggle('active')

            GameState.alternativeMoveControls = !GameState.alternativeMoveControls
            GameState.originalMoveControl = !GameState.originalMoveControl
        }
        const mute_btn = document.getElementById('mute')
        mute_btn.onclick = () => {
            mute_btn.classList.toggle('active')
            const icone = document.querySelector("#mute_icon")
            icone.classList.toggle('fa-volume-high')
            icone.classList.toggle('fa-volume-xmark')
            
            if(this.sound.volume == 1){
                this.sound.volume = 0
            } else {
                this.sound.volume = 1
            }
        }

        // console.log(`atual: ${this.playerState.point_id}   proximo:${this.playerState.targetID}\nplayer.x: ${this.player.x} alvo: ${this.playerState.targetX}\nplayer.y: ${this.player.y} alvo: ${this.playerState.targetY}`)

    }

    update() {

        if(GameState.alternativeMoveControls) {
            this.alternativeCharacterMoveControl()   
        }
        if(GameState.originalMoveControl){
            this.handleMainCharacterMovements()
        }

        if(GameState.isTopInformationVisible&& !GameState.isGuapimirimSignAble){
           if(this.cursor.space.isDown){
            console.log('O usuario quer o mapa')
            GameState.isGuapimirimSignAble = true
            GameState.isTopInformationVisible = false
           }
        }

        this.setLayersDepth(this.getPlayerFloor()) // Processamento
        // this.physics.world.collide(this.player, this.mapObjects)

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
            // console.error("Camada de objetos não encontrada.");
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

    alternativeCharacterMoveControl(){
        if(GameState.isPlayerAbleToMove){
            if(this.cursor.up.isDown & !this.playerState.isMoving)      // UP
            {   
//              Ajusta a localização do personagem no sentido da direção para criar uma contingência.
//              (dependendo da velocidade, numeros decimais podem vazar gerando erro depois de um tempo)
                this.player.y = Math.floor(this.player.y)
                
//              Identificar o ponto relativo a direção
                var current_Point =  this.getObjectById(this.playerState.point_id)
                var up_propertie = current_Point.properties.find(obj => obj.name === 'up')

//              Assegurar que existe caminho pela referida direção                
                if(!up_propertie.value){
                    // console.log("caminho inexistente ! você está se equivocando")
                    return
                }

                if(up_propertie.value != 'guapimirim_sign'){
//                  Resgata o ponto alvo e atualiza as coordenadas do alvo no obj de controle do jogador               
                    var next_Point = this.getObjectById(up_propertie.value)
    
                    this.playerState.targetX = Math.floor(next_Point.x * Sizes.mapScale) 
                    this.playerState.targetY = Math.floor(next_Point.y * Sizes.mapScale)
                    this.playerState.targetID = up_propertie.value

//                  Dispara o personagem na direção desejada usando a respectiva animação
                    this.player.key = CharactersKey.ManUpKey
                    this.player.play({key: Animation.ManWalkUpKey, repeat: -1}, true)
                    this.player.setVelocity(0, -Difficulty.Char_velocity)
                    
//                  Atualiza o estado do personagem em: "movimentando" e "direção"
                    this.playerState.isMoving = true 
                    this.playerState.direction = 'up'

                } else {
                }
                // console.log(`atual: ${this.playerState.point_id}   proximo:${this.playerState.targetID}\nplayer.x: ${this.player.x} alvo: ${this.playerState.targetX}\nplayer.y: ${this.player.y} alvo: ${this.playerState.targetY}`)                     
            }
            else if(this.cursor.down.isDown & !this.playerState.isMoving)       // DOWN
            {
                this.player.y = Math.floor(this.player.y)

                var current_point =  this.getObjectById(this.playerState.point_id)
                var down_propertie = current_point.properties.find(obj => obj.name === 'down')
                
                if(!down_propertie.value){
                    // console.log("caminho inexistente ! você está se equivocando")
                    return
                }

                var next_Point = this.getObjectById(down_propertie.value)

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

                var current_Point =  this.getObjectById(this.playerState.point_id)
                var left_propertie = current_Point.properties.find(obj => obj.name === 'left')
                
                if(!left_propertie.value){
                    // console.log("caminho inexistente ! você está se equivocando")
                    return
                }
                
                var next_Point = this.getObjectById(left_propertie.value)
                
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
                
                var current_Point =  this.getObjectById(this.playerState.point_id)
                var right_propertie = current_Point.properties.find(obj => obj.name === 'right')
                
                if(!right_propertie.value){
                    // console.log("caminho inexistente ! você está se equivocando")
                    return
                }

                var next_Point = this.getObjectById(right_propertie.value)

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

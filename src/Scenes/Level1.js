// Scene (Cena) principal do Jogo


// -> implementar timeline de inicio de jogo
//      -> entrada do player
//      -> contagem regressiva
//      -> inicio do jogo

// -> implementar logica do jogo
// Sistema que ao ser acionado, a cada INTERVALO X ele gera um numero aleatório entre 1 e 3
// referente as colunas onde cada tronco deve descer. a condição de parada é o GameState.isScrolling


import Phaser from "phaser";

// Scenes
import { mainUserInterface } from '../Consts/SceneKeys'    // ATENCION
// Constants
import { mapL1_key, l1_tilesetObjConfig, l1_layers_ID, objectsLayers_keys } from '../Consts/MapKeys'
import { l1Map_scale, l1Map_height, l1Map_width, transitionFadeDuration, containerGame_height } from '../Consts/Sizes'
import { userCharacter_objConfig } from '../Consts/CharacterKeys'
import { level1_delayMapScrolling, level1_SpeedMapScrolling, character_AnimationFrameRate } from '../Consts/Difficulty'
import { userCharacter_animationsKey } from '../Consts/Animations'
import { stem } from '../Consts/SpriteSheets'

// Level data
import { level_data, levelStatesObj } from "../Consts/LevelStatesObj"
import { playerState } from "../Consts/GameStateObj";

export default class Game extends Phaser.Scene
{
    /** Lembre-se que quando implementados o fim da fase e o botão de pausar 
     * devemos atualizar tanto GameStatesObj quanto currentGameState */
    preload(){
        this.load.image(
            stem.stem_key,
            stem.stem_URL,
        )
    }
    init(){
        this.enableKeyboard = false
        this.currentGameState = levelStatesObj.Running
        
        this.GameContainerEl = document.getElementById('gameContainer')
        this.AcessibleTextBodyEl = document.querySelector('.textBody')
        
        // styles
        const gameCanvas = this.sys.game.canvas
        gameCanvas.style.border = "5px solid #40A2E3";
        gameCanvas.style.borderRadius = "20px"
    }

    create()
    { 
        this.cameras.main.fadeIn(transitionFadeDuration, 0, 0, 0); // Fade a partir do preto em 1 segundo
        
        this.cameras.main.once('camerafadeoutcomplete', (camera) => {
            return
            // implementar timeline de instruçoes para level 1
        })
        
        const map = this.make.tilemap({key: mapL1_key})
        
        const tile_1 = map.addTilesetImage(l1_tilesetObjConfig[0].name, l1_tilesetObjConfig[0].key, 16, 16)
        const tile_2 = map.addTilesetImage(l1_tilesetObjConfig[1].name, l1_tilesetObjConfig[1].key, 16, 16)
        const tile_3 = map.addTilesetImage(l1_tilesetObjConfig[2].name, l1_tilesetObjConfig[2].key, 16, 16)
        const tile_4 = map.addTilesetImage(l1_tilesetObjConfig[3].name, l1_tilesetObjConfig[3].key, 16, 16)
        const tile_5 = map.addTilesetImage(l1_tilesetObjConfig[4].name, l1_tilesetObjConfig[4].key, 16, 16)
        const tile_6 = map.addTilesetImage(l1_tilesetObjConfig[5].name, l1_tilesetObjConfig[5].key, 16, 16)
        const tile_7 = map.addTilesetImage(l1_tilesetObjConfig[6].name, l1_tilesetObjConfig[6].key, 16, 16)
        
        const tilesArray = [tile_1, tile_2, tile_3, tile_4, tile_5, tile_6, tile_7]
        
        map.createLayer(l1_layers_ID.layer1, tilesArray, 0, 0).setScale(l1Map_scale)
        map.createLayer(l1_layers_ID.layer2, tilesArray, 0, 0).setScale(l1Map_scale)
        map.createLayer(l1_layers_ID.layer3, tilesArray, 0, 0).setScale(l1Map_scale)
        map.createLayer(l1_layers_ID.layer4, tilesArray, 0, 0).setScale(l1Map_scale)
        map.createLayer(l1_layers_ID.layer5, tilesArray, 0, 0).setScale(l1Map_scale)
        map.createLayer(l1_layers_ID.layer6, tilesArray, 0, 0).setScale(l1Map_scale)
        
        this.cameras.main.setBounds(0, 0, map.widthInPixels * l1Map_scale, map.heightInPixels * l1Map_scale) // limites da camera
        this.cameras.main.setScroll( 0, (l1Map_height * l1Map_scale)) // configurando posicionamento da camera
        this.physics.world.setBounds(0, 0, (map.widthInPixels * l1Map_scale), (map.heightInPixels * l1Map_scale))
        
        this.scene.run(mainUserInterface)
        this.scene.bringToTop(mainUserInterface)

        this.createNeededAnimation() // criar apenas uma vez (mapaMain)
        
        this.player = this.physics.add.sprite( ((l1Map_width + 40) * l1Map_scale) / 2, (l1Map_height - 30) * l1Map_scale, userCharacter_objConfig.up.manUp_key).setScale(l1Map_scale * 1.8)
        this.player.setCollideWorldBounds(true);

        const mapObjects = map.getObjectLayer(objectsLayers_keys.WallLayerKey)["objects"] 
        
        mapObjects.forEach(object => {
            switch(object.name){
                default:
                    if(object.rectangle)
                    {
                        this.objRec = this.add.rectangle((object.x * l1Map_scale), (object.y * l1Map_scale), (object.width * l1Map_scale), (object.height * l1Map_scale)).setDisplayOrigin(0)
                        this.physics.add.existing(this.objRec, true)
                        this.physics.add.collider(this.player, this.objRec)
                    }
                    else if(object.ellipse)
                    {
                        this.objEllips = this.add.circle((object.x * l1Map_scale), (object.y * l1Map_scale), (object.height * l1Map_scale / 2), 0xff0000).setOrigin(0)
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
        levelStatesObj.hasBegun = true
        console.log(this.AcessibleTextBodyEl)
        // this.AcessibleTextBodyEl.innerText
    }


    update() {  // SE O JOGO ESTIVER PAUSADO OU SE ELE NÃO ESTIVER RODADNDO AS FUNÇOES DO UPDATE NÃO IRÃO SER LIDAS 
        if(this.currentGameState != levelStatesObj.Running && !levelStatesObj.hasBegun) return
        this.handleLMainCharacterMovements()
        if (levelStatesObj.hasMapScrolled) this.keepCharacterInCameraBounds()  
        this.time.delayedCall(level1_delayMapScrolling, () => {
            if(level_data.aux_controlDelay == 0)
            {
                level_data.aux_controlDelay ++
                this.toggleKeyboardControl()
            }
            this.handleMapScrolling()
        })
    }

    gameLogic(){
        let aux = 1
        let collumn = undefined
        
        if(levelStatesObj.isMapScrolling){
            this.gameMachineTimer = this.time.addEvent({
                delay: 3000,
                callback: () => {
                    collumn = Phaser.Math.Between(1,3)
                    let auxGameLogic = 0

                    if(this.cameras.main.scrollY > containerGame_height + 100)
                    {   
                        switch(collumn){
                           case 1:
                               const stem1 = this.add.image(288 * l1Map_scale, this.cameras.main.scrollY - 16 * l1Map_scale, stem.stem_key)
                               .setDepth(100)
                               .setOrigin(0)
                               .setScale(l1Map_scale)

                               this.physics.add.existing(stem1, true)
                               this.physics.add.overlap(this.player, stem1, () => {
                                if(auxGameLogic == 0){
                                    if(playerState.life > 0.5){
                                        playerState.life = playerState.life - 0.5
                                    } else {
                                        playerState.life = 0
                                    }
                                    auxGameLogic++
                                }
                               })
                               break

                           case 2:
                               const stem2 = this.add.image(336 * l1Map_scale, this.cameras.main.scrollY - 16 * l1Map_scale, stem.stem_key)
                               .setDepth(100)
                               .setOrigin(0)
                               .setScale(l1Map_scale)

                               this.physics.add.existing(stem2, true)
                               this.physics.add.overlap(this.player, stem2, () => {
                                if(auxGameLogic == 0){
                                    if(playerState.life > 0.5){
                                        playerState.life = playerState.life - 0.5
                                    } else {
                                        playerState.life = 0
                                    }
                                    auxGameLogic++
                                }
                               })
                               break

                           case 3:
                               const stem3 = this.add.image(384 * l1Map_scale, this.cameras.main.scrollY - 16 * l1Map_scale, stem.stem_key)
                               .setDepth(100)
                               .setOrigin(0)
                               .setScale(l1Map_scale)
                               this.physics.add.existing(stem3, true)
                               this.physics.add.overlap(this.player, stem3, () => {
                                if(auxGameLogic == 0){
                                    if(playerState.life > 0.5){
                                        playerState.life = playerState.life - 0.5
                                    } else {
                                        playerState.life = 0
                                    }
                                    auxGameLogic++
                                }
                               })
                               break
                        }
                        
                    this.AcessibleTextBodyEl.innerHTML = `<p>Chamada - ${aux}</p><p>Coluna - ${collumn}</p><p>Vida - ${playerState.life}</p>`
                    aux++
                    } else{
                        this.AcessibleTextBodyEl.innerHTML = `<p>Fim da produção</p>`
                    }
                },
                loop: true
            })
        }
    }

    handleLMainCharacterMovements(){
        if(this.enableKeyboard){  
            const noLeftRightKey = (levelStatesObj.isMapScrolling && !this.cursor.left.isDown && !this.cursor.right.isDown)
            const noUpKey        = (levelStatesObj.isMapScrolling && this.cursor.up.isDown)
            const noDownKey      = (levelStatesObj.isMapScrolling && this.cursor.down.isDown)
            
            const y = !levelStatesObj.isMapScrolling ? 0 : -100

            if( noLeftRightKey || noUpKey || noDownKey )
            {
                    this.player.key = userCharacter_objConfig.up.manUp_key
                    this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: 0}, true)
                    this.player.setVelocity(0, y)
            }
            else
            {   
                if( this.cursor.left.isDown )
                {   
                    this.player.key =  userCharacter_objConfig.left.manLeft_key
                    this.player.play(userCharacter_animationsKey.walk_left.key, true)
                    this.player.setVelocity(-100, y)        
                }
                else if (this.cursor.right.isDown)
                {
                    this.player.key = userCharacter_objConfig.right.manRight_key
                    this.player.play(userCharacter_animationsKey.walk_right.key, true)
                    this.player.setVelocity(100, y)        
                }
                else if(this.cursor.up.isDown)
                {
                    this.player.key = userCharacter_objConfig.up.manUp_key
                    this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: 0}, true)
                    this.player.setVelocity(0, -100)        
                } 
                else if(this.cursor.down.isDown)
                {
                    this.player.key = userCharacter_objConfig.manDown_key
                    this.player.play(userCharacter_animationsKey.walk_down.key, true)
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
            this.cameras.main.scrollY -= level1_SpeedMapScrolling
            if(!levelStatesObj.isMapScrolling)
            {
                levelStatesObj.isMapScrolling = true
                level_data.running = true
                this.gameLogic()
            }
        } 
        else
        {
            if(levelStatesObj.isMapScrolling)
            {
                this.gameMachineTimer.destroy()
                console.log('fim')
                levelStatesObj.isMapScrolling = false
                levelStatesObj.hasMapScrolled =  true
                this.time.removeEvent(this.cronometro)
                level_data.running = false
                localStorage.setItem('currentLevel', 1)
            }
        }

    }

    createNeededAnimation() { // criar apenas uma vez (preload)
        const ManWalkUpConfig = {
            key: userCharacter_animationsKey.walk_up.key,
            frames: this.anims.generateFrameNumbers(userCharacter_objConfig.up.manUp_key, {frame: [0, 1, 2, 3]}),
            frameRate: character_AnimationFrameRate, 
            repeat: 0,
        }
        this.anims.create(ManWalkUpConfig)
        
        const ManWalkLeftConfig = {
            key: userCharacter_animationsKey.walk_left.key,
            frames: this.anims.generateFrameNumbers(userCharacter_objConfig.left.manLeft_key, {frame: [0, 1, 2, 3]}),
            frameRate: character_AnimationFrameRate,
            repeat: 0,
        }
        this.anims.create(ManWalkLeftConfig)
        
        const ManWalkRightConfig = {
            key: userCharacter_animationsKey.walk_right.key,
            frames: this.anims.generateFrameNumbers(userCharacter_objConfig.right.manRight_key, {frame: [0, 1, 2, 3]}),
            frameRate: character_AnimationFrameRate,
            repeat: 0,
        }
        this.anims.create(ManWalkRightConfig)

        const ManWalkDownConfig = {
            key: userCharacter_animationsKey.walk_down.key,
            frames: this.anims.generateFrameNumbers(userCharacter_objConfig.down.manDown_key, {frame: [0, 1, 2, 3]}),
            frameRate: character_AnimationFrameRate, 
            repeat: 0,
        }
        this.anims.create(ManWalkDownConfig)

    }

    toggleKeyboardControl() {
        this.enableKeyboard = !this.enableKeyboard;
    }
}

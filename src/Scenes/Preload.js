// Scene de Preload (Carregamento dos assets usados no Jogo)
    



import Phaser from "phaser";

// consts
import { level1, title, mapaMain } from "../Consts/SceneKeys";//                             O-O *

import { mapL1_key, mapL1_URL, l1_tilesetObjConfig } from '../Consts/MapKeys'
import { userCharacter_objConfig } from '../Consts/CharacterKeys'
import { lifeBar } from '../Consts/SpriteSheets'
import { titleImages, uiImages } from '../Consts/ImagesKeys'
import { titleSongs, mapMainSongs, level1Songs } from '../Consts/SongsKey'

export default class Preload extends Phaser.Scene{
    
    preload(){
        const load =  this.load

        // TITLE
        //      Songs
        load.audio(titleSongs.titleTheme.key, titleSongs.titleTheme.url, titleSongs.titleTheme.config)
        //      Parallax Images
        load.image(titleImages.background.key, titleImages.background.url)
        load.image(titleImages.rocks_2.key, titleImages.rocks_2.url)
        load.image(titleImages.rocks_1.key, titleImages.rocks_1.url)
        load.image(titleImages.clouds_1.key, titleImages.clouds_1.url)
        load.image(titleImages.clouds_2.key, titleImages.clouds_2.url)
        load.image(titleImages.clouds_3.key, titleImages.clouds_3.url)
        load.image(titleImages.clouds_4.key, titleImages.clouds_4.url)
        load.image(titleImages.logo.key, titleImages.logo.url)
        load.image(titleImages.recTitle.key, titleImages.recTitle.url)
        
        // MAIN
        //     Songs
        load.audio(mapMainSongs.mapaMain_theme.key, mapMainSongs.mapaMain_theme.url, mapMainSongs.mapaMain_theme.config)     
        
        // CHARACTERS
        load.spritesheet(
            userCharacter_objConfig.up.manUp_key, 
            userCharacter_objConfig.up.manUp_URL, 
            userCharacter_objConfig.up.manUp_FrameSettings,
            userCharacter_objConfig.up.manUp_FrameAmount
        )

        load.spritesheet(
            userCharacter_objConfig.down.manDown_key, 
            userCharacter_objConfig.down.manDown_URL, 
            userCharacter_objConfig.down.manDown_FrameSettings,
            userCharacter_objConfig.down.manDown_FrameAmount
        )

        load.spritesheet(
            userCharacter_objConfig.right.manRight_key,
            userCharacter_objConfig.right.manRight_URL,
            userCharacter_objConfig.right.manRight_FrameSettings,
            userCharacter_objConfig.right.manRight_FrameAmount
        )

        load.spritesheet(
            userCharacter_objConfig.left.manLeft_key,
            userCharacter_objConfig.left.manLeft_URL,
            userCharacter_objConfig.left.manLeft_FrameSettings,
            userCharacter_objConfig.left.manLeft_FrameAmount
        )

        // USER INTERFACE
        //       Heart Bar
        load.spritesheet(
            lifeBar.lifeBar_key,
            lifeBar.lifeBar_URL,
            lifeBar.lifeBar_FrameSettings,
            lifeBar.lifeBar_FrameAmount
        )
        //      Dialog Box
        load.image(uiImages.dialogBox.key, uiImages.dialogBox.url)
        //      Timer
        load.image(uiImages.timer.key, uiImages.timer.url)
        
        //      CityMap_Sign
        load.image(uiImages.cityMap_Sign.key, uiImages.cityMap_Sign.url)
        //      CityMap_Map
        load.image(uiImages.cityMap_Map.key, uiImages.cityMap_Map.url)
        //      Arrows
        load.image(uiImages.arrows.up.key , uiImages.arrows.up.url)
        load.image(uiImages.arrows.down.key , uiImages.arrows.down.url)
        load.image(uiImages.arrows.left.key , uiImages.arrows.left.url)
        load.image(uiImages.arrows.right.key , uiImages.arrows.right.url)


        // Level_1
        load.audio(level1Songs.footstepsOnWater.key, level1Songs.footstepsOnWater.url, level1Songs.footstepsOnWater.config)     
        load.audio(level1Songs.waterfallSong.key, level1Songs.waterfallSong.url, level1Songs.waterfallSong.config)     


        load.tilemapTiledJSON(mapL1_key, mapL1_URL, null, Phaser.Tilemaps.TILLED_JSON)
        
        load.image(l1_tilesetObjConfig[0].key, l1_tilesetObjConfig[0].url, { frameWidth: 16 })
        load.image(l1_tilesetObjConfig[1].key, l1_tilesetObjConfig[1].url, { frameWidth: 16 })
        load.image(l1_tilesetObjConfig[2].key, l1_tilesetObjConfig[2].url, { frameWidth: 16 })
        load.image(l1_tilesetObjConfig[3].key, l1_tilesetObjConfig[3].url, { frameWidth: 16 })
        load.image(l1_tilesetObjConfig[4].key, l1_tilesetObjConfig[4].url, { frameWidth: 16 })
        load.image(l1_tilesetObjConfig[5].key, l1_tilesetObjConfig[5].url, { frameWidth: 16 })
        load.image(l1_tilesetObjConfig[6].key, l1_tilesetObjConfig[6].url, { frameWidth: 16 })

        // this.load.spritesheet(
        //     CharactersKey.DeerStagNeKey,
        //     CharactersKey.DeerStagNeURL,
        //     CharactersKey.DeerStagNe_FrameSettings,
        //     CharactersKey.DeerStagNe_FrameAmount
        // )
    }
    

    create(){
        this.scene.start(mapaMain)
    }
}
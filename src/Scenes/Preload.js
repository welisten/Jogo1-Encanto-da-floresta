// Scene de Preload (Carregamento dos assets usados no Jogo)
    



import Phaser from "phaser";

// consts
import { Level1 } from "../Consts/SceneKeys";
import { Title } from "../Consts/SceneKeys";
import { MapaMain } from "../Consts/SceneKeys";

import * as MapKeys from '../Consts/MapKeys'
import * as CharactersKey from '../Consts/CharacterKeys'
import * as SpriteSheets from '../Consts/SpriteSheets'
import * as ImageKey from '../Consts/ImagesKeys'
import * as SongsKey from '../Consts/SongsKey'
export default class Preload extends Phaser.Scene{
    
    preload(){
        const load =  this.load

        // TITLE
        //      Songs
        load.audio(SongsKey.MusicG1Key, SongsKey.MusicG1URL, SongsKey.MusicG1Config)
        //      Parallax Images
        load.image(ImageKey.Background, ImageKey.Background_URL)
        load.image(ImageKey.Rocks_2, ImageKey.Rocks2_URL)
        load.image(ImageKey.Rocks_1, ImageKey.Rocks1_URL) 
        load.image(ImageKey.Clouds_1, ImageKey.Clouds1_URL)
        load.image(ImageKey.Clouds_2, ImageKey.Clouds2_URL)
        load.image(ImageKey.Clouds_3, ImageKey.Clouds3_URL)
        load.image(ImageKey.Clouds_4, ImageKey.Clouds4_URL)
        load.image(ImageKey.Logo2, ImageKey.Logo2_URL)
        load.image(ImageKey.RecStart, ImageKey.RecStart_URL)
        
        // MAIN
        //     Songs
        load.audio(SongsKey.MMMusicKey, SongsKey.MMMusicURL, SongsKey.MMMusicConfig)     
        
        // CHARACTERS
        load.spritesheet(
            CharactersKey.ManUpKey, 
            CharactersKey.ManUpURL, 
            CharactersKey.ManUp_FrameSettings,
            CharactersKey.ManUp_FrameAmount
        )

        load.spritesheet(
            CharactersKey.ManDownKey, 
            CharactersKey.ManDownURL, 
            CharactersKey.ManDown_FrameSettings,
            CharactersKey.ManDown_FrameAmount
        )

        load.spritesheet(
            CharactersKey.ManRightKey,
            CharactersKey.ManRightURL,
            CharactersKey.ManRight_FrameSettings,
            CharactersKey.ManRight_FrameAmount
        )

        load.spritesheet(
            CharactersKey.ManLeftKey,
            CharactersKey.ManLeftURL,
            CharactersKey.ManLeft_FrameSettings,
            CharactersKey.ManLeft_FrameAmount
        )

        // USER INTERFACE
        //       Heart Bar
        load.spritesheet(
            SpriteSheets.HeartBarKey,
            SpriteSheets.HeartBarURL,
            SpriteSheets.Heart_FrameSettings,
            SpriteSheets.HeartBar_FrameAmount
        )
        //      Dialog Box
        load.image(ImageKey.DialogBox_Key, ImageKey.DialogBox_URL)
            
        //      CityMap_information
        load.image(ImageKey.CityMap_Key, ImageKey.CityMap_URL)
        //      GuapiMap
        load.image(ImageKey.GuapiMapObj.key, ImageKey.GuapiMapObj.url)

        //      Timer
        load.image(ImageKey.TimerKey, ImageKey.Timer_URL)

        //      Images
        load.image(ImageKey.directionsImagesObj.up_key , ImageKey.directionsImagesObj.up_URL)
        load.image(ImageKey.directionsImagesObj.down_key , ImageKey.directionsImagesObj.down_URL)
        load.image(ImageKey.directionsImagesObj.left_key , ImageKey.directionsImagesObj.left_URL)
        load.image(ImageKey.directionsImagesObj.right_key , ImageKey.directionsImagesObj.right_URL)


        // Level_1
        load.tilemapTiledJSON(MapKeys.MapL1Key, MapKeys.MapL1URL, null, Phaser.Tilemaps.TILLED_JSON)
        
        load.image(MapKeys.L1_ObjConfigTileset[0].key, MapKeys.L1_ObjConfigTileset[0].url, { frameWidth: 16 })
        load.image(MapKeys.L1_ObjConfigTileset[1].key, MapKeys.L1_ObjConfigTileset[1].url, { frameWidth: 16 })
        load.image(MapKeys.L1_ObjConfigTileset[2].key, MapKeys.L1_ObjConfigTileset[2].url, { frameWidth: 16 })
        load.image(MapKeys.L1_ObjConfigTileset[3].key, MapKeys.L1_ObjConfigTileset[3].url, { frameWidth: 16 })
        load.image(MapKeys.L1_ObjConfigTileset[4].key, MapKeys.L1_ObjConfigTileset[4].url, { frameWidth: 16 })
        load.image(MapKeys.L1_ObjConfigTileset[5].key, MapKeys.L1_ObjConfigTileset[5].url, { frameWidth: 16 })
        load.image(MapKeys.L1_ObjConfigTileset[6].key, MapKeys.L1_ObjConfigTileset[6].url, { frameWidth: 16 })

        // this.load.spritesheet(
        //     CharactersKey.DeerStagNeKey,
        //     CharactersKey.DeerStagNeURL,
        //     CharactersKey.DeerStagNe_FrameSettings,
        //     CharactersKey.DeerStagNe_FrameAmount
        // )
    }
    

    create(){
        this.scene.start(MapaMain)
    }
}
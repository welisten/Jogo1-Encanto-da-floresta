// Scene de Preload (Carregamento dos assets usados no Jogo)
    



import Phaser from "phaser";

// consts
import { Game, Level1 } from "../Consts/SceneKeys";
import { Title } from "../Consts/SceneKeys";
import { MapaMain } from "../Consts/SceneKeys";

import * as MapKeys from '../Consts/MapKeys'
import * as CharactersKey from '../Consts/CharacterKeys'
import * as SpriteSheets from '../Consts/SpriteSheets'
import * as ImageKey from '../Consts/ImagesKeys'
import * as SongsKey from '../Consts/SongsKey'
export default class Preload extends Phaser.Scene{
    
    preload(){
        // TITLE
        
        // MAIN
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
            //Songs
        this.load.audio(SongsKey.MMMusicKey, SongsKey.MMMusicURL, SongsKey.MMMusicConfig)
              
        
        // User Interface
            // Heart Bar
        this.load.spritesheet(
            SpriteSheets.HeartBarKey,
            SpriteSheets.HeartBarURL,
            SpriteSheets.Heart_FrameSettings,
            SpriteSheets.HeartBar_FrameAmount
        )
            //Dialog Box
        this.load.image(ImageKey.DialogBox_Key, ImageKey.DialogBox_URL)
            
            //CityMap_information
        this.load.image(ImageKey.CityMap_Key, ImageKey.CityMap_URL)
            //GuapiMap
        this.load.image(ImageKey.GuapiMapObj.key, ImageKey.GuapiMapObj.url)

        // Timer
        this.load.image(ImageKey.TimerKey, ImageKey.Timer_URL)

        //UI - images
        this.load.image(ImageKey.directionsImagesObj.up_key , ImageKey.directionsImagesObj.up_URL)
        this.load.image(ImageKey.directionsImagesObj.down_key , ImageKey.directionsImagesObj.down_URL)
        this.load.image(ImageKey.directionsImagesObj.left_key , ImageKey.directionsImagesObj.left_URL)
        this.load.image(ImageKey.directionsImagesObj.right_key , ImageKey.directionsImagesObj.right_URL)


        // F_1
        this.load.tilemapTiledJSON(MapKeys.MapL1Key, MapKeys.MapL1URL, null, Phaser.Tilemaps.TILLED_JSON)
        
        this.load.image(MapKeys.L1_ObjConfigTileset[0].key, MapKeys.L1_ObjConfigTileset[0].url, { frameWidth: 16 })
        this.load.image(MapKeys.L1_ObjConfigTileset[1].key, MapKeys.L1_ObjConfigTileset[1].url, { frameWidth: 16 })
        this.load.image(MapKeys.L1_ObjConfigTileset[2].key, MapKeys.L1_ObjConfigTileset[2].url, { frameWidth: 16 })
        this.load.image(MapKeys.L1_ObjConfigTileset[3].key, MapKeys.L1_ObjConfigTileset[3].url, { frameWidth: 16 })
        this.load.image(MapKeys.L1_ObjConfigTileset[4].key, MapKeys.L1_ObjConfigTileset[4].url, { frameWidth: 16 })
        this.load.image(MapKeys.L1_ObjConfigTileset[5].key, MapKeys.L1_ObjConfigTileset[5].url, { frameWidth: 16 })
        this.load.image(MapKeys.L1_ObjConfigTileset[6].key, MapKeys.L1_ObjConfigTileset[6].url, { frameWidth: 16 })

        // CHARACTERS
        this.load.spritesheet(
            CharactersKey.ManUpKey, 
            CharactersKey.ManUpURL, 
            CharactersKey.ManUp_FrameSettings,
            CharactersKey.ManUp_FrameAmount
        )

        this.load.spritesheet(
            CharactersKey.ManDownKey, 
            CharactersKey.ManDownURL, 
            CharactersKey.ManDown_FrameSettings,
            CharactersKey.ManDown_FrameAmount
        )

        this.load.spritesheet(
            CharactersKey.ManRightKey,
            CharactersKey.ManRightURL,
            CharactersKey.ManRight_FrameSettings,
            CharactersKey.ManRight_FrameAmount
        )

        this.load.spritesheet(
            CharactersKey.ManLeftKey,
            CharactersKey.ManLeftURL,
            CharactersKey.ManLeft_FrameSettings,
            CharactersKey.ManLeft_FrameAmount
        )

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
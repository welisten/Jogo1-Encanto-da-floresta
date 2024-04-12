// Scene (Cena) principal do Jogo

import Phaser from "phaser";
// Scenes
                                                // ATENCION
// Constants
import * as MapKeys from '../Consts/MapKeys'
import * as Sizes from '../Consts/Sizes'
import * as Difficulty from '../Consts/Difficulty'
import * as Animation from '../Consts/Animations'
import * as CharactersKey from '../Consts/CharacterKeys'
import * as SongsKey from '../Consts/SongsKey'



const GameState = {
    Running: 'running',
    Finished: 'finished',
    isPaused: false
}

export default class Game extends Phaser.Scene
{
    preload(){
        this.load.tilemapTiledJSON(MapKeys.MapF1Key, MapKeys.MapF1URL, null, Phaser.Tilemaps.TILLED_JSON)
        
        this.load.image(MapKeys.f1_ObjConfigTileset[0].key, MapKeys.f1_ObjConfigTileset[0].url, { frameWidth: 16 })
        this.load.image(MapKeys.f1_ObjConfigTileset[1].key, MapKeys.f1_ObjConfigTileset[1].url, { frameWidth: 16 })
        this.load.image(MapKeys.f1_ObjConfigTileset[2].key, MapKeys.f1_ObjConfigTileset[2].url, { frameWidth: 16 })
        this.load.image(MapKeys.f1_ObjConfigTileset[3].key, MapKeys.f1_ObjConfigTileset[3].url, { frameWidth: 16 })
        this.load.image(MapKeys.f1_ObjConfigTileset[4].key, MapKeys.f1_ObjConfigTileset[4].url, { frameWidth: 16 })
        this.load.image(MapKeys.f1_ObjConfigTileset[5].key, MapKeys.f1_ObjConfigTileset[5].url, { frameWidth: 16 })
        this.load.image(MapKeys.f1_ObjConfigTileset[6].key, MapKeys.f1_ObjConfigTileset[6].url, { frameWidth: 16 })
        this.load.image(MapKeys.f1_ObjConfigTileset[7].key, MapKeys.f1_ObjConfigTileset[7].url, { frameWidth: 16 })
        this.load.image(MapKeys.f1_ObjConfigTileset[8].key, MapKeys.f1_ObjConfigTileset[8].url, { frameWidth: 16 })
        
    }

    init() 
    {



    }

    create()
    { 

  
    }

    update() {

    }
    
}
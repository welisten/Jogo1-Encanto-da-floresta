import Phaser from "phaser";
import Game from "../Scenes/Level1";


function levelsMapScrolling() {
    console.log("Testando função levelsMapScrolling\n", Game)
    if(Game.cameras.main.scrollY > 0)
    {   
        this.cameras.main.scrollY -= Difficulty.SpeedMapScrolling
        this.GameStatesObj.isMapScrolling = true
        this.GameStatesObj.isPaused = false
    } 
    else
    {
        this.GameStatesObj.isPaused = true // Retirar paused e add fineshed
        this.GameStatesObj.isMapScrolling = false
        this.GameStatesObj.hasMapScrolled =  true
        // this.currentGameState = this.GameStatesObj.Running
    }

}
export {
    levelsMapScrolling
}
import Phaser from 'phaser'
import * as Animation from '../Consts/Animations'
import * as CharactersKey from '../Consts/CharacterKeys'

function createManWalkingAnimations(scene){ 
    const ManWalkUpRep = { // REPEAT -> true
        key: Animation.ManWalkUpKey,
        frames: scene.anims.generateFrameNumbers(CharactersKey.ManUpKey, {frame: [0, 1, 2, 3]}),
        frameRate: Difficulty.AnimationFrameRate, 
        repeat: -1,
    }
    scene.anims.create(ManWalkUpRep)
    
    const ManWalkUp = { // REPEAT -> false
        key: Animation.ManWalkUpKey,
        frames: scene.anims.generateFrameNumbers(CharactersKey.ManUpKey, {frame: [0, 1, 2, 3]}),
        frameRate: Difficulty.AnimationFrameRate, 
        repeat: 0,
    }
    scene.anims.create(ManWalkUpRep)
    
    const ManWalkLeft = {
        key: Animation.ManWalkLeftKey,
        frames: scene.anims.generateFrameNumbers(CharactersKey.ManLeftKey, {frame: [0, 1, 2, 3]}),
        frameRate: Difficulty.AnimationFrameRate,
        repeat: 0,
    }
    scene.anims.create(ManWalkLeft)
    
    const ManWalkRight = {
        key: Animation.ManWalkRightKey,
        frames: scene.anims.generateFrameNumbers(CharactersKey.ManRightKey, {frame: [0, 1, 2, 3]}),
        frameRate: Difficulty.AnimationFrameRate,
        repeat: 0,
    }
    scene.anims.create(ManWalkRight)
}

function  createDeerAnimations(scene){
    const DeerStangNe_Rep = {
        key: Animation.DeerKey,
        frames: scene.anims.generateFrameNumbers(CharactersKey.DeerStagNeKey, {frame: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}),
        frameRate: Difficulty.AnimationFrameRate,
        repeat: -1,
    }
    scene.anims.create(DeerStangNe_Rep)
}

export default {
    createManWalkingAnimations,
    createDeerAnimations
}
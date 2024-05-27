// Aqui serão colocadas as variaveis que armazenarm as chaves identificadoras das spriteSheets
//  necessárias à Classe Phaser.Loader.FileTypes.SpriteSheetFile usadas no Jogo

const userCharacter_objConfig = {
    up:{
        manUp_key: 'Man-up',
        manUp_URL: 'public/assets/characters/character-up.png',
        manUp_FrameSettings: { frameWidth: 16, frameHeight: 32 },
        manUp_FrameAmount:4
    },
    down:{
        manDown_key: 'Man-down',
        manDown_URL: 'public/assets/characters/character-down.png',
        manDown_FrameSettings: { frameWidth: 16, frameHeight: 32 },
        manDown_FrameAmount:4
    },
    left:{
        manLeft_key: 'Man-left',
        manLeft_URL: 'public/assets/characters/character-left.png',
        manLeft_FrameSettings: { frameWidth: 16, frameHeight: 32 },
        manLeft_FrameAmount:4
    },
    right:{
        manRight_key: 'Man-right',
        manRight_URL: 'public/assets/characters/character-right.png',
        manRight_FrameSettings: { frameWidth: 16, frameHeight: 32 },
        manRight_FrameAmount:4
    }
}

const deer_objConfig = {
    deerStagNe_key: 'Deer',
    deerStagNe_URL: 'public/assets/characters/deer_stag_NE64x82.png',
    deerStagNe_FrameSettings: { frameWidth: 64, frameHeight: 82 },
    deerStagNe_FrameAmount: 24
}

export {
    userCharacter_objConfig,
    deer_objConfig
}
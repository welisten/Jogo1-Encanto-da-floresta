// Aqui serão colocadas as variaveis que armazenarm as chaves identificadoras das animações
//  necessárias à Classe Phaser.Animations.AnimationManager usadas no Jogo


const userCharacter_animationsKey = {
    walk_up:{
        key: 'walk up',
        config:{
            repeat: -1
        }
    },
    walk_down:{
        key: 'walk down'
    },
    walk_left:{
        key: 'walk left'
    },
    walk_right:{
        key: 'walk right'
    }
}

const DeerKey =  "deer-stag"

export {
    userCharacter_animationsKey,
    DeerKey
}
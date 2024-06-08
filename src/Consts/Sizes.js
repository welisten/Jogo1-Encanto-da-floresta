
// Aqui serão colocadas as variaveis que controlaram tamanhos importantes e que
//  São usados constatementes no Jogo

const mapMain_Width     = 1760
const mapMain_Height    = 800

const l1Map_width   = 688
const l1Map_height  = 12096

const containerGame_width   = window.innerWidth * .5 >1050 ? 1050 : window.innerWidth * .5 
const containerGame_height  = 540// window.innerHeight * .6

const screen_width  = window.innerWidth - 20
const screen_height =  window.innerHeight - 20

const mapMain_scale     = 1.3
const l1Map_scale       = containerGame_width / l1Map_width
const character_scale   = 2.3

const transitionFadeDuration = 1000

export {
    screen_width,
    screen_height,
    mapMain_Width,  
    mapMain_Height,  
    containerGame_width, 
    containerGame_height,
    mapMain_scale,
    character_scale,
    l1Map_width,
    l1Map_height,
    l1Map_scale,
    transitionFadeDuration

    // mapF1Width  
    // mapF1height  
}
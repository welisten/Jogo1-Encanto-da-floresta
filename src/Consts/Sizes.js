
// Aqui serão colocadas as variaveis que controlaram tamanhos importantes e que
//  São usados constatementes no Jogo

const mapMain_Width = 1760
const mapMain_Height = 800

const L1Map_Width = 688
const L1Map_Height = 2016

const containerGame_Width = window.innerWidth * .6 > 1000 ? 1000 : window.innerWidth * .6
const containerGame_Height = window.innerHeight * .6 

const Screen_Width = window.innerWidth - 20
const ScreenHeight =  window.innerHeight - 20

const mapScale = 1.2
const L1Map_Scale = containerGame_Width / L1Map_Width
const characterScale = 2.3


export {
    Screen_Width,
    ScreenHeight,
    mapMain_Width,  
    mapMain_Height,  
    containerGame_Width, 
    containerGame_Height,
    mapScale,
    characterScale,
    L1Map_Width,
    L1Map_Height,
    L1Map_Scale,

    // mapF1Width  
    // mapF1height  
}
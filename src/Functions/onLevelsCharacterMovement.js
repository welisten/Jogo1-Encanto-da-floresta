// Se você achar que está aninhando muitos if, pode valer a pena considerar se há maneiras de simplificar
//  a lógica ou dividir a função em partes menores e mais especializadas
 
 function onLevelsCharacterMovement(){
    console.log("testando função handleLMainCharacterMovements")
    if(this.enableKeyboard){  
        var sentence1 = (this.GameStatesObj.isMapScrolling && !this.cursor.left.isDown && !this.cursor.right.isDown)
        var sentence2 = (this.GameStatesObj.isMapScrolling && this.cursor.up.isDown)
        var sentence3 = (this.GameStatesObj.isMapScrolling && this.cursor.down.isDown)
        var y = -100

        if( sentence1 || sentence2 || sentence3 )
        {
                this.player.key = CharactersKey.ManUpKey
                this.player.play({key: Animation.ManWalkUpKey, repeat: 0}, true)
                this.player.setVelocity(0, y)
        }
        else
        {
            if( this.cursor.left.isDown )
            {   
                !this.GameStatesObj.isMapScrolling ? y = 0 : y = -100
                
                this.player.key =  CharactersKey.ManLeftKey
                this.player.play(Animation.ManWalkLeftKey, true)
                this.player.setVelocity(-100, y)        
            }
            else if (this.cursor.right.isDown)
            {
                !this.GameStatesObj.isMapScrolling ? y = 0 : y = -100

                this.player.key = CharactersKey.ManRightKey
                this.player.play(Animation.ManWalkRightKey, true)
                this.player.setVelocity(100, y)        
            }
            else if(this.cursor.up.isDown)
            {
                this.player.key = CharactersKey.ManUpKey
                this.player.play({key: Animation.ManWalkUpKey, repeat: 0}, true)
                this.player.setVelocity(0, -100)        
            } 
            else if(this.cursor.down.isDown)
            {
                this.player.key = CharactersKey.ManDownKey
                this.player.play(Animation.ManWalkDownKey, true)
                this.player.setVelocity(0, 100)        
            }
            else{
                this.player.setVelocity(0, 0)        
            }
        }
    }
} 


export default{
    onLevelsCharacterMovement
}
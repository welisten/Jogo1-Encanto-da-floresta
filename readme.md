# aqui serão relatadas as atividades semanais:
-----------------------------------------------(ANDAMENTO)-----------------------------------------------------

 3 (ANDAMENTO) - Implementar LOGICAS fundamentais ao mapaMain:
              3.1 - PONTOS
   (OK)          - Implementar pausa das funçoes motoras do personagem
   (OK)          - Timeline de inicio de jogo Mapa Main (será sempre ativada ? dar a opção de NÃO)
   (OK)          - Fases
   (OK)          - Movimentação alternativa
(ANDAMENTO)      - UI -> setas de direção nas placas de localização
(ANDAMENTO)      - UI -> Explorar & Desenvolvedor & Mapa de Guapi
              
                                OBS: nesse caso se fará necessário a identificação de cada ponto e ter a trativa necessária pra cada tipo
        
(CONCLUIDO)   3.2 - PLACAS        
       (CONCLUIDO)   - adicionar ouvinte ao se passar pelas placa e exibir informações das placas nas caixas de dialogo

 AS ATIVIDASDES DESSA SEMANA SERÃO FOCADAS NO MAPA MAIN
-----------------------------------------------(CONCLUIDO)-----------------------------------------------------
 
 2 - Interface do jogador no Jogo UI/UX Design (Será necessária a criação de uma segunda interface dentro da interface do jogo. uma interface que se comunique com o jogador atual, o mostrando informaçoes pertinentes aquela instancias de jogo)
        -Assets para UI/UX
        - Quais serão os elementos ?
            - Timer
            - Vida
            - Borda
            - Caixa de Dialogo(atenção a esse elemento visto que muitas coisas acionarão a caixa de dialogos)
                                OBS: para forma em que iremos tornar tal elementos visíveis ou não.

 ----------------------------------------------(INVIAVEL)------------------------------------------------------

 1 - compartimentalizar as funções que serão usadas por outros módulos:
        - scroll dos levels
        -  Algoritmos de movimentações que se diferenciam da usada no mapaMain






AJUSTES:

 - SCALE para Level1
 - Limpeza de codigo
 - Ajustar função alternativa de movimentação

PROXIMAS ATIVIDADES:
 - Salvar processos no localStorage
 - Adicionar botão para ativar movimentação alternativa

 OTIMIZAÇÃO:
 - Fazer os imports apenas das contantes necessárias
 - Estudar as circunstâncias e possibilidades de substituir as variaveis de classe das Cenasdo jogo (Phaser.Scene) 
       por variaveis de escopo mais  abstratos
 - tentar substitur as varias interaçoes sobre o array de objetos por apenas uma interação ontodos os outros array já são definidos

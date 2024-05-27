# aqui serão relatadas as atividades semanais:

( 1 )-------------------------------------------(      AJUSTES      )-----------------------------------------------------
-----------------------------------------------     (ANDAMENTO)     ------------------------------------------------------

      1 - Limpeza de codigo
      OK    - eliminar var usar apenas let e const
      OK    - deixar os nomes dos dados e funções todas em ingles
            - verificar a conformidade entre a ATIVIDADE e o NOME DAS FUNÇÕES que as executas
            - verificar a conformidade entre Os DADO e os NOME DAS VARIAVEIS que os carregam
      OK    - excluir dados e lógicas irrelevantes
      OK    - verificar formatação do código
      OK    - eliminar console.logs
            - elencar casos de testes para as funções verificadas
            - compartimentalizar as constantes que demandam tal ação

OK   2 - Implementar uma logica para a definição da escala do mapa Level1

( 2 )------------------------------------(      AJUSTES DE OTIMIZAÇÃO     )-----------------------------------------------
-----------------------------------------------     (ANDAMENTO)     ------------------------------------------------------

OK    1 - Tentar substitur as varias interaçoes sobre o array de objetos por apenas uma interação onde todos os outros array
             já são definidos
->    2 - Fazer os imports apenas das contantes necessárias
      3 - Estudar as circunstâncias e possibilidades de substituir as variaveis das classe das Cenas do jogo por variaveis 
             de escopo mais  abstratos

( 3 )------------------------------------(      ATIVIDADES DA SPRIT      )------------------------------------------------
-----------------------------------------------     (ANDAMENTO)     ------------------------------------------------------
      1 -          Salvar variaveis no localStorage para serem capturadas quando o jogo abrir.
                        - Quais ?
                              - Nome do jogador (colocar em locais do texto da time line para aumentar a interação com o usuário )
                              - Ultimo ponto passado pelo jogador
                              - Ultima fase jogada pelo jogador
                              - Vida do jogador
                        - Aonde ?
                              - Nome            -> Entre o título e o Mapa main
                              - Ultimo ponto    -> Toda vez que um novo ponto entrar em sobreposição com player
                              - Ultima fase     -> Toda vez que uma fase for terminada
                              - Vida            -> Quando a vida for alterada

      2 -          Ajustar personagem ao mudar movimentação(a sprite deve ser posta no local do current_point)
                        - Quando ?
                              - Quando alternado de default para accessible 
                        - Como ?
                              - Atualizando a posição(X,Y) do personagem para os respectivos valores (PlayerState. point_x e point_y) 

      3 -          Logica para Desenvolvedor e Explorar
                   Desenvolvedor
                        -   Exibir imagem feita no canvas com informações sobre o desenvolvedor e o processo de desenvolvimento
                              - Lembrar que essa comunicação é direcionada ao público alvo (Crianças de 4 - 8 anos)
                  Explorar
                        -   Ao se entrar nas areas de exploração a movimentação deve ser setada altomaticamente para default
                              OQUE OCORRERIA SE O BOTÃO DE ALTERNANCIA DE MOVIMENTAÇÃO FOR APERTADO ?
                              COMO A MOVIMENTAÇÃO IRA SE COMPORTAR IMEDIATAMENTE AO SAIR ?


      4 -          Fase L1 -> à definir

      5 -          Movimentação acesível para fases -> à definir

--------------------------------------------------------------------------------------------------------------------------

PROXIMAS ATIVIDADES
      - IMPLEMENTAR TIMELINE DO LEVEL 1
      - IMPLEMENTAR NA UI DO LEVEL1 CONTROLE PARA PAUSAR
      - REFATORAR TITLE

AJUSTES:
      - SÓ HÁ A NECESSIDADE DE CRIAR AS ANIMAÇOES UMA VEZ POR ISSO O MELHOR LUGAR É EM PRELOAD
      - AJUSTAR PROFUNDIDADE DO PERSONAGEM EM RELAÇÃO AS ARVORES NO LEVEL 1
      - AJUSTAR ALINHAMENTO DOS Decisions_break NO TILED
      - REPRODUZAIR PASSOS AO ANDAR

OTIMIZAÇÂO:
      - onde alocar os assets ?

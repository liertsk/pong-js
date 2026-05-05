let largura_grid = 800; //quantos pixels de esquerda a direita a área do jogo possui
let altura_grid = 400; // quantos pixels de cima para baixo a área do jogo possui 
let topo_grid = 0; // variavel só pra não me confundir que a parte de cima absoluta é 0 e não 400
let fundo_grid = altura_grid // a parte de baixo absoluta é correspondente ao limite de altura
let ponta_esquerda_grid = 0 // corresponde ao lim inicial
let ponta_direita_grid = largura_grid // corresponde ao limite final 

let largura_bola = 25; // dimensão (x) que eu defino para a bola
let altura_bola = 25; // dimensão (y) que eu defino para a bola
let bola_x = (largura_grid/2) - largura_bola; // largura(x) / 2 - largura (do obj)que eu definir 
let bola_y = (altura_grid/2) - altura_bola; // altura(y) / 2 - altura (do obj) que eu definir 
let velocidade_bola_x = 4; // quantidade de pixels que posteriamente a bola deslocará a cada frame no sentido esquerda -> direita e vice versa
let velocidade_bola_y = -4; // quantidade de pixels que posteriamente a bola deslocará a cada frame no sentido cima -> baixo e vice versa

let raquete_y = 175; // posição da raquete no eixo y 
let raquete_x = 10; // posição da raquete no eixo x 
let largura_raquete = 10; // quantidade de pixels que a raquete ocupa no sentido esquerda - direita
let altura_raquete = 100; // quantidade de pixels que a raquete ocupa no sentido cima - baixo
let lim_raquete = altura_grid - altura_raquete // limite do eixo y (evita que a raquete saia infinitamente no grid) é o lim inferior - a quantidade de pixels de altura que a raquete possui/possuir
let velocidade_raquete = 4; // quantidade de pixels que a raquete vai se deslocar 
let ponta_direita_raquete = raquete_x + largura_raquete; // a ponta direita da raquete é a posição da raquete + a sua largura 

let raquete2_x = largura_grid - largura_raquete - 10 // como a raquete da ia vai estar do lado oposto a do jogador calcula-se a sua posição pelo limite oposto com a operação inversa a largura que quiser assumir para ela
let raquete2_y = raquete_y // mesma altura,suave 
let ponta_esquerda_raquete = raquete2_x - largura_raquete // lim direito - largura, definindo a ponta como a posição extrema esquerda da raquete
let velocidade_raquete_oponente = 2.5;

let pontos_jogador = 0; //pontuação 
let pontos_oponente = 0;
let pontos_vitoria = 5;

function setup() { // linha de código pra criar a tela do jogo
    createCanvas(largura_grid, altura_grid); // sendo o canvas, a tela em si com (largura, altura)
}
function reset() { // o que vai acontecer quando o input reset for dado
    pontos_jogador = 0;
    pontos_oponente = 0;
    bola_x = largura_grid / 2; // bola volta pro meio 
    bola_y = altura_grid / 2;
    velocidade_bola_x = 4;
    velocidade_bola_y = -4;
    raquete_y = altura_grid / 2;
    raquete2_y = altura_grid / 2;
    loop();
}
function keyPressed(){ //input reset
    if (keyCode === ENTER || keyCode === 32) { //32 é o código do espaço
        reset();
    }
}
function meio() {
    for (let y = 0; y < altura_grid; y += 20) { // início;enquanto tal condição;ação
        rect(largura_grid/2, y, 2, 10) //faz vários retângulos no meio do grid, na posição variavel y , com dois pixels de largura e dez de altura
    }  
}
function placar() {
    fill(255); // cor do texto, 255 é branco
    textSize(32); // tamanho da fonte - 32 pixels no casoconsidere 
    textAlign(CENTER) // alinhar o texto no centro 
    text(pontos_jogador, largura_grid/4 , 40) // oque exibir (pontos_...,) em qual x , em qual y
    text(pontos_oponente, largura_grid * 3/4, 40)
}
function verificar_vitoria(){
    if (pontos_jogador >= pontos_vitoria) {
        textSize(48); 
        textAlign(CENTER);
        fill(0); //pintar de branco 
        rect(200, 150, 400, 80);  // exibir o texto no retângulo com as seguintes dimensões/posições
        fill(255);  // pintar o restante de preto
        text("Você ganhou!", largura_grid / 2, altura_grid / 2); 
        noLoop();
    }
    else if (pontos_oponente >= pontos_vitoria){
        textSize(48);
        textAlign(CENTER);
        fill(0);  
        rect(200, 150, 400, 80);  
        fill(255); 
        text("Você perdeu!", largura_grid / 2, altura_grid / 2);
        noLoop();
    }
}
function criar_fundo() {
    background(0); // definir a cor do fundo como preto cor(0)
}
function mover_bola() {    
    bola_x = bola_x + velocidade_bola_x; // a cada frame a bola vai se mover x pixels para a direita
    bola_y = bola_y + velocidade_bola_y; // a cada frame a bola vai se mover x pixels para cima
}
function criar_bola() {
    rect(bola_x, bola_y, largura_bola, altura_bola); // bola_x e bola_y são as coordenadas da bola em relação ao grid
    // (posição em x no grid, posição em  y, pixels de largura, pixels de altura)
}
function criar_raquete() {
    rect(raquete_x, raquete_y, largura_raquete, altura_raquete) // x relativo, y relativo, x independente, y indenpendente
}
function criar_oponente() {
    rect(raquete2_x, raquete2_y, largura_raquete, altura_raquete)
}

function verificar_lim_raquete() {
    if (raquete_y < topo_grid) { // se o eixo y (altura) da raquete for menor que o lim superior do grid(0)
        raquete_y = topo_grid //a posição dela retorna para o lim(0)
    }
    if (raquete_y > lim_raquete) { // se a altura da raquete for maior que o lim inferior do grid (400)
        raquete_y = lim_raquete // a posição dela retorna para o lim(400)
    } 
}
function verificar_lim_oponente() {
      if (raquete2_y < topo_grid) { // se o eixo y da raquete for menor que o lim(0) ele vira 0
        raquete2_y = topo_grid
    }
    if (raquete2_y > lim_raquete) { // se o eixo y for maior que o lim(400) ele vira 400
        raquete2_y = lim_raquete
    } 
}
function mover_raquete() {
    if ((keyIsDown(87)) || keyIsDown(UP_ARROW)) { // 87 é o código da tecla W
        raquete_y -= velocidade_raquete // se o input para cima for dado, a posição é alterada em direção ao eixo y com tendência a zero
    }
    if ((keyIsDown(83)) || keyIsDown(DOWN_ARROW)) { // 83 é o código da tecla S
        raquete_y += velocidade_raquete // se o input para baixo for dado, a posição é alterada em direção ao eixo y com tendência a 800
    }
}
function mover_raquete_oponente() {
    let centro_raquete2 = raquete2_y + altura_raquete / 2; 
    let alvo = bola_y + random(-40, 40);
    if (centro_raquete2 < alvo) { // se o centro estiver acima da posição y da bola
        raquete2_y += velocidade_raquete_oponente // a raquete se move para baixo (em direção a bola)
    }
    if (centro_raquete2 > alvo) { // se o centro estiver abaixo da posição y da bola
        raquete2_y -= velocidade_raquete_oponente // a raquete se move para cima (em direção a bola)
    }
}
function marcar_pontuacao() {
     if (bola_x >= ponta_direita_grid) {  // se a posição x da bola for maior ou igual a ponta direita - a largura x da bola
        velocidade_bola_x = -velocidade_bola_x // a velocidade muda de sentido 
        pontos_jogador += 1 // ponto jogador recebe 1
        bola_x = largura_grid / 2 // bola retorna ao meio do eixo x  
        bola_y = altura_grid / 2 // bola retorna ao meio do eixo y 
     }
    else if (bola_x <= ponta_esquerda_grid) {  // se a posição x da bola for menor ou igual a ponta esquerda 
         velocidade_bola_x = -velocidade_bola_x // a velocidade muda de sentido
         pontos_oponente += 1 // ponto oponente recebe 1
         bola_x = largura_grid / 2 // bola retorna ao meio do eixo x 
         bola_y = altura_grid / 2  // bola retorna ao meio do eixo y 
    }
}
function verificar_lim_bola() {
    if (bola_y <= topo_grid) { // se chegar no topo (0) vai para baixo (400)
        velocidade_bola_y = -velocidade_bola_y 
    }
    else if (bola_y >= fundo_grid-altura_bola) { // se chegar em baixo (0) vai substraindo até chegar em 0 (topo)
        velocidade_bola_y = -velocidade_bola_y
    }   
}
function criar_colisao() {
    if (bola_x <= raquete_x + largura_raquete && // se a posição x da bola for menor ou igual a ponta direita da raquete 1 somada a sua largura verifica se ela está na mesma posição (contato) da ponta da raquete
        bola_y + altura_bola >= raquete_y && // se a posição y da bola + a altura dela for maior ou igual a posição da raquete em y verifica se ela está abaixo da ponta superior da raquete
        bola_y <= raquete_y + altura_raquete) { // se a posição y da bola for menor que a posição e altura da raquete verifica se ela está acima da ponta inferior da raquete
        velocidade_bola_x = Math.abs(velocidade_bola_x); // garante que a realizar a colisão a bola sempre vai tender a direita em direção ao oponente
    }
}
function criar_colisao_oponente() {
    if (bola_x + largura_bola >= raquete2_x && // se a posição x da bola + sua largura tendendo a direita for ou igual a ponta esquerda da raquete 2 
        bola_y + altura_bola >= raquete2_y && //  verifica se ela está abaixo do topo 
        bola_y <= raquete2_y + altura_raquete) { // verifica se ela está acima da ponta inferior
        velocidade_bola_x = -Math.abs(velocidade_bola_x); // garante que a realizar a colisão a bola sempre vai tender a esquerda em direção ao jogador
    }
}
function draw() { //desenha oque vai aparecer
    criar_fundo();
    meio();
    placar();
    mover_bola();
    verificar_lim_bola();
    marcar_pontuacao();
    mover_raquete();
    mover_raquete_oponente();
    verificar_lim_raquete();
    verificar_lim_oponente();
    criar_colisao();
    criar_colisao_oponente();
    criar_bola();
    criar_raquete();
    criar_oponente();
    verificar_vitoria();
}
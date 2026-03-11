/**
 * VARIAVEIS DE CONFIGURAÇÃO (Fáceis de usar)
 */
let tamanhoQuadrado = 20;
let velocidade = 100;
let corCobra = "#ff1010";
let corComida = "rgb(72, 255, 0)";

/**
 * CONFIGURAÇÕES INICIAIS DO JOGO
 */
const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

let cobra = [{ x: 200, y: 200 }];
let direcao = { x: 0, y: 0 };
let comida = { x: 0, y: 0 };
let pontos = 0;

criarComida();
main();

/**
 * GAME LOOP
 */
function main() {
    if (verificarGameOver()) {
        alert("Game Over! Pontos: " + pontos);
        location.reload();
        return;
    }

    setTimeout(function () {
        limparTela();
        desenharComida();
        moverCobra();
        desenharCobra();
        main();
    }, velocidade);
}

/**
 * MOVIMENTO
 */
function moverCobra() {

    const novaCabeca = {
        x: cobra[0].x + direcao.x,
        y: cobra[0].y + direcao.y
    };

    cobra.unshift(novaCabeca);

    if (cobra[0].x === comida.x && cobra[0].y === comida.y) {
        pontos += 10;
        criarComida();
    } else {
        cobra.pop();
    }
}

/**
 * DESENHO
 */
function limparTela() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function desenharCobra() {
    ctx.fillStyle = corCobra;

    cobra.forEach(pedaco => {
        ctx.fillRect(pedaco.x, pedaco.y, tamanhoQuadrado, tamanhoQuadrado);
        ctx.strokeStyle = "black";
        ctx.strokeRect(pedaco.x, pedaco.y, tamanhoQuadrado, tamanhoQuadrado);
    });
}

function desenharComida() {
    ctx.fillStyle = corComida;
    ctx.fillRect(comida.x, comida.y, tamanhoQuadrado, tamanhoQuadrado);
}

/**
 * REGRAS
 */
function criarComida() {
    comida.x = Math.floor(Math.random() * (canvas.width / tamanhoQuadrado)) * tamanhoQuadrado;
    comida.y = Math.floor(Math.random() * (canvas.height / tamanhoQuadrado)) * tamanhoQuadrado;
}

function verificarGameOver() {

    const bateuParedeEsquerda = cobra[0].x < 0;
    const bateuParedeDireita = cobra[0].x >= canvas.width;
    const bateuParedeCima = cobra[0].y < 0;
    const bateuParedeBaixo = cobra[0].y >= canvas.height;

    let bateuNoCorpo = false;

    for (let i = 4; i < cobra.length; i++) {
        if (cobra[i].x === cobra[0].x && cobra[i].y === cobra[0].y) {
            bateuNoCorpo = true;
        }
    }

    return bateuParedeEsquerda || 
           bateuParedeDireita || 
           bateuParedeCima || 
           bateuParedeBaixo || 
           bateuNoCorpo;
}

/**
 * CONTROLES
 */
window.addEventListener("keydown", event => {

    const tecla = event.keyCode;

    const subindo = direcao.y === -tamanhoQuadrado;
    const descendo = direcao.y === tamanhoQuadrado;
    const indoDireita = direcao.x === tamanhoQuadrado;
    const indoEsquerda = direcao.x === -tamanhoQuadrado;

    if (tecla === 37 && !indoDireita) {
        direcao = { x: -tamanhoQuadrado, y: 0 };
    }

    if (tecla === 38 && !descendo) {
        direcao = { x: 0, y: -tamanhoQuadrado };
    }

    if (tecla === 39 && !indoEsquerda) {
        direcao = { x: tamanhoQuadrado, y: 0 };
    }

    if (tecla === 40 && !subindo) {
        direcao = { x: 0, y: tamanhoQuadrado };
    }
});
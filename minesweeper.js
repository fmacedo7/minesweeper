const readline = require('readline');

function CampoMinado(linhas, colunas, numMinas) {
    this.linhas = linhas;
    this.colunas = colunas;
    this.numMinas = numMinas;
    this.tabuleiro = [...Array(linhas)].map(() => Array(colunas).fill(0));
    this.jogadasRestantes = linhas * colunas - numMinas;
    this.jogoContinua = true;
}

CampoMinado.prototype.gerarMinas = function () {
    let minasGeradas = 0;
    while (minasGeradas < this.numMinas) {
        const x = Math.floor(Math.random() * this.linhas);
        const y = Math.floor(Math.random() * this.colunas);
        if (this.tabuleiro[x][y] !== -1) {
            this.tabuleiro[x][y] = -1;
            minasGeradas++;
        }
    }
};

CampoMinado.prototype.jogar = function (x, y, rl, cm) {
    if (x === -1 && y === -1) {
        console.log('Saindo do jogo. Até logo!');
        rl.close();
        return;
    }
    if (x === -2 && y === -2) {
        console.log('Reiniciando o jogo...');
        iniciarJogo();
        return;
    }
    // Verifica se a célula já está aberta
    if (this.tabuleiro[x][y] >= 1 || this.tabuleiro[x][y] === 'X') {
        console.log('Essa célula já está aberta!');
        return;
    }
    
    // Verifica se a célula contém uma mina
    if (this.tabuleiro[x][y] === -1) {
        console.log('Você encontrou uma mina! Fim de jogo!');
        this.revelarTabuleiro();
        this.jogoContinua = false;
        rl.close();
    } else {
        // Conta o número de minas vizinhas
        const numMinasVizinhas = this.contarMinasVizinhas(x, y);
        if (numMinasVizinhas === 0) {
            // Define 'X' para células sem minas adjacentes
            this.tabuleiro[x][y] = 'X';
        } else {
            this.tabuleiro[x][y] = numMinasVizinhas;
        }
        this.jogadasRestantes--;
        this.imprimirTabuleiro();
        if (this.jogadasRestantes === 0) {
            console.log('Parabéns! Você venceu o jogo!');
            this.jogoContinua = false;
        }
    }
};

CampoMinado.prototype.contarMinasVizinhas = function (x, y) {
    let count = 0;
    for (let i = Math.max(0, x - 1); i <= Math.min(this.linhas - 1, x + 1); i++) {
        for (let j = Math.max(0, y - 1); j <= Math.min(this.colunas - 1, y + 1); j++) {
            if (this.tabuleiro[i][j] === -1) {
                count++;
            }
        }
    }
    return count;
};

CampoMinado.prototype.revelarTabuleiro = function () {
    console.log('Tabuleiro revelado:');
    for (let i = 0; i < this.linhas; i++) {
        console.log(this.tabuleiro[i].join(' '));
    }
};

CampoMinado.prototype.imprimirTabuleiro = function () {
    let colunasIndices = "  ";
    for (let i = 0; i < this.colunas; i++) {
        colunasIndices += `${i} `;
    }
    console.log(colunasIndices);

    for (let i = 0; i < this.linhas; i++) {
        let row = `${i} `;
        for (let j = 0; j < this.colunas; j++) {
            if (this.tabuleiro[i][j] === -1) {
                row += '0 ';
            } else {
                row += this.tabuleiro[i][j] + ' ';
            }
        }
        console.log(row);
    }
    console.log('- Digite "-1 -1" para sair do jogo');
    console.log('- Digite "-2 -2" para reiniciar o jogo');
};

// CampoMinado.prototype.jogarComCoordenadas = function (coordenadas, rl, cm) {
//     const [x, y] = coordenadas;
//     if (this.tabuleiro[x][y] >= 1 || this.tabuleiro[x][y] === 'X') {
//         console.log('Essa célula já está aberta!');
//         return;
//     }
//     if (this.tabuleiro[x][y] === -1) {
//         console.log('Você encontrou uma mina! Fim de jogo!');
//         this.revelarTabuleiro();
//         this.jogoContinua = false;
//         rl.close();
//     } else {
//         const numMinasVizinhas = this.contarMinasVizinhas(x, y);
//         this.tabuleiro[x][y] = numMinasVizinhas || 'X';
//         this.jogadasRestantes--;
//         this.imprimirTabuleiro();
//         if (this.jogadasRestantes === 0) {
//             console.log('Parabéns! Você venceu o jogo!');
//             this.jogoContinua = false;
//         }
//     }
// };

function menuDificuldade() {
    console.log('Escolha a dificuldade:');
    console.log('1. Fácil (5x5, 5 minas)');
    console.log('2. Médio (8x8, 15 minas)');
    console.log('3. Difícil (10x10, 25 minas)');
    console.log('0. Sair')
};

function iniciarJogo() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    menuDificuldade();
    rl.question('Escolha o nível de dificuldade: ', (opcao) => {
        switch (opcao) {
            case '0':
                console.log('Saindo do jogo. See you later!');
                rl.close();
                break;
            case '1':
                const cmFacil = new CampoMinado(8, 8, 10);
                cmFacil.gerarMinas();
                cmFacil.imprimirTabuleiro();

                jogar(rl, cmFacil);
                break;
            case '2':
                const cmMedio = new CampoMinado(10, 13, 30);
                cmMedio.gerarMinas();
                cmMedio.imprimirTabuleiro();

                jogar(rl, cmMedio);
                break;
            case '3':
                const cmDificil = new CampoMinado(24, 24, 100);
                cmDificil.gerarMinas();
                cmDificil.imprimirTabuleiro();

                jogar(rl, cmDificil);
                break;
            default:
                console.log('Opção inválida.');
                rl.close();
        }
    });
};

function jogar(rl, cm) {
    if (cm.jogoContinua) {
        rl.question('Digite a linha e a coluna que deseja jogar (exemplo: 0 0): ', (entrada) => {
            const [x, y] = entrada.split(' ').map(coord => parseInt(coord));
            if (x === -2 && y === -2) {
                console.log('Reiniciando o jogo...');
                setTimeout(() => iniciarJogo(), 0); //evita a duplicação da entrada
                return;
            } else if (x === -1 && y === -1) {
                console.log('Saindo do jogo. Até mais!');
                rl.close();
                return;
            } else {
                cm.jogar(x, y, rl, cm);
                if (cm.jogoContinua) {
                    setTimeout(() => jogar(rl, cm), 0); //evitar a duplicação da entrada
                } else {
                    rl.close();
                }
            }
        });
    }
}

function encontrarCoordenadasMina(tabuleiro) {
    for (let i = 0; i < tabuleiro.length; i++){
        for (let j = 0; j < tabuleiro[i].length; j++){
            if (tabuleiro[i][j] === -1){
                return [i, j];
            }
        }
    }
    return [-1, -1]
}

iniciarJogo();
module.exports = { CampoMinado: CampoMinado, menuDificuldade: menuDificuldade, encontrarCoordenadasMina: encontrarCoordenadasMina };
const { CampoMinado } = require('../minesweeper');

describe('Vitoria', () => {
    test('Verifica se o jogador ganhou o jogo', () => {
        const rl = { close: jest.fn() }
        const cm = new CampoMinado(5, 5, 5);

        cm.gerarMinas();
        cm.jogadasRestantes = 5;
        cm.jogar(0, 0, rl, cm);
        cm.jogar(1, 0, rl, cm);
        cm.jogar(0, 1, rl, cm);
        cm.jogar(1, 1, rl, cm);
        cm.jogar(2, 0, rl, cm);

        expect(cm.jogoContinua).toBeFalsy();
    });
});
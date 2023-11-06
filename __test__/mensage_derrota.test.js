const util = require('util');
const { CampoMinado } = require('../minesweeper');

describe('CampoMinado', () => {
    let cm;

    beforeEach(() => {
        cm = new CampoMinado(8, 8, 64); // Altere os parâmetros de acordo com o seu campo minado
        cm.gerarMinas();
    });

    it('deve exibir a mensagem correta ao encontrar uma mina', () => {
        const rl = { close: jest.fn() }; // Mock do readline
        const consoleSpy = jest.spyOn(console, 'log');

        cm.jogar(0, 0, rl, cm);

        expect(consoleSpy).toHaveBeenCalledWith('Você encontrou uma mina! Fim de jogo!');
    });
});
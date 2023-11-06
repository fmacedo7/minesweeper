const util = require('util');
const { CampoMinado } = require('../minesweeper');

describe('Campo Minado', () => {
    let cm

    beforeEach(() => {
        cm = new CampoMinado(1, 1, 0);
        cm.gerarMinas()
    })

    it('Deve exibir mensagem de vitoria', () => {
        const rl = { close: jest.fn() }; // Mock do readline
        const consoleSpy = jest.spyOn(console, 'log');

        cm.jogar(0, 0, rl, cm);

        expect(consoleSpy).toHaveBeenCalledWith('Parabéns! Você venceu o jogo!');
    });
});
const { CampoMinado } = require("../minesweeper");

describe('CampoMinado', () => {
    let cm;

    beforeEach(() => {
        cm = new CampoMinado(8, 8, 10)
    });

    it('deve começar com todas as células fechadas', () => {
        const rl = { close: jest.fn() };
        const consoleSpy = jest.spyOn(console, 'log');

        cm.imprimirTabuleiro();

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/^[0 ]+$/)); // Verifica se todas as linhas consistem em zeros ou espaços
    });
});
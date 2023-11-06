const { CampoMinado } = require("../minesweeper");

describe('CampoMinado', () => {
    let cm;

    beforeEach(() => {
        cm = new CampoMinado(8, 8, 10)
    });

    it('não deve permitir que uma célula aberta seja fechada', () => {
        const rl = { close: jest.fn() };
        const consoleSpy = jest.spyOn(console, 'log');

        cm.jogar(0, 0, rl, cm);
        const valorAnterior = cm.tabuleiro[0][0];

        cm.tabuleiro[0][0] = 0; // Altera o valor para tentar fechar a célula
        cm.imprimirTabuleiro();

        expect(cm.tabuleiro[0][0]).toEqual(valorAnterior); // Verifica se o valor foi mantido igual
    });
}); 
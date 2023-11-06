const { CampoMinado } = require("../minesweeper");

describe('CampoMinado', () => {
  let cm;

  beforeEach(() => {
    cm = new CampoMinado(8, 8, 10);
  });

  it('deve abrir uma célula corretamente', () => {
    const rl = { close: jest.fn() }; 
    const consoleSpy = jest.spyOn(console, 'log');

    cm.jogar(0, 0, rl, cm);

    expect(cm.tabuleiro[0][0]).not.toBe(0);
  });
});
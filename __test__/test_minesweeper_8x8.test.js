const { CampoMinado } = require('../minesweeper');

describe('CampoMinado', () => {
  test('deve criar o campo minado 8x8 com 10 bombas(minas)', () => {
    const cm = new CampoMinado(8, 8, 10);
    expect(cm.linhas).toBe(8);
    expect(cm.colunas).toBe(8);
    expect(cm.numMinas).toBe(10);
  });
});
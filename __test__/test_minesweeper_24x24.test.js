const { CampoMinado } = require('../minesweeper');

describe('CampoMinado', () => {
  test('deve criar o campo minado 24x24 com 100 minas', () => {
    const cm = new CampoMinado(10, 16, 30);
    expect(cm.linhas).toBe(10);
    expect(cm.colunas).toBe(16);
    expect(cm.numMinas).toBe(30);
  });
});
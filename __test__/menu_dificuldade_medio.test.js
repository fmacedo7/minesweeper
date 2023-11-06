const { menuDificuldade } = require('../minesweeper');
const util = require('util');
const mockedMenuDificuldade = jest.spyOn(console, 'log');

describe('Menu', () => {
  test('deve exibir o menu de dificuldade corretamente', () => {
    menuDificuldade();
    expect(util.format(mockedMenuDificuldade.mock.calls[2][0])).toBe('2. Médio (8x8, 15 minas)');
  });
});
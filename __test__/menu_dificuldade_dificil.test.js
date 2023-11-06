const { menuDificuldade } = require('../minesweeper');
const util = require('util');
const mockedMenuDificuldade = jest.spyOn(console, 'log');

describe('Menu', () => {
  test('deve exibir o menu de dificuldade corretamente', () => {
    menuDificuldade();
    expect(util.format(mockedMenuDificuldade.mock.calls[3][0])).toBe('3. Difícil (10x10, 25 minas)');
  });
});
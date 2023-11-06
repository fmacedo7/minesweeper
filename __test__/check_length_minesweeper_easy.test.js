const { CampoMinado } = require("../minesweeper");

test('Verifica se um campo minado 8x8 é gerado ao selecionar a opção fácil', () => {
    const cmFacil = new CampoMinado(8, 8, 10);
    cmFacil.gerarMinas();

    expect(cmFacil.linhas).toBe(8);
    expect(cmFacil.colunas).toBe(8);
    expect(cmFacil.tabuleiro.length).toBe(8);
    expect(cmFacil.tabuleiro[0].length).toBe(8);
});
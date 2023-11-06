const { CampoMinado } = require("../minesweeper");

describe('Coordenadas', () => {
    test('Verifica se os índices das colunas e linhas foram criados com sucesso', () => {
        const cm = new CampoMinado(5, 5, 5);
        expect(cm.tabuleiro.length).toEqual(5); // Verifica se o número de linhas é 5
        for (let i = 0; i < cm.linhas; i++) {
            expect(cm.tabuleiro[i].length).toEqual(5); // Verifica se o número de colunas é 5 para cada linha
        }
    });
});
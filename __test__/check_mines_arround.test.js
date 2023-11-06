const { test } = require("jest-circus");
const { CampoMinado } = require("../minesweeper");

test("Verifica se a função contarMinasVizinhas conta as minas vizinhas corretamente", () => {
    const cm = new CampoMinado(8, 8, 0); // Tamanho 5x5 com 5 minas
    cm.tabuleiro = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const result1 = cm.contarMinasVizinhas(0, 0); // Deve retornar 0
    const result2 = cm.contarMinasVizinhas(0, 1); // Deve retornar 3
    const result3 = cm.contarMinasVizinhas(0, 4); // Deve retornar 0
    const result4 = cm.contarMinasVizinhas(0, 6); // Deve retornar 0
    const result5 = cm.contarMinasVizinhas(0, 7); // Deve retornar 0

    expect(result1).toBe(0);
    expect(result2).toBe(0);
    expect(result3).toBe(0);
    expect(result3).toBe(0);
    expect(result4).toBe(0);
    expect(result5).toBe(0);
});

test('', () => {
    
})
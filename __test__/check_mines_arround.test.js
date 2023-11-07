// const { test } = require("jest-circus");
const { CampoMinado } = require("../minesweeper");

test("Verifica se a função de contagem de minas vizinhas está correta", () => {
    const cm = new CampoMinado(3, 3, 3);
    cm.tabuleiro = [
        [-1, 0, 0],
        [0, -1, 0],
        [0, 0, -1]
    ];

    expect(cm.contarMinasVizinhas(0, 0)).toBe(2);
    expect(cm.contarMinasVizinhas(0, 1)).toBe(2);
    expect(cm.contarMinasVizinhas(0, 2)).toBe(1);
    expect(cm.contarMinasVizinhas(1, 0)).toBe(2);
    expect(cm.contarMinasVizinhas(1, 1)).toBe(3);
    expect(cm.contarMinasVizinhas(1, 2)).toBe(2);
    expect(cm.contarMinasVizinhas(2, 0)).toBe(1);
    expect(cm.contarMinasVizinhas(2, 1)).toBe(2);
    expect(cm.contarMinasVizinhas(2, 2)).toBe(2);
});

test("Verifica contagem de minas", () => {
    const cm = new CampoMinado(3, 3, 3);
    cm.tabuleiro = [
        [-1, -1, -1],
        [-1, 0, -1],
        [-1, -1, -1]
    ];

    expect(cm.contarMinasVizinhas(1, 1)).toBe(8);
});

test("Verifica contagem de minas", () => {
    const cm = new CampoMinado(3, 3, 3);
    cm.tabuleiro = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ];

    expect(cm.contarMinasVizinhas(1, 1)).toBe(9);
});
// const { test } = require("jest-circus");
const { CampoMinado } = require("../minesweeper");

test("Verifica coordenadas invalidas", () => {
    const cm = new CampoMinado(8, 8, 10);

    // Coordenadas inválidas (não numéricas)
    expect(() => cm.validarCoordenadas("A", 0)).toThrow('Coordenadas inválidas');
    expect(() => cm.validarCoordenadas(0, "B")).toThrow('Coordenadas inválidas');

});

test("Verifica coordenadas fora dos limites do tabuleiro", () => {
    const cm = new CampoMinado(8, 8, 10);

    // Coordenadas fora dos limites do tabuleiro
    expect(() => cm.validarCoordenadas(-1, 0)).toThrow('Coordenadas inválidas');
    expect(() => cm.validarCoordenadas(0, -1)).toThrow('Coordenadas inválidas');
    expect(() => cm.validarCoordenadas(8, 0)).toThrow('Coordenadas inválidas');
    expect(() => cm.validarCoordenadas(0, 8)).toThrow('Coordenadas inválidas');
});

test("Verifica coordenadas válidas", () => {
    const cm = new CampoMinado(8, 8, 10);

    // Coordenadas válidas
    expect(() => cm.validarCoordenadas(0, 0)).not.toThrow();
    expect(() => cm.validarCoordenadas(7, 7)).not.toThrow();
})
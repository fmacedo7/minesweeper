const { CampoMinado, encontrarCoordenadasMina } = require("../minesweeper");

describe('Jogador perdeu', () => {
    test('Verifica se o jogador perdeu o jogo', () => {
        const rl = { close: jest.fn() };
        const cm = new CampoMinado(5, 5, 5);
        cm.gerarMinas();
        const coordenadasMina = encontrarCoordenadasMina(cm.tabuleiro);
        const [x, y] = coordenadasMina;
        cm.jogar(x, y, rl, cm);
    
        expect(cm.jogoContinua).toBeFalsy(); // Verifica se o jogo foi encerrado
    });
});
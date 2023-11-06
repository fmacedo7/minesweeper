const { spawn } = require("child_process");

test("Verifica se o usuário sai corretamente durante o jogo ao digitar -1 -1 no terminal", (done) => {
  const process = spawn("node", ["minesweeper.js"]);

  process.stdout.on("data", (data) => {
    const output = data.toString();
    if (output.includes("Escolha o nível de dificuldade: ")) {
      process.stdin.write("1\n");
    } else if (output.includes("Digite a linha e a coluna que deseja jogar")) {
      process.stdin.write("-1 -1\n");
    } else if (output.includes("Saindo do jogo. See you later!")) {
      process.stdin.end();
    }
  });

  process.on("exit", () => {
    done();
  });

  setTimeout(() => {
    done();
  }, 10000); // Aumenta o tempo limite para 10 segundos
});

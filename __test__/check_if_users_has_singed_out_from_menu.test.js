const { spawn } = require("child_process");

test("Verifica se o usuário sai corretamente ao digitar -1 -1 no terminal", (done) => {
  const process = spawn("node", ["minesweeper.js"]);
  process.stdin.write("0\n");

  process.stdout.on("data", (data) => {
    const output = data.toString();
    if (output.includes("Saindo do jogo. See you later!")) {
      done();
    }
  });
});
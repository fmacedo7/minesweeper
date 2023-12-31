# Campo Minado

Um jogo clássico de campo minado implementado em JavaScript para o terminal.

## Descrição

Este é um projeto simples que implementa um jogo popular, campo minado, para o terminal. Ele oferece a funcionalidade básica do campo minado, permitindo que os jogadores abram células no tabuleiro e evitem as minas ocultas. O jogo foi projetado para ser executado no terminal e oferece diferentes níveis de dificuldade para os jogadores desfrutarem.

## Objetivo

O objetivo deste projeto é fornecer uma implementação funcional e interativa do jogo de campo minado.

## Pré-requisitos

Este projeto requer o Node.js para ser executado. Certifique-se de ter o Node.js instalado em seu sistema antes de executar o jogo. Bem como da biblioteca PKG para criar um executável.

## Como usar

Para jogar o campo minado, siga estas etapas:

1. Clone este repositório em sua máquina local.
2. Navegue até o diretório do projeto.
3. Execute o comando `node minesweeper.js` para iniciar o jogo.
4. Siga as instruções no terminal para selecionar o nível de dificuldade e jogar o jogo.

Para criar um executável, siga estas etapas:

*Assumindo que voce já tenha o PKG.

1. Se estive usando windows execute este comando (temporario) no powershell para evitar erros relacionado com as políticas de execução de scripts em seu sistema. `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
`;

2. Digite o comando para criar um executavel: `pkg minesweeper.js`, esse comando cria 3 executaveis para os sistemas Linux, Windows e macOS.

3. Para mais informações sobre o PKG clique [aqui](https://www.npmjs.com/package/pkg).

## Contribuir

Se você deseja contribuir para este projeto, sinta-se à vontade para abrir problemas e enviar solicitações de pull no repositório do GitHub.

## Tarefas em aberto

- Melhorar a aparência do tabuleiro no terminal;
- Adicionar mais opções de personalização e configurações;
- Implementar a abertura de celulas em cadeia;
- Remover bugs de terminal;
- Implementar mais testes;
- Criar uma interface gráfica.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para mais detalhes.
"use strict";

const Player = (letter) => {
    const getLetter = () => letter;
  return {getLetter};
}; 

const gameBoard = (() => {
  //reset(), set(position, letter), checkForWin(letter), get value(return board array)
  const board = ["", "", "", "", "", "", "", "", ""];

  const set = (position, letter) => {
    board[position] = letter;
  }
  
  const reset = () => {
    for (let i=0; i<board.length; i++) {
      board[i]="";
    }

  }

  const getBoard = () => board;
  return {reset, set, getBoard}
})();

const displayController = () => {
  const buttons = document.querySelectorAll("[square]");
  const winnerMsg = document.getElementById("winner");
  const resetbtn = document.getElementById("reset-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.textContent !=="" || gameController.getIsOver()) return;
      gameController.playRound(button.id-1)
      updateBoard(gameBoard.getBoard())
      
      
    })
  });
  
  const updateBoard = (gameboard) => {
    for (let i=0; i<gameboard.length; i++) {
      buttons[i].textContent=gameboard[i]
    }
  }

  resetbtn.addEventListener("click", () => {
    gameBoard.reset();
    updateBoard(gameBoard.getBoard());
    gameController.reset();
    playingMsg(gameController.currentPlayer())
  })

  const winMsg = (player) => {
    winnerMsg.textContent="Winner: " + player;
  }

  const drawMsg = (player) => {
    winnerMsg.textContent="Draw!";
  }

  const playingMsg = (player) => {
    winnerMsg.textContent=player+"'s turn"
  }

  return {winMsg, drawMsg, playingMsg};
};

const gameController = (() => {
  //addPlayer(player), currentPlayer(expose current player gettters), board(expose board functionality)
  const playerx = Player("X");
  const playero = Player("O");
  let round = 1;
  let isOver = false;
  let board = gameBoard.getBoard()

  const getIsOver = () => isOver;

  const currentPlayer = () => {
    if (round%2===1) {
      return playero.getLetter();
    } else {
      return playerx.getLetter();
    }
  }

  const playRound = (position) => {
    gameBoard.set(position, currentPlayer());
    console.log(gameBoard.getBoard());
    console.log(currentPlayer(), round, checkWinner(position))
    if (checkWinner()) {
      isOver = true;
      displayController().winMsg(currentPlayer());
    }
    if (round===9 && isOver===false) {
      isOver = true;
      displayController().drawMsg();
    }
    round++
    if (isOver===false) {
      displayController().playingMsg(currentPlayer())
    }

  }

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i <= 7; i++) {
      const winCondition = winConditions[i];
      let a = board[winCondition[0]];
      let b = board[winCondition[1]];
      let c = board[winCondition[2]];
      if (a === '' || b === '' || c === '') {
          continue;
      }
      if (a === b && b === c) {
          return true;
          break
      }
    }
  }

  const reset = () => {
    round = 1
    isOver = false;
  }

  return {playRound, getIsOver, reset, currentPlayer};
})();

displayController();

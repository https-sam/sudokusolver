var solveSudoku = function (board: string[][]) {
  return solver(board);
};

const solver = (board: string[][]) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === "") {
        let char = "1";
        while (+char <= 9) {
          if (isValidSudoku(i, j, board, char)) {
            board[i][j] = char;
            if (solver(board)) {
              return board;
            } else {
              board[i][j] = "";
            }
          }
          char = (+char + 1).toString();
        }
        return false;
      }
    }
  }
  return board;
};

const isValidSudoku = (
  row: number,
  col: number,
  board: string[][],
  char: string
) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] == char) {
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (board[i][col] == char) {
      return false;
    }
  }

  const x = ~~(row / 3) * 3;
  const y = ~~(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[x + i][y + j] == char) {
        return false;
      }
    }
  }

  return true;
};

export default solveSudoku;

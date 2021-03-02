import { getRandomNumber } from '../utils';
import { Coords, IBoard, Board, Cell } from '../constants';

export const createBoard = (size: number): Board  => {
  const board: Cell[][] = [];
  let id: number = 0;

  for (let i = 0; i < size; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < size; j++) {
      row.push({
        id: id++,
        isOpen: false,
        isFlag: false,
        isMine: false,
        adjacentMines: 0,
      })
    }

    board.push(row);
  }

  return board;
}

export const generateMines = (board: Board, level: IBoard, coords: Coords): void => {
  const { size, mines } = level;
  let i = 0;

  while (i < mines) {
    const x = getRandomNumber({ max: size - 1 });
    const y = getRandomNumber({ max: size - 1 });
    const cell = board[y][x];
    const isStartCell = x === coords.x && y === coords.y;
    const ignoreCell = cell.isMine || isStartCell;

    if (!ignoreCell) {
      cell.isMine = true;
      i += 1;
    }
  }
};

export const getAdjacentCoords = (board: Board, { x, y }: Coords): Coords[] => {
  return [
    { x: x - 1, y: y - 1 },
    { x, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y },
    { x: x + 1, y },
    { x: x - 1, y: y + 1 },
    { x, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ].filter((coords) => board[coords.y]?.[coords.x] != null);
};

export const getAdjacentCells = (board: Board, coords: Coords): Cell[] => {
  const adjacentCellsCoordinates = getAdjacentCoords(board, coords);

  return adjacentCellsCoordinates.map(({ x, y }) => board[y][x]);
};

export const countAdjacentCells = (board: Board): void => {
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.isMine) return;

      const adjacentMines = getAdjacentCells(board, { x, y }).filter(
        ({ isMine }) => isMine
      ).length;

      cell.adjacentMines = adjacentMines;
    });
  });
};

export const openCell = (board: Board, { x, y }: Coords, checked: boolean[][] = []): boolean => {
  const cell = board[y][x];
  cell.isOpen = true;

  if (checked[y] == null) checked[y] = [];
  if (checked[y][x]) return true;
  checked[y][x] = true;

  if (cell.isMine) return false;

  if (cell.adjacentMines === 0) {
    const adjacentCoords = getAdjacentCoords(board, { x, y });

    adjacentCoords.forEach((coords) => openCell(board, coords, checked));
  }

  return true;
};

export const checkWin = (board: Board, level: IBoard): boolean => {
  const mines = level.mines;

  const closedCells = board.flat().filter((cell) => !cell.isOpen);

  return (
    closedCells.length === mines && closedCells.every(({ isMine }) => isMine)
  );
};

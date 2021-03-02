export const difficultyLevels = ['EASY', 'MEDIUM', 'HERO'] as const;

export type Difficulty = typeof difficultyLevels[number];

export interface IBoard {
  size: number;
  mines: number;
}

export const BOARD: Readonly<Record<Difficulty, IBoard>> = Object.freeze({
  EASY: { size: 9, mines: 10 },
  MEDIUM: { size: 16, mines: 40 },
  HERO: { size: 30, mines: 99 },
});

export interface Coords {
  x: number;
  y: number;
}

export type GameStatus = 'start' | 'playing' | 'win' | 'lose';

export interface Cell {
  readonly id: number;
  isOpen: boolean;
  isFlag: boolean;
  isMine: boolean;
  adjacentMines: number;
}

export type Board = Cell[][];

export interface BoardState {
  status: GameStatus;
  board: Board;
  level: IBoard;
}

export interface IViewState {
  mines: number;
  time: number;
}

export interface IResult {
  date: Date;
  status: string;
  time: number;
}

import { ShipOrientation } from "@/app/components/Ship/Ship";
import { NO_SHIP } from "@/app/constants";
import { Matrix, Position } from "@/app/contexts/BattleshipContext";

export const generateSquareMatrix = (size: number) => {
  const rows = Array(size).fill(0);
  const matrix = Array.from({ length: size }, () => rows);
  return matrix;
};

export const isAShip = (pos: number) => {
  return !NO_SHIP.includes(pos);
};

export const hasNeighbors = (matrix: Matrix, row: number, col: number) => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Check left neighbor
  if (col > 0 && isAShip(matrix[row][col - 1])) {
    return true;
  }

  // Check right neighbor
  if (col < numCols - 1 && isAShip(matrix[row][col + 1])) {
    return true;
  }

  // Check above neighbor
  if (row > 0 && isAShip(matrix[row - 1][col])) {
    return true;
  }

  // Check below neighbor
  if (row < numRows - 1 && isAShip(matrix[row + 1][col])) {
    return true;
  }

  return false;
};

export const generateRandomPosition = () => {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  const len = Math.floor(Math.random() * (5 - 2 + 1)) + 2;

  return {
    position: [x, y] as Position,
    shipLength: len,
    orientation: "vertical",
  };
};

export const getMatrixPointsList = (size: number, shuffle?: boolean) => {
  const list = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      list.push([x, y]);
    }
  }
  return shuffle ? list.sort((a, b) => 0.5 - Math.random()) : list;
};

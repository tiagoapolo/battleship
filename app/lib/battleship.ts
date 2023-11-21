import { ShipOrientation } from "@/app/components/Ship/Ship";
import { Matrix, Position } from "@/app/contexts/BattleshipContext";
import { generateRandomPosition, hasNeighbors, isAShip } from "@/app/utils";

export const hasShip = (
  matrix: Matrix,
  position: Position,
  shipLength?: number,
  shipOrientation?: ShipOrientation
) => {
  const x = position[0];
  const y = position[1];

  if (isAShip(matrix[y][x])) {
    return true;
  }

  if (shipLength && shipOrientation) {
    const startingIndex = shipOrientation === "horizontal" ? x : y;
    const maxLength =
      shipOrientation === "horizontal" ? matrix[y].length : matrix.length;
    const endingPos = startingIndex + shipLength;

    let isShip = false;
    for (
      let index = startingIndex;
      index < maxLength && index < endingPos;
      index++
    ) {
      if (shipOrientation === "horizontal" && hasNeighbors(matrix, y, index)) {
        isShip = true;
        break;
      }

      if (shipOrientation === "vertical" && hasNeighbors(matrix, index, x)) {
        isShip = true;
        break;
      }
    }

    return isShip;
  }

  return false;
};

export const getUpdateMatrixWithShip = (
  matrix: Matrix,
  shipPos: Position,
  shipLength: number,
  shipOrientation: ShipOrientation
) => {
  if (hasShip(matrix, shipPos, shipLength, shipOrientation)) {
    return;
  }

  const clonedMatrix = matrix.map((row) => [...row]);
  const x = shipPos[0];
  const y = shipPos[1];

  const startingIndex = shipOrientation === "horizontal" ? x : y;
  const endingPos = startingIndex + shipLength;

  const maxLength =
    shipOrientation === "horizontal"
      ? clonedMatrix[y].length
      : clonedMatrix.length;

  if (endingPos > maxLength) {
    return;
  }

  for (
    let index = startingIndex;
    index < maxLength && index < endingPos;
    index++
  ) {
    if (shipOrientation === "horizontal") {
      clonedMatrix[y][index] = shipLength;
    } else {
      clonedMatrix[index][x] = shipLength;
    }
  }

  return clonedMatrix;
};

export const getUpdateMatrixWithShot = (matrix: Matrix, shipPos: Position) => {
  const clonedMatrix = matrix.map((row) => [...row]);
  const x = shipPos[0];
  const y = shipPos[1];

  if ([-1, -2].includes(clonedMatrix[y][x])) {
    return { matrix: clonedMatrix, isHit: false };
  }

  if (hasShip(clonedMatrix, shipPos)) {
    clonedMatrix[y][x] = -1;
    return { matrix: clonedMatrix, isHit: true };
  }

  clonedMatrix[y][x] = -2;

  return { matrix: clonedMatrix, isHit: false };
};

export const generateEnemyBoats = (matrix: Matrix, minPoints: number) => {
  let clonedMatrix = matrix.map((row) => [...row]);
  let points = 0;

  while (points < minPoints) {
    const { position, shipLength, orientation } = generateRandomPosition();

    const updated = getUpdateMatrixWithShip(
      clonedMatrix,
      position as Position,
      shipLength,
      orientation as ShipOrientation
    );

    if (updated) {
      clonedMatrix = updated;
      points = points + shipLength;
    }
  }

  return {
    matrix: clonedMatrix,
    points,
  };
};

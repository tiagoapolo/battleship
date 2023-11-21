"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from "react";
import { ShipOrientation } from "@/app/components/Ship/Ship";
import { generateSquareMatrix, getMatrixPointsList } from "@/app/utils";
import {
  getUpdateMatrixWithShip,
  getUpdateMatrixWithShot,
  generateEnemyBoats,
} from "@/app/lib/battleship";
import { GAME_STATUS } from "@/app/constants";

type Matrix = number[][];
type Position = [x: number, y: number];

interface BattleshipContextProps {
  playerMap: Matrix;
  enemyMap: Matrix;
  enemyScore: number;
  playerScore: number;
  setPlayerShip: (
    shipPos: Position,
    shipLength: number,
    shipOrientation: ShipOrientation
  ) => void;

  playerShot: (position: Position) => void;
  enemyShot: () => void;
  resetMap: () => void;
  startGame: () => void;
  hasGameStarted: boolean;
  gameStatus: GAME_STATUS;
}

const BattleshipContext = createContext<BattleshipContextProps | undefined>(
  undefined
);

const useBattleship = () => {
  const context = useContext(BattleshipContext);
  if (!context) {
    throw new Error("useBattleship must be used within a BattleshipProvider");
  }
  return context;
};

interface BattleshipProviderProps {
  children: ReactNode;
  boardSize: number;
}

const BattleshipProvider: React.FC<BattleshipProviderProps> = ({
  children,
  boardSize,
}) => {
  const [playerMatrix, setPlayerMatrix] = useState<Matrix>(
    generateSquareMatrix(boardSize)
  );
  const [enemyMatrix, setEnemyMatrix] = useState<Matrix>(
    generateSquareMatrix(boardSize)
  );

  const [enemyShootingPositions, setEnemyShootingPositions] = useState(
    getMatrixPointsList(boardSize, true)
  );

  const [playerTotalPoints, setTotalPlayerPoints] = useState(0);
  const [enemyTotalPoints, setTotalEnemyPoints] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [enemyScore, setEnemyScore] = useState(0);

  const [hasGameStarted, setGameStarted] = useState(false);

  React.useEffect(() => {
    const { matrix, points } = generateEnemyBoats(enemyMatrix, 10);
    setEnemyMatrix(matrix);
    setTotalEnemyPoints(points);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPlayerShip = (
    shipPos: Position,
    shipLength: number,
    shipOrientation: ShipOrientation
  ) => {
    if (!playerMatrix) {
      return;
    }

    const updated = getUpdateMatrixWithShip(
      playerMatrix,
      shipPos,
      shipLength,
      shipOrientation
    );

    if (updated) {
      setPlayerMatrix(updated);
      setTotalPlayerPoints(playerScore + shipLength);
    }
  };

  const playerShot = (position: Position) => {
    if (!enemyMatrix) {
      return;
    }

    const { matrix, isHit } = getUpdateMatrixWithShot(enemyMatrix, position);

    if (isHit) {
      setPlayerScore(playerScore + 1);
    }

    setEnemyMatrix(matrix);
  };
  const enemyShot = () => {
    if (!playerMatrix) {
      return;
    }

    const position = enemyShootingPositions.pop();
    if (!position) {
      return;
    }

    const { matrix, isHit } = getUpdateMatrixWithShot(
      playerMatrix,
      position as Position
    );
    setPlayerMatrix(matrix);

    if (isHit) {
      setEnemyScore(enemyScore + 1);
    }
  };

  const resetMap = () => {
    setGameStarted(false);

    const { matrix, points } = generateEnemyBoats(
      generateSquareMatrix(boardSize),
      10
    );
    setEnemyMatrix(matrix);
    setEnemyScore(0);
    setTotalEnemyPoints(points);

    setPlayerMatrix(generateSquareMatrix(boardSize));
    setPlayerScore(0);
    setTotalPlayerPoints(0);

    setEnemyShootingPositions(getMatrixPointsList(boardSize, true));
  };

  const gameStatus = useMemo(() => {
    if (
      hasGameStarted &&
      (enemyTotalPoints === playerScore || playerTotalPoints === enemyScore)
    ) {
      return GAME_STATUS.GAME_ENDED;
    }

    if (hasGameStarted && enemyTotalPoints > 0 && playerTotalPoints > 0) {
      return GAME_STATUS.GAME_STARTED;
    }

    if (!hasGameStarted && enemyTotalPoints > 0 && playerTotalPoints > 0) {
      return GAME_STATUS.GAME_READY;
    }

    return GAME_STATUS.GAME_NOT_READY;
  }, [
    enemyScore,
    hasGameStarted,
    playerScore,
    enemyTotalPoints,
    playerTotalPoints,
  ]);

  return (
    <BattleshipContext.Provider
      value={{
        playerMap: playerMatrix,
        enemyMap: enemyMatrix,
        resetMap,
        setPlayerShip,
        playerShot,
        enemyShot,
        enemyScore,
        playerScore,
        startGame: () => setGameStarted(true),
        hasGameStarted,
        gameStatus,
      }}
    >
      {children}
    </BattleshipContext.Provider>
  );
};

export type { Matrix, Position };
export { BattleshipProvider, useBattleship };

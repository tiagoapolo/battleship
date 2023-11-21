"use client";
import React, { useEffect, useState } from "react";
import { useBattleship } from "@/app/contexts/BattleshipContext";
import { ShipOrientation } from "@/app/components/Ship/Ship";
import { BoardRow } from "@/app/components/BoardRow/BoardRow";
import { GAME_STATUS } from "@/app/constants";

const GameBoard = () => {
  const {
    playerMap,
    enemyMap,
    setPlayerShip,
    playerShot,
    enemyShot,
    gameStatus,
    enemyScore,
    playerScore,
    hasGameStarted,
  } = useBattleship();

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (gameStatus === GAME_STATUS.GAME_NOT_READY) {
      return setMessage("");
    }

    if (gameStatus === GAME_STATUS.GAME_ENDED && playerScore > enemyScore) {
      return setMessage("YOU WIN!");
    }

    if (gameStatus === GAME_STATUS.GAME_ENDED && playerScore < enemyScore) {
      return setMessage("YOU LOSE!");
    }
  }, [hasGameStarted, enemyScore, playerScore]);

  const handleClick = (colPos: number, rowPos: number) => {
    playerShot([rowPos, colPos]);
    enemyShot();
  };

  const handleDrop = (
    rowPos: number,
    colPos: number,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    const data = e.dataTransfer.getData("text");
    if (!data) {
      return;
    }

    const [orientation, length] = data.split("-");
    setPlayerShip(
      [rowPos, colPos],
      Number(length),
      orientation as ShipOrientation
    );
  };

  return (
    <div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col m-2">
          <p className="text-center">Your Board</p>
          {playerMap.map((rowArr, colPos) => (
            <BoardRow
              rowArr={rowArr}
              key={`col-player-${colPos}`}
              onDrop={(rowPos, e) => {
                handleDrop(rowPos, colPos, e);
              }}
            />
          ))}
          <p className="text-center">Player Score: {playerScore}</p>
        </div>
        <div className="flex flex-col m-2">
          <p className="text-center">Enemy Board</p>
          {enemyMap.map((rowArr, index) => (
            <BoardRow
              rowArr={rowArr}
              key={`col-enemy-${index}`}
              onClick={(rowPos) => handleClick(index, rowPos)}
              hideShips
              disabled={gameStatus !== GAME_STATUS.GAME_STARTED}
            />
          ))}
          <p className="text-center">Enemy Score: {enemyScore}</p>
        </div>
      </div>
      <p className="text-center mb-2">{message}</p>
    </div>
  );
};

export default GameBoard;

"use client";
import React, { useState } from "react";
import { Ship } from "@/app/components/Ship/Ship";
import { useBattleship } from "@/app/contexts/BattleshipContext";
import { GAME_STATUS } from "@/app/constants";

type ShipSelectorProps = {};

const ShipSelector = ({}: ShipSelectorProps) => {
  const [isHorizontal, setHorizontal] = useState(false);
  const { startGame, hasGameStarted, resetMap, gameStatus } = useBattleship();

  const orientation = isHorizontal ? "horizontal" : "vertical";
  const flexOrientation = isHorizontal ? "flex-col" : "flex-row";
  const spacingOrientation = isHorizontal ? "space-y-2" : "space-x-2";

  return (
    <div className="bg-gray-100 h-fit w-52	 p-4 rounded-lg">
      {!hasGameStarted && (
        <div
          className={`ship-selector flex ${flexOrientation} ${spacingOrientation} my-4`}
        >
          <Ship size="5" orientation={orientation} />
          <Ship size="4" orientation={orientation} />
          <Ship size="3" orientation={orientation} />
          <Ship size="2" orientation={orientation} />
        </div>
      )}
      {!hasGameStarted && (
        <button
          className="btn btn-neutral w-full"
          onClick={() => setHorizontal(!isHorizontal)}
        >
          Rotate Ships
        </button>
      )}
      {!hasGameStarted && (
        <button
          className="btn btn-success w-full mt-2"
          onClick={() => startGame()}
          disabled={gameStatus !== GAME_STATUS.GAME_READY}
        >
          Start Game
        </button>
      )}
      {hasGameStarted && (
        <button
          className="btn btn-primary w-full mt-2"
          onClick={() => resetMap()}
        >
          Reset Game
        </button>
      )}
    </div>
  );
};

export default ShipSelector;

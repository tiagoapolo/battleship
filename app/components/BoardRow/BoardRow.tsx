import React, { useEffect, useState } from "react";
import { shipColorOptions } from "@/app/components/Ship/Ship";
import SquareSize from "@/app/components/SquareSize/SquareSize";
import { HIT_COLOR, MISSED_COLOR } from "@/app/constants";

const enemyColorOptions = {
  "-1": HIT_COLOR,
  "-2": MISSED_COLOR,
};

const playerColorOptions = {
  ...shipColorOptions,
  ...enemyColorOptions,
};

type EnemyColorOptions = keyof typeof enemyColorOptions;

type BoardRowProps = {
  onDrop?: (rowPos: number, e: React.DragEvent<HTMLDivElement>) => void;
  onClick?: (rowPos: number) => void;
  hideShips?: boolean;
  disabled?: boolean;
  rowArr: number[];
};

const BoardRow = ({
  rowArr,
  onDrop,
  onClick,
  hideShips,
  disabled,
}: BoardRowProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (rowPos: number, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop?.(rowPos, e);
  };

  const colors = hideShips ? enemyColorOptions : playerColorOptions;

  return (
    <div className="flex flex-row">
      {rowArr.map((value, index) => (
        <SquareSize
          key={`row-${index}`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(index, e)}
          onClick={() => !disabled && onClick?.(index)}
          className={`flex border-white-500 border border-solid ${
            colors[String(value) as EnemyColorOptions] ?? ""
          }`}
        />
      ))}
    </div>
  );
};

export { BoardRow };

"use client";
import React from "react";
import "@/app/components/Ship/Ship.css";
import SquareSize from "@/app/components/SquareSize/SquareSize";
import "./Ship.css";
import {
  SHIP_SIZE_2_COLOR,
  SHIP_SIZE_3_COLOR,
  SHIP_SIZE_4_COLOR,
  SHIP_SIZE_5_COLOR,
} from "@/app/constants";

type ShipOrientation = "vertical" | "horizontal";

type ShipProps = {
  size: "5" | "4" | "3" | "2";
  orientation?: ShipOrientation;
};

export const shipColorOptions = {
  "5": SHIP_SIZE_5_COLOR,
  "4": SHIP_SIZE_4_COLOR,
  "3": SHIP_SIZE_3_COLOR,
  "2": SHIP_SIZE_2_COLOR,
};

const Ship = ({ size, orientation = "vertical" }: ShipProps) => {
  const flexOrientation =
    orientation === "horizontal" ? "flex-row" : "flex-col";

  const mappedSize = Array.from(Array(Number(size)).keys());

  const handleDragStart = (
    shipLength: string,
    shipOrientation: ShipOrientation,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.dataTransfer.setData("text", `${shipOrientation}-${shipLength}`);
  };

  return (
    <div
      className={`flex ${flexOrientation} w-fit h-fit`}
      draggable
      onClick={() => console.log("clicked")}
      onDragStart={(e) => handleDragStart(size, orientation, e)}
    >
      {mappedSize.map((_, index) => (
        <SquareSize
          key={`ship-${size}-${index}-${orientation}`}
          className={shipColorOptions[size]}
        />
      ))}
    </div>
  );
};

export type { ShipProps, ShipOrientation };
export { Ship };

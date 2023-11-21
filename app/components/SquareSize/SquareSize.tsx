"use client";
import React from "react";
import "@/app/components/Ship/Ship.css";
import { twMerge } from "tailwind-merge";

interface SquareSizeProps extends React.HTMLAttributes<HTMLDivElement> {}

const SquareSize = ({ className, ...rest }: SquareSizeProps) => {
  return (
    <div
      className={twMerge(`bg-blue-500 w-9 h-9 ${className ?? ""}`)}
      {...rest}
    />
  );
};

export default SquareSize;

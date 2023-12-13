import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Ship, ShipProps } from "./Ship";

describe("Ship", () => {
  it.each([2, 3, 4, 5])(
    "renders SquareSize components based on the given size: %s",
    (size) => {
      const { getAllByTestId } = render(
        <Ship size={String(size) as ShipProps["size"]} />
      );

      expect(getAllByTestId("square-size")).toHaveLength(size);
    }
  );
});

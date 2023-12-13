import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SquareSize from "./SquareSize";

describe("SquareSize", () => {
  it("renders component", () => {
    const { getByTestId } = render(<SquareSize />);
    expect(getByTestId("square-size")).toBeInTheDocument();
  });

  it("merges additional styles with default styles", () => {
    const { getByTestId } = render(<SquareSize className="additional-class" />);
    expect(getByTestId("square-size")).toHaveClass(
      "bg-blue-500 w-9 h-9 additional-class"
    );
  });

  it("applies custom styles when provided", () => {
    const customStyle = { background: "red", width: "12px", height: "12px" };
    const { getByTestId } = render(<SquareSize style={customStyle} />);
    expect(getByTestId("square-size")).toHaveStyle(customStyle);
  });
});

import React, { useEffect, useState } from "react";
import "../App.css";

const GRID_ROWS = 15;
const GRID_COLS = 20;
const TEXT = "Hello";

const LETTER_PATTERNS = {
  H: [
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  ],
  e: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
  ],
  l: [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ],
  o: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
  ],
};

const createBlankGrid = () => {
  return Array(GRID_ROWS)
    .fill(null)
    .map(() => Array(GRID_COLS).fill(0));
};

const CELL_SPACING = 2;

const VERTICAL_OFFSET = 0;

const WORD_WIDTH = TEXT.split("").reduce((width, letter) => {
  return width + LETTER_PATTERNS[letter][0].length + CELL_SPACING;
}, 0);

export default function HelloGrid({ isHalted }) {
  const [grid, setGrid] = useState(createBlankGrid());
  const [color, setColor] = useState("#ff0000");
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      const hue = (Date.now() / 20) % 360;
      setColor(`hsl(${hue}, 100%, 50%)`);
    }, 2000);

    return () => clearInterval(colorInterval);
  }, []);

  const addHelloToGrid = () => {
    const newGrid = createBlankGrid();
    const positions =
      position < 0 ? [position, position + WORD_WIDTH + GRID_COLS] : [position];

    positions.forEach((startPosition) => {
      let startCol = startPosition;

      for (let letter of TEXT) {
        const pattern = LETTER_PATTERNS[letter];
        pattern.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            const gridRow = rowIndex + VERTICAL_OFFSET;
            const gridCol = colIndex + startCol;

            if (
              cell === 1 &&
              gridRow < GRID_ROWS &&
              gridCol < GRID_COLS &&
              gridCol >= 0
            ) {
              newGrid[gridRow][gridCol] = 1;
            }
          });
        });
        startCol += pattern[0].length + CELL_SPACING;
      }
    });

    setGrid(newGrid);
  };

  useEffect(() => {
    if (isHalted) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev <= -WORD_WIDTH) {
          return GRID_COLS;
        }
        return prev - 1;
      });
      addHelloToGrid();
    }, 150);
    return () => clearInterval(interval);
  }, [position, isHalted]);

  return (
    <div className="grid-container">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="grid-cell"
            style={{
              backgroundColor: cell ? color : "#000",
              boxShadow: cell ? `0 0 10px ${color}` : "none",
              transition: "all 0.1s ease",
            }}
          ></div>
        ))
      )}
    </div>
  );
}

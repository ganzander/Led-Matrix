import React, { useState } from "react";
import HelloGrid from "./components/HelloGrid";
import "./App.css";

const App = () => {
  const [isHalted, setIsHalted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStart = () => {
    setIsHalted(false);
    setIsPlaying(true);
  };

  return (
    <div className="app">
      <div className="flex flex-col gap-4">
        <h1 className="text-white text-7xl text-center font-bold uppercase">
          LED MATRIX
        </h1>
        <div className="flex flex-row justify-center gap-4">
          <button
            onClick={handleStart}
            className="button bg-zinc-500 font-semibold rounded-lg text-white px-4 py-1 hover:bg-zinc-800  border"
          >
            START
          </button>
          <button
            onClick={() => location.reload()}
            className="button bg-zinc-500 font-semibold rounded-lg text-white px-4 py-1 hover:bg-zinc-800 border"
          >
            RESET
          </button>
        </div>
      </div>

      <HelloGrid isHalted={isHalted} />
    </div>
  );
};

export default App;

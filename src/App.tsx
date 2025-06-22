import React, { use, useEffect, useState, createContext } from "react";
import { BoardGrid } from "./components/BoardGrid/BoardGrid";
import "./App.css";
import { PlayerStatus } from "./components/PlayerStatus/PlayerStatus";

const PLAYER_1 = "Player 1";
const PLAYER_2 = "Player 2";
const createEmptyBoard = () => [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const winningCombinations = [
  // Horizontal
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  // Vertical
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  // Diagonal
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

export const BoardContext = createContext({
  winner: null as string | null,
  boardData: createEmptyBoard() as string[][],
  onClickHandler: (grid: number[]) => {},
});

function App() {
  const [boardData, setBoardData] = useState<string[][]>(createEmptyBoard());
  const [turn, setTurn] = useState(PLAYER_1);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    // Check for winner
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        boardData[a[0]][a[1]] &&
        boardData[a[0]][a[1]] === boardData[b[0]][b[1]] &&
        boardData[a[0]][a[1]] === boardData[c[0]][c[1]]
      ) {
        setWinner(turn);
        return; // Stop further checks if winner found
      }
    }
    // Check for draw (only if no winner)
    if (boardData.flat().every((cell) => cell !== "")) {
      setWinner("It's a draw!");
    }
    setTurn((prevTurn) => (prevTurn === PLAYER_1 ? PLAYER_2 : PLAYER_1)); // Switch turn
  }, [boardData]);

  const gridClickHandler = (grid: number[]) => {
    if (boardData[grid[0]][grid[1]] == "") {
      boardData[grid[0]][grid[1]] = turn === PLAYER_1 ? "❌" : "🔵";
      setBoardData([...boardData]);
    }
  };

  const resetGame = () => {
    setBoardData(createEmptyBoard());
    setWinner(null);
  };

  const getWinnerText = () => {
    if (!winner) return "";
    if (winner === "It's a draw!") return winner;
    return `${winner} wins!`;
  };

  return (
    <div className="min-h-screen bg-[#0b1339] text-white flex flex-col items-center">
      <header className="flex items-center justify-around w-full p-4 h-15 bg-[#192150]">
        <h1 className="font-mono text-4xl font-bold tracking-wider">
          TIC TAC TOE
        </h1>
        <button
          type="button"
          onClick={resetGame}
          className="border h-8 px-6 rounded text-white hover:bg-white hover:text-[#0d2e5e] transition"
        >
          RESET
        </button>
      </header>

      <main className="flex items-center flex-grow gap-12 mb-6">
        <PlayerStatus player={PLAYER_1} symbol={"❌"} turn={turn} />
        <BoardContext.Provider
          value={{ winner, boardData, onClickHandler: gridClickHandler }}
        >
          <div className="grid grid-cols-3 gap-2">
            <BoardGrid grid={[0, 0]} />
            <BoardGrid grid={[0, 1]} />
            <BoardGrid grid={[0, 2]} />
            <BoardGrid grid={[1, 0]} />
            <BoardGrid grid={[1, 1]} />
            <BoardGrid grid={[1, 2]} />
            <BoardGrid grid={[2, 0]} />
            <BoardGrid grid={[2, 1]} />
            <BoardGrid grid={[2, 2]} />
          </div>
        </BoardContext.Provider>
        <PlayerStatus player={PLAYER_2} symbol={"🔵"} turn={turn} />
      </main>

      <h2 className="mt-6 mb-4 text-2xl font-bold">{getWinnerText()}</h2>
    </div>
  );
}

export default App;

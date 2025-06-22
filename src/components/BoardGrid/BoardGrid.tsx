import { useContext } from "react";
import { BoardContext } from "../../App";

export const BoardGrid = ({ grid }: { grid: number[] }) => {
  const { winner, boardData, onClickHandler } = useContext(BoardContext);
  return (
    <button
      title="board grid"
      type="button"
      onClick={() => onClickHandler(grid)}
      disabled={!!winner || boardData[grid[0]][grid[1]] !== ""}
      className={`w-16 h-16 bg-[#102970] rounded-lg text-3xl font-bold flex items-center justify-center text-white`}
    >
      {boardData[grid[0]][grid[1]]}
    </button>
  );
};

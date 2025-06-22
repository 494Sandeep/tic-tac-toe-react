import React from "react";

export const PlayerStatus = ({
  player,
  symbol,
  turn,
}: {
  player: string;
  symbol: string;
  turn: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-between p-4 w-36">
      <p className="mb-4 min-h-3">
        {player === turn ? "🔽 Your turn" : "\u00A0"}
      </p>
      <div className="text-center bg-[#0c234b] mx-auto px-3 py-6 rounded-lg text-white align-end">
        <p className="mb-2">{player}</p>
        <div className="text-xl">{symbol}</div>
      </div>
    </div>
  );
};

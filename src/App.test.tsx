import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Tic Tac Toe App", () => {
  test("renders the game title", () => {
    render(<App />);
    expect(screen.getByText(/TIC TAC TOE/i)).toBeInTheDocument();
  });

  test("renders 9 board cells", () => {
    render(<App />);
    expect(screen.getAllByRole("button")).toHaveLength(10); // 9 cells + 1 reset
  });

  test("shows winner when a player wins", async () => {
    render(<App />);
    const cells = screen
      .getAllByTitle("board grid")
      .filter((btn) => btn.textContent === "");
    fireEvent.click(cells[0]); // ❌
    fireEvent.click(cells[3]); // 🔵
    fireEvent.click(cells[1]); // ❌
    fireEvent.click(cells[4]); // 🔵
    fireEvent.click(cells[2]); // ❌

    // Wait for the winner text to appear
    expect(await screen.findByText(/Player 2 wins!/i)).toBeInTheDocument();
  });

  test("shows draw when board is full and no winner", () => {
    render(<App />);
    const cells = screen
      .getAllByRole("button")
      .filter((btn) => btn.textContent === "");
    // Fill the board for a draw
    fireEvent.click(cells[0]); // ❌
    fireEvent.click(cells[1]); // 🔵
    fireEvent.click(cells[2]); // ❌
    fireEvent.click(cells[4]); // 🔵
    fireEvent.click(cells[3]); // ❌
    fireEvent.click(cells[5]); // 🔵
    fireEvent.click(cells[7]); // ❌
    fireEvent.click(cells[6]); // 🔵
    fireEvent.click(cells[8]); // ❌
    expect(screen.getByText(/draw/i)).toBeInTheDocument();
  });

  test("reset button clears the board and winner", () => {
    render(<App />);
    const cells = screen
      .getAllByRole("button")
      .filter((btn) => btn.textContent === "");
    fireEvent.click(cells[0]);
    fireEvent.click(screen.getByText(/RESET/i));
    // All cells should be empty
    const resetCells = screen
      .getAllByRole("button")
      .filter((btn) => btn.textContent === "");
    expect(resetCells).toHaveLength(9);
    expect(screen.queryByText(/wins/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/draw/i)).not.toBeInTheDocument();
  });
});

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';

import React, { useState } from 'react';
import './App.css';

const INITIAL_STATE = Array(9).fill(null);

const TikTakToe = () => {
  const [squares, setSquares] = useState(INITIAL_STATE);
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }

    return null;
  };

  const isBoardFull = (squares) => {
    return squares.every((square) => square !== null);
  };

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    const winnerInfo = calculateWinner(squares);
    const isWinnerSquare = winnerInfo && winnerInfo.line.includes(i);

    return (
      <button
        className={`square ${isWinnerSquare ? 'winner' : ''}`}
        onClick={() => handleClick(i)}
      >
        {squares[i]}
      </button>
    );
  };

  const currentPlayer = xIsNext ? 'X' : 'O';
  const status =
    calculateWinner(squares)
      ? `Winner: ${calculateWinner(squares).winner}`
      : isBoardFull(squares)
      ? "It's a draw!"
      : `Next player: ${currentPlayer}`;

  return (
    <div>
      <img className="image" src={process.env.PUBLIC_URL + './download.png'} alt="picture" />
      <h1 className="h1">Student ID:22054339</h1>
      <div className="move-info">
        <p className='para'>{`Player ${currentPlayer} is making a move`}</p>
      </div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      
    </div>
  );
};

export default TikTakToe;

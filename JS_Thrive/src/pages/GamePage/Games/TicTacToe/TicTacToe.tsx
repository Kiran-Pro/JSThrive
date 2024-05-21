import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
  margin: 20px auto;
`;

const SquareButton = styled.button<{ value: string | null }>`
  width: 100px;
  height: 100px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) =>
    props.value === 'X' ? '#ffcccc' : props.value === 'O' ? '#cce5ff' : '#fff'};
  border: 1px solid #999;
  outline: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.value === 'X' ? '#ff9999' : props.value === 'O' ? '#99caff' : '#ddd'};
  }
`;

const Status = styled.div`
  margin: 20px auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const ResetButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const TicTacToe: React.FC = () => {
  const navigate = useNavigate();
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (i: number) => (
    <SquareButton value={squares[i]} onClick={() => handleClick(i)}>
      {squares[i]}
    </SquareButton>
  );

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Status>{status}</Status>
      <BoardContainer>
        {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
      </BoardContainer>
      <ResetButton onClick={handleReset}>Reset Game</ResetButton>
      <ResetButton onClick={()=>{
        navigate('/gamepage')
      }}>Go Back</ResetButton>
    </div>
  );
};

const calculateWinner = (squares: (string | null)[]) => {
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
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;

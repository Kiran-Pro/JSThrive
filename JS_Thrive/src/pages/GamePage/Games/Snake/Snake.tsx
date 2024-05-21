import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Board = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  background-color: #282c34;
  border: 2px solid #000;
`;

const SnakeSegment = styled.div<{ left: number; top: number }>`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #61dafb;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
`;

const Food = styled.div<{ left: number; top: number }>`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #ff0000;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
`;

const ResetButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface Position {
  top: number;
  left: number;
}

const generateFoodPosition = () => {
  const top = Math.floor((Math.random() * 20)) * 20;
  const left = Math.floor((Math.random() * 20)) * 20;
  return { top, left };
};

const Snake: React.FC = () => {
  const navigate = useNavigate();
  const [snake, setSnake] = useState<Position[]>([{ top: 200, left: 200 }]);
  const [food, setFood] = useState<Position>(generateFoodPosition());
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.top -= 20;
          break;
        case 'DOWN':
          head.top += 20;
          break;
        case 'LEFT':
          head.left -= 20;
          break;
        case 'RIGHT':
          head.left += 20;
          break;
      }

      newSnake.unshift(head);

      if (head.top === food.top && head.left === food.left) {
        setFood(generateFoodPosition());
      } else {
        newSnake.pop();
      }

      if (head.top < 0 || head.top >= 400 || head.left < 0 || head.left >= 400 || newSnake.slice(1).some(segment => segment.top === head.top && segment.left === head.left)) {
        setGameOver(true);
        return prevSnake;
      }

      return newSnake;
    });
  }, [direction, food]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [moveSnake, gameOver]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  const handleReset = () => {
    setSnake([{ top: 200, left: 200 }]);
    setFood(generateFoodPosition());
    setDirection('RIGHT');
    setGameOver(false);
  };

  return (
    <GameContainer>
      <Title>Snake Game</Title>
      <Board>
        {snake.map((segment, index) => (
          <SnakeSegment key={index} top={segment.top} left={segment.left} />
        ))}
        <Food top={food.top} left={food.left} />
      </Board>
      {gameOver && (
        <>
          <h2>Game Over</h2>
          <ResetButton onClick={handleReset}>Play Again</ResetButton>
          <ResetButton onClick={()=>{
            navigate('/gamepage')
          }}>Go Back</ResetButton>
        </>
      )}
    </GameContainer>
  );
};

export default Snake;

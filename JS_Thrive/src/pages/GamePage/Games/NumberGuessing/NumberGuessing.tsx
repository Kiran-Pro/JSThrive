import React, { useState } from 'react';
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

const Input = styled.input`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #21a1f1;
  }
`;

const Result = styled.div`
  font-size: 20px;
  margin-top: 20px;
  font-weight: bold;
  color: #333;
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

const NumberGuessing: React.FC = () => {
  const navigate = useNavigate();

  const [targetNumber, setTargetNumber] = useState<number>(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = () => {
    const guessedNumber = parseInt(guess, 10);
    if (isNaN(guessedNumber)) {
      setResult('Please enter a valid number.');
      return;
    }
    if (guessedNumber < targetNumber) {
      setResult('Too low!');
    } else if (guessedNumber > targetNumber) {
      setResult('Too high!');
    } else {
      setResult('Correct! You guessed the number!');
    }
  };

  const handleReset = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setResult(null);
  };

  return (
    <GameContainer>
      <Title>Number Guessing Game</Title>
      <Input
        type="text"
        value={guess}
        onChange={handleGuessChange}
        placeholder="Enter your guess (1-100)"
      />
      <Button onClick={handleGuessSubmit}>Guess</Button>
      {result && (
        <>
          <Result>{result}</Result>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
          <ResetButton onClick={()=>{
            navigate('/gamepage')
          }}>Go Back</ResetButton>
        </>
      )}
    </GameContainer>
  );
};

export default NumberGuessing;

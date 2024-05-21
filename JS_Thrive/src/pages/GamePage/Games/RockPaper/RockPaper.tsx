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

const ChoicesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const ChoiceButton = styled.button`
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

const choices = ['Rock', 'Paper', 'Scissors'] as const;
type Choice = typeof choices[number];

const getResult = (playerChoice: Choice, computerChoice: Choice) => {


  if (playerChoice === computerChoice) return "It's a tie!";
  if (
    (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
    (playerChoice === 'Paper' && computerChoice === 'Rock') ||
    (playerChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    return 'You win!';
  }
  return 'You lose!';
};

const RockPaperScissors: React.FC = () => {
  const navigate = useNavigate();
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleChoiceClick = (choice: Choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = getResult(choice, computerChoice);

    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    setResult(result);
  };

  const handleReset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <GameContainer>
      <Title>Rock, Paper, Scissors</Title>
      <ChoicesContainer>
        {choices.map((choice) => (
          <ChoiceButton key={choice} onClick={() => handleChoiceClick(choice)}>
            {choice}
          </ChoiceButton>
        ))}
      </ChoicesContainer>
      {result && (
        <>
          <Result>
            You chose {playerChoice}. Computer chose {computerChoice}. {result}
          </Result>
          <ResetButton onClick={handleReset}>Play Again</ResetButton>
          <ResetButton onClick={()=>{
            navigate('/gamepage')
          }}>Go Back</ResetButton>
        </>
      )}
    </GameContainer>
  );
};

export default RockPaperScissors;

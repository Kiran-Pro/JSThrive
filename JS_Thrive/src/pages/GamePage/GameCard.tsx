
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  width: 300px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GameTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

const GameDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: #666;
`;

const PlayButton = styled.button`
  padding: 10px 20px;
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #21a1f1;
  }
`;

interface GameCardProps {
  title: string;
  description: string;
  gameLink: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, gameLink }) => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate(gameLink);
  };

  return (
    <Card>
      <GameTitle>{title}</GameTitle>
      <GameDescription>{description}</GameDescription>
      <PlayButton onClick={handlePlayClick}>Play</PlayButton>
    </Card>
  );
};

export default GameCard;

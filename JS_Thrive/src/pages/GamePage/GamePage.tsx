
import React from 'react';
import GameCard from './GameCard';


const HomePage: React.FC = () => {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>

      <GameCard 
        title="Tic Tac Toe" 
        description="A simple Tic Tac Toe that improves the logic."
        gameLink='/game2'
      />
      <GameCard 
        title="Rock Paper Scissors" 
        description="A simple Rock paper scissor game that kills time."
        gameLink='/game3'
      />
      <GameCard 
        title="Snake" 
        description="A simple Snake feeding food game that kills time."
        gameLink='/game5'
      />
      <GameCard 
        title="Number Guessing Game" 
        description="A simple Number guessing game that kills time."
        gameLink='/game4'
      />
      
    </div>
  );
};

export default HomePage;

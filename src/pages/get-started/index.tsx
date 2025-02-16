import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { Path } from '../../constants';

export const GetStartedPage = () => {
  const navigate = useNavigate();

  const navigateToAddingPalyersScreen = () => {
    navigate(Path.AddingPlayersPage);
  }

  return (
    <>
      <Button test-id='start-game-button' onClick={navigateToAddingPalyersScreen}>Start game</Button>
    </>
  )
}

export default GetStartedPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { Path } from '../../constants';

import './styles.scss';

export const GetStartedPage = () => {
  const navigate = useNavigate();

  const navigateToAddingPalyersScreen = () => {
    navigate(Path.AddingPlayersPage);
  }

  React.useEffect(() => {
    localStorage.clear();
  }, []);
  
  return (
    <div 
      className='get-started-wrapper'
    >   
        <div className='get-started-center-content'>
          <h1 className='heading get-started-title'>Bowling</h1>
          <Button  size='large' type='primary' test-id='start-game-button' onClick={navigateToAddingPalyersScreen}>Start game</Button>
        </div>
       
    </div>
  )
}

export default GetStartedPage;
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
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${process.env.PUBLIC_URL + 'assets/bowling-background.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >   
        <div className='get-started-center-content'>
          <h1 className='heading get-started-title'>Bowling</h1>
          <Button  size='large' type='primary' test-id='start-game-button' onClick={navigateToAddingPalyersScreen}>Start game</Button>
        </div>
       
    </div>
  )
}

export default GetStartedPage;
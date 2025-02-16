import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import GetStartedPage from './pages/get-started';
import AddingPlayersPage from './pages/adding-players';
import ScoresBoardPage from './pages/scores-board';

import { Path } from './constants';

import './styles/main.scss';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path={Path.StartedPage} element={<GetStartedPage />} />
            <Route path={Path.AddingPlayersPage} element={<AddingPlayersPage />} />
            <Route path={Path.ScoresBoardPage} element={<ScoresBoardPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

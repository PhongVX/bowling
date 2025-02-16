import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ScoresBoardHeader from './ScoresBoardHeader';
import { usePlayers } from './hooks';
import { Path } from '../../constants';
import { Player } from '../../types';
import PlayerRow from './PlayerRow';

import './styles.scss';

export const ScoresBoardPage = () => {
    const players = usePlayers();
    const navigate = useNavigate();

    useEffect(() => {
        if (!players || players.length === 0) {
            navigate(Path.AddingPlayersPage);
            return;
        }
    }, [players]);

    const renderPlayers = () => {
        return players.map((player: Player) => {
            return (
                <PlayerRow player={player} />
            )
        })
    }

    return (
        <div className='scores-board-wrapper'>
            <br />
            <br />
            <br />
            <div>
                <h1 test-id='scores-board-heading'>Bowling Scores Board</h1>
            </div>
            <br />
            <div style={{justifyContent: 'center', display: 'flex'}}>
            <table>
                <ScoresBoardHeader />
                {renderPlayers()}
            </table>
            </div>
          
        </div>
    );
};

export default ScoresBoardPage;
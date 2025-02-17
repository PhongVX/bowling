import React, { useEffect, useState } from 'react'
import { Player } from '../../../types';
import { Input } from 'antd';

import './styles.scss';
import PlayerFrame from '../PlayerFrame';
import { isSpare, isStrike } from '../../../utils/frame';

type PlayerRowProps = {
    player: Player
}

const initFrames = () => {
    let frames = new Map();
    for (let i = 0; i < 10; i++) {
        frames.set(i, new Array(0, 0));
    }
    return frames
}

export const PlayerRow = ({ player }: PlayerRowProps) => {
    const [score, setScore] = useState<number>(0);
    const [frames, setFrames] = useState(initFrames());

    useEffect(() => {
        calculateScore();
    }, [frames]);


    const calculateScore = () => {
        let total = 0;
        for (let i = 0; i < 10; i++) {
            frames.get(i).forEach((pin: number) => {
                total += pin
            });
            if (i >= 9) { break; }
            if (isStrike(frames.get(i))) {
                total += frames.get(i + 1)[0] || 0;
                if (frames.get(i + 1).length >= 2) {
                    total += frames.get(i + 1)[1] || 0;
                } 
                if (isStrike(frames.get(i + 1))){
                    total += frames.get(i + 2)[0] || 0;
                }
            }  else if (isSpare(frames.get(i))) {
                total += frames.get(i + 1)[0] || 0;
            }
        }
        setScore(total);
    }
    
    const handlePlayerFrameChange = (frameIndex: number, rollIndex: number, numberOfPins: number) => {
        let newFrames = new Map(frames);
        if (rollIndex > 1 && frameIndex === 9) {
            let updatedFrame = [...(newFrames.get(frameIndex) || [0, 0, 0])];
            updatedFrame = [...updatedFrame.slice(0, rollIndex), ...updatedFrame.slice(rollIndex + 1), numberOfPins];
            newFrames.set(frameIndex, updatedFrame);
        } else {
            let updatedFrame = [...(newFrames.get(frameIndex) || [0, 0])];
            updatedFrame = [...updatedFrame.slice(0, rollIndex), numberOfPins, ...updatedFrame.slice(rollIndex + 1)];
            newFrames.set(frameIndex, updatedFrame);
        }
        setFrames(newFrames);
    }

    const renderPlayerFrames = () => {
        return Array.from(frames.keys()).map((frame, index) => {
            return (
                <PlayerFrame
                    key={`player-frame-${index}`}
                    index={index}
                    player={player}
                    frame={frame}
                    onChange={handlePlayerFrameChange}
                />
            )
        });
    }

    return (
        <tr className='player-row-wrapper'>
            <td className='player-name-cell'>{player.name}</td>
            {renderPlayerFrames()}
            <td test-id={`${player.id}-total-score`} className='player-score-cell'>{score} &nbsp;</td>
        </tr>

    )
}

export default PlayerRow;
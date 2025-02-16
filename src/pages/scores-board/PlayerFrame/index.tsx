import React, { useState } from 'react'
import { Input } from 'antd';

import { Player } from '../../../types';

type PlayerFrameProps = {
    frame: any
    index: number
    player: Player
    onChange: (frameIndex: number, rollIndex: number, numberOfPins: number) => void;
}

const checkStrike = (roll: number | string) => roll === 10 || roll === 'X' || roll === 'x';

export const PlayerFrame = ({ frame, index, player, onChange }: PlayerFrameProps) => {
    const [score, setScore] = useState<number>(0);
    const [rollValues, setRollValues] = useState<number[]>([0, 0]);
    const [rollsDisplay, setRollsDisplay] = useState<string[]>(['', '']);
    const [isInputError, setIsInputError] = useState(false);
    const [isStrike, setIsStrike] = useState(false);
    const [isSpare, setIsSpare] = useState(false);

    const validateInput = (value: string, roll: string | null) => {
        if ((Number(value) >= 0 && Number(value) <= 9) || value === '/' || value.toUpperCase() === 'X') {
            return true;
        }
        return false;
    };

    const roll = (rollIndex: number, stringOfPins: string) => {
        let newRolls = [...rollValues];
        let newRollsDisplay = [...rollsDisplay];
        let numberOfPins;
        if (stringOfPins === 'x' || stringOfPins === 'X' || stringOfPins === '10') {
            newRollsDisplay[rollIndex] = 'X';
            newRolls[rollIndex] = 10;
            numberOfPins = 10;
            if (index !== 10) {
              newRollsDisplay[1] = '';
              newRolls[1] = 0;
            }
          } else if (stringOfPins === '/') {
            numberOfPins = 10 - newRolls[0];
            newRollsDisplay[rollIndex] = '/';
            newRolls[rollIndex] = numberOfPins;
          } else {
            numberOfPins = parseInt(stringOfPins);
            newRollsDisplay[rollIndex] = stringOfPins;
            newRolls[rollIndex] = numberOfPins;
          }
      
          if (rollIndex === 2 && index !== 10 && newRolls[0] + numberOfPins === 10) {
            newRollsDisplay[1] = '/';
            newRolls[1] = 10 - newRolls[0];
          }
      
          setRollValues(newRolls);
          setRollsDisplay(newRollsDisplay);
          setIsSpare(!checkStrike(newRolls[0]) && newRolls[0] + newRolls[1] === 10);
          setIsStrike(checkStrike(newRolls[0]));
          setScore(newRolls.reduce((acc, val) => acc + val, 0));
      
          onChange(index, rollIndex, numberOfPins);
    }

    const handleRollInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rollNumber = e.target.getAttribute('roll-number');
        const rollIndex = rollNumber? parseInt(rollNumber, 10) -1: 0;
        const rollValue = e.target.value;
        const isValid = validateInput(e.target.value, rollNumber);
        if (isValid) {
            setIsInputError(false);
            roll(rollIndex, rollValue);
        } else {
            setIsInputError(true);
        }
    };

    return (
        <td>
            <div className='input-pins-wrapper'>
                <Input roll-number='1'  status={isInputError ? 'error' : ''} style={{ width: 40 }} onChange={handleRollInputChange} value={frame[0]} />
                &nbsp;
                <Input roll-number='2' disabled={isStrike && index !== 10 ? true : false} status={isInputError ? 'error' : ''} style={{ width: 40 }} onChange={handleRollInputChange} value={frame[1]} />
                &nbsp;
            </div>
        </td>

    )
}

export default PlayerFrame;
import React, { useState } from 'react';
import { Input } from 'antd';

import { Player } from '../../../types';
import { getInitialPlayerFrameDisplay, getInitialPlayerFrameValue, savePlayerFrame } from '../../../utils/frame';

type PlayerFrameProps = {
    frame: any;
    index: number;
    player: Player;
    onChange: (frameIndex: number, rollIndex: number, numberOfPins: number) => void;
}

const checkStrike = (roll: number | string) => roll === 10 || roll === 'X' || roll === 'x';
const checkSpare = (roll: number | string) => roll === '/';


export const PlayerFrame = ({ frame, index, player, onChange }: PlayerFrameProps) => {
    const [rollValues, setRollValues] = useState<number[]>(getInitialPlayerFrameValue(player.id, index));
    const [rollsDisplay, setRollsDisplay] = useState<string[]>(getInitialPlayerFrameDisplay(player.id, index));
    const [isInputError, setIsInputError] = useState(false);
    const [isStrike, setIsStrike] = useState(false);

    const extraFrameDisabled = index === 9 && (checkStrike(rollsDisplay[0]) || checkSpare(rollsDisplay[1])) ? false : true; // Handle the extra frame rule
    const isTenthFrame = index === 9;

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
            if (index !== 9) {
                newRollsDisplay[1] = ''; 
                newRolls[1] = 0; 
            }
        } else if (stringOfPins === '/') {
            if (rollIndex > 1) {
                numberOfPins = 10 - newRolls[1]; 
            } else {
                numberOfPins = 10 - newRolls[0]; 
            }
            newRollsDisplay[rollIndex] = '/';
            newRolls[rollIndex] = numberOfPins;

        } else {
            numberOfPins = parseInt(stringOfPins);
            newRollsDisplay[rollIndex] = stringOfPins;
            newRolls[rollIndex] = numberOfPins;
        }

        if (rollIndex === 1 && index !== 9 && newRolls[0] + numberOfPins === 10) {
            newRollsDisplay[1] = '/';
            newRolls[1] = 10 - newRolls[0];
        }

        setRollValues(newRolls);
        setRollsDisplay(newRollsDisplay);
        setIsStrike(checkStrike(newRolls[0])); 
        onChange(index, rollIndex, numberOfPins);
    };

    const handleRollInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rollNumber = e.target.getAttribute('roll-number');
        const rollIndex = rollNumber ? parseInt(rollNumber, 10) - 1 : 0;
        const rollValue = e.target.value;
        const isValid = validateInput(e.target.value, rollNumber);
        if (isValid) {
            setIsInputError(false);
            roll(rollIndex, rollValue);
        } else {
            setIsInputError(true); 
        }
    };

    React.useEffect(() => {
        savePlayerFrame<string>(player.id, index, rollsDisplay);
        savePlayerFrame<number>(player.id, index, rollValues);
    }, [rollsDisplay, rollValues]);


    return (
        <td>
            <div className='input-pins-wrapper'>
                <Input test-id={`${player.id}-frame-${index + 1}-roll-1`} roll-number='1' status={isInputError ? 'error' : ''} style={{ width: 40 }} onChange={handleRollInputChange} value={rollsDisplay[0]} />
                &nbsp;
                <Input test-id={`${player.id}-frame-${index + 1}-roll-2`} roll-number='2' disabled={isStrike && index !== 9 ? true : false} status={isInputError ? 'error' : ''} style={{ width: 40 }} onChange={handleRollInputChange} value={rollsDisplay[1]} />
                &nbsp;
                {isTenthFrame && <Input test-id={`${player.id}-frame-${index + 1}-roll-3`} roll-number='3' disabled={extraFrameDisabled} status={isInputError ? 'error' : ''} style={{ width: 40 }} onChange={handleRollInputChange} />}
            </div>
        </td>
    );
};

export default PlayerFrame;
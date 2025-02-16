import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Form, Button, Input, Tag, Alert, AlertProps } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../constants';
import { AlertMessageType, Player } from '../../types';


export const AddingPlayersPage = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [alertMessage, setAlertMessage] = useState<AlertMessageType | null>(null);
    
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish: FormProps<{ playerName: string }>['onFinish'] = ({ playerName }) => {
        if (players.length < 5) {
            setPlayers((prev) => [...prev, { id: uuidv4(), name: playerName }]);
            form.resetFields();
            return;
        }
        setAlertMessage({
            message: 'You can only add up to 5 players!',
            type: 'error'
        })
    };

    const handleRemovePlayer = (id: string) => {
        setPlayers((prev) => prev.filter((player) => player.id !== id));
    };

    const handleStartGame = () => {
        if (players.length === 0) {
            setAlertMessage({
                message: 'Please add players to continue!',
                type: 'error'
            })
            return;
        }
        localStorage.setItem('players', JSON.stringify(players));
        navigate(Path.ScoresBoardPage, { state: { players }});
    }

    return (
        <div className='adding-player-wrapper'>
            { alertMessage && <Alert closable message={alertMessage.message} type={alertMessage.type} /> }
            <Form
                form={form}
                name="basic"
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
                layout="inline"
            >
                <Form.Item
                    name="playerName"
                    rules={[
                        { required: true, message: 'Player name cannot be empty!' },
                        { max: 20, message: 'Player name cannot be longer than 20 characters!' }
                    ]}
                >
                    <Input test-id='player-name-input' placeholder='Player name' />
                </Form.Item>
                <Form.Item>
                    <Button test-id='add-player-button' type="primary" htmlType="submit">
                        Add Player
                    </Button>
                </Form.Item>
            </Form>
            <div test-id='player-list' className='player-list'>
                {players.map(({ id, name }, index) => (
                    <Tag key={id} bordered={false} closable onClose={() => handleRemovePlayer(id)}>
                        #{index + 1}: {name}
                    </Tag>
                ))}
            </div>
            <Button test-id='start-game-button' style={{ width: '100%' }} type="primary" onClick={handleStartGame}>
                Start game
            </Button>
        </div>
    );
};

export default AddingPlayersPage;
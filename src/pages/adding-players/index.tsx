import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Form, Button, Input, Tag, Alert } from 'antd';
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
        navigate(Path.ScoresBoardPage, { state: { players } });
    }

    return (
        <div className='adding-player-wrapper'>
            <div className='adding-player-container'>
                <h1 className='heading'>Adding Players</h1>
                {alertMessage && <Alert className='alert-message' closable message={alertMessage.message} type={alertMessage.type} />}
                <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <div className='add-player-input-and-button-wrapper'>
                        <Form.Item
                            className='player-name-input-form-item'
                            name="playerName"
                            rules={[
                                { required: true, message: 'Player name cannot be empty!' },
                                { max: 20, message: 'Player name cannot be longer than 20 characters!' }
                            ]}
                        >
                            <Input test-id='player-name-input' size='large' placeholder='Player name' />
                        </Form.Item>
                        <Form.Item
                            className='add-player-button-form-item'
                        >
                            <Button test-id='add-player-button' type="primary" size='large' htmlType='submit'>
                                Add Player
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
                <div test-id='player-list' className='player-list'>
                    {players.map(({ id, name }, index) => (
                        <Tag key={id} bordered={false} closable onClose={() => handleRemovePlayer(id)}>
                            #{index + 1}: {name}
                        </Tag>
                    ))}
                </div>
                <Button test-id='start-game-button' style={{ width: '100%' }} type="primary" size='large' onClick={handleStartGame}>
                    Start game
                </Button>
            </div>
        </div>
    );
};

export default AddingPlayersPage;
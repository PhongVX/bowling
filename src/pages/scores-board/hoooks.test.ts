import { renderHook } from '@testing-library/react-hooks';
import { usePlayers } from './hooks';
import { useLocation } from 'react-router-dom';


jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('usePlayers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return players from location.state if available', () => {
    (useLocation as jest.Mock).mockReturnValue({
      state: {
        players: [{ id: '1', name: 'Player 1' }],
      },
    });

    const { result } = renderHook(() => usePlayers());

    expect(result.current).toEqual([{ id: '1', name: 'Player 1' }]);
  });

  it('should return players from localStorage if location.state is not available', () => {
    (useLocation as jest.Mock).mockReturnValue({
      state: null,
    });

    const mockPlayers = [{ id: '2', name: 'Player 2' }];
    global.localStorage.setItem('players', JSON.stringify(mockPlayers));

    const { result } = renderHook(() => usePlayers());

    expect(result.current).toEqual(mockPlayers);
  });

  it('should return an empty array if no players are in location.state or localStorage', () => {
    (useLocation as jest.Mock).mockReturnValue({
      state: null,
    });

    global.localStorage.setItem('players', JSON.stringify(null));

    const { result } = renderHook(() => usePlayers());

    expect(result.current).toEqual([]);
  });

  it('should prioritize location.state over localStorage', () => {
    (useLocation as jest.Mock).mockReturnValue({
      state: {
        players: [{ id: '3', name: 'Player 3' }],
      },
    });

    const mockPlayers = [{ id: '4', name: 'Player 4' }];
    global.localStorage.setItem('players', JSON.stringify(mockPlayers));

    const { result } = renderHook(() => usePlayers());

    expect(result.current).toEqual([{ id: '3', name: 'Player 3' }]);
  });
});

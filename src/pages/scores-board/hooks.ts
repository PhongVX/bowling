import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const usePlayers = () => {
    const location = useLocation();
    const playersInStorage = JSON.parse(localStorage.getItem('players') as string);
    return useMemo(() => {
        return location.state?.players || playersInStorage || [];
    }, [location.state?.players, playersInStorage]);
}
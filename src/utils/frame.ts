export function getInitialPlayerFrameDisplay(playerId: string, frameIndex: number): string[] {
    const frameValues = localStorage.getItem(`frame-display-${playerId}:${frameIndex}`);
    return frameValues ? JSON.parse(frameValues) : frameIndex === 9 ? ['', '', '']: ['', ''];
}

export function getInitialPlayerFrameValue(playerId: string, frameIndex: number): number[] {
    const frameValues = localStorage.getItem(`frame-value-${playerId}:${frameIndex}`);
    return frameValues ? JSON.parse(frameValues) : frameIndex === 9 ? [0, 0, 0]: [0, 0];
}

export function savePlayerFrame<T>(playerId: string, frameIndex: number, frameValues: T[]): void {
    const type = (typeof frameValues[0] === 'string') ? 'display' : 'value';
    localStorage.setItem(`frame-${type}-${playerId}:${frameIndex}`, JSON.stringify(frameValues));
}

export const isSpare = (frame: any) => {
    return (frame[0] !== 10) && (frame[0] + frame[1] === 10);
}

export const isStrike = (frame: any) => {
    return (frame[0] === 10);
}


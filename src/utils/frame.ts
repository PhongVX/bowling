export const isSpare = (frame: any) => {
    return (frame[0] !== 10) && (frame[0] + frame[1] === 10);
}

export const isStrike = (frame: any) => {
    return (frame[0] === 10);
}
const gameState = {
    Running: 'running',
    Finished: 'finished',
    isPaused: false,
    isPlayerAbleToMove: false,
    timer: 0,
    player_point: 'init',
    accessibleMotionControls: undefined,
    defaultMotionControls: undefined,
    General_songs_volume: 1,
    isGuapimirimSignAble: false,
    isTopInformationAble: false,
    isGuapimirimSignVisible: false,
    isTopInformationVisible: false,
    topInformationType: '',
    counter_1: 0
}

const playerState = {
    isMoving: false,
    floor: 'floor_2',
    point_id: 2,
    point_x: undefined,
    point_y: undefined,
    targetID: undefined,
    targetY: undefined,
    targetX: undefined,
    isOnTarget: false,
    direction: undefined,
}

const userIterfaceState = {
    text: ''
}

export{
    gameState,
    playerState,
    userIterfaceState
}
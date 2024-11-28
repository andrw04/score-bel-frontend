export type Match = {
    id: string
    homeTeam: string
    awayTeam: string
    homeTeamGoals: number
    awayTeamGoals: number
    startTime: string
    fullTime: string
    tournament: string
}

export type LineUpPlayer = {
    displayName: string
    surname: string
    position: 'gkp' | 'mid' | 'fwd'
    playerNumber: number
}

export type LineUpTeam = {
    start: LineUpPlayer[]
    bench: LineUpPlayer[]
}

export type LineUp = {
    [teamName: string]: LineUpTeam
}

export type MatchAction = 'goal' | 'yellow_card' | 'red_card' | 'sub'

export type MatchEvent = {
    minute: number,
    action: MatchAction
    majorEventPlayerName: string
    minorEventPlayerName: string | null
}

export type MatchSummary = {
    [teamName: string]: MatchEvent[]
}
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
    minute: number
    action: MatchAction
    majorEventPlayerName: string
    minorEventPlayerName: string | null
}

export type MatchSummary = {
    [teamName: string]: MatchEvent[]
}

export type MatchVotes = {
    homeWin: number
    awayWin: number
    draw: number
}

export type VoteForMatch = {
    matchId: string
    body: {
        choice: 'home_win' | 'away_win' | 'draw'
    }
}

export type MatchDiscussionMessage = {
    message: string
    username: string
}

export type SendMessage = {
    matchId: string
    body: {
        message: string
    }
}

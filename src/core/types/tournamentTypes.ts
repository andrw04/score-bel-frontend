export type Tournament = {
    codeName: string
    name: string
}

export type TournamentTeamResponse = {
    codeName: string
    name: string
    played: number
    wins: number
    losses: number
    draws: number
    goalsFor: number
    goalsAgainst: number
    goalsDiff: number
    points: number
    tournament: string
}

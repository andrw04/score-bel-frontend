export const BASE_API_URL = 'https://score-bel-backend.onrender.com/api/internal/v1'

export const USER_PROFILE_URL = `${BASE_API_URL}/user/profile`

export const SIGN_IN_URL = `${BASE_API_URL}/user/sign-in`
export const SIGN_UP_URL = `${BASE_API_URL}/user/sign-up`

export const SCORE_BEL_ACCESS = 'score-bel-access'
export const SCORE_BEL_REFRESH = 'score-bel-refresh'
export enum TagTypes {
    USER = 'USER',
    VOTE = 'VOTE',
    CHAT = 'CHAT',
}

export const SCORE_BEL_TOURNAMENTS = `${BASE_API_URL}/tournaments`
export const SCORE_BEL_MATCHES = `${BASE_API_URL}/matches`
export const SCORE_BEL_TEAMS = `${BASE_API_URL}/teams`

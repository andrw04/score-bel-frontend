import {
    Alert,
    Box,
    Button,
    Grid2,
    Snackbar,
    Stack,
    Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Match } from '../../../../core/types/matchesTypes'
import {
    useGetMatchVotesQuery,
    useVoteForMatchMutation,
} from '../../../../core/api/matchesApi'
import Preloader from '../../../components/common/Preloader'
import { useSelector } from 'react-redux'

type PropsType = {
    match: Match
    homeTeam: string
    awayTeam: string
}

const Vote: React.FC<PropsType> = ({ match, homeTeam, awayTeam }) => {
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    )

    const { data, isLoading } = useGetMatchVotesQuery(match.id)
    const [voteForMatch, { isError, isSuccess }] = useVoteForMatchMutation()

    const votes = useMemo(() => {
        if (!data) {
            return {
                homeWin: 0,
                awayWin: 0,
                draw: 0,
            }
        }

        return data
    }, [data])

    const handleVote = async (choice: 'home_win' | 'away_win' | 'draw') => {
        try {
            await voteForMatch({
                matchId: match.id,
                body: {
                    choice,
                },
            })
        } catch (error) {
            console.error('Error:', error)
        }

        setShowSnackbar(true)
    }

    const [showSnackbar, setShowSnackbar] = useState(false)

    const handleCloseSnackbar = () => {
        setShowSnackbar(false)
    }

    return (
        <>
            {isLoading && <Preloader />}
            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={isSuccess ? 'success' : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {isSuccess ? "You've voted" : 'Error'}
                </Alert>
            </Snackbar>
            <Stack
                style={{
                    width: '100%',
                    margin: '0 auto',
                    fontFamily: 'Arial, sans-serif',
                }}
                gap="10px"
            >
                <Typography variant="h5">
                    Голосование за результат матча
                </Typography>
                <Stack justifyContent="center" display="flex" gap="10px">
                    <Stack gap="10px">
                        <Box
                            style={{
                                display: 'flex',
                                width: '100%',
                                height: '10px',
                                backgroundColor: '#e0e0e0',
                                borderRadius: '10px',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                style={{
                                    width: `${votes.homeWin}%`,
                                    height: '10px',
                                    backgroundColor: 'green',
                                    transition: 'width 0.3s ease',
                                }}
                            />
                            <Box
                                style={{
                                    width: `${votes.draw}%`,
                                    height: '10px',
                                    backgroundColor: 'yellow',
                                    transition: 'width 0.3s ease',
                                }}
                            />
                            <Box
                                style={{
                                    width: `${votes.awayWin}%`,
                                    height: '10px',
                                    backgroundColor: 'red',
                                    transition: 'width 0.3s ease',
                                }}
                            />
                        </Box>
                        <Grid2 display="flex" justifyContent="space-between">
                            <Typography fontSize="14px">
                                <strong>{homeTeam}:</strong>{' '}
                                {votes.homeWin.toPrecision(3)}%{' '}
                            </Typography>
                            <Typography fontSize="14px">
                                <strong>Ничья:</strong>{' '}
                                {votes.draw.toPrecision(3)}%{' '}
                            </Typography>
                            <Typography fontSize="14px">
                                <strong>{awayTeam}:</strong>{' '}
                                {votes.awayWin.toPrecision(3)}%{' '}
                            </Typography>
                        </Grid2>
                    </Stack>
                    {isAuthenticated && (
                        <Grid2
                            display="flex"
                            width="100%"
                            justifyContent="space-between"
                            gap="10px"
                        >
                            <Button
                                fullWidth
                                variant="contained"
                                color="inherit"
                                onClick={() => handleVote('home_win')}
                            >
                                {homeTeam}
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="inherit"
                                onClick={() => handleVote('draw')}
                            >
                                Ничья
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="inherit"
                                onClick={() => handleVote('away_win')}
                            >
                                {awayTeam}
                            </Button>
                        </Grid2>
                    )}
                </Stack>
            </Stack>
        </>
    )
}

export default Vote

import { Box, Stack, Tab } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MatchCard } from '../Home/components/MatchCard'
import { useGetMatchByIdQuery } from '../../core/api/matchesApi'
import { keyBy } from 'lodash'
import { useGetTeamsQuery } from '../../core/api/teamsApi'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import TournamentTable from '../Tournaments/components/TournamentTable'
import Preloader from '../components/common/Preloader'
import LineUps from './components/LineUps/LineUps'
import Summary from './components/Summary/Summary'
import Discussions from './components/Discussions/Discussions'

type PropsType = {}

const MatchDetails: FC<PropsType> = () => {
    const [value, setValue] = useState('1')

    const { id } = useParams<{ id: string }>()
    const { data: match, isLoading: isMatchLoading } = useGetMatchByIdQuery(
        id ?? ''
    )

    const { data: rawTeams, isLoading: isTeamsLoading } = useGetTeamsQuery()

    const teams = useMemo(() => {
        if (!rawTeams) {
            return undefined
        }

        return keyBy(rawTeams.results, 'codeName')
    }, [rawTeams])

    const isLoading = isMatchLoading || isTeamsLoading

    return (
        <>
            {isLoading && <Preloader />}
            {match && teams !== undefined && (
                <Stack>
                    <MatchCard match={match!} teams={teams} />
                    <TabContext value={value}>
                        <Box>
                            <TabList onChange={(e, v) => setValue(v)}>
                                <Tab label="События" value="1" />
                                <Tab label="Составы" value="2" />
                                <Tab label="Таблица" value="3" />
                                <Tab label="Обсуждение" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel
                            value="1"
                            sx={{ height: '100%', padding: '0px' }}
                        >
                            <Summary
                                matchId={match.id}
                                homeTeamName={teams[match.homeTeam].name}
                                awayTeamName={teams[match.awayTeam].name}
                            />
                        </TabPanel>
                        <TabPanel
                            value="2"
                            sx={{ height: '100%', padding: '0px' }}
                        >
                            <LineUps
                                matchId={match.id}
                                homeTeamName={teams[match.homeTeam].name}
                                awayTeamName={teams[match.awayTeam].name}
                            />
                        </TabPanel>
                        <TabPanel
                            value="3"
                            sx={{ height: '100%', padding: '0px' }}
                        >
                            <TournamentTable
                                tournamentCodeName={match.tournament}
                                highlightedTeams={[
                                    match.homeTeam,
                                    match.awayTeam,
                                ]}
                            />
                        </TabPanel>
                        <TabPanel value="4" sx={{ height: '100%', padding: '0px' }}>
                            <Discussions/>
                        </TabPanel>
                    </TabContext>
                </Stack>
            )}
        </>
    )
}

export default MatchDetails

import { Box, Grid2, Stack, Tab, Typography } from '@mui/material'
import TournamentTable from './components/TournamentTable'
import { useParams } from 'react-router-dom'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useState } from 'react'
import Fixtures from './components/Fixtures'
import Matches from './components/Matches'

const getLeagueName = (codeName: string | undefined) => {
    switch (codeName) {
        case 'premier-league':
            return 'Высшая Лига'
        case '1-league':
            return 'Первая Лига'
        case '2-league':
            return 'Вторая Лига'
        default:
            return ''
    }
}

const Tournaments = () => {
    const { codeName } = useParams<{ codeName: string }>()

    const [value, setValue] = useState('1')

    return (
        <Grid2
            minHeight="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <Stack gap="10px">
                <Typography variant="h5">{getLeagueName(codeName)}</Typography>
                <TabContext value={value}>
                    <Box>
                        <TabList onChange={(e, v) => setValue(v)}>
                            <Tab label="Ближайшие матчи" value="1" />
                            <Tab label="Результаты" value="2" />
                            <Tab label="Таблица" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ height: '100%', padding: '0px' }}>
                        <Fixtures tournament={codeName ?? ''} />
                    </TabPanel>
                    <TabPanel value="2" sx={{ height: '100%', padding: '0px' }}>
                        <Matches tournament={codeName ?? ''} />
                    </TabPanel>
                    <TabPanel value="3" sx={{ height: '100%', padding: '0px' }}>
                        <TournamentTable tournamentCodeName={codeName ?? ''} />
                    </TabPanel>
                </TabContext>
            </Stack>
        </Grid2>
    )
}

export default Tournaments

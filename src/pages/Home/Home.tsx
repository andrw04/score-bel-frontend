import { Grid2 } from '@mui/material'
import { useGetMatchesQuery } from '../../core/api/matchesApi'
import FootballLeagues from './components/Tournaments'
import { FC } from 'react'
import { groupBy } from 'lodash'
import Preloader from '../components/common/Preloader'

type PropsType = {}

const Home: FC<PropsType> = () => {
    const { data, isLoading } = useGetMatchesQuery({})

    const tournaments = groupBy(data?.results, 'tournament')

    return (
        <>
            {isLoading && (
                <Preloader/>
            )}
            {data && (
                <Grid2>
                    <FootballLeagues leagues={tournaments} />
                </Grid2>
            )}
        </>
    )
}

export default Home

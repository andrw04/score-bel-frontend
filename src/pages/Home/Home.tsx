import { Stack } from '@mui/material'
import { useGetMatchesQuery } from '../../core/api/matchesApi'
import FootballLeagues from './components/Tournaments'
import { FC, useMemo, useState } from 'react'
import { groupBy } from 'lodash'
import Preloader from '../components/common/Preloader'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import {AdapterDateFns} from '@mui/x-date-pickers-pro/AdapterDateFns'
import { format } from 'date-fns'

type PropsType = {}

const Home: FC<PropsType> = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const handleDateChange = (newDate: Date) => {
        setSelectedDate(newDate)
    }

    const { data, isFetching: isLoading } = useGetMatchesQuery({
        date: format(selectedDate, 'yyyy-MM-dd'),
    })

    const tournaments = useMemo(() => {
        if (!data) return undefined

        return groupBy(data?.results, 'tournament')
    }, [data])

    return (
        <>
            {isLoading && <Preloader />}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar value={selectedDate} onChange={handleDateChange} />
            </LocalizationProvider>
            <Stack gap="20px">
                {data && <FootballLeagues leagues={tournaments} />}
            </Stack>
        </>
    )
}

export default Home

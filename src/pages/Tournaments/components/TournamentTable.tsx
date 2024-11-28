import {
    Box,
    CircularProgress,
    Grid2,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import { FC, useMemo } from 'react'
import { useGetTournamentTableQuery } from '../../../core/api/tournamentsApi'
import { TournamentTeamResponse } from '../../../core/types/tournamentTypes'
import Preloader from '../../components/common/Preloader'

type Column = {
    id:
        | 'team'
        | 'played'
        | 'wins'
        | 'losses'
        | 'draws'
        | 'goalsFor'
        | 'goalsAgainst'
        | 'goalsDiff'
        | 'points'
    label: string
}

const columns: Array<Column> = [
    { id: 'team', label: 'Team' },
    { id: 'played', label: 'P' },
    { id: 'wins', label: 'W' },
    { id: 'losses', label: 'L' },
    { id: 'draws', label: 'D' },
    { id: 'goalsFor', label: 'F' },
    { id: 'goalsAgainst', label: 'A' },
    { id: 'goalsDiff', label: 'GD' },
    { id: 'points', label: 'PTS' },
]

const prepareData = (
    data?: TournamentTeamResponse[],
    highlightedTeams?: string[]
) => {
    if (!data) return []

    return data.map(({ name, codeName, ...rest }) => ({
        team: name,
        isHiglighted: highlightedTeams?.includes(codeName) ?? false,
        codeName,
        ...rest,
    }))
}

type PropsType = {
    tournamentCodeName: string
    highlightedTeams?: string[]
}

const TournamentTable: FC<PropsType> = ({
    tournamentCodeName,
    highlightedTeams,
}) => {
    const { data: rawData, isLoading: isTableLoading } =
        useGetTournamentTableQuery(tournamentCodeName)

    const data = useMemo(
        () => prepareData(rawData, highlightedTeams),
        [rawData]
    )

    return (
        <>
            <Grid2>
                {isTableLoading && (
                    <Preloader/>
                )}
                {data && (
                    <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row, index) => {
                                return (
                                    <TableRow
                                        key={row.codeName}
                                        sx={{
                                            backgroundColor: row.isHiglighted
                                                ? '#C3CC5A'
                                                : '',
                                        }}
                                    >
                                        <TableCell key={index}>
                                            {index + 1}
                                        </TableCell>
                                        {columns.map((column) => {
                                            const value = row[column.id]

                                            return (
                                                <TableCell key={column.id}>
                                                    {value}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                )}
            </Grid2>
        </>
    )
}

export default TournamentTable

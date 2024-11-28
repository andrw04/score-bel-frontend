import {
    Button,
    Divider,
    Grid2,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material'
import GoogleFonts from 'react-google-fonts'
import { SearchBar } from '../SearchBar'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined'
import { NavBarLink } from './NavBarLink'
import { UserMenu } from '../common/UserMenu'
import { HOME_PATH, TOURNAMENTS_PATH } from '../../../core/constants/routes'
import { useGetTournamentsQuery } from '../../../core/api/tournamentsApi'
import { useNavigate } from 'react-router-dom'

export const NavBar = () => {
    const navigate = useNavigate()

    const { data: tournaments, isLoading: isTournamentsLoading } =
        useGetTournamentsQuery()

    return (
        <Grid2
            display="flex"
            flexDirection="column"
            p="20px"
            height="100%"
            justifyContent="space-between"
        >
            <Grid2 display="flex" flexDirection="column" gap="30px">
                <GoogleFonts href="https://fonts.googleapis.com/css2?family=Sofia+Sans:ital,wght@0,1..1000;1,1..1000&display=swap" />
                <Typography
                    fontFamily='"Sofia Sans", sans-serif'
                    fontWeight="800"
                    fontStyle="italic"
                    fontSize="25px"
                    lineHeight="30px"
                    textTransform="uppercase"
                    color="text.primary"
                    textAlign="center"
                >
                    score<span style={{ color: '#C3CC5A' }}>bel</span>
                </Typography>
                <SearchBar onSearch={() => {}} />
                <Grid2 display="flex" flexDirection="column" gap="20px">
                    <NavBarLink
                        title="Домашняя"
                        to={HOME_PATH}
                        icon={<HomeOutlinedIcon />}
                    />
                    {/* <NavBarLink
                        title="Teams"
                        to="/teams"
                        icon={<PeopleAltOutlinedIcon />}
                    /> */}
                    {/* <NavBarLink
                        title="Tournaments"
                        to={TOURNAMENTS_PATH}
                        icon={<SportsSoccerOutlinedIcon />}
                    /> */}
                </Grid2>
                <Divider />
                {!tournaments ? (
                    <Grid2>
                        <Skeleton variant="rounded" height="100px" />
                    </Grid2>
                ) : (
                    <Stack gap='5px'>
                        {tournaments.results.map((tournament) => (
                            <Button
                                fullWidth
                                variant="contained"
                                color="inherit"
                                onClick={() =>
                                    navigate(
                                        TOURNAMENTS_PATH.replace(
                                            ':codeName',
                                            tournament.codeName
                                        )
                                    )
                                }
                            >
                                <ListItemText>{tournament.name}</ListItemText>
                            </Button>
                        ))}
                    </Stack>
                )}
            </Grid2>
            <Grid2 display="flex" flexDirection="column">
                <UserMenu />
            </Grid2>
        </Grid2>
    )
}

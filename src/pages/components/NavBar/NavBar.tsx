import { useTheme } from '@emotion/react'
import { Box, Button, Divider, Grid2, Typography } from '@mui/material'
import GoogleFonts from 'react-google-fonts'
import { SearchBar } from '../SearchBar'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined'
import { NavBarLink } from './NavBarLink'
import { UserMenu } from '../common/UserMenu'

export const NavBar = () => {
    return (
        <Grid2 display='flex' flexDirection='column' p='20px' height='100%' justifyContent='space-between'>
            <Grid2 display='flex' flexDirection='column' gap='30px'>
                <GoogleFonts href='https://fonts.googleapis.com/css2?family=Sofia+Sans:ital,wght@0,1..1000;1,1..1000&display=swap' />
                <Typography
                    fontFamily='"Sofia Sans", sans-serif'
                    fontWeight='800'
                    fontStyle='italic'
                    fontSize='25px'
                    lineHeight='30px'
                    textTransform='uppercase'
                    color='text.primary'
                    textAlign='center'
                >
                    score<span style={{ color: '#C3CC5A' }}>bel</span>
                </Typography>
                <SearchBar onSearch={() => {}} />
                <Grid2 display='flex' flexDirection='column' gap='20px'>
                    <NavBarLink
                        title='Home'
                        to='/'
                        icon={<HomeOutlinedIcon />}
                    />
                    <NavBarLink
                        title='Teams'
                        to='/teams'
                        icon={<PeopleAltOutlinedIcon />}
                    />
                    <NavBarLink
                        title='Tournaments'
                        to='/tournaments'
                        icon={<SportsSoccerOutlinedIcon />}
                    />
                </Grid2>
                <Divider />
            </Grid2>
            <Grid2 display='flex' flexDirection='column'>
                <UserMenu />
            </Grid2>
        </Grid2>
    )
}

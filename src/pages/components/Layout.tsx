import {
    Box,
    createTheme,
    CssBaseline,
    Grid2,
    ThemeProvider,
} from '@mui/material'
import React, { FC } from 'react'
import { NavBar } from './NavBar/NavBar'
import { CustomBox } from './common/CustomBox'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#303030',
            paper: '#222222',
        },
    },
})

type PropsType = {
    children: React.ReactNode
}

export const Layout: FC<PropsType> = ({ children }) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline>
                <Grid2
                    display="flex"
                    flexDirection="row"
                    gap="10px"
                    p="10px"
                    height="100vh"
                >
                    <CustomBox width="20%">
                        <NavBar />
                    </CustomBox>
                    <CustomBox width="50%" sx={{ padding: '30px' }}>
                        {children}
                    </CustomBox>
                    <CustomBox width="30%">
                        <Box />
                    </CustomBox>
                </Grid2>
            </CssBaseline>
        </ThemeProvider>
    )
}

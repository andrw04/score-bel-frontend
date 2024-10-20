import { colors, Grid2, Icon, Typography } from '@mui/material'
import { FC, ReactNode, useState } from 'react'
import GoogleFonts from 'react-google-fonts'
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom'

const getLinkColor = (isHovered: boolean, match: boolean) => {
    if (match) {
        return '#C3CC5A'
    }

    return isHovered ? 'text.secondary' : 'text.primary'
}

type PropsType = {
    icon: ReactNode
}

export const NavBarLink: FC<PropsType & LinkProps> = ({ icon, title, to }) => {
    let resolved = useResolvedPath(to)
    let match = useMatch({ path: resolved.pathname, end: true })

    const [isHovered, setIsHovered] = useState(false)

    return (
        <Grid2>
            <GoogleFonts href='https://fonts.googleapis.com/css2?family=Sofia+Sans:ital,wght@0,1..1000;1,1..1000&display=swap' />
            <Link
                style={{
                    textDecoration: 'none',
                }}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                to={to}
            >
                <Typography
                    color={getLinkColor(isHovered, !!match)}
                    fontFamily='Sofia Sans, sans-serif'
                    fontWeight='700'
                    fontSize='20px'
                    lineHeight='24px'
                    alignItems='center'
                    display='flex'
                    flexDirection='row'
                    gap='15px'
                >
                    {icon}
                    {title}
                </Typography>
            </Link>
        </Grid2>
    )
}

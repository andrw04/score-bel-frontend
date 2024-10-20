import { Box } from '@mui/material'
import { FC } from 'react'

type PropsType = {
    children: React.ReactNode
    width: string
    bgColor?: string
}

export const CustomBox: FC<PropsType> = ({
    children,
    width,
    bgColor = 'background.paper',
}) => {
    return (
        <Box
            bgcolor={bgColor}
            borderRadius='5px'
            width={width}
            boxShadow='0 0 10px rgba(0, 0, 0, 0.5)'
            boxSizing='border-box'
        >
            {children}
        </Box>
    )
}

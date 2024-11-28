import { Paper, PaperProps, styled } from '@mui/material'

type PropsType = {
    children: React.ReactNode
    width: string
    bgColor?: string
}

export const CustomBox = styled(Paper)<PropsType & PaperProps>(
    ({ theme, width, bgColor }) => ({
        width: width,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        boxSizing: 'border-box',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#888',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f0f0f0',
      },
    })
)

import { Box, CircularProgress } from '@mui/material'

const Preloader = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1300,
            }}
        >
            <CircularProgress />
        </Box>
    )
}

export default Preloader

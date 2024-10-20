import { Button } from '@mui/material'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import { Link } from 'react-router-dom'

export const UserMenu = () => {
    return (
        <Button
            variant='contained'
            color='inherit'
            endIcon={<LoginOutlinedIcon />}
        >
            Login
        </Button>
    )
}

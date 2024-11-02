import {
    Alert,
    Button,
    Grid2,
    IconButton,
    Skeleton,
    Snackbar,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useGetUserProfileQuery } from '../../../core/api/authApi'
import { LoginOutlined, LogoutOutlined } from '@mui/icons-material'
import SignInForm from '../../SignIn/SignInForm'
import SignUpForm from '../../SignUp/SignUpForm'
import { SCORE_BEL_ACCESS } from '../../../core/constants/api'
import { useAppDispatch } from '../../../core/store/store'
import { removeTokens } from '../../../core/store/authSlice'

export const UserMenu = () => {
    const [showSignUp, setShowSignUp] = useState(false)
    const [showSignIn, setShowSignIn] = useState(false)

    const [showSnackbar, setShowSnackbar] = useState(false)

    const [username, setUsername] = useState('')

    const dispatch = useAppDispatch()

    const token = localStorage.getItem(SCORE_BEL_ACCESS)

    const { data: userProfile, isLoading } = useGetUserProfileQuery(undefined, {
        skip: !token,
    })

    useEffect(() => {
        if (userProfile) {
            setUsername(userProfile.username)
            setShowSnackbar(true)
        }
    }, [userProfile])

    const handleLogout = () => {
        dispatch(removeTokens())

        setUsername('')

        setShowSnackbar(true)
    }

    const handleCloseSnackbar = () => {
        setShowSnackbar(false)
    }

    return (
        <>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {username ? 'Welcome!' : 'Logged Out!'}
                </Alert>
            </Snackbar>
            {username ? (
                <Grid2 display="flex" flexDirection="row" gap="20px">
                    <Button variant="contained" color="inherit" fullWidth>
                        {username}
                    </Button>
                    <IconButton onClick={handleLogout}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid2>
            ) : (
                <Grid2>
                    {isLoading ? (
                        <Skeleton variant="rounded" height="40px" />
                    ) : (
                        <Button
                            variant="contained"
                            color="inherit"
                            fullWidth
                            endIcon={<LoginOutlined />}
                            onClick={() => setShowSignIn(true)}
                        >
                            Sign In
                        </Button>
                    )}
                </Grid2>
            )}
            {showSignIn && !userProfile && (
                <SignInForm
                    onClose={() => setShowSignIn(false)}
                    onSignUpClicked={() => {
                        setShowSignUp(true)
                        setShowSignIn(false)
                    }}
                />
            )}
            {showSignUp && !userProfile && (
                <SignUpForm
                    onClose={() => setShowSignUp(false)}
                    onSignInClicked={() => {
                        setShowSignIn(true)
                        setShowSignUp(false)
                    }}
                />
            )}
        </>
    )
}

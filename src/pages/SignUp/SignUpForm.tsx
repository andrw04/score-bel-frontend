import { Controller, useForm } from 'react-hook-form'
import { Alert, Button, Grid2, TextField, Typography } from '@mui/material'
import { CustomModal } from '../components/common/CustomModal'
import { FC, useEffect } from 'react'
import { useAppDispatch } from '../../core/store/store'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSignUpMutation } from '../../core/api/authApi'
import { setTokens } from '../../core/store/authSlice'
import { LoadingButton } from '@mui/lab'

type SignUpFormType = {
    username: string
    email: string
    password: string
    confirmPassword: string
}

type PropsType = {
    onClose: () => void
    onSignInClicked: () => void
}

const SignUpForm: FC<PropsType> = ({ onClose, onSignInClicked }) => {
    const dispatch = useAppDispatch()

    const validationSchema = yup.object({
        username: yup
            .string()
            .min(3, 'Min 3 characters')
            .required('Username is required'),
        email: yup
            .string()
            .email('Incorrect email')
            .required('Email is required'),
        password: yup
            .string()
            .min(6, 'Min 6 characters')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('Repeat password'),
    })

    const {
        control,
        watch,
        formState: { isValid },
    } = useForm<SignUpFormType>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    })

    const username = watch('username')
    const email = watch('email')
    const password = watch('password')

    const [signUp, { data: tokens, isSuccess, isLoading, isError }] =
        useSignUpMutation()

    const onSubmitHandler = () => {
        if (username && email && password) {
            signUp({ username, email, password })
        }
    }

    useEffect(() => {
        if (isSuccess && tokens) {
            dispatch(
                setTokens({ access: tokens.access, refresh: tokens.refresh })
            )
            onClose()
        }
    }, [isSuccess])

    return (
        <>
            <CustomModal onClose={onClose}>
                <Grid2 display="flex" flexDirection="column" gap="20px">
                    <Typography>Sign Up</Typography>
                    <Controller
                        name="username"
                        control={control}
                        render={({
                            field: { onChange, value },
                            formState: { errors },
                        }) => (
                            <TextField
                                label="Username"
                                value={value}
                                onChange={onChange}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({
                            field: { onChange, value },
                            formState: { errors },
                        }) => (
                            <TextField
                                label="Email"
                                value={value}
                                onChange={onChange}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({
                            field: { onChange, value },
                            formState: { errors },
                        }) => (
                            <TextField
                                type="password"
                                label="Password"
                                value={value}
                                onChange={onChange}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({
                            field: { onChange, value },
                            formState: { errors },
                        }) => (
                            <TextField
                                type="password"
                                label="Confirm Password"
                                value={value}
                                onChange={onChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                        )}
                    />
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Typography
                            display="inline"
                            onClick={onSignInClicked}
                            color="#C3CC5A"
                            sx={{
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            Sign In
                        </Typography>
                    </Typography>
                    <LoadingButton
                        disabled={!isValid}
                        loading={isLoading}
                        type="button"
                        fullWidth
                        variant="contained"
                        color="inherit"
                        onClick={onSubmitHandler}
                    >
                        Register
                    </LoadingButton>
                    {isError && (
                        <Alert variant="filled" severity="error">
                            Something went wrong. Please check your data and try
                            again.
                        </Alert>
                    )}
                </Grid2>
            </CustomModal>
        </>
    )
}

export default SignUpForm

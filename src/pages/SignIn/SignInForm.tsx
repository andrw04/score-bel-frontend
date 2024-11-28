import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CustomModal } from '../components/common/CustomModal'
import { Alert, Grid2, TextField, Typography } from '@mui/material'
import { useSignInMutation } from '../../core/api/authApi'
import { useAppDispatch } from '../../core/store/store'
import { setTokens } from '../../core/store/authSlice'
import { LoadingButton } from '@mui/lab'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from 'react-router-dom'

type SignInFormType = {
    email: string
    password: string
}

type PropsType = {
    onClose: () => void
    onSignUpClicked: () => void
}

const SignInForm: FC<PropsType> = ({ onClose, onSignUpClicked }) => {
    const dispatch = useAppDispatch()

    const validationSchema = yup.object({
        email: yup
            .string()
            .email('Incorrect email')
            .required('Email is required'),
        password: yup
            .string()
            .min(6, 'Min 6 characters')
            .required('Password is required'),
    })

    const {
        control,
        formState: { isValid },
        watch,
    } = useForm<SignInFormType>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    })

    const email = watch('email')
    const password = watch('password')

    const [signIn, { data: tokens, isSuccess, isLoading, isError }] =
        useSignInMutation()

    const onSubmitHandler = () => {
        if (email && password) {
            signIn({ email, password })
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
                    <Typography>Sign In</Typography>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
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
                        defaultValue=""
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
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Typography
                            display="inline"
                            onClick={onSignUpClicked}
                            color="#C3CC5A"
                            sx={{
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            Sign Up
                        </Typography>
                    </Typography>
                    <LoadingButton
                        disabled={!isValid}
                        loading={isLoading}
                        fullWidth
                        variant="contained"
                        color="inherit"
                        onClick={onSubmitHandler}
                    >
                        Sign In
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

export default SignInForm

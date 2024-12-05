import { Avatar, Box, Typography } from '@mui/material'
import { FC } from 'react'

type PropsType = {
    author: string
    text: string
    isCurrentUser: boolean
}

const Message: FC<PropsType> = ({ author, text, isCurrentUser }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isCurrentUser ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                marginBottom: '16px',
            }}
        >
            <Avatar
                src=''
                alt={author}
                sx={{
                    marginLeft: isCurrentUser ? '16px' : '0',
                    marginRight: isCurrentUser ? '0' : '16px',
                }}
            />
            <Box
                sx={{
                    maxWidth: '70%',
                    backgroundColor: isCurrentUser ? '#1976d2' : '#f0f0f0',
                    color: isCurrentUser ? 'white' : 'black',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    textAlign: isCurrentUser ? 'right' : 'left',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '4px',
                    }}
                >
                    {author}
                </Typography>
                <Typography variant="body1">{text}</Typography>
            </Box>
        </Box>
    )
}

export default Message

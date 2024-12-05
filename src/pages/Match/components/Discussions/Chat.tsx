import { FC, useMemo, useState } from 'react'
import { MatchDiscussionMessage } from '../../../../core/types/matchesTypes'
import {
    Box,
    Button,
    CircularProgress,
    Grid2,
    IconButton,
    List,
    ListItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Send } from '@mui/icons-material'
import Message from './Message'
import {
    useGetMatchDiscussionMessagesQuery,
    useSendDiscussionMessageMutation,
} from '../../../../core/api/matchesApi'
import { reverse } from 'lodash'

type PropsType = {
    matchId: string
}

const Chat: FC<PropsType> = ({ matchId }) => {
    const currentUser = useSelector((state: any) => state.auth.username)
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    )

    const { data: rawMessages, isLoading: isMessagesLoading } =
        useGetMatchDiscussionMessagesQuery(matchId)
    const [sendMessage, { isLoading: isSending }] =
        useSendDiscussionMessageMutation()

    const messages = useMemo(() => {
        if (!rawMessages) {
            return []
        }

        return [...rawMessages].reverse()
    }, [rawMessages])

    const [input, setInput] = useState('')

    const handleSendMessage = async () => {
        const message = input.trim()

        if (message) {
            await sendMessage({
                matchId,
                body: {
                    message,
                },
            })

            setInput('')
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    }

    return (
        <>
            <Paper elevation={2} sx={{ height: '100%' }}>
                <Grid2 display="flex" flexDirection="column" height="100%">
                    <List
                        sx={{
                            overflowY: 'auto',
                            padding: '16px',
                            maxHeight: '250px'
                        }}
                    >
                        {messages.length == 0 && (
                            <Typography align="center">
                                There are no messages...
                            </Typography>
                        )}
                        {messages.map((message, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    justifyContent:
                                        message.username == currentUser
                                            ? 'flex-end'
                                            : 'flex-start',
                                    padding: '8px',
                                }}
                            >
                                <Message
                                    author={message.username}
                                    text={message.message}
                                    isCurrentUser={
                                        message.username == currentUser
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Stack direction="row" p="10px" mt="auto">
                        <TextField
                            value={input}
                            onChange={handleInputChange}
                            fullWidth
                            placeholder="Type your message yet..."
                            variant="outlined"
                            disabled={!isAuthenticated}
                            sx={{
                                marginRight: '8px',
                            }}
                        />
                        {isSending ? (
                            <CircularProgress size="50px" />
                        ) : (
                            <IconButton
                                onClick={handleSendMessage}
                                disabled={!isAuthenticated}
                                sx={{ height: '50px', width: '50px' }}
                            >
                                <Send />
                            </IconButton>
                        )}
                    </Stack>
                </Grid2>
            </Paper>
        </>
    )
}

export default Chat

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography, Box, Container, TextField, Button } from '@mui/material';
import { CheckCircleOutline, HourglassEmpty } from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';
import toast from 'react-hot-toast';

/** Components **/
import MessageList from '../MessagesList';

/** Hooks **/
import useAuth from "../../hooks/useAuth";
import useMessageManager from "../../hooks/useMessageManager";

/** API **/
import { getIdeaJSON } from '../../api/ideas/getIdeas';

/** Utils **/
import { formatDateAndTimeFR } from '../../services/Format/Date';


const IdeaDetails = () => {
    const { auth } = useAuth();
    const { ideaId } = useParams();

    {/* Ideas */ }
    const [idea, setIdea] = useState(null);
    const isCompleted = idea?.state && idea.state == "done";
    const statusLabel = isCompleted ? 'Terminée' : 'En cours';
    const StatusIcon = isCompleted ? CheckCircleOutline : HourglassEmpty;

    {/* Messages */ }
    const { messages, countMessages, isLoading, isError, fetchMessages, addMessage } = useMessageManager("ideas", ideaId);
    const [newMessage, setNewMessage] = useState("");
    const [page, setPage] = useState(1);
    const messagesPerPage = 10;
    const indexOfLastMessage = page * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };
    const handleSubmitMessage = () => {
        const messageData = {
            content: newMessage,
            ideaId: ideaId,
            userId: auth.userId,
            userName: auth.user,
            createdAt: new Date(),
        };
        addMessage(messageData).then(() => {
            toast.success("Message Submitted")
            setNewMessage("");
            setPage(1);
        }).catch((error) => {
            console.log(error);
            toast.error("An Error Occured")
        });
    };

    const handleFetchMessages = useCallback(() => {
        fetchMessages();
    }, [fetchMessages]);

    {/*  useEffect */ }
    useEffect(() => {
        getIdeaJSON(ideaId).then((idea) => {
            idea && setIdea(idea);
        });
    }, [ideaId]);

    useEffect(() => {
        handleFetchMessages();
    }, [handleFetchMessages]);

    if (!idea) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/*  Idea and Message */}
            <Container sx={{ mt: 10 }}>
                <Paper style={{ padding: 20 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h4">
                                {idea.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Box display="flex" alignItems="center">
                                <StatusIcon />
                                <Typography variant="body1" style={{ marginLeft: 8 }}>
                                    {statusLabel}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography variant="body1">{idea.description}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        Créé le : {formatDateAndTimeFR(idea.createdAt)}
                    </Typography>
                    {idea.updatedAt && idea.createdAt !== idea.updatedAt && (
                        <Typography variant="body2" color="textSecondary">
                            Modifié le : {formatDateAndTimeFR(idea.updatedAt)}
                        </Typography>
                    )}
                    <Typography variant="body2">
                        Points : {idea.points}
                    </Typography>
                </Paper>
                {/*  Add Message */}
                {
                    auth.userId && !isCompleted && (
                        <Container style={{ marginTop: 20 }}>
                            <Typography variant="h5">Ajouter un message</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Votre message"
                                        multiline
                                        rows={4}
                                        value={newMessage}
                                        onChange={handleNewMessageChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" onClick={handleSubmitMessage}>
                                        Envoyer
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    )
                }
                <Container style={{ marginTop: 20 }}>
                    <Typography variant="h5">{countMessages > 0 ? countMessages : "Aucun"} message{countMessages > 1 ? "s" : ""}</Typography>
                    {isLoading && <div>Loading...</div>}
                    {isError && <div>Error</div>}
                    {messages.length > 0 && (
                        <>
                            <Pagination
                                count={Math.ceil(messages.length / messagesPerPage)}
                                page={page}
                                onChange={(event, value) => setPage(value)}
                            />
                            <br />
                            <MessageList messages={currentMessages} />
                        </>
                    )}
                </Container>
            </Container>
        </>
    );
}

export { IdeaDetails };
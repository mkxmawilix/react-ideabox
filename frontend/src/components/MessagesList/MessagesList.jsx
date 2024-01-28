import { Grid, Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

/** Services **/
import { formatDateAndTimeFR } from '../../services/Format/Date';

const MessageList = ({ messages }) => {
    return (
        <Grid container spacing={2}>
            {messages.map((message, index) => (
                <Grid item xs={12} key={message.id || index}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="subtitle2" color="textSecondary">
                                {formatDateAndTimeFR(message.createdAt)}
                            </Typography>
                            <Typography variant="subtitle1">
                                {message.userName}
                            </Typography>
                            <Typography variant="body1">
                                {message.content}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

MessageList.propTypes = {
    messages: PropTypes.array.isRequired,
};

export { MessageList };

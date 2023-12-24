import { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';

import PropTypes from 'prop-types';

const IdeaSubmissionForm = ({ onSubmitIdea }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmitIdea({ title: title, description: description, points: 0, state: 'pending', date: new Date().toISOString()});
        setTitle('');
        setDescription('');
    };

    return (
        <Card variant="outlined" sx={{ margin: 2 }}>
            <CardContent>
                <Typography variant="h5">Soumettre une Nouvelle Idée</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Titre de l'idée"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required={true}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        required={true}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>Soumettre</Button>
                </form>
            </CardContent>
        </Card>
    );
};

IdeaSubmissionForm.propTypes = {
    onSubmitIdea: PropTypes.func,
};

export { IdeaSubmissionForm };

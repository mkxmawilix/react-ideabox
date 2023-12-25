import { TextField, Button, Card, CardContent, Typography, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const GenericForm = ({ title, fields, onSubmit, errorMessage, messageBottom }) => {
    return (
        <Card variant="outlined" sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>{title}</Typography>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <form onSubmit={onSubmit}>
                    {fields.map((field, index) => (
                        <TextField
                            key={index}
                            label={field.label}
                            type={field.type}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={field.value}
                            onChange={field.onChange}
                            autoFocus={field.autoFocus || false}
                            required={field.required || false}
                        />
                    ))}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {title}
                    </Button>
                </form>
            </CardContent>
            {messageBottom && <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Typography variant="body2">
                    {messageBottom}
                </Typography>
            </div>}
        </Card>
    );
};

GenericForm.propTypes = {
    title: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    messageBottom: PropTypes.string,
};

export { GenericForm };
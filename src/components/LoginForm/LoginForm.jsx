import { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigateTo = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            // TODO : Logique de connexion une API
            if (email === "admin@dev.fr" && password === "admin") {
                login();
                navigateTo('/');
            } else {
                throw new Error("Identifiants incorrects");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Card variant="outlined" sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>Connexion</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Mot de Passe"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
            Se Connecter
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export { LoginForm };

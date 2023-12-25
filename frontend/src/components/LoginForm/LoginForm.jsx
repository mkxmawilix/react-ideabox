import { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Alert } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { useNavigate, Link} from 'react-router-dom';

import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signIn({ email: email, password: password });
            navigate('/', { replace: true });
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
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Typography variant="body2">
                    Pas encore de compte ? <MuiLink component={Link} to="/register">Créer un compte</MuiLink>
                </Typography>
            </div>
        </Card>
    );
}

export { LoginForm };

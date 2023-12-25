import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Link as MuiLink } from '@mui/material';


//  Hooks
import useAuth from "../../hooks/useAuth";

//  Components
import GenericForm from '../GenericForm';

const LoginForm = () => {
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signIn({ email, password });
        } catch (err) {
            setError(err.message);
        }
    };

    const fields = [
        { label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value) },
        { label: "Mot de Passe", type: "password", value: password, onChange: (e) => setPassword(e.target.value) }
    ];

    return (
        <div>
            <GenericForm
                title="Connexion"
                fields={fields}
                onSubmit={handleSubmit}
                errorMessage={error}
            />
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Typography variant="body2">
                    Pas encore de compte ? <MuiLink component={Link} to="/register">Créer un compte</MuiLink>
                </Typography>
            </div>
        </div>
    );
}

export { LoginForm };

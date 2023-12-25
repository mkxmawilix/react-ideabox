import { useState } from 'react';
import useAuth from "../../hooks/useAuth";

import GenericForm from '../GenericForm';

const RegisterForm = () => {
    const { signUp } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (password !== passwordConfirm) {
                throw new Error("Les mots de passe ne correspondent pas");
            }
            const created_at = new Date().toISOString();
            await signUp({ email, password, username, created_at });
        } catch (err) {
            setError(err.message);
        }
    };

    const fields = [
        { label: "Utilisateur", type: "text", value: username, onChange: (e) => setUsername(e.target.value), autoFocus: true, required: true},
        { label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true },
        { label: "Mot de Passe", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true},
        { label: "Confirmer le mot de passe", type: "password", value: passwordConfirm, onChange: (e) => setPasswordConfirm(e.target.value), required: true }
    ];

    return <GenericForm title="Inscription" fields={fields} onSubmit={handleSubmit} errorMessage={error} />;
};

export { RegisterForm };

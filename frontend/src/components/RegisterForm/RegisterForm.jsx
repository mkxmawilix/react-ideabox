import { useState } from 'react';
import useAuth from "../../hooks/useAuth";

/** Components **/
import GenericForm from '../GenericForm';

/** Services **/
import { generateAvatar } from '../../services/Image';

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
            {/* Generate an avatar from the user's initials */}
            const initials = username.split(' ').map(name => name[0]).join('');
            const initialAvatar = generateAvatar(initials);
            await signUp({ email, password, username, avatar: initialAvatar });
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

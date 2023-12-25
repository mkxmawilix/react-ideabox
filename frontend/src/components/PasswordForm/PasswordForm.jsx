import { useState } from 'react';
import PropTypes from 'prop-types';

/** Components **/
import GenericForm from '../GenericForm';

/** Hooks **/
import useAuth from "../../hooks/useAuth";

const PasswordForm = ({ handleClose }) => {

    const { auth, updatePassword } = useAuth();

    const [newPassword, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newPassword !== passwordConfirm) {
                throw new Error("Les mots de passe ne correspondent pas");
            }
            updatePassword({auth, newPassword});
            handleClose();
        } catch (err) {
            setError(err.message);
        }
    };

    const fields = [
        { label: "Mot de Passe", type: "password", value: newPassword, onChange: (e) => setPassword(e.target.value), required: true},
        { label: "Confirmer le mot de passe", type: "password", value: passwordConfirm, onChange: (e) => setPasswordConfirm(e.target.value), required: true }
    ];

    return <GenericForm title="Modifier le mot de passe" fields={fields} onSubmit={handleSubmit} errorMessage={error} />;
};

PasswordForm.propTypes = {
    handleClose: PropTypes.func,
};

export { PasswordForm };

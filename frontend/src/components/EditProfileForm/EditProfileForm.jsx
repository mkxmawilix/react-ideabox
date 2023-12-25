import { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, Alert } from '@mui/material';

/** Components **/
import PasswordChangeModal from '../PasswordChangeModal';

/** Hooks **/
import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';

/**  Styles **/
import { ProfileFormContainer } from './style';


const EditProfileForm = () => {
    const { auth, updateUserinfo, getUser} = useAuth();

    const [userInfo, setUserInfo] = useState({ username: '', email: '' });
    const [error, setError] = useState('');
    const [isEditable, setIsEditable] = useState(false);

    const { isModalOpen, openModal, closeModal } = useModal();

    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleSaveClick = () => {
        try {
            if (userInfo.username === '') {
                setError('Le nom d\'utilisateur ne peut pas être vide');
                return;
            }
            if (userInfo.email === '') {
                setError('L\'email ne peut pas être vide');
                return;
            }
            if (auth.user === userInfo.username) {
                setError('Aucune modification n\'a été apportée');
                return;
            }
            updateUserinfo({ auth, userInfo })
            setIsEditable(false);

        } catch (err) {
            setError(err.message);
        }
    };

    // Chargez les informations de l'utilisateur depuis le backend
    useEffect(() => {
        if (!auth) {
            return;
        }
        getUser(auth.userId).then((response) => {
            setUserInfo({ username: response.username, email: response.email });
        });
    }, [auth]);

    return (
        <ProfileFormContainer>
            <Card>
                <CardContent>
                    <Typography variant="h5">Profil de l&apos;Utilisateur</Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField
                        label="Nom d'utilisateur"
                        type="text"
                        fullWidth
                        margin="normal"
                        variant={isEditable ? 'outlined' : 'filled'}
                        value={userInfo.username}
                        required={true}
                        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                        InputProps={{
                            readOnly: !isEditable,
                        }}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        variant="filled"
                        value={userInfo.email}
                        required={true}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    {isEditable ? (
                        <Button onClick={handleSaveClick} variant="contained" color="primary" sx={{ mt: 2 }}>
                        Sauvegarder
                        </Button>
                    ) : (
                        <Button onClick={handleEditClick} variant="contained" color="primary" sx={{ mt: 2 }}>
                        Modifier
                        </Button>
                    )}
                    <Button onClick={openModal} variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
                    Modifier mon mot de passe
                    </Button>
                    <PasswordChangeModal isOpen={isModalOpen} handleClose={closeModal} />
                </CardContent>
            </Card>
        </ProfileFormContainer>
    );
}

export { EditProfileForm };

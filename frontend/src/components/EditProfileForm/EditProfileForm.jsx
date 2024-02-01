import { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, Alert, Avatar } from '@mui/material';

/** Components **/
import PasswordChangeModal from '../PasswordChangeModal';

/** Hooks **/
import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';

/**  Styles **/
import { ProfileFormContainer } from './style';

/** Services **/
import { resizeImage } from '../../services/Image';

const EditProfileForm = () => {
    const { auth, updateUserinfo, getUser } = useAuth();

    const [initialUserInfo, setInitialUserInfo] = useState({ username: '', email: '', avatar: '' });
    const [userInfo, setUserInfo] = useState({ username: '', email: '', avatar: '' });

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

            {/* Check if the user has made any changes to the form, to avoid unnecessary API calls */}
            const hasChanges = Object.keys(userInfo).some(key => userInfo[key] !== initialUserInfo[key]);
            if (!hasChanges) {
                setError('Aucune modification détectée.');
                return;
            }

            updateUserinfo({ auth, userInfo });
            setIsEditable(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            {/* Arbitrary resize for avatar. This is to avoid uploading a huge image. */}
            resizeImage(file, 100, 100, (resizedImage) => {
                setUserInfo({ ...userInfo, avatar: resizedImage });
            });
        }
    };

    useEffect(() => {
        if (!auth) {
            return;
        }
        getUser(auth.userId).then((response) => {
            const userData = { username: response.username, email: response.email, avatar: response.avatar };
            setUserInfo(userData);
            setInitialUserInfo(userData);
        });
    }, [auth, getUser]);

    return (
        <ProfileFormContainer>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Profil de l&apos;utilisateur</Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                        <div>
                            <Avatar
                                src={userInfo.avatar || ''}
                                alt="Avatar de l'utilisateur"
                                sx={{ width: 100, height: 100 }}
                            />
                            {isEditable && (
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{ mt: 2 }}
                                >
                                    Changer l&apos;Avatar
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                    />
                                </Button>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
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
                                <span>
                                    <Button onClick={handleSaveClick} variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Sauvegarder
                                    </Button>
                                    <Button onClick={() => setIsEditable(false)} variant="outlined" color="primary" sx={{ mt: 2, ml: 2 }}>
                                        Annuler
                                    </Button>
                                </span>
                            ) : (
                                <Button onClick={handleEditClick} variant="contained" color="primary" sx={{ mt: 2 }}>
                                    Modifier
                                </Button>
                            )}
                            <Button onClick={openModal} variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
                                Modifier mon mot de passe
                            </Button>
                        </div>
                    </div>
                    <PasswordChangeModal isOpen={isModalOpen} handleClose={closeModal} />
                </CardContent>
            </Card>
        </ProfileFormContainer>
    );
}

export { EditProfileForm };

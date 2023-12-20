import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

/** Auth **/
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './hooks/useAuth';

/** Components **/
import IdeaList from './components/IdeaList'
import LoginForm from './components/LoginForm'

/** Pages **/
import { NoMatch } from './pages/no-match'

/** CSS **/
import './App.css'

const initialIdeas = [
    {
        date: '2021-10-01 10:00:00',
        title: 'Créer une application web',
        description: 'Une application web pour gérer les idées',
        points: 10,
        state: 'pending',
    },
    {
        date: '2021-10-01 10:00:00',
        title: 'Créer une application mobile',
        description: 'Une application mobile pour gérer les idées',
        points: 45,
        state: 'pending',

    },
    {
        date: '2021-10-01 15:30:00',
        title: 'Créer une application desktop',
        description: 'Une application desktop pour gérer les idées',
        points: 30,
        state: 'done',
    },
]

const App = () => {

    {/* Gestion de l'utilisateur */}
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
        handleMenuClose();
    };

    {/* Gestion du menu de connexion */}
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    {/* Gestion des idées */}
    const [ideas, setIdeas] = useState(initialIdeas)
    const onSubmitIdea = (idea) => {
        setIdeas([...ideas, idea])
    }
    const pendingIdeas = ideas.filter((idea) => idea.state !== 'done')
    const completedIdeas = ideas.filter((idea) => idea.state === 'done')

    return (
        <AuthProvider>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 0.05 }}>Boîte à Idées</Typography>
                        {/* Section de navigation */}
                        <Button color="inherit" component={Link} to="/">Idées en Cours</Button>
                        <Button color="inherit" component={Link} to="/completed-ideas">Idées Terminées</Button>
                        {/* Section de gestion de l'utilisateur */}
                        <div style={{ marginLeft: 'auto' }}>
                            {/* Icône de profil ou autre élément de gestion de l'utilisateur */}
                            <IconButton
                                edge="end"
                                aria-label="Compte de l'utilisateur"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom', // Position verticale sous l'icône
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top', // Origine de la transformation depuis le haut
                                    horizontal: 'right',
                                }}
                                open={isMenuOpen}
                                onClose={handleMenuClose}
                            >
                                {isLoggedIn ? (
                                    <MenuItem onClick={handleMenuClose} component={Link} to="/profile">Mon Profil</MenuItem>
                                ) : (
                                    <MenuItem onClick={handleMenuClose} component={Link} to="/login">Connexion</MenuItem>
                                )}
                                {isLoggedIn && (
                                    <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                                )}
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>

                <main style={{ padding: '16px' }}>
                    <Routes>
                        <Route exact path="/" element={<IdeaList ideas={pendingIdeas} onSubmitIdea={onSubmitIdea}/>} />
                        <Route path="/completed-ideas" element={<IdeaList ideas={completedIdeas} onSubmitIdea={onSubmitIdea}/>} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                </main>
            </Router>
        </AuthProvider>
    );
}

export default App

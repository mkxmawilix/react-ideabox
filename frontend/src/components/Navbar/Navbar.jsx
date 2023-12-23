import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, CssBaseline} from '@mui/material';
import { styled } from '@mui/material/styles';
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import AccountCircle from '@mui/icons-material/AccountCircle';

/** Hooks **/
import useAuth from '../../hooks/useAuth';

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px',
    marginLeft: '20px',
    '&:hover': {
        color: 'white',
        borderBottom: '1px solid white',
    },
});

const StyledNavLinks = styled('div')({
    marginLeft: '10px',
    display: 'flex',
});


const NavBar = () => {
    const { auth, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        handleMenuClose();
        signOut();
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        console.log("NavBar: useEffect auth", auth);
        if (!auth) {
            navigate("/");
        } else {
            navigate("/pending-ideas");
        }
    }, [auth]);

    return (
        <AppBar>
            <CssBaseline />
            <Toolbar>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                    <InboxTwoToneIcon style={{ marginRight: '10px' }} />
                    <Typography variant="h6" style={{ cursor: 'pointer' }}>Boîte à Idées</Typography>
                </Link>
                <StyledNavLinks>
                    <StyledLink component={Link} to="/pending-ideas">
                    Idées en Cours
                    </StyledLink>
                    <StyledLink component={Link} to="/completed-ideas">
                    Idées Terminées
                    </StyledLink>
                </StyledNavLinks>
                <div style={{ marginLeft: 'auto' }}>
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
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                    >
                        {auth ? (
                            <div>
                                <MenuItem onClick={handleMenuClose} component={Link} to="/profile">Mon Profil</MenuItem>
                                <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                            </div>
                        ) : (
                            <MenuItem onClick={handleMenuClose} component={Link} to="/login">Connexion</MenuItem>
                        )}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export { NavBar };
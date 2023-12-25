import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Menu, MenuItem, CssBaseline, ButtonBase} from '@mui/material';
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
    const { auth, user, signOut } = useAuth();
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
        if (!auth) {
            navigate("/");
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
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    <ButtonBase
                        onClick={handleProfileMenuOpen}
                        style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}
                    >
                        <AccountCircle />
                        {user && (
                            <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
                                {user}
                            </Typography>
                        )}
                    </ButtonBase>
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
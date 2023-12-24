import { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// Hooks
import useModal from '../../hooks/useModal';

// Components
import IdeaModal from '../IdeaModal';

// Services
import {formatDateAndTimeFR} from '../../services/Format/Date';

// Styles
import { GridContainer } from './style';

const TopIdeas = ({ ideas }) => {
    const { isModalOpen, modalContent, openModal, closeModal } = useModal(false);
    const [topIdeas, setTopIdeas] = useState([]);

    useEffect(() => {
        const sortedIdeas = [...ideas]
            .filter(idea => idea.state !== 'done') // Filtre les idées non terminées
            .sort((a, b) => b.points - a.points) // Trie les idées par points, décroissant
            .slice(0, 5); // Prend les 5 premières idées

        setTopIdeas(sortedIdeas);
    }, [ideas]);

    const handleOpenModalRead = (idea) => {
        openModal(idea);
    };

    return (
        <GridContainer>
            <Typography variant="h5" component="h2">Top 5 Ideas</Typography>
            <Grid container justify="center" spacing={2}>
                {topIdeas.map(idea => (
                    <Grid item key={idea.id} xs={12} sm={6} md={4} lg={3}>
                        <Card key={idea.id} variant="outlined" style={{ marginBottom: '10px' }}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {formatDateAndTimeFR(idea.created_at)}
                                </Typography>
                                <Typography variant="h6">
                                    {idea.title}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    size="small" 
                                    onClick={() => handleOpenModalRead(idea)}
                                    startIcon={<SearchIcon />}
                                >
                        Voir Plus
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {isModalOpen && (
                <IdeaModal 
                    idea={modalContent} 
                    isOpen={isModalOpen} 
                    handleClose={closeModal} 
                />
            )}
        </GridContainer>
    );
}

TopIdeas.propTypes = {
    ideas: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export {TopIdeas};
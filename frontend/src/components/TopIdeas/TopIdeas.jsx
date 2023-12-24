import { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

// Hooks
import useModal from '../../hooks/useModal';

// Components
import IdeaModal from '../IdeaModal';

// Services
import {formatDateAndTimeFR} from '../../services/Format/Date';

// Styles
import { GridContainer } from './style';

const TopIdeas = ({ ideas, sortFunction, title, count }) => {
    const { isModalOpen, modalContent, openModal, closeModal } = useModal(false);
    const [topIdeas, setTopIdeas] = useState([]);

    useEffect(() => {
        const newIdeas = [...ideas].sort(sortFunction).slice(0, count);
        setTopIdeas(newIdeas);
    }, [ideas, sortFunction, count]);

    const handleOpenModalRead = (idea) => {
        openModal(idea);
    };

    return (
        <GridContainer>
            <Typography variant="h5" component="h2">{title}</Typography>
            <Grid container justify="center" spacing={2}>
                {topIdeas.map(idea => (
                    <Grid item={+true} key={idea.id} xs={12} sm={6} md={4} lg={3}>
                        <Card key={idea.id} variant="outlined" style={{ marginBottom: '10px' }}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {formatDateAndTimeFR(idea.created_at)}
                                </Typography>
                                <Typography variant="h6">
                                    {idea.title}
                                </Typography>
                                {
                                    (idea.state === 'done' && idea.closed_at) ? (
                                        <Typography variant="caption">
                                            Clôturée le {formatDateAndTimeFR(idea.closed_at)}
                                        </Typography>) : null
                                }
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
    sortFunction: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};

export {TopIdeas};
import React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import IdeaModal from '../IdeaModal';

import PropTypes from "prop-types";

import { useAuth } from "../../hooks/useAuth";

/** SVG **/
import ThumbUp from '../../assets/icons/thumb-up.svg';
import ThumbDown from '../../assets/icons/thumb-down.svg';

const StyledButtonRight = styled(Button)({
    float: 'right',
});


const IdeaList = ({ ideas, onSubmitIdea }) => {
    const { isLoggedIn } = useAuth();
    // Logic to handle modal state
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const handleSubmit = (idea) => {
        onSubmitIdea(idea);
        handleClose();
    }
    // Vote Up and Vote Down
    const onClickVoteUp = (row) => {
        console.log(row);
    }
    const onClickVoteDown = (row) => {
        console.log(row);
    }

    return (
        <>
            <div>
                {isLoggedIn && (
                    <StyledButtonRight variant="contained" color="primary" onClick={handleOpen} align="right">+ Ajouter une Nouvelle Idée</StyledButtonRight>
                )}
                <IdeaModal open={modalOpen} handleClose={handleClose} onSubmitIdea={handleSubmit}/>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Date d&apos;ajout</TableCell>
                                <TableCell align="left">Titre</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell>Points</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ideas.map((idea) => (
                                <TableRow
                                    key={idea.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="left">
                                        {idea.date}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="left">
                                        {idea.title}
                                    </TableCell>
                                    <TableCell align="left">{idea.description}</TableCell>
                                    <TableCell>{idea.points}</TableCell>
                                    <TableCell>
                                        {isLoggedIn && (
                                            <>
                                                <Button onClick={() => onClickVoteUp(idea)}><img src={ThumbUp} alt="icon" width={50} height={50}/></Button>
                                                <Button onClick={() => onClickVoteDown(idea)}><img src={ThumbDown} alt="icon" width={50} height={50} /></Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

IdeaList.propTypes = {
    ideas: PropTypes.array,
    onSubmitIdea: PropTypes.func,
};

export { IdeaList };
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Add from '@mui/icons-material/Add';

/** Components **/
import IdeaModal from '../IdeaModal';

import PropTypes from "prop-types";

/** SVG **/
import ThumbUp from '../../assets/icons/thumb-up.svg';
import ThumbDown from '../../assets/icons/thumb-down.svg';

/** Hooks **/
import useAuth from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";

/** Styles **/
import { 
    StyledButtonRight, StyledHeadCellDateCreatedAt, StyledHeadCellTitle, StyledHeadCellDescription,
    StyledHeadCellPoints, StyledHeadCellVote, StyledTableCellDescription, IdeasContainer
} from './style';



const IdeaList = ({ ideas, onSubmitIdea }) => {
    const { auth } = useAuth();

    // Logic to handle modal state for creation
    const { isModalOpen, modalContent, openModal, closeModal } = useModal();
    const handleOpenModalCreate = () => {
        openModal();
    };
    const handleSubmit = (idea) => {
        onSubmitIdea(idea);
        closeModal();
    }

    const handleOpenModalRead = (idea) => {
        openModal(idea);
    };

    // Vote Up and Vote Down
    const onClickVoteUp = (row) => {
        console.log(row);
    }
    const onClickVoteDown = (row) => {
        console.log(row);
    }

    // Sorting
    const [orderDirection, setOrderDirection] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('created_at');

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedIdeas = [...ideas].sort((a, b) => {
        if (orderBy === 'created_at') {
            return orderDirection === 'asc' ? new Date(a.created_at) - new Date(b.created_at) : new Date(b.created_at) - new Date(a.created_at);
        }
        if (orderBy === 'points') {
            return orderDirection === 'asc' ? a.points - b.points : b.points - a.points;
        }
        if (orderBy === 'title') {
            return orderDirection === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        }
        return 0;
    });
    const sortIcon = (column) => {
        return orderBy === column ? (
            orderDirection === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />
        ) : null;
    };

    // Render
    const renderNewLineText = (text) => {
        if (!text) {
            return null;
        }
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <IdeasContainer>
            <div>
                {auth.token && (
                    <StyledButtonRight variant="contained" color="primary" startIcon={<Add />} onClick={handleOpenModalCreate} align="right">Ajouter une Nouvelle Idée</StyledButtonRight>
                )}
                <IdeaModal isOpen={isModalOpen}
                    handleClose={closeModal}
                    idea={modalContent}
                    onSubmitIdea={handleSubmit}
                />
            </div>
            <div style={{ height: 400, width: '100%'}}>
                <TableContainer component={Paper}>
                    <Table sx={{ tableLayout: 'fixed' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledHeadCellDateCreatedAt onClick={() => handleRequestSort('created_at')}>
                                    <div style={{display:'flex'}}>
                                        <div>Date d&apos;ajout</div> <div>{sortIcon('created_at')}</div>
                                    </div>
                                </StyledHeadCellDateCreatedAt>
                                <StyledHeadCellTitle onClick={() => handleRequestSort('title')}>
                                    <div style={{display:'flex'}}>
                                        <div>Titre</div> <div>{sortIcon('title')}</div>
                                    </div>
                                </StyledHeadCellTitle>
                                <StyledHeadCellDescription>Description</StyledHeadCellDescription>
                                <StyledHeadCellPoints onClick={() => handleRequestSort('points')}>
                                    <div style={{display:'flex'}}>
                                        <div>Points</div> <div>{sortIcon('points')}</div>
                                    </div>
                                </StyledHeadCellPoints>
                                <StyledHeadCellVote>Vote</StyledHeadCellVote>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedIdeas.map((idea) => (
                                <TableRow
                                    key={idea.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => handleOpenModalRead(idea)}
                                >
                                    <TableCell component="th" scope="row" align="left">
                                        {new Date(idea.created_at).toLocaleString('fr-FR')}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="left">
                                        {idea.title}
                                    </TableCell>
                                    <StyledTableCellDescription>
                                        {renderNewLineText(idea.description)}
                                    </StyledTableCellDescription>
                                    <TableCell>{idea.points}</TableCell>
                                    <TableCell align="right">
                                        {auth.token && (
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
        </IdeasContainer>
    );
};

IdeaList.propTypes = {
    ideas: PropTypes.array,
    onSubmitIdea: PropTypes.func,
};

export { IdeaList };
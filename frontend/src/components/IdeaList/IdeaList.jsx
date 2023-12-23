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
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

/** Components **/
import IdeaModal from '../IdeaModal';

import PropTypes from "prop-types";

/** SVG **/
import ThumbUp from '../../assets/icons/thumb-up.svg';
import ThumbDown from '../../assets/icons/thumb-down.svg';

/** Hooks **/
import useAuth from "../../hooks/useAuth";

/** Styles **/

const StyledButtonRight = styled(Button)({
    float: 'right',
});

const StyledTableHeadCell = styled(TableCell)({
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
});

const StyledHeadCellDateCreatedAt = styled(StyledTableHeadCell)({
    width: '20%',
    align: 'left',
});

const StyledHeadCellTitle = styled(StyledTableHeadCell)({
    width: '20%',
    align: 'left',
});

const StyledHeadCellDescription = styled(StyledTableHeadCell)({
    width: '20%',
    align: 'left',
    cursor: 'default',
});

const StyledTableCellDescription = styled(TableCell)({
    width: '20%',
    align: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
});

const StyledHeadCellPoints = styled(StyledTableHeadCell)({
    width: '10%',
});

const StyledHeadCellVote = styled(StyledTableHeadCell)({
    width: '10%',
    align: 'right',
});


const IdeaList = ({ ideas, onSubmitIdea }) => {
    const { auth } = useAuth();

    // Logic to handle modal state for creation
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleOpenModalCreate = () => {
        setSelectedIdea(null); // Réinitialise l'idée sélectionnée
        setModalOpen(true);
    };
    const handleCloseModal = () => setModalOpen(false);
    const handleSubmit = (idea) => {
        onSubmitIdea(idea);
        handleCloseModal();
    }

    // Logic to handle modal state for update
    const [selectedIdea, setSelectedIdea] = React.useState(null);

    const handleOpenModalRead = (idea) => {
        setSelectedIdea(idea);
        setModalOpen(true);
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
        <>
            <div>
                {auth && (
                    <StyledButtonRight variant="contained" color="primary" onClick={handleOpenModalCreate} align="right">+ Ajouter une Nouvelle Idée</StyledButtonRight>
                )}
                <IdeaModal open={modalOpen}
                    handleClose={handleCloseModal}
                    selectedIdea={selectedIdea}
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
                                        {auth && (
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
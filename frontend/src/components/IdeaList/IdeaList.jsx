import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Add from '@mui/icons-material/Add';
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

/** Components **/
import IdeaModal from '../IdeaModal';

/** SVG **/
import ThumbUpIdea from '../../assets/icons/thumb-up-idea.svg';
import ThumbDownIdea from '../../assets/icons/thumb-down-idea.svg';
import DeleteIdea from '../../assets/icons/delete-idea.svg';
import EditIdea from '../../assets/icons/edit-idea.svg';

/** Hooks **/
import useAuth from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";
import useAlertDialog from "../../hooks/useAlertDialog";

/** Styles **/
import {
    StyledButtonRight, StyledHeadCellDateCreatedAt, StyledHeadCellTitle, StyledHeadCellDescription,
    StyledHeadCellPoints, StyledTableCellDescription, StyledHeadCellActions, IdeasContainer
} from './style';

/** Utils **/
import { renderTextWithNewLineInSpan } from '../../services/Format/Text/index';


const IdeaList = ({ ideas, onSubmitIdea, onUpdateIdea, onDeleteIdea }) => {
    const { auth } = useAuth();

    {/* Logic to handle modal state for creation, reading and modification */ }
    const { isModalOpen, modalContent, openModal, closeModal } = useModal();
    const handleOpenModalCreate = () => {
        openModal();
    };
    const handleOpenModalRead = (idea) => {
        openModal(idea);
    };
    const handleCloseModal = () => {
        closeModal();
        setIsEditing(false);
    };

    {/* Vote Up and Vote Down */ }
    const onClickVoteUp = (row) => {
        console.log(row);
    }
    const onClickVoteDown = (row) => {
        console.log(row);
    }

    {/* Createion & Modification */ }
    const [isEditing, setIsEditing] = useState(false);
    const handleIdeaSubmit = (idea) => {
        onSubmitIdea(idea);
        closeModal();
    }
    const handleIdeaUpdate = (idea) => {
        onUpdateIdea(idea);
        closeModal();
        setIsEditing(false);
    }
    const onClickModify = (idea) => {
        setIsEditing(true);
        openModal(idea);
    }

    {/* Sorting */ }
    const [orderDirection, setOrderDirection] = useState('desc');
    const [orderBy, setOrderBy] = useState('created_at');

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

    {/* Alert Dialog : Deletion */ }
    const { isDialogOpen, dialogProps, openDialog, closeDialog, confirmDialog } = useAlertDialog();

    const handleClickOpenDeleteDialog = (idea) => {
        openDialog(
            'Confirmer la suppression',
            'Êtes-vous sûr de vouloir supprimer cette idée ?',
            `\n${idea.title}`,
            () => handleConfirmDelete(idea)
        );
    };

    const handleConfirmDelete = (idea) => {
        onDeleteIdea(idea);
        closeDialog();
    };

    return (
        <IdeasContainer>
            <div>
                {/* Create and Read Modal */}
                {auth.token && (
                    <StyledButtonRight variant="contained" color="primary" startIcon={<Add />} onClick={handleOpenModalCreate} align="right">Ajouter une Nouvelle Idée</StyledButtonRight>
                )}
                <IdeaModal isOpen={isModalOpen}
                    handleClose={handleCloseModal}
                    idea={modalContent}
                    onSubmitIdea={handleIdeaSubmit}
                    onUpdateIdea={handleIdeaUpdate}
                    isEditing={isEditing}
                />
            </div>
            {/* Ideas Table */}
            <div style={{ height: 400, width: '100%' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ tableLayout: 'fixed' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledHeadCellDateCreatedAt onClick={() => handleRequestSort('created_at')}>
                                    <div style={{ display: 'flex' }}>
                                        <div>Date d&apos;ajout</div> <div>{sortIcon('created_at')}</div>
                                    </div>
                                </StyledHeadCellDateCreatedAt>
                                <StyledHeadCellTitle onClick={() => handleRequestSort('title')}>
                                    <div style={{ display: 'flex' }}>
                                        <div>Titre</div> <div>{sortIcon('title')}</div>
                                    </div>
                                </StyledHeadCellTitle>
                                <StyledHeadCellDescription>Description</StyledHeadCellDescription>
                                <StyledHeadCellPoints onClick={() => handleRequestSort('points')}>
                                    <div style={{ display: 'flex' }}>
                                        <div>Points</div> <div>{sortIcon('points')}</div>
                                    </div>
                                </StyledHeadCellPoints>
                                {
                                    auth.token && auth.userId && (
                                        <StyledHeadCellActions>Actions</StyledHeadCellActions>
                                    )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedIdeas.map((idea) => (
                                <TableRow
                                    key={idea.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="left" onClick={() => handleOpenModalRead(idea)}>
                                        {new Date(idea.created_at).toLocaleString('fr-FR')}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="left" onClick={() => handleOpenModalRead(idea)}>
                                        <NavLink to={`/idea/${idea.id}`}>
                                            {idea.title}
                                        </NavLink>
                                    </TableCell>
                                    <StyledTableCellDescription onClick={() => handleOpenModalRead(idea)}>
                                        {renderTextWithNewLineInSpan(idea.description)}
                                    </StyledTableCellDescription>
                                    <TableCell onClick={() => handleOpenModalRead(idea)}>{idea.points}</TableCell>
                                    {
                                        auth.token && auth.userId && idea.state !== "done" && (
                                            <TableCell align="right" sx={{ padding: "0 0 0 0" }}>
                                                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                    <div>
                                                        <Button onClick={() => onClickVoteUp(idea)}><img src={ThumbUpIdea} alt="icon" width={30} height={30} /></Button>
                                                        <Button onClick={() => onClickVoteDown(idea)}><img src={ThumbDownIdea} alt="icon" width={30} height={30} /></Button>
                                                    </div>
                                                    {auth.userId === idea.userId && (
                                                        <div>
                                                            <Button onClick={() => handleClickOpenDeleteDialog(idea)}><img src={DeleteIdea} alt="icon" width={30} height={30} /></Button>
                                                            <Dialog open={isDialogOpen} onClose={closeDialog}>
                                                                <DialogTitle>{dialogProps.title}</DialogTitle>
                                                                <DialogContent>
                                                                    <Typography>
                                                                        {dialogProps.message}
                                                                    </Typography>
                                                                    <Typography style={{ whiteSpace: 'pre-line' }}>
                                                                        {dialogProps.description}
                                                                    </Typography>
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button onClick={closeDialog}>Annuler</Button>
                                                                    <Button onClick={confirmDialog} color="primary" autoFocus>Confirmer</Button>
                                                                </DialogActions>
                                                            </Dialog>
                                                            <Button onClick={() => onClickModify(idea)}> <img src={EditIdea} alt="icon" width={30} height={30} /></Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                        )}
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
    onUpdateIdea: PropTypes.func,
    onDeleteIdea: PropTypes.func,
};

export { IdeaList };
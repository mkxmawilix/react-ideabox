import { Modal, Box } from '@mui/material';
import IdeaSubmissionForm from '../IdeaSubmissionForm';
import PropTypes from 'prop-types';

const IdeaModal = ({ open, handleClose, onSubmitIdea }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ /* Styles for the modal box */ }}>
                <IdeaSubmissionForm onSubmitIdea={onSubmitIdea}/>
            </Box>
        </Modal>
    );
}

IdeaModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    onSubmitIdea: PropTypes.func,
};

export { IdeaModal };

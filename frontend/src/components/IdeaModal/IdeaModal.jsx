import { Modal, Box } from '@mui/material';
import IdeaSubmissionForm from '../IdeaSubmissionForm';
import PropTypes from 'prop-types';

const IdeaModal = ({ open, handleClose, selectedIdea, onSubmitIdea }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '90%',
                    maxHeight: '90%',
                    overflow: 'auto',
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    '.idea-description': { 
                        whiteSpace: 'pre-line'
                    },
                }}
                
            >
                {selectedIdea ? (
                    <div>
                        <h2>{selectedIdea.title}</h2>
                        <p className="idea-description">{selectedIdea.description}</p>
                    </div>
                ) : (<IdeaSubmissionForm onSubmitIdea={onSubmitIdea} />)}
            </Box>
        </Modal>
    );
}

IdeaModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    selectedIdea: PropTypes.object,
    onSubmitIdea: PropTypes.func,
};

export { IdeaModal };

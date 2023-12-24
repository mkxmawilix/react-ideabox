import { Modal, Box } from '@mui/material';
import IdeaSubmissionForm from '../IdeaSubmissionForm';
import PropTypes from 'prop-types';

const IdeaModal = ({ isOpen, handleClose, idea, onSubmitIdea }) => {

    const handleSubmit = (idea) => {
        onSubmitIdea(idea);
        handleClose();
    }

    return (
        <Modal open={isOpen} onClose={handleClose}>
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
                {idea ? (
                    <div>
                        <h2>{idea.title}</h2>
                        <p className="idea-description">{idea.description}</p>
                    </div>
                ) : (<IdeaSubmissionForm onSubmitIdea={handleSubmit} />)}
            </Box>
        </Modal>
    );
}

IdeaModal.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
    idea: PropTypes.object,
    onSubmitIdea: PropTypes.func,
};

export { IdeaModal };

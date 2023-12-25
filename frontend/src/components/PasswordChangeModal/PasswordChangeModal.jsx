import { Modal, Box } from '@mui/material';
import PropTypes from 'prop-types';

/** Components **/
import PasswordForm from '../PasswordForm';

const PasswordChangeModal = ({ isOpen, handleClose }) => {

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
                <PasswordForm handleClose={handleClose}/>
            </Box>
        </Modal>
    );
}

PasswordChangeModal.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
    onSubmitIdea: PropTypes.func,
};

export { PasswordChangeModal };

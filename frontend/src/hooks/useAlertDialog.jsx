import { useState } from 'react';

const useAlertDialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogProps, setDialogProps] = useState({ title: '', message: '', description: '', onConfirm: () => {} });

    const openDialog = (title, message, description, onConfirm) => {
        setDialogProps({ title, message, description, onConfirm });
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const confirmDialog = () => {
        dialogProps.onConfirm();
        closeDialog();
    };

    return {
        isDialogOpen,
        dialogProps,
        openDialog,
        closeDialog,
        confirmDialog
    };
};

export default useAlertDialog;

export const formatDateAndTimeFR = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
};
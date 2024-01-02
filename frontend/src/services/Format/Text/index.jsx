export const renderTextWithNewLineInSpan = (text) => {
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
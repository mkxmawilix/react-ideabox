import { useState, useCallback } from 'react';
import { createMessageJSON } from '../api/messages/createMessage';
import { getIdeaMessagesJSON } from '../api/messages/getMessages';


const getMessages = async (modelName, modelId) => {
    if (modelName === "ideas") {
        return await getIdeaMessagesJSON(modelId);
    }
};

const useMessageManager = (modelName, modelId, initialMessages = []) => {
    const [messages, setMessages] = useState(initialMessages);
    const [countMessages, setCountMessages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchMessages = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedMessages = await getMessages(modelName, modelId);
            setMessages(fetchedMessages);
            setCountMessages(fetchedMessages.length);
            setIsError(false);
        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, [modelName, modelId]);

    const addMessage = async (newMessage) => {
        try {
            await createMessageJSON(newMessage);
            fetchMessages();
        } catch (error) {
            console.error(error);
            setIsError(true);
        }
    };

    return { messages, countMessages, isLoading, isError, fetchMessages, addMessage };
};

export default useMessageManager;

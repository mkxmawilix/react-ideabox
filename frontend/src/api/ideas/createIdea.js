import { v4 as uuidv4 } from 'uuid';


const applyDefaultValues = (data) => {
    if (!data.created_at) {
        data.created_at = new Date().toISOString();
    }
    if (!data.updated_at) {
        data.updated_at = false;
    }
    if (!data.id) {
        data.id = uuidv4();
    }
    if (!data.points) {
        data.points = 0;
    }
    if (!data.state) {
        data.state = "pending";
    }
    return data;
}


export const createIdeaJSON = async (data) => {
    const url = "http://localhost:3000/api/ideas";
    // change userId to user_id to avoid collection deletion by json-server
    data.user_id = data.userId;
    delete data.userId;

    if (!data.title) {
        throw new Error("No title provided");
    }
    if (!data.description) {
        throw new Error("No description provided");
    }
    if (!data.user_id) {
        throw new Error("No user_id provided");
    }
    const values = applyDefaultValues(data);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return await response.json();
}

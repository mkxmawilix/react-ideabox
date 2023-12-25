import { getUserJSON } from "./getUser";

export const updateUserJSON = async (data) => {
    if (!data || !data.userId) {
        return;
    }
    const user = await getUserJSON(data.userId);
    if (!user) {
        throw new Error("Invalid user");
    }
    if (user.token !== data.token) {
        throw new Error("Invalid token");
    }
    const newData = {};
    if (data.username) {
        newData.username = data.username;
    }
    if (data.password) {
        newData.password = data.password;
    }
    const response = await fetch(`api/users/${data.userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    });
    if (!response.ok && response.status === 400) {
        let message = await response.json();
        throw new Error(`${message}`);
    }
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return response.json();
}
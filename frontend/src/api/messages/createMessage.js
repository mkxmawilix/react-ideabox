export const createMessageJSON = async (data) => {
    if (!data.userId) {
        throw new Error("No userId provided");
    }
    if (!data.content) {
        throw new Error("No content provided");
    }
    const url = "http://localhost:3030/api/messages";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return await response.json();
}

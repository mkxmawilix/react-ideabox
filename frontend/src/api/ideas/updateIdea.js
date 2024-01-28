export const updateIdeaJSON = async (data) => {
    if (!data.id) {
        throw new Error("No id provided");
    }
    if (!data.title) {
        throw new Error("No title provided");
    }
    if (!data.description) {
        throw new Error("No description provided");
    }

    const url = `http://localhost:3000/api/ideas/${data.id}`;
    const patchData = {
        title: data.title,
        description: data.description,
        updated_at: new Date().toISOString(),
    };
    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patchData),
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return await response.json();
};

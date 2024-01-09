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

    let patchData = {
        title: data.title,
        description: data.description,
        updated_at: new Date().toISOString(),
    };
    const response = await fetch(`api/ideas/${data.id}`, {
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
    response.json().then((data) => {
        console.log(data);
    });
    return response;
};

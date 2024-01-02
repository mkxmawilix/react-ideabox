export const isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}

export const isObjectList = (obj) => {
    return Array.isArray(obj) && obj.every((item) => isObject(item));
}

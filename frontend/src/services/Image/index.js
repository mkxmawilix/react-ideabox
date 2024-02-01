export const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.createElement("img");
        img.onload = () => {
            const canvas = document.createElement("canvas");
            let { width, height } = img;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            const dataUrl = canvas.toDataURL(file.type);
            callback(dataUrl);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
};


export const generateAvatar = (initials, size = 100) => {
    // Arbitrary avatar colors
    const colors = [
        "#1abc9c", "#3498db", "#9b59b6", "#e67e22", "#e74c3c",
        "#2ecc71", "#f1c40f", "#95a5a6", "#34495e", "#16a085"
    ];
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = canvas.height = size;

    // Random background color
    const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, size, size);

    // Text
    context.font = `${size / 3}px Arial`; // Font size based on canvas size
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(initials, size / 2, size / 2);

    return canvas.toDataURL();
}
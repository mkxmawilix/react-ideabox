const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new mongoose.Schema({
    ideaId: {
        type: Schema.Types.ObjectId, ref: 'Idea',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ideaSchema = new mongoose.Schema({
    ideaId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    state: {
        type: String,
        required: true,
        enum: ["pending", "done", "cancelled"],
        default: "pending",
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Idea", ideaSchema);

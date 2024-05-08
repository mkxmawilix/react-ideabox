require("dotenv").config({ path: "../.env" });
const Message = require("../models/Message");


exports.getIdeaMessages = (req, res) => {
    const { ideaId } = req.params;

    Message.find({ ideaId: ideaId })
        .populate('userId')
        .exec((err, messages) => {
            if (err) {
                return res.status(500).json({
                    message: "Error querying the Message collection: " + err,
                });
            }
            const transformedMessages = messages.map(message => ({
                id: message._id,
                content: message.message,
                userName: message.userId.username,
                createdAt: message.createdAt,
            }));

            res.status(200).json(transformedMessages);
        });
};



exports.createIdeaMessage = async (req, res) => {
    try {
        const { ideaId, userId, message } = req.body;

        const newMessage = new Message({ ideaId, userId, message });
        const savedMessage = await newMessage.save();
        const populatedMessage = await savedMessage.populate('userId').execPopulate();

        res.status(201).json({
            message: "Message successfully created!",
            data: {
                id: populatedMessage._id,
                userName: populatedMessage.userId.name,
                message: populatedMessage.message,
                createdAt: populatedMessage.createdAt,
            },
        });
    } catch (err) {
        console.error("Error saving message:", err);
        res.status(500).json({
            message: "Cannot create message: " + err,
        });
    }
};
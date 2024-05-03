require("dotenv").config({ path: "../.env" });
const Idea = require("../models/Idea");
const UUID = require("uuid");

exports.createIdea = (req, res) => {
    const { title, description, userId } = req.body;

    const newIdea = new Idea({
        ideaId: UUID.v4(),
        title,
        description,
        userId,
        points: 0,
    });

    newIdea
        .save()
        .then((savedIdea) => {
            res.status(201).json({
                message: "Idea successfully created!",
                idea: {
                    id: savedIdea._id,
                    ideaId: savedIdea.ideaId,
                    title: savedIdea.title,
                    description: savedIdea.description,
                    points: savedIdea.points,
                    state: savedIdea.state,
                    userId: savedIdea.userId,
                    updatedAt: savedIdea.updatedAt,
                    createdAt: savedIdea.createdAt,
                },
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Cannot create idea: " + err,
            });
        });
};

exports.getIdea = async (req, res) => {
    try {
        const { ideaId } = req.params;
        const idea = await Idea.findById(ideaId).lean();
        if (!idea) {
            return res.status(404).json({ message: 'Idea not found' });
        }
        const { _id, ...restOfIdea } = idea;
        restOfIdea.id = _id;
        res.status(200).json(restOfIdea);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving idea: ' + error.message });
    }
};

exports.getIdeas = (req, res) => {
    Idea.find({}).lean().exec((err, ideas) => {
        if (err) {
            return res.status(500).json({
                message: "Error querying the Idea collection: " + err,
            });
        }
        const transformedIdeas = ideas.map(idea => {
            const { _id, ...restOfIdea } = idea;
            return {
                id: _id,
                ...restOfIdea
            };
        });
        res.status(200).json(transformedIdeas);
    });
};

exports.updateIdea = (req, res) => {
    const { ideaId } = req.params;
    const { title, description } = req.body;
    
    const update = {
        title,
        description,
    };
    Idea.findOneAndUpdate({ _id: ideaId }, update, { new: true, runValidators: true })
        .then(updatedIdea => {
            if (!updatedIdea) {
                return res.status(404).json({
                    message: "Idea not found!",
                });
            }

            const { _id, ...restOfIdea } = updatedIdea;
            updatedIdea = {
                id: _id,
                ...restOfIdea
            };
            res.status(200).json({
                message: "Idea successfully updated!",
                idea: updatedIdea
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Cannot update idea: " + err,
            });
        });
};

exports.deleteIdea = (req, res) => {
    const { ideaId } = req.params;
    Idea.findOneAndDelete({ _id: ideaId })
        .then((deletedIdea) => {
            if (!deletedIdea) {
                return res.status(404).json({
                    message: "Idea not found!",
                });
            }
            res.status(200).json({
                message: "Idea successfully deleted!",
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Cannot delete idea: " + err,
            });
        });
};
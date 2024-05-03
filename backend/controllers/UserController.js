require("dotenv").config({ path: "../.env" });
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res) => {
    const { email, password, username } = req.body;

    User.findOne({ email }, (err, existingUser) => {
        if (err) {
            return res.status(500).json({
                message: "Error querying the User collection: " + err,
            });
        }
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists!",
            });
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.status(500).json({
                    message: "Error generating salt: " + err,
                });
            }
            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({
                        message: "Error hashing password: " + err,
                    });
                }

                const newUser = new User({
                    email,
                    username,
                    password: hashedPassword,
                });

                newUser
                    .save()
                    .then((savedUser) => {
                        const payload = {
                            id: savedUser._id,
                            email: savedUser.email,
                        };

                        const token = jwt.sign(
                            payload,
                            process.env.TOKEN_SECRET,
                            { expiresIn: "1h" }
                        );

                        res.status(201).json({
                            message:
                                "User successfully registered and logged in!",
                            token: "Bearer " + token,
                            user: {
                                username: savedUser.username,
                                id: savedUser._id,
                            },
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: "Cannot register user: " + err,
                        });
                    });
            });
        });
    });
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Error on the server." });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error on the server." });
            }
            if (!isMatch) {
                return res.status(401).json({ message: "Incorrect password." });
            }

            const payload = {
                id: user._id,
                email: user.email,
            };

            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
                expiresIn: "1h",
            });

            res.json({
                message: "Logged in Successfully",
                token: "Bearer " + token,
                user: { username: user.username, id: user._id },
            });
        });
    });
};

exports.getUser = (req, res) => {
    const { userId } = req.body;
    const { email } = req.user;
    User.findOne({ _id: userId, email: email })
        .select("-password")
        .exec((err, user) => {
            if (err) {
                return res.status(500).json({
                    message: "Error searching the User database: " + err,
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: "User does not exist!",
                });
            }

            return res.status(200).json({
                user: {
                    id: user._id,
                    username: user.username,
                },
            });
        });
};

exports.getUserProfile = (req, res) => {
    const { id, email } = req.user;
    User.findOne({ _id: id, email: email })
        .select("-password")
        .exec((err, user) => {
            if (err) {
                return res.status(500).json({
                    message: "Error searching the User database: " + err,
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: "User does not exist!",
                });
            }

            return res.status(200).json({
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    avatar: user.avatar,
                },
            });
        });
};

exports.updatePassword = async (req, res) => {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is incorrect." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        const newToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: "Password updated successfully.", token: `Bearer ${newToken}` });
    } catch (error) {
        res.status(500).json({ message: "Error updating password: " + error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({
            message: "User updated successfully.",
            user: { username: updatedUser.username, userId: updatedUser._id },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user profile: " + error.message,
        });
    }
};

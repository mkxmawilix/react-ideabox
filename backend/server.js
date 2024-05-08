require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const UserRoute = require("./routes/users/UserRoute");
const IdeaRoute = require("./routes/ideas/IdeaRoute");
const MessageRoute = require("./routes/messages/MessageRoute");

const app = express();

app.listen(process.env.PORT || 5000, () => {
    console.log("Listening on PORT " + process.env.PORT || 5000);
});

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Disable useFindAndModify
mongoose.set("useFindAndModify", false);

// Enable CORS
app.use(cors());
app.use("/", UserRoute);
app.use("/", IdeaRoute);
app.use("/", MessageRoute);

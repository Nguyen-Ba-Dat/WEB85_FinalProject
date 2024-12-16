const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lists: [
        {
            title: { type: String, required: true },
            cards: [
                {
                    title: { type: String, required: true },
                    description: { type: String },
                },
            ],
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model("Board", boardSchema);

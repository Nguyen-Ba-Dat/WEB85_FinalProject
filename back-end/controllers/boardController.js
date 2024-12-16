const Board = require("../models/Board");

const createBoard = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newBoard = new Board({ title, description, owner: req.user.id });
        await newBoard.save();
        res.status(201).json(newBoard);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getBoards = async (req, res) => {
    try {
        const boards = await Board.find({ owner: req.user.id });
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createBoard, getBoards };

const mongoose = require("mongoose");
const Todo = require("../models/Todo.model.js");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const handleError = (res, error) => {
  console.log("There was an error", error);

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }
  return res.status(500).json({ message: "Server error" });
};

const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({ author: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(allTodos);
  } catch (error) {
    handleError(res, error);
  }
};

const getTodoById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid todo id" });
    }
    const todo = await Todo.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteTodoById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid todo id" });
    }

    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(deletedTodo);
  } catch (error) {
    handleError(res, error);
  }
};

const updateTodoById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid todo id" });
    }

    const { title, date, completed } = req.body;
    const updates = {};

    if (title !== undefined) {
      updates.title = title;
    }

    if (date !== undefined) {
      updates.date = date;
    }

    if (completed !== undefined) {
      updates.completed = completed;
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user._id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    handleError(res, error);
  }
};

const createNewTodo = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title || !data.date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTodo = await Todo.create({
      title: data.title,
      date: data.date,
      author: req.user._id,
      completed: data.completed,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  deleteTodoById,
  updateTodoById,
  createNewTodo,
};

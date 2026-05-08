const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todo.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");

router.use(authMiddleware);

router.get("/", todoControllers.getAllTodos);
router.get("/:id", todoControllers.getTodoById);
router.put("/:id", todoControllers.updateTodoById);
router.delete("/:id", todoControllers.deleteTodoById);
router.post("/", todoControllers.createNewTodo);
module.exports = router;

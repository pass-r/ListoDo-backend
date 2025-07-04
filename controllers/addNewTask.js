import { database } from "../data/database.js";

export const addNewTask = (req, res) => {
  const userId = req.headers["x-user-id"];
  if (!userId) {
    return res.status(400).json({ message: "Missing user id" });
  }

  // check if data is all right
  if (!("name" in req.body) || !req.body.name) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  // add a new task to the database
  //  (if there is no descrition, project or dueDate value is 'null')
  const { name, description = null, project = null, dueDate = null } = req.body;

  const result = database[userId].addOneTask(name, description, project, dueDate);

  if (result) {
    res.status(201).json({ message: "Task added successfuly" });
  } else {
    res.status(500).json({ message: "Failed to add task" });
  }
};

import express from "express";

import * as itemController from "../controllers/itemController.js";

const router = express.Router();

router.get("/", itemController.getItems);
router.post("/", itemController.createItem);
router.delete("/:id", itemController.deleteItem);

// TODO 3: Choose appropriate HTTP method and create a route for filtering items
// Hint: Observe the frontend code to determine the HTTP method


export default router;

import { itemFromObject } from "../models/itemModel.js";
import { items } from "../data/items.js";
import { Console } from "console";

/** @type {import("express").RequestHandler} */
export const createItem = async (req, res) => {
  try {
    const item = itemFromObject(req.body);
    items.push(item);
    res.status(200).json({ message: "OK" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Bad Request" });
  }
};

/** @type {import("express").RequestHandler} */
export const getItems = async (req, res) => {
  res.status(200).json(items);
};

/** @type {import("express").RequestHandler} */
export const deleteItem = async (req, res) => {
  try {
    // Extract the item ID from the request parameters
    const itemId = parseInt(req.params._id, 10);

    // Validate if the ID is a valid number
    if (isNaN(itemId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    // Find the index of the item to be deleted based on _id
    const index = items.findIndex(item => item._id === itemId);

    if (index === -1) {
      // If the item is not found, respond with 404
      return res.status(404).json({ error: "Item not found" });
    }

    // Remove the item from the array
    items.splice(index, 1);

    // Respond with a 200 OK status
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



/** @type {import("express").RequestHandler} */
export const filterItems = async (req, res) => {
  try {
    const filterName = req.body.name || '';

    if (typeof filterName !== 'string') {
      return res.status(400).json({ error: "Invalid filter criteria" });
    }

    if (filterName === 'all') {
      // Return all items if the filter is 'All'
      return res.status(200).json(items);
    }

    // Filter the items based on the provided name
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(filterName.toLowerCase())
    );

    // Respond with the filtered items
    res.status(200).json(filteredItems);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


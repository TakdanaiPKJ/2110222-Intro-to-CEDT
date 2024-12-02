import Item from "../models/itemModel.js";

export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const getItems = async (req, res) => {
  const items = await Item.find();

  res.status(200).json(items);
};

export const deleteItem = async (req, res) => {
  // TODO 2: Implement deleteItem function

  res.status(501).json({ error: "Not Implemented" });
};

export const filterItems = async (req, res) => {
  // TODO 3: Implement filterItems function

  res.status(501).json({ error: "Not Implemented" });
};
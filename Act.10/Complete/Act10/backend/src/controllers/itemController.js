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
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
  // res.status(501).json({ error: "Not Implemented" });
};

export const filterItems = async (req, res) => {
  // TODO 3: Implement filterItems function
  console.log(req.body);
  try {
    const { name, lowerPrice, upperPrice } = req.body;
    const query = {};
    console.log(name, lowerPrice, upperPrice);

    if (name && name != "ทั้งหมด") query.name = name;

    if (lowerPrice !== undefined) {
      query.price = { ...query.price, $gte: lowerPrice };
    }
    if (upperPrice !== undefined) {
      query.price = { ...query.price, $lte: upperPrice };
    }

    const items = await Item.find(query);

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};
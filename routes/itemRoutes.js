import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// CREATE ITEM
router.post("/", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating item", error: error.message });
  }
});

// SEARCH
router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({
        message: 'A search term is required. Use the "q" query parameter.',
      });
    }

    const items = await Item.find({
      $text: { $search: searchTerm },
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: "Error searching for items",
      error: error.message,
    });
  }
});

// FIND ITEM
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching items", error: error.message });
  }
});

// FIND ITEM BY ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching item", error: error.message });
  }
});

// FIND AND UPDATE ITEM BY ID
router.put("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating item", error: error.message });
  }
});

// FIND AND DELETE ITEM BY ID
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting item", error: error.message });
  }
});

export default router;

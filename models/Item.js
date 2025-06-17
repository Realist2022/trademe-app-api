import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  start_price: {
    type: Number,
    required: true,
  },
  reserve_price: {
    type: Number,
    required: true,
  },
});

// INDEX SEARCH
itemSchema.index({ title: "text", description: "text" });

const Item = mongoose.model("Item", itemSchema);

export default Item;

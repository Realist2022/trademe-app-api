#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import fs from "fs";
import connectDB from "./db.js";
import Item from "./models/Item.js";
import "dotenv/config";

connectDB();

console.log(chalk.blue(figlet.textSync("CLI for items")));

program.version("1.0.0").description("MongoDB CRUD CLI");

// SEEDING Data
program
  .command("seed")
  .description("Seed database with sample items from seedData.json")
  .action(async () => {
    try {
      const itemsJSON = fs.readFileSync("seedData.json", "utf-8");
      const items = JSON.parse(itemsJSON);

      await Item.deleteMany({});
      console.log(chalk.yellow("Cleared existing items from the database."));

      await Item.insertMany(items);
      console.log(
        chalk.green("Database Seeded Successfully from seedData.json!")
      );
    } catch (error) {
      console.error(chalk.red("Error seeding database:", error));
    }
    process.exit();
  });

// DELETE ALL DATA
program
  .command("delete")
  .description("Delete all items from the database")
  .action(async () => {
    try {
      await Item.deleteMany({});
      console.log(chalk.red("All Items Deleted"));
    } catch (error) {
      console.error(chalk.red("Error deleting items:", error));
    }
    process.exit();
  });

// LIST ITEMS
program
  .command("list")
  .description("List all items")
  .action(async () => {
    try {
      const items = await Item.find();
      if (items.length === 0) {
        console.log(chalk.yellow("No items found in the database."));
      } else {
        console.log(chalk.yellow("Items in Database:"));
        const plainItems = items.map((item) => ({
          id: item.id,
          title: item.title,
          start_price: item.start_price,
          reserve_price: item.reserve_price,
          description: item.description,
        }));
        console.table(plainItems);
      }
    } catch (error) {
      console.error(chalk.red("Error listing items:", error));
    }
    process.exit();
  });

// ADD ITEMS
program
  .command("add")
  .description("Add a new item")
  .action(async () => {
    try {
      const answers = await inquirer.prompt([
        { type: "input", name: "title", message: "Enter item title:" },
        {
          type: "input",
          name: "description",
          message: "Enter item description (optional):",
        },
        {
          type: "number",
          name: "start_price",
          message: "Enter starting price:",
        },
        {
          type: "number",
          name: "reserve_price",
          message: "Enter reserve price:",
        },
      ]);

      const item = new Item(answers);
      await item.save();
      console.log(chalk.green(`Item '${answers.title}' added successfully`));
    } catch (error) {
      console.error(chalk.red("Error adding item:", error));
    }
    process.exit();
  });

program.parse(process.argv);

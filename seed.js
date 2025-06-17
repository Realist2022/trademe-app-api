import mongoose from 'mongoose';
import fs from 'fs';
import Item from './models/Item.js';
import connectDB from './db.js';
import chalk from 'chalk';

connectDB();

const seedData = async () => {
  try {
    const data = JSON.parse(fs.readFileSync('seedData.json', 'utf-8'));
    await Item.deleteMany({});
    await Item.insertMany(data);
    console.log(chalk.green('Database Seeded Successfully'));
  } catch (error) {
    console.error(chalk.red('Error seeding database:', error));
  } finally {
    mongoose.connection.close();
  }
};

seedData();
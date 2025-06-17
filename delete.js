import mongoose from 'mongoose';
import Item from './models/Item.js';
import connectDB from './db.js';
import chalk from 'chalk';

connectDB();

const deleteData = async () => {
  try {
    await Item.deleteMany({});
    console.log(chalk.red('All Items Deleted'));
  } catch (error) {
    console.error(chalk.bgRed('Error deleting data:', error));
  } finally {
    mongoose.connection.close();
  }
};

deleteData();
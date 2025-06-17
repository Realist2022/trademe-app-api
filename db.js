import mongoose from 'mongoose';
import chalk from 'chalk';
import { MONGO_URI } from './config.js'; 

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(chalk.green('MongoDB Connected Successfully'));
  } catch (error) {
    console.error(chalk.red('MongoDB Connection Error:', error));
    process.exit(1); 
  }
};

export default connectDB;
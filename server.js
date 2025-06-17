import express from 'express';
import connectDB from './db.js';
import itemRoutes from './routes/itemRoutes.js';
import figlet from 'figlet';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
  res.send(figlet.textSync('CLI for adding stuff'));
});

app.listen(5000, () => console.log('Server started on port 5000'));
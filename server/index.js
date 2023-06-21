import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import cartoonRoutes from './routes/cartoonRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: false,
}));

app.use(express.json({ limit: '100mb' }));

app.use('/api/post', postRoutes);
app.use('/api/cartoon', cartoonRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from Cartoonify 2.0',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(3000, () => console.log('Server started on http://localhost:3000'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
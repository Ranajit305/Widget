import express from 'express';
import 'dotenv/config';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { connectDB } from './utils/connectDB.js'
import userRouter from './routes/user.route.js'
import companyRouter from './routes/company.route.js'

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api/user', userRouter);
app.use('/api/company', companyRouter);

app.get('/', (req, res) => {
  res.send('API is Working');
});

app.listen(PORT, async () => {
  const db = await connectDB();
  if (db) {
    console.log(`Server running at PORT: ${PORT}`);
  } else {
    console.log('Server Unavailable');
  }
});
import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(morgan('dev'));  

// Basic health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default app;

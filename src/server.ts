import express from 'express';
import morgan from 'morgan';
import ticketRoutes from './api/v1/routes/ticketRoutes';
import healthRoutes from './api/v1/routes/healthRoutes';

const app = express();
app.use(express.json());
app.use(morgan('dev'));  
app.use('/api/v1', ticketRoutes);
app.use('/api/v1', healthRoutes);

// Basic health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

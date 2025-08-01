import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import { dictionaryRoutes } from './features/dictionary/dictionary.routes';
import { coffeesRoutes } from './features/coffees/coffees.routes';
import { coffeePreparationsRoutes } from './features/coffee-preparations/coffee-preparations.routes';
import authRoutes from './features/auth/auth.routes';
import storageRoutes from './features/storage/storage.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dictionary', dictionaryRoutes);
app.use('/api/coffees', coffeesRoutes);
app.use('/api/coffee-preparations', coffeePreparationsRoutes);
app.use('/api/storage', storageRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});
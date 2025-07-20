import request from 'supertest';
import express from 'express';
import authRoutes from '../src/features/auth/auth.routes';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

// Mock Supabase
jest.mock('../src/config/supabase', () => ({
  supabase: {
    auth: {
      signInWithOtp: jest.fn()
    }
  }
}));

import { supabase } from '../src/config/supabase';

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/login', () => {
    it('should send magic link successfully', async () => {
      const mockData = { user: null, session: null };
      (supabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({
        data: mockData,
        error: null
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Magic link enviado al email (login/registro automático)');
      expect(response.body.data).toEqual(mockData);
      expect(supabase.auth.signInWithOtp).toHaveBeenCalledWith({
        email: 'test@example.com',
        options: {
          shouldCreateUser: true
        }
      });
    });

    it('should return 400 when email is missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email es requerido');
      expect(supabase.auth.signInWithOtp).not.toHaveBeenCalled();
    });

    it('should return 400 when Supabase returns error', async () => {
      (supabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({
        data: null,
        error: { message: 'Invalid email format' }
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'invalid-email' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid email format');
    });

    it('should return 500 when unexpected error occurs', async () => {
      (supabase.auth.signInWithOtp as jest.Mock).mockRejectedValue(
        new Error('Database connection failed')
      );

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Error interno del servidor');
    });
  });
});
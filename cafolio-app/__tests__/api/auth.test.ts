import { NextRequest } from 'next/server';
import { POST } from '@/app/api/auth/login/route';

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithOtp: jest.fn(),
    },
  },
}));

describe('/api/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send magic link with valid email', async () => {
    const { supabase } = require('@/lib/supabase');
    supabase.auth.signInWithOtp.mockResolvedValue({
      data: { user: null, session: null },
      error: null,
    });

    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
      headers: { 
        'Content-Type': 'application/json',
        'origin': 'http://localhost:3000'
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Magic link enviado al email (login/registro automático)');
    expect(supabase.auth.signInWithOtp).toHaveBeenCalledWith({
      email: 'test@example.com',
      options: {
        shouldCreateUser: true,
        emailRedirectTo: 'http://localhost:3000/auth/callback',
      },
    });
  });

  it('should return 400 with missing email', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Email es requerido');
  });

  it('should handle JSON parsing error', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: 'invalid-json',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Error interno del servidor');
  });

  it('should handle Supabase auth error', async () => {
    const { supabase } = require('@/lib/supabase');
    supabase.auth.signInWithOtp.mockResolvedValue({
      data: null,
      error: { message: 'Rate limit exceeded' },
    });

    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Rate limit exceeded');
  });
});
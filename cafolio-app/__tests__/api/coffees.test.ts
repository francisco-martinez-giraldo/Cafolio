import { NextRequest } from 'next/server';
import { GET } from '@/app/api/coffees/route';

jest.mock('@/lib/middleware/auth-middleware', () => ({
  authMiddleware: jest.fn().mockResolvedValue({ id: 'user123' }),
}));

jest.mock('@/lib/services/coffee-service', () => ({
  CoffeeService: jest.fn().mockImplementation(() => ({
    getByUserId: jest.fn().mockResolvedValue([{ id: 'coffee1' }]),
  })),
}));

describe('/api/coffees', () => {
  it('should return coffees for user', async () => {
    const request = new NextRequest('http://localhost:3000/api/coffees');
    const response = await GET(request);
    
    expect(response.status).toBe(200);
  });

  it('should handle auth error', async () => {
    const { authMiddleware } = require('@/lib/middleware/auth-middleware');
    authMiddleware.mockRejectedValueOnce(new Error('Unauthorized'));

    const request = new NextRequest('http://localhost:3000/api/coffees');
    const response = await GET(request);
    
    expect(response.status).toBe(401);
  });
});
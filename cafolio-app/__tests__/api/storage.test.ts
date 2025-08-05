import { NextRequest } from 'next/server';
import { DELETE } from '@/app/api/storage/upload/route';

jest.mock('@/lib/middleware/auth-middleware', () => ({
  authMiddleware: jest.fn().mockResolvedValue({ id: 'user123' }),
}));

jest.mock('@/lib/services/storage-service', () => ({
  StorageService: jest.fn().mockImplementation(() => ({
    deleteImage: jest.fn().mockResolvedValue(undefined),
  })),
}));

describe('/api/storage/upload', () => {
  it('should handle delete without photo_path', async () => {
    const request = new NextRequest('http://localhost:3000/api/storage/upload', {
      method: 'DELETE',
    });

    const response = await DELETE(request);
    expect(response.status).toBe(400);
  });
});
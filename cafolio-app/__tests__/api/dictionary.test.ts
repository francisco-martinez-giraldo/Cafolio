import { NextRequest } from 'next/server';
import { GET } from '@/app/api/dictionary/[type]/route';

jest.mock('@/lib/services/dictionary-service', () => ({
  DictionaryService: jest.fn().mockImplementation(() => ({
    getByType: jest.fn().mockResolvedValue([{ id: '1', value: 'Test' }]),
  })),
}));

describe('/api/dictionary/[type]', () => {
  it('should return dictionary items', async () => {
    const request = new NextRequest('http://localhost:3000/api/dictionary/variety');
    const response = await GET(request, { params: Promise.resolve({ type: 'variety' }) });
    
    expect(response.status).toBe(200);
  });
});
import { NextRequest, NextResponse } from 'next/server';
import { CoffeePreparationsService } from '@/lib/services/coffee-preparations-service';
import { authMiddleware } from '@/lib/middleware/auth-middleware';

const preparationsService = new CoffeePreparationsService();

export async function GET(request: NextRequest, { params }: { params: Promise<{ coffeeId: string }> }) {
  const { coffeeId } = await params;
  
  if (!coffeeId) {
    return NextResponse.json({ error: 'Coffee ID is required' }, { status: 400 });
  }
  
  try {
    const user = await authMiddleware(request);
    
    if (!user.id) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 401 });
    }
    
    const preparations = await preparationsService.getHistoryByCoffeeId(coffeeId, user.id);
    return NextResponse.json(preparations);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error desconocido' }, { status: 401 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { CoffeeService } from '@/lib/services/coffee-service';
import { authMiddleware } from '@/lib/middleware/auth-middleware';

const coffeeService = new CoffeeService();

export async function GET(request: NextRequest) {
  try {
    const user = await authMiddleware(request);
    
    if (!user.id) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 401 });
    }
    
    const coffees = await coffeeService.getRecent(user.id, 3);
    return NextResponse.json(coffees);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error desconocido' }, { status: 401 });
  }
}
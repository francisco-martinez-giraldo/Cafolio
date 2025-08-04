import { NextRequest, NextResponse } from 'next/server';
import { CoffeePreparationsService } from '@/lib/services/coffee-preparations-service';
import { authMiddleware } from '@/lib/middleware/auth-middleware';

const preparationsService = new CoffeePreparationsService();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await authMiddleware(request);
    
    if (!user.id) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 401 });
    }
    
    const preparations = await preparationsService.getByUserId(user.id, id);
    return NextResponse.json(preparations);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error desconocido' }, { status: 401 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await authMiddleware(request);
    const preparationData = await request.json();
    const preparation = await preparationsService.create({
      ...preparationData,
      user_id: user.id,
      coffee_id: id
    });
    return NextResponse.json(preparation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error desconocido' }, { status: 400 });
  }
}
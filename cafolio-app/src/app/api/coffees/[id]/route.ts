import { NextRequest, NextResponse } from 'next/server';
import { CoffeeService } from '@/lib/services/coffee-service';
import { authMiddleware } from '@/lib/middleware/auth-middleware';

const coffeeService = new CoffeeService();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await authMiddleware(request);
    
    if (!user.id) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 401 });
    }
    
    const coffee = await coffeeService.getById(id, user.id);
    
    if (!coffee) {
      return NextResponse.json({ error: 'Café no encontrado' }, { status: 404 });
    }
    
    return NextResponse.json(coffee);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error desconocido' }, { status: 401 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await authMiddleware(request);
    
    if (!user.id) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 401 });
    }
    
    const updates = await request.json();
    const coffee = await coffeeService.update(id, user.id, updates);
    return NextResponse.json(coffee);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error desconocido' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await authMiddleware(request);
    
    if (!user.id) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 401 });
    }
    
    await coffeeService.delete(id, user.id);
    return NextResponse.json({ message: 'Café eliminado correctamente' });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error desconocido' }, { status: 400 });
  }
}
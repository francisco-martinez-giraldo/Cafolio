import { NextRequest, NextResponse } from 'next/server';
import { DictionaryService } from '@/lib/services/dictionary-service';

const dictionaryService = new DictionaryService();

export async function GET(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  try {
    const { type } = await params;
    const items = await dictionaryService.getByType(type);
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error desconocido' }, { status: 400 });
  }
}
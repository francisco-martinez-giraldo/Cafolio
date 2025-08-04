import { NextRequest, NextResponse } from "next/server";
import { CoffeePreparationsService } from "@/lib/services/coffee-preparations-service";
import { authMiddleware } from "@/lib/middleware/auth-middleware";

const preparationsService = new CoffeePreparationsService();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; prepId: string }> }
) {
  try {
    const { prepId } = await params;
    const user = await authMiddleware(request);

    if (!user.id) {
      return NextResponse.json({ error: "User ID not found" }, { status: 401 });
    }

    const updates = await request.json();
    const preparation = await preparationsService.update(prepId, user.id, updates);
    return NextResponse.json(preparation);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; prepId: string }> }
) {
  try {
    const { prepId } = await params;
    const user = await authMiddleware(request);

    if (!user.id) {
      return NextResponse.json({ error: "User ID not found" }, { status: 401 });
    }

    await preparationsService.delete(prepId, user.id);
    return NextResponse.json({ message: "Preparación eliminada correctamente" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 400 }
    );
  }
}

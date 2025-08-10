import { NextRequest, NextResponse } from "next/server";
import { CoffeePreparationsService } from "@/lib/services/coffee-preparations-service";
import { authMiddleware } from "@/lib/middleware/auth-middleware";

const preparationsService = new CoffeePreparationsService();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: coffeeId } = await params;
    const user = await authMiddleware(request);

    if (!user.id) {
      return NextResponse.json({ error: "User ID not found" }, { status: 401 });
    }

    const preparationData = await request.json();
    const preparation = await preparationsService.create({
      ...preparationData,
      coffee_id: coffeeId,
      user_id: user.id,
    });
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: coffeeId } = await params;
    const user = await authMiddleware(request);

    if (!user.id) {
      return NextResponse.json({ error: "User ID not found" }, { status: 401 });
    }

    await preparationsService.deleteByCoffeeId(coffeeId, user.id);
    return NextResponse.json({ message: "Preparaciones eliminadas correctamente" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 400 }
    );
  }
}
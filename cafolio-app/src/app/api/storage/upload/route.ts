import { NextRequest, NextResponse } from "next/server";
import { StorageService } from "@/lib/services/storage-service";
import { authMiddleware } from "@/lib/middleware/auth-middleware";

const storageService = new StorageService();

export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request);
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se encontró archivo" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${user.id}-${Date.now()}-${file.name}`;

    const result = await storageService.uploadImage(buffer, fileName, file.type, "coffees");

    return NextResponse.json({
      message: "Archivo subido correctamente",
      path: result.path,
      publicUrl: result.publicUrl,
    });
  } catch (error) {
    console.error("Storage upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await authMiddleware(request);
    const { searchParams } = new URL(request.url);
    const photoPath = searchParams.get("photo_path");

    if (!photoPath) {
      return NextResponse.json({ error: "photo_path es requerido" }, { status: 400 });
    }

    await storageService.deleteImage(photoPath);

    return NextResponse.json({
      message: "Imagen eliminada correctamente",
    });
  } catch (error) {
    console.error("Storage delete error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 400 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { CoffeeService } from "@/lib/services/coffee-service";
import { authMiddleware } from "@/lib/middleware/auth-middleware";

const coffeeService = new CoffeeService();

export async function GET(request: NextRequest) {
  try {
    const user = await authMiddleware(request);

    if (!user.id) {
      return NextResponse.json({ error: "User ID not found" }, { status: 401 });
    }

    const coffees = await coffeeService.getByUserId(user.id);
    return NextResponse.json(coffees);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request);

    if (!user.id) {
      return NextResponse.json({ error: "User ID not found" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Imagen es requerida" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${user.id}-${Date.now()}-${file.name}`;

    const { StorageService } = await import("@/lib/services/storage-service");
    const storageService = new StorageService();
    const uploadResult = await storageService.uploadImage(buffer, fileName, file.type, "coffees");

    // Create coffee data object (excluding file)
    const coffeeData = {
      brand_dictionary_id: formData.get("brand_dictionary_id") as string,
      variety_dictionary_id: formData.get("variety_dictionary_id") as string,
      process_dictionary_id: formData.get("process_dictionary_id") as string,
      price: Number(formData.get("price")),
      region: (formData.get("region") as string) || "",
      farm: (formData.get("farm") as string) || "",
      notes: (formData.get("notes") as string) || "",
      photo_path: uploadResult.path,
      public_url: uploadResult.publicUrl,
      user_id: user.id,
    };

    const coffee = await coffeeService.create(coffeeData);

    return NextResponse.json(coffee, { status: 201 });
  } catch (error) {
    console.error("Coffee creation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 400 }
    );
  }
}

# API Specifications - Cafolio

## 🔗 Base URL
```
Development: http://localhost:3000/api
Production: TBD
```

## 🔐 Authentication
- **Method:** Bearer Token (JWT from Supabase)
- **Header:** `Authorization: Bearer <token>`
- **Storage:** Cookie (`auth_token`) + localStorage fallback

---

## 📋 Endpoints

### Authentication

#### POST `/auth/login`
Envía magic link por email para autenticación.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Magic link enviado al email (login/registro automático)",
  "data": { /* Supabase response */ }
}
```

---

### Coffees

#### GET `/coffees`
Lista todos los cafés del usuario autenticado.

**Response:**
```json
[
  {
    "id": "uuid",
    "user_id": "user@example.com",
    "brand_dictionary_id": "uuid",
    "variety_dictionary_id": "uuid", 
    "process_dictionary_id": "uuid",
    "photo_path": "https://supabase-url/image.jpg",
    "price": 75000,
    "region": "Huila",
    "farm": "Finca El Paraíso",
    "notes": "Notas de chocolate y caramelo",
    "created_at": "2025-01-04T21:00:00Z",
    "brand": { "id": "uuid", "name": "Juan Valdez" },
    "variety": { "id": "uuid", "name": "Caturra" },
    "process": { "id": "uuid", "name": "Lavado" }
  }
]
```

#### POST `/coffees`
Crea un nuevo café con imagen (FormData).

**Request (FormData):**
```
file: File (required)
brand_dictionary_id: string
variety_dictionary_id: string
process_dictionary_id: string
price: string (number)
region: string (optional)
farm: string (optional)
notes: string (optional)
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "user@example.com",
  "brand_dictionary_id": "uuid",
  "variety_dictionary_id": "uuid",
  "process_dictionary_id": "uuid", 
  "photo_path": "https://supabase-url/image.jpg",
  "price": 75000,
  "region": "Huila",
  "farm": "Finca El Paraíso",
  "notes": "Notas de chocolate y caramelo",
  "created_at": "2025-01-04T21:00:00Z"
}
```

#### GET `/coffees/recent`
Obtiene los cafés más recientes con calificación promedio.

**Query Parameters:**
- `limit` (optional): number - Default: 3

**Response:**
```json
[
  {
    "id": "uuid",
    "user_id": "user@example.com",
    "brand_dictionary_id": "uuid",
    "variety_dictionary_id": "uuid",
    "process_dictionary_id": "uuid",
    "photo_path": "https://supabase-url/image.jpg",
    "price": 75000,
    "region": "Huila", 
    "farm": "Finca El Paraíso",
    "notes": "Notas de chocolate y caramelo",
    "created_at": "2025-01-04T21:00:00Z",
    "overall_rating": 4.5,
    "brand": { "id": "uuid", "name": "Juan Valdez" },
    "variety": { "id": "uuid", "name": "Caturra" },
    "process": { "id": "uuid", "name": "Lavado" }
  }
]
```

#### GET `/coffees/{id}`
Obtiene un café específico por ID.

**Response:**
```json
{
  "id": "uuid",
  "user_id": "user@example.com",
  "brand_dictionary_id": "uuid",
  "variety_dictionary_id": "uuid",
  "process_dictionary_id": "uuid",
  "photo_path": "https://supabase-url/image.jpg",
  "price": 75000,
  "region": "Huila",
  "farm": "Finca El Paraíso", 
  "notes": "Notas de chocolate y caramelo",
  "created_at": "2025-01-04T21:00:00Z",
  "brand": { "id": "uuid", "name": "Juan Valdez" },
  "variety": { "id": "uuid", "name": "Caturra" },
  "process": { "id": "uuid", "name": "Lavado" }
}
```

#### PUT `/coffees/{id}`
Actualiza un café existente (JSON).

**Request:**
```json
{
  "brand_dictionary_id": "uuid",
  "variety_dictionary_id": "uuid",
  "process_dictionary_id": "uuid",
  "price": 75000,
  "region": "Huila",
  "farm": "Finca El Paraíso",
  "notes": "Notas de chocolate y caramelo",
  "photo_path": "https://supabase-url/image.jpg"
}
```

**Response:** Same as GET `/coffees/{id}`

#### DELETE `/coffees/{id}`
Elimina un café.

**Response:**
```json
{
  "message": "Café eliminado correctamente"
}
```

---

### Coffee Preparations

#### GET `/coffees/{id}/preparations`
Lista preparaciones de un café específico.

**Response:**
```json
[
  {
    "id": "uuid",
    "coffee_id": "uuid",
    "user_id": "user@example.com",
    "method_dictionary_id": "uuid",
    "grind_dictionary_id": "uuid",
    "water_temperature": 92,
    "coffee_amount": 18,
    "water_amount": 250,
    "extraction_time": 240,
    "ranking": 4.5,
    "notes": "Excelente extracción",
    "created_at": "2025-01-04T21:00:00Z",
    "method": { "id": "uuid", "name": "V60" },
    "grind": { "id": "uuid", "name": "Medio" }
  }
]
```

#### POST `/coffees/{id}/preparations`
Crea una nueva preparación.

**Request:**
```json
{
  "method_dictionary_id": "uuid",
  "grind_dictionary_id": "uuid", 
  "water_temperature": 92,
  "coffee_amount": 18,
  "water_amount": 250,
  "extraction_time": 240,
  "ranking": 4.5,
  "notes": "Excelente extracción"
}
```

**Response:** Same as GET preparation item

#### PUT `/coffees/{id}/preparations/{prepId}`
Actualiza una preparación existente.

**Request:** Same as POST

**Response:** Same as GET preparation item

#### DELETE `/coffees/{id}/preparations/{prepId}`
Elimina una preparación.

**Response:**
```json
{
  "message": "Preparación eliminada correctamente"
}
```

---

### Storage

#### POST `/storage/upload`
Sube una imagen (usado solo para edición).

**Request (FormData):**
```
file: File (required)
folder: string (optional) - Default: "storage"
```

**Response:**
```json
{
  "message": "Archivo subido correctamente",
  "path": "https://supabase-url/image.jpg"
}
```

---

### Dictionary

#### GET `/dictionary/{type}`
Obtiene valores del diccionario por tipo.

**Types:** `brand`, `variety`, `process`, `method`, `grind`

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Juan Valdez",
    "type": "brand",
    "created_at": "2025-01-04T21:00:00Z"
  }
]
```

---

## 🚨 Error Responses

### Standard Error Format
```json
{
  "error": "Error message description"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

### Common Errors
- `401` - "User ID not found" (Invalid/expired token)
- `400` - "Imagen es requerida" (Missing file in coffee creation)
- `400` - "No se encontró archivo" (Missing file in upload)
- `404` - "Café no encontrado" (Invalid coffee ID)

---

## 📝 Notes

### Content Types
- **JSON endpoints:** `application/json`
- **FormData endpoints:** `multipart/form-data`
- **File uploads:** Binary data in FormData

### Authentication Flow
1. POST `/auth/login` with email
2. User clicks magic link from email
3. Redirect to `/auth/callback`
4. Token stored in cookie + localStorage
5. All subsequent requests include Bearer token

### Image Handling
- **Creation:** FormData to `/coffees` (unified)
- **Editing:** Separate upload to `/storage/upload` + JSON update
- **URLs:** Public Supabase Storage URLs
- **Required:** Images are mandatory for coffee creation

---

**Last Updated:** January 4, 2025
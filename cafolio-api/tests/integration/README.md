# Integration Tests

## Configuración

Las pruebas de integración usan la base de datos real de Supabase pero con las siguientes medidas de seguridad:

1. **User IDs de prueba**: Todos los datos usan `test_` como prefijo en user_id
2. **Cleanup automático**: Después de cada prueba se eliminan los datos creados
3. **No persistencia**: Los datos no se mantienen entre ejecuciones

## Ejecutar Pruebas

```bash
# Solo pruebas de integración
npm run test:integration

# Todas las pruebas (unitarias + integración)
npm run test:all
```

## Estructura

- `setup.ts`: Configuración y cleanup automático
- `*.integration.test.ts`: Pruebas de cada módulo
- `.env.test`: Variables de entorno para testing

## Importante

- Las pruebas requieren que la API esté corriendo en `http://localhost:3000`
- Se necesitan las credenciales de Supabase en `.env.test`
- Los datos de prueba se limpian automáticamente
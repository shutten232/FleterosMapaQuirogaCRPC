# Arrived Fleteros (regen)

- Fletero: selector fijo (Joaquin, Rodrigo, Jorge, Agustin).
- Panel: iconos de vehículo por color + halo.
- Sin Service Worker (evita cache en mobile). Existe sw.js solo para limpieza.

## Firebase
- Auth anónimo: ON
- Authorized domains: shutten232.github.io
- RTDB rules: pegar database.rules.json


## Eliminar registros (Panel)
- Botón "Admin" arriba a la derecha.
- PIN por defecto: 2468 (cambiar en panel/index.html -> ADMIN_PIN).
- En modo admin aparece columna Acciones con "Eliminar" por fletero.
- Elimina:
  - /live/{fleteroName}
  - últimos 500 logs en /arrivals con fleteroId=={fleteroName}

### Seguridad real (recomendado)
El PIN es solo UI (cualquiera podría borrar si las reglas permiten).
Para seguridad real, limitá deletes en reglas por UID admin.

# Actividad 4 — Formulario controlado con validación inmediata

Aplicación React (Vite) que implementa un formulario de registro con:

- Enlace de cada input a una variable de estado mediante `useState` (todo el formulario vive en un único objeto `valores`).
- Validación inmediata: cada campo se valida en `onChange`, no solo al enviar.
- Mensajes de error específicos por campo, mostrados después de que el usuario lo toca (`onBlur`) para no saturar la vista al cargar.
- Botón de envío deshabilitado mientras el formulario no sea completamente válido.
- Validación cruzada: el campo "confirmar contraseña" se revalida automáticamente si el usuario edita la contraseña después.

## Campos y reglas

| Campo | Regla |
|---|---|
| Nombre | Obligatorio, mínimo 3 caracteres |
| Correo | Obligatorio, formato de email válido |
| Contraseña | Mínimo 8 caracteres, al menos un número |
| Confirmar contraseña | Debe coincidir con la contraseña |
| Edad | Entero, entre 18 y 120 |

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre la URL que muestra la terminal (por defecto http://localhost:5173).

## Estructura

```
actividad4/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx     <- lógica del formulario y validaciones
    └── App.css
```

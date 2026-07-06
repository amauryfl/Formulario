import { useState } from 'react'

// Reglas de validación por campo. Cada función recibe el valor actual
// (y, si hace falta, el resto del formulario) y devuelve un mensaje de
// error o cadena vacía si el campo es válido.
const validators = {
  nombre: (value) => {
    if (!value.trim()) return 'El nombre es obligatorio.'
    if (value.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.'
    return ''
  },
  correo: (value) => {
    if (!value.trim()) return 'El correo es obligatorio.'
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(value)) return 'El correo no tiene un formato válido.'
    return ''
  },
  password: (value) => {
    if (!value) return 'La contraseña es obligatoria.'
    if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres.'
    if (!/[0-9]/.test(value)) return 'La contraseña debe incluir al menos un número.'
    return ''
  },
  confirmarPassword: (value, formValues) => {
    if (!value) return 'Debes confirmar la contraseña.'
    if (value !== formValues.password) return 'Las contraseñas no coinciden.'
    return ''
  },
  edad: (value) => {
    if (!value) return 'La edad es obligatoria.'
    const numero = Number(value)
    if (!Number.isInteger(numero)) return 'La edad debe ser un número entero.'
    if (numero < 18) return 'Debes ser mayor de 18 años.'
    if (numero > 120) return 'Ingresa una edad válida.'
    return ''
  },
}

const camposIniciales = {
  nombre: '',
  correo: '',
  password: '',
  confirmarPassword: '',
  edad: '',
}

export default function App() {
  // Estado del formulario: un objeto con el valor de cada campo.
  const [valores, setValores] = useState(camposIniciales)
  // Estado de errores: un mensaje por campo (vacío = sin error).
  const [errores, setErrores] = useState({})
  // Registra qué campos ya fueron tocados, para no mostrar errores
  // antes de que el usuario interactúe con ellos.
  const [tocados, setTocados] = useState({})
  const [enviado, setEnviado] = useState(false)

  const validarCampo = (nombreCampo, valor, valoresActuales) => {
    const validar = validators[nombreCampo]
    return validar ? validar(valor, valoresActuales) : ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const nuevosValores = { ...valores, [name]: value }
    setValores(nuevosValores)

    // Validación inmediata: se recalcula en cada pulsación de tecla.
    const mensaje = validarCampo(name, value, nuevosValores)
    const nuevosErrores = { ...errores, [name]: mensaje }

    // Si cambia la contraseña, revalidamos también la confirmación,
    // porque su validez depende del otro campo.
    if (name === 'password' && tocados.confirmarPassword) {
      nuevosErrores.confirmarPassword = validarCampo(
        'confirmarPassword',
        nuevosValores.confirmarPassword,
        nuevosValores
      )
    }

    setErrores(nuevosErrores)
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTocados({ ...tocados, [name]: true })
  }

  const formularioEsValido = () => {
    return Object.keys(validators).every(
      (campo) => validarCampo(campo, valores[campo], valores) === ''
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Al enviar, validamos todo y marcamos todos los campos como tocados
    // para que se muestren todos los errores pendientes.
    const todosLosErrores = {}
    Object.keys(validators).forEach((campo) => {
      todosLosErrores[campo] = validarCampo(campo, valores[campo], valores)
    })
    setErrores(todosLosErrores)
    setTocados({
      nombre: true,
      correo: true,
      password: true,
      confirmarPassword: true,
      edad: true,
    })

    const esValido = Object.values(todosLosErrores).every((msg) => msg === '')
    if (esValido) {
      setEnviado(true)
    }
  }

  const handleReiniciar = () => {
    setValores(camposIniciales)
    setErrores({})
    setTocados({})
    setEnviado(false)
  }

  const mostrarError = (campo) => tocados[campo] && errores[campo]

  if (enviado) {
    return (
      <div className="contenedor">
        <div className="tarjeta tarjeta-exito">
          <h1>Registro exitoso</h1>
          <p>Gracias, {valores.nombre}. Tu cuenta fue creada correctamente.</p>
          <button className="boton boton-secundario" onClick={handleReiniciar}>
            Registrar otra persona
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="contenedor">
      <div className="tarjeta">
        <h1>Actividad 4</h1>
        <p className="subtitulo">
          Formulario controlado con <code>useState</code> y validación inmediata
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="campo">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={valores.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              className={mostrarError('nombre') ? 'input-error' : ''}
            />
            {mostrarError('nombre') && <span className="mensaje-error">{errores.nombre}</span>}
          </div>

          <div className="campo">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              name="correo"
              type="email"
              value={valores.correo}
              onChange={handleChange}
              onBlur={handleBlur}
              className={mostrarError('correo') ? 'input-error' : ''}
            />
            {mostrarError('correo') && <span className="mensaje-error">{errores.correo}</span>}
          </div>

          <div className="campo">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={valores.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={mostrarError('password') ? 'input-error' : ''}
            />
            {mostrarError('password') && <span className="mensaje-error">{errores.password}</span>}
          </div>

          <div className="campo">
            <label htmlFor="confirmarPassword">Confirmar contraseña</label>
            <input
              id="confirmarPassword"
              name="confirmarPassword"
              type="password"
              value={valores.confirmarPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={mostrarError('confirmarPassword') ? 'input-error' : ''}
            />
            {mostrarError('confirmarPassword') && (
              <span className="mensaje-error">{errores.confirmarPassword}</span>
            )}
          </div>

          <div className="campo">
            <label htmlFor="edad">Edad</label>
            <input
              id="edad"
              name="edad"
              type="number"
              value={valores.edad}
              onChange={handleChange}
              onBlur={handleBlur}
              className={mostrarError('edad') ? 'input-error' : ''}
            />
            {mostrarError('edad') && <span className="mensaje-error">{errores.edad}</span>}
          </div>

          <button type="submit" className="boton" disabled={!formularioEsValido()}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  )
}

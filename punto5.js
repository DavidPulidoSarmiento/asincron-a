// Función para transformar a mayúsculas y validar con Proxy
function transformarAMayusculas(usuario) {
  const handler = {
    set(target, prop, value) {
      if (prop === 'name' && /[^A-Z\s]/.test(value)) {
        throw new Error('El nombre solo puede contener letras mayúsculas y espacios');
      }
      target[prop] = value;
      return true;
    }
  };

  const proxyUsuario = new Proxy(usuario, handler);

  // Transformar el nombre a mayúsculas
  proxyUsuario.name = usuario.name.toUpperCase();

  return proxyUsuario;
}

// Función principal asincrónica
async function transformarUsuarios() {
  try {
    // Leer el archivo users.json
    const response = await fetch('user.json');
    const data = await response.json();

    // Transformar los nombres de los usuarios según las condiciones
    const usuariosTransformados = data.users.map(usuario => {
      // Condiciones
      const esAprendiz = usuario.aprendiz === true;
      const tieneMasDeDosNombres = usuario.name.trim().split(/\s+/).length > 2;
      const contieneADSO = usuario.name.toUpperCase().includes('ADSO');

      if (esAprendiz && tieneMasDeDosNombres && contieneADSO) {
        return transformarAMayusculas(usuario);
      }
      return usuario;
    });

    // Mostrar los usuarios transformados en consola
    console.log('Usuarios transformados:', usuariosTransformados);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Ejecutar la función
transformarUsuarios();
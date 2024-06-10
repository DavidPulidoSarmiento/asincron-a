// Función para transformar a mayúsculas y validar con Proxy
function transformarAMayusculas(usuario) {
  // Define un manejador para el Proxy
  const handler = {
    set(target, prop, value) {
      // Valida si la propiedad es 'name' y contiene caracteres que no sean letras mayúsculas y espacios
      if (prop === 'name' && /[^A-Z\s]/.test(value)) {
        throw new Error('El nombre solo puede contener letras mayúsculas y espacios');
        // Lanza un error si el nombre contiene caracteres no permitidos
      }
      // Asigna el valor a la propiedad del objeto destino
      target[prop] = value;
      return true; // Indica que la asignación fue exitosa
    }
  };

  // Crea un Proxy para el usuario con el manejador definido
  const proxyUsuario = new Proxy(usuario, handler);

  // Transforma el nombre a mayúsculas usando el Proxy
  proxyUsuario.name = usuario.name.toUpperCase();

  // Retorna el usuario con el nombre transformado y validado
  return proxyUsuario;
}

// Función principal asincrónica
async function transformarUsuarios() {
  try {
    // Leer el archivo users.json
    const response = await fetch('user.json'); 
    // Realiza una solicitud HTTP para obtener el archivo 'user.json'

    const data = await response.json(); 
    // Convierte la respuesta de la solicitud HTTP a un objeto JSON

    // Transformar los nombres de los usuarios según las condiciones
    const usuariosTransformados = data.users.map(usuario => {
      // Evaluar las condiciones
      const esAprendiz = usuario.aprendiz === true; 
      // Verifica si el usuario es aprendiz

      const tieneMasDeDosNombres = usuario.name.trim().split(/\s+/).length > 2; 
      // Verifica si el nombre del usuario tiene más de dos palabras

      const contieneADSO = usuario.name.toUpperCase().includes('ADSO'); 
      // Verifica si el nombre del usuario contiene la palabra 'ADSO' en cualquier parte

      // Si todas las condiciones se cumplen, transforma el nombre a mayúsculas
      if (esAprendiz && tieneMasDeDosNombres && contieneADSO) {
        return transformarAMayusculas(usuario);
      }

      // Si no se cumplen las condiciones, retorna el usuario sin modificar
      return usuario;
    });

    // Mostrar los usuarios transformados en consola
    console.log('Usuarios transformados:', usuariosTransformados); 
    // Muestra en la consola los usuarios con los nombres transformados y validados

  } catch (error) {
    console.error('Error:', error); 
    // Capturar y mostrar cualquier error ocurrido durante el proceso
  }
}

// Ejecutar la función
transformarUsuarios(); 
// Llama a la función para transformar los usuarios

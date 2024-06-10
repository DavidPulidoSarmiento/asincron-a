// Función para filtrar usuarios que son aprendices
const filtrarAprendices = user => user.aprendiz === true; 
// Esta función recibe un objeto usuario y devuelve true si la propiedad 'aprendiz' es true, lo que indica que el usuario es un aprendiz.

async function obtenerDatosAprendices() {
  // Definición de una función asíncrona para obtener los datos de los aprendices

  try {
    // Bloque de código que intentará ejecutarse y en caso de error saltará al bloque catch

    // Leer el archivo users.json
    const response = await fetch('user.json'); 
    // Realiza una solicitud HTTP para obtener el archivo 'user.json'.
    // La palabra clave 'await' se utiliza para esperar a que la promesa se resuelva.

    const data = await response.json(); 
    // Convierte la respuesta de la solicitud HTTP a un objeto JSON.
    // También se utiliza 'await' para esperar a que esta operación asíncrona se complete.

    // Filtrar los usuarios que son aprendices
    const aprendices = data.users.filter(filtrarAprendices); 
    // Utiliza el método 'filter' del array para obtener solo los usuarios que son aprendices.
    // 'filtrarAprendices' es una función que devuelve true si el usuario es un aprendiz.

    // Array para almacenar todos los repositorios
    let todosLosRepos = []; 
    // Inicializa un array vacío que se usará para almacenar todos los repositorios de los aprendices.

    // Para cada aprendiz, obtener sus repositorios públicos
    for (const aprendiz of aprendices) {
      // Itera sobre cada objeto 'aprendiz' en el array 'aprendices'.
      
      const respuestaGithub = await fetch(`https://api.github.com/users/${aprendiz.user}/repos`); 
      // Realiza una solicitud HTTP a la API de GitHub para obtener los repositorios públicos del usuario aprendiz.
      // La URL incluye el nombre de usuario de GitHub del aprendiz.

      const repos = await respuestaGithub.json(); 
      // Convierte la respuesta de la solicitud HTTP a un objeto JSON.
      // 'repos' es un array que contiene los repositorios del aprendiz.

      // Mostrar los repositorios en consola
      console.log(`Repositorios de ${aprendiz.name}`);
      // Muestra en la consola un mensaje indicando a quién pertenecen los repositorios que se mostrarán a continuación.

      console.log(repos); 
      // Muestra en la consola el array de repositorios del aprendiz.

      // Unir los repositorios en un solo arreglo
      todosLosRepos = todosLosRepos.concat(repos); 
      // Añade los repositorios obtenidos al array 'todosLosRepos' utilizando el método 'concat' para fusionar arrays.
    }

    // Mostrar todos los repositorios en consola
    console.log('Todos los repositorios:', todosLosRepos); 
    // Muestra en la consola el array 'todosLosRepos' que contiene todos los repositorios de todos los aprendices.

  } catch (error) {
    // Bloque de código que se ejecuta si ocurre un error en el bloque try

    console.error('Error:', error); 
    // Muestra en la consola un mensaje de error seguido del objeto 'error' que contiene información sobre el error ocurrido.
  }
}

// Ejecutar la función
obtenerDatosAprendices(); 
// Llama a la función 'obtenerDatosAprendices' para que se ejecute.

// Función para filtrar aprendices
const filtrarAprendices = user => user.aprendiz === true;

async function obtenerDatosAprendices() {
  try {
    // Leer el archivo users.json
    const response = await fetch('user.json');
    const data = await response.json();

    // Filtrar los usuarios que son aprendices
    const aprendices = data.users.filter(filtrarAprendices);

    // Array para almacenar todos los repositorios
    let todosLosRepos = [];

    // Para cada aprendiz, obtener sus repositorios públicos
    for (const aprendiz of aprendices) {
      const respuestaGithub = await fetch(`https://api.github.com/users/${aprendiz.user}/repos`);
      const repos = await respuestaGithub.json();

      // Mostrar los repositorios en consola
      console.log(`Repositorios de ${aprendiz.name}`);
      console.log(repos)

      // Unir los repositorios en un solo arreglo
      todosLosRepos = todosLosRepos.concat(repos);
    }

    // Mostrar todos los repositorios en consola
    console.log('Todos los repositorios:', todosLosRepos);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Ejecutar la función
obtenerDatosAprendices();
(async () => {
  // Función autoejecutable asíncrona

  // Realiza una solicitud HTTP para obtener el archivo 'user.json'
  let response = await fetch('user.json');
  
  // Convierte la respuesta de la solicitud HTTP a un objeto JSON
  let res = await response.json();
  
  // Array para almacenar las promesas de los repositorios
  let repos = [];
  
  // Itera sobre cada usuario en el archivo 'user.json'
  res.users.forEach(e => {
    // Para cada usuario, realiza una solicitud HTTP a la API de GitHub para obtener sus repositorios públicos
    let repo = fetch(`https://api.github.com/users/${e.user}/repos`).then(
      successResponse => {
        // Verifica si la respuesta de la solicitud HTTP es exitosa
        if (successResponse.status !== 200) {
          // Si la respuesta no es exitosa, devuelve null
          return null;
        } else {
          // Si la respuesta es exitosa, convierte la respuesta a un objeto JSON
          return successResponse.json();
        }
      },
      failResponse => {
        // En caso de fallo en la solicitud, devuelve null
        return null;
      }
    );
    // Añade la promesa del repositorio al array 'repos'
    repos.push(repo);
  });

  // Espera a que todas las promesas de los repositorios se resuelvan
  let results = await Promise.all(repos);

  // Filtrar resultados con menos de 5 repositorios públicos
  let filteredResults = results.filter(result => result && result.length < 5);

  // Mostrar los resultados filtrados en una tabla por consola
  console.log("Repositorios con menos de 5 repositorios públicos:");
  console.table(filteredResults.map(result => ({ user: result[0].owner.login, repos: result.length })));

  // Filtrar resultados para obtener repositorios que contengan la palabra "JavaScript" en su nombre
  let jsResults = results.flatMap(result => result ? result.filter(repo => repo.name.includes("JavaScript")) : []);

  // Ordenar los resultados de menor a mayor según el nombre del repositorio
  jsResults.sort((a, b) => a.name.localeCompare(b.name));

  // Mostrar los resultados filtrados en una tabla por consola
  console.log("\nRepositorios con JavaScript en su nombre:");
  console.table(jsResults.map(repo => ({ name: repo.name, owner: repo.owner.login })));

  // Filtrar resultados para obtener repositorios que tengan más de 5 letras en su nombre
  let longNameResults = results.flatMap(result => result ? result.filter(repo => repo.name.length > 5) : []);

  // Mostrar los resultados filtrados en una tabla por consola
  console.log("\nRepositorios con más de 5 letras en su nombre:");
  console.table(longNameResults.map(repo => ({ name: repo.name, owner: repo.owner.login })));
})();

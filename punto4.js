(async () => {
  let response = await fetch('user.json');
  let res = await response.json();
  let repos = [];
  res.users.forEach(e => {
    let repo = fetch(`https://api.github.com/users/${e.user}/repos`).then(
      successResponse => {
        if (successResponse.status !== 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    repos.push(repo);
  });
  let results = await Promise.all(repos);

  // Filtrar resultados con menos de 5 repositorios públicos
  let filteredResults = results.filter(result => result.length < 5);

  // Mostrar resultados en una tabla por consola
  console.log("Repositorios con menos de 5 repositorios públicos:");
  console.table(filteredResults.map(result => ({ user: result[0].owner.login, repos: result.length })));

  // Filtrar resultados con repositorios que contengan la palabra JavaScript en su name
  let jsResults = results.flatMap(result => result.filter(repo => repo.name.includes("JavaScript")));

  // Ordenar resultados de menor a mayor según el nombre del repositorio
  jsResults.sort((a, b) => a.name.localeCompare(b.name));

  // Mostrar resultados en una tabla por consola
  console.log("\nRepositorios con JavaScript en su nombre:");
  console.table(jsResults.map(repo => ({ name: repo.name, owner: repo.owner.login })));

  // Filtrar resultados con repositorios que tengan más de 5 letras en su nombre
  let longNameResults = results.flatMap(result => result.filter(repo => repo.name.length > 5));

  // Mostrar resultados en una tabla por consola
  console.log("\nRepositorios con más de 5 letras en su nombre:");
  console.table(longNameResults.map(repo => ({ name: repo.name, owner: repo.owner.login })));
})();
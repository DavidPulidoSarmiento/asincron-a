const filtrarAprendices = x => x.aprendiz === true;

// Leer el archivo users.json
fetch('user.json')
  .then(response => response.json())
  .then(data => {
    // Filtrar los usuarios que son aprendices
    const aprendices = data.users.filter(filtrarAprendices);

    // Crear una promesa para cada usuario aprendiz
    const promesas = aprendices.map(aprendiz => {
      return fetch(`https://api.github.com/users/${aprendiz.user}`)
        .then(response => response.json())
        .then(githubUser => {
          return {
            name: githubUser.name,
            avatar_url: githubUser.avatar_url
          };
        });
    });

    // Esperar a que todas las promesas se resuelvan
    return Promise.all(promesas);
  })
  .then(usersData => {
    // Mostrar los datos en forma de tabla en la consola
    console.table(usersData);
  })
  .catch(error => console.error('Error:', error));

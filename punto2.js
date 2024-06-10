// Función para filtrar usuarios que son aprendices
const filtrarAprendices = x => x.aprendiz === true; 
// Esta función toma un objeto usuario (x) y devuelve true si la propiedad 'aprendiz' es true, indicando que el usuario es un aprendiz.


// Leer el archivo users.json
fetch('user.json') 
// Realiza una solicitud HTTP para obtener el archivo 'user.json'.

  .then(response => response.json()) 
  // Convierte la respuesta de la solicitud HTTP a un objeto JSON.
  // La función 'then' se utiliza para manejar la promesa devuelta por 'fetch'.
  
  .then(data => {
    // Cuando la conversión a JSON se completa, se ejecuta este bloque de código.
    // 'data' ahora contiene el objeto JSON obtenido del archivo 'user.json'.

    // Filtrar los usuarios que son aprendices
    const aprendices = data.users.filter(filtrarAprendices); 
    // Utiliza el método 'filter' del array para obtener solo los usuarios que son aprendices.
    // 'filtrarAprendices' es una función que devuelve true si el usuario es un aprendiz.

    // Crear una promesa para cada usuario aprendiz
    const promesas = aprendices.map(aprendiz => {
      // Itera sobre cada objeto 'aprendiz' en el array 'aprendices'.
      // 'map' crea una nueva array de promesas para cada aprendiz.

      // Hacer una petición a la API de GitHub para cada usuario aprendiz
      return fetch(`https://api.github.com/users/${aprendiz.user}`) 
      // Realiza una solicitud HTTP a la API de GitHub para obtener información del usuario aprendiz.
      // La URL incluye el nombre de usuario de GitHub del aprendiz.

        .then(response => response.json()) 
        // Convierte la respuesta de la solicitud HTTP a un objeto JSON.
        // Esta promesa se resuelve con los datos del usuario de GitHub.

        .then(githubUser => {
          // Cuando la conversión a JSON se completa, se ejecuta este bloque de código.
          // 'githubUser' ahora contiene el objeto JSON con los datos del usuario de GitHub.

          // Devolver un objeto con el nombre y la URL del avatar del usuario de GitHub
          return {
            name: githubUser.name, 
            // 'name' es el nombre del usuario de GitHub.
            avatar_url: githubUser.avatar_url 
            // 'avatar_url' es la URL del avatar del usuario de GitHub.
          };
        });
    });

    // Esperar a que todas las promesas se resuelvan
    return Promise.all(promesas); 
    // 'Promise.all' toma una array de promesas y devuelve una nueva promesa que se resuelve cuando todas las promesas en la array se han resuelto.
  })
  .then(usersData => {
    // Cuando todas las promesas se resuelven, se ejecuta este bloque de código.
    // 'usersData' es una array de objetos con el nombre y la URL del avatar de cada usuario aprendiz.

    // Mostrar los datos en forma de tabla en la consola
    console.table(usersData); 
    // Muestra los datos en forma de tabla en la consola para una visualización clara.
  })
  .catch(error => console.error('Error:', error)); 
  // Capturar y mostrar cualquier error ocurrido durante el proceso.
  // 'catch' se utiliza para manejar cualquier error que ocurra en cualquier parte de la cadena de promesas.

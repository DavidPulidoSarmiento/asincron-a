const filtrar = x => x.name === "Evaluacion";
// Definimos una función de flecha que toma un objeto 'x' y retorna verdadero si el 'name' del objeto es "Evaluacion". Esta función se utilizará para filtrar elementos en un array.

(async () => {
  // Definimos una función anónima asincrónica y la ejecutamos inmediatamente. Esto permite el uso de 'await' dentro de la función.

  let response = await fetch('punto1.json');
  // Utilizamos 'fetch' para hacer una solicitud HTTP GET al archivo 'punto1.json'. 'fetch' devuelve una promesa que se resuelve con un objeto Response.

  let user = await response.json();
  // Esperamos a que la promesa de 'response.json()' se resuelva, lo que parsea el cuerpo de la respuesta HTTP como JSON. El resultado se almacena en la variable 'user'.

  let respuestaGithub = await fetch(`https://api.github.com/users/${user.name}/repos`);
  // Hacemos otra solicitud HTTP GET, esta vez a la API de GitHub para obtener los repositorios del usuario cuyo nombre está en 'user.name'. 'fetch' devuelve otra promesa que se resuelve con un objeto Response.

  let usuariogithub = await respuestaGithub.json();
  // Esperamos a que la promesa de 'respuestaGithub.json()' se resuelva, parseando el cuerpo de la respuesta como JSON. El resultado se almacena en la variable 'usuariogithub', que es un array de objetos, cada uno representando un repositorio del usuario.

  usuariogithub.forEach(element => {
    if (element.name === "Evaluacion") {
      console.log(element)
    }
  });
  // Iteramos sobre cada elemento en el array 'usuariogithub' usando 'forEach'. Si el 'name' del elemento es "Evaluacion", imprimimos el elemento en la consola.

  let data = usuariogithub.filter(filtrar)
  // Utilizamos el método 'filter' en el array 'usuariogithub' con la función de flecha 'filtrar' que definimos al inicio. Esto crea un nuevo array 'data' que contiene solo los elementos cuyo 'name' es "Evaluacion".

  console.log(data)
  // Imprimimos el array 'data' en la consola.

  console.log(usuariogithub)
  // Imprimimos el array completo 'usuariogithub' en la consola.
})();


// const filtrar = x => x.name === "Evaluacion";
// // Definimos una función de flecha que toma un objeto 'x' y retorna verdadero si el 'name' del objeto es "Evaluacion". Esta función se utilizará para filtrar elementos en un array.

// fetch('punto1.json')
//   // Hacemos una petición para obtener el archivo 'punto1.json'.

//   .then(response => response.json())
//   // Cuando la promesa de 'fetch' se resuelve, obtenemos una respuesta 'response' y la parseamos a formato JSON usando 'response.json()'. Esto devuelve una nueva promesa.

//   .then(user => {
//     // Una vez que la promesa de 'response.json()' se resuelve, obtenemos el objeto 'user'.

//     return fetch(`https://api.github.com/users/${user.name}/repos`)
//       // Utilizamos el nombre de usuario 'user.name' para hacer una petición a la API de GitHub y obtener los repositorios del usuario. Esto devuelve una promesa.

//       .then(respuestGitHub => respuestGitHub.json())
//       // Cuando la promesa de 'fetch' se resuelve, obtenemos una respuesta 'respuestGitHub' y la parseamos a formato JSON usando 'respuestGitHub.json()'. Esto devuelve una nueva promesa.

//       .then(usuariogithub => {
//         // Una vez que la promesa de 'respuestGitHub.json()' se resuelve, obtenemos el array 'usuariogithub' que contiene los repositorios del usuario.

//         usuariogithub.forEach(element => {
//           // Iteramos sobre cada elemento en el array 'usuariogithub' usando 'forEach'.

//           if (element.name === "Evaluacion") {
//             // Si el 'name' del elemento es "Evaluacion".

//             console.log(element);
//             // Imprimimos el elemento en la consola.
//           }
//         });

//         let data = usuariogithub.filter(filtrar);
//         // Utilizamos el método 'filter' en el array 'usuariogithub' con la función de flecha 'filtrar' que definimos al inicio. Esto crea un nuevo array 'data' que contiene solo los elementos cuyo 'name' es "Evaluacion".

//         console.log(data);
//         // Imprimimos el array 'data' en la consola.

//         console.log(usuariogithub);
//         // Imprimimos el array completo 'usuariogithub' en la consola.
//       });
//   })

//   .catch(error => console.error('Error:', error));
// // Si alguna de las promesas en la cadena falla, capturamos el error en el bloque 'catch' y lo imprimimos en la consola.


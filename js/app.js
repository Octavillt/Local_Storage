// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = []; // Arreglo Vacio, para ir Agregando los Tweets

// Event Listeners
eventListeners();
function eventListeners() {
    // Cuando el Usuario Agrega un Nuevo Tweet 
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el Documento este Listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; // Convierte a un Arreglo el LocalStorage o Covierte a un Arreglo Vacio
        // console.log(tweets);
        crearHTML();
    });
}

// Funciones

// Agrega el Tweet al HTML
function agregarTweet(e) {
    e.preventDefault();
    //console.log('agregar tweet...');

    // TextArea doende el Usuario Escribe
    const tweet = document.querySelector('#tweet').value;
    // console.log(tweet);

    // Validacion en caso de Ser Vacio
    if (tweet === '') {
        // console.log('No puede ser Vacio');
        mostrarError('El Mansaje No Puede ser Vacio <br> Favor de Validarlo...'); // Contenido de Mensaje de Error
        return; // Evita que se Ejecunten Más Lineas de Codigo
    }
    // console.log('Agregando Tweet');

    const tweetObj = {
        id: Date.now(), // Se utiliza  Date.now() como id Unico, ya que no se cuenta con una BD 
        // texto: tweet // Si la Llave y el Valor son Iguales, puede ocuparce solo un valor
        tweet // -> = tweet : tweet
    }
    // Añadir al Arreglo de Tweets
    tweets = [...tweets, tweetObj]; // Se Apilan los Tweets que se van Agrgando cada que se Agregan
    // console.log(tweets);

    // Una Vez agragado, se Crea el HTML
    crearHTML();

    // Reiniciar El formulario
    formulario.reset(); // Cada que se Agrega el Tweet se Limpia/Reinicia el Formulario
}
// END Agrega el Tweet al HTML


// Monstrar Mensaje de Error
function mostrarError(error) { // Parametro que pasa el Mensaje de Error
    const mensajeError = document.createElement('P'); // Asigna una Variable para Crear un Parrafo
    mensajeError.innerHTML = error; // Se utiliza innerHTML para colocar etiquetas dentro del Parametro 
    mensajeError.classList.add('error'); // Se le Agrega una Clase de Error con los Estilos Correspondientes

    // Insertando en el Contenido
    const contenido = document.querySelector('#contenido'); // Asigna una Variable para agregar el Mensaje
    contenido.appendChild(mensajeError); // Agrega el el mensaje al Contenido

    // Elimina la Alerta Despues de 2.5s
    // setTimeout(() => contenido.removeChild(mensajeError), 2500); // Manera Corta de realizar setTimeout
    setTimeout(() => {
        mensajeError.remove();
    }, 2500); // Cantidad en Segundos
}
//END  Mostrar Mensaje de Error


// Mostrar Listado de Tweets
function crearHTML() {

    // Limpiar el HTML 
    limpiarHTML() // Para No Duplicar el Tweet Anterior

    if (tweets.length > 0) {
        tweets.forEach(tweet => { // Se Recorre el Alrreglo, para ir crando el HTML de los Tweets
            // Crear HTML

            // Agregar Boton de Eliminar
            const btnEliminar = document.createElement('A'); // Asiga una Variable para Crear un "Boton" en cada Tweet
            btnEliminar.classList.add('borrar-tweet'); // Se le Agrega una Clase de borrar-tweet con los Estilos Correspondientes
            btnEliminar.innerText = 'X'; // Se agrega una X de Modo que se entienda que se Eliminara

            // Funcionalidad de Eliminar Tweets
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id); // Funcion para Eliminar Tweet Cuando se Oprime la X
            }
            const li = document.createElement('LI'); // Se Asigna una Variable para crear una Lista

            // Añadir el Texto
            li.innerText = tweet.tweet; // Se agrega el Texto con respecto a como se vaya Recorriendo

            // Asignar Boton
            li.appendChild(btnEliminar);

            // Insertando el HTML
            listaTweets.appendChild(li) // Se van Agregando los textos al HTML
        });
    }

    // Sincrnizar Storage
    sicronizarStorage();
}
// END Mostrar Listado de Tweets


// Agrega los Teews Actuales al LocaStorage
function sicronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
// END Agrega los Teews Actuales al LocaStorage



// Elimina un Tweet
function borrarTweet(id) { // Se pasa el Parametro del id
    // console.log('Borrando un Tweet', id);
    tweets = tweets.filter(tweet => tweet.id !== id); // Filtra/Trae los Elementos del Arreglo Excepto el que se haya Eliminado
    // console.log(tweets);
    crearHTML(); // Trae el Nuevo HTML con los Elementos ya Filtrodos
}
// END Elimina un Tweet


// Limpiar el HTML 
function limpiarHTML() {
    while (listaTweets.firstChild) { // Mientras haya Elementos
        listaTweets.removeChild(listaTweets.firstChild); // Para No Duplicar el Tweet Anterior
    }
}
// END Limpiar el HTML



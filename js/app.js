// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

// Event Listeners
eventListeners();
function eventListeners() {
    // Cuando el Usuario Agrega un Nuevo Tweet 
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el Documento este Listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];
        console.log(tweets);
        crearHTML();
   });
}


// Funciones
function agregarTweet(e) {
    e.preventDefault();
    //console.log('agregar tweet...');

    // TextArea doende el Usuario Escribe
    const tweet = document.querySelector('#tweet').value;
    // console.log(tweet);

    // Validacion en caso de Ser Vacio
    if (tweet === '') {
        // console.log('No puede ser Vacio');
        mostrarError('El Mansaje No Puede ser Vacio <br> Favor de Validarlo...');
        return; // Evita que se Ejecunten Más Lineas de Codigo
    }
    // console.log('Agregando Tweet');

    const tweetObj = {
        id: Date.now(),
        // texto: tweet // Si la Llave y el Valor son Iguales, puede ocuparce solo un valor
        tweet
    }
    // Añadir al Arreglo de Tweets
    tweets = [...tweets, tweetObj];
    // console.log(tweets);

    // Una Vez agragado, se Crea el HTML
    crearHTML();

    // Reiniciar El formulario
    formulario.reset();
}

// Monstrar Mnesaje de Error
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.innerHTML = error;
    mensajeError.classList.add('error');

    // Insertando en el Contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la Alerta Despues de 2.5s
    // setTimeout(() => contenido.removeChild(mensajeError), 2500);
    setTimeout(() => {
        mensajeError.remove();
    }, 2500);
}

// Mostrar Listado de tweets
function crearHTML() {

    // Limpiar el HTML 
    limpiarHTML()

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // Crear HTML

            // Agregar Boton de Eliminar
            const btnEliminar = document.createElement('A');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Funcionalidad de Eliminar Tweets
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }
            const li = document.createElement('LI');

            // Añadir el Texto
            li.innerText = tweet.tweet;

            // Asignar Boton
            li.appendChild(btnEliminar);

            // Insertando el HTML
            listaTweets.appendChild(li)
        });
    }

    // Sincrnizar Storage
    sicronizarStorage();
}

// Agrega los Teews Actuales al LocaStorage
function sicronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


// Elimina un Tweet
function borrarTweet(id){
    // console.log('Borrando un Tweet', id);
    tweets = tweets.filter( tweet => tweet.id !== id);
    // console.log(tweets);
    crearHTML();
}

// Limpiar el HTML 
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}


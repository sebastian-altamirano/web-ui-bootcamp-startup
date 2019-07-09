// ----------------------------- GLOBAL VARIABLES --------------------------- \\

// DOM ELEMENTS

const sectionEl = document.querySelector('section');
const sayHelloBtn = document.querySelector('button[name="hello"]');
const getChuckJokeBtn = document.querySelector('button[name="joke"]');

// ------------------------ EVENT HANDLER FUNCTIONS ------------------------- \\

// Executes initialization tasks.
function initialization(event) {
  // Shows the hidden section element.
  sectionEl.classList.remove('hidden');
}

function sayHello() {
  alert('Hello!');
}

// Writes a random Chuck Norris joke in the h1 element from the section element
// every time its called.
function getChuckJoke() {
  const request = new XMLHttpRequest();
  request.open('get', 'http://api.icndb.com/jokes/random', true);
  request.responseType = 'json';
  request.onload = function() {
    sectionEl.querySelector('h1').innerHTML = request.response.value.joke;
  };
  request.send();
}

// ------------------------------ EVENT HANDLERS ---------------------------- \\

// initialization() is called when the page finishes loading
// (both HTML and CSS).
window.addEventListener('load', initialization);

sayHelloBtn.addEventListener('click', sayHello);

getChuckJokeBtn.addEventListener('click', getChuckJoke);

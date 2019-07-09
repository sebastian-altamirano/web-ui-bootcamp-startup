// ----------------------------- GLOBAL VARIABLES --------------------------- \\

// DOM ELEMENTS

const sectionEl = document.querySelector('section');
const sayHelloBtn = document.querySelector('button[name="hello"]');
const getChuckJokeBtn = document.querySelector('button[name="joke"]');

// --------------------------------- FUNCTIONS ------------------------------ \\

// Executes a HTTP GET request of JSON data using fetch and async/await.
// INPUT:
// <-- url: string ** no type checking is done **
// The url from which to fetch the JSON data.
// <-- callback: function ** no type checking is done **
// The callback function that will receive the response from the HTTP GET
// request over the said url.
// OUTPUT:
// --> void
// The function worked as expected.
// --> TypeError
// NetworkError ocurred when attempting to fetch the resource.
async function httpGetJSON(url, callback) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error(error);
  }
}

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
  httpGetJSON('http://api.icndb.com/jokes/random', data => {
    if (data.type === 'success')
      sectionEl.querySelector('h1').innerHTML = data.value.joke;
    else sectionEl.style.color = 'red';
  });
}

// ------------------------------ EVENT HANDLERS ---------------------------- \\

// initialization() is called when the page finishes loading
// (both HTML and CSS).
window.addEventListener('load', initialization);

sayHelloBtn.addEventListener('click', sayHello);

getChuckJokeBtn.addEventListener('click', getChuckJoke);

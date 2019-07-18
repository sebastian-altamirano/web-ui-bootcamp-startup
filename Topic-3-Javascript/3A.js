'use strict';

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
  sectionEl.classList.add('fade-in');
  // Disable the button to get a new joke till all the jokes have been fetched.
  getChuckJokeBtn.disabled = true;
}

function sayHello() {
  alert('Hello!');
}

// Writes a random Chuck Norris joke in the h1 element from the section element
// every time the "Tell me a Chuck Norris joke" button is clicked.
httpGetJSON(`http://api.icndb.com/jokes`, data => {
  if (data.type === 'success') {
    // Backup all the jokes...
    const JOKES = data.value;
    // ...and enable the button to get a new joke.
    getChuckJokeBtn.innerHTML = 'Tell me a Chuck Norris joke';
    getChuckJokeBtn.disabled = false;
    // Add a click event listener to the button so that every time its clicked
    // a new joke is shown.
    getChuckJokeBtn.addEventListener('click', () => {
      // Generate a random valid index for JOKES.
      const randomJokeNumber = Math.round(Math.random() * JOKES.length);
      // If the jokes have been exhausted indicate so.
      if (!JOKES.length)
        sectionEl.querySelector('h1').innerHTML =
          "You've exhausted all the jokes!";
      // Otherwise...
      else {
        // ...show a random joke...
        sectionEl.querySelector('h1').innerHTML = JOKES[randomJokeNumber].joke;
        // ...and then remove it from the JOKES array using swap and remove.
        JOKES[randomJokeNumber] = JOKES[JOKES.length - 1];
        JOKES.pop();
      }
    });
  }
  // If a server error occurs turn the section content red.
  else sectionEl.style.color = 'red';
});

// ------------------------------ EVENT HANDLERS ---------------------------- \\

// initialization() is called when the page finishes loading
// (both HTML and CSS).
window.addEventListener('load', initialization);

sayHelloBtn.addEventListener('click', sayHello);

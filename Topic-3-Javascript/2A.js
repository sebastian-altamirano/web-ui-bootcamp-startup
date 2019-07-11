'use strict';

// ----------------------------- GLOBAL VARIABLES --------------------------- \\

// DOM ELEMENTS

const sayHelloBtn = document.querySelector('button[name="hello"]');

// ------------------------ EVENT HANDLER FUNCTIONS ------------------------- \\

// Executes initialization tasks.
function initialization(event) {
  // Shows the hidden section element.
  const sectionEl = document.querySelector('section');
  sectionEl.classList.remove('hidden');
}

function sayHello() {
  alert('Hello!');
}

// ------------------------------ EVENT HANDLERS ---------------------------- \\

// initialization() is called when the page finishes loading
// (both HTML and CSS).
window.addEventListener('load', initialization);

sayHelloBtn.addEventListener('click', sayHello);

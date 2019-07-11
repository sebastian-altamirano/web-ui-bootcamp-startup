import debounce from './debounce.js';

// ----------------------------- GLOBAL VARIABLES --------------------------- \\

// DOM ELEMENTS

const repositoriesEl = document.querySelector('ul');
const repositorySearchEl = document.querySelector('#search-repository');

// --------------------------------- FUNCTIONS ------------------------------ \\

// Shows a list of repositories matching a given string in a specified list.
// INPUT:
// <-- list: object ** no type checking is done **
// An <ul> (or <ol>) element to put the repositories data as <li>.
// <-- search: string ** no type checking is done **
// The search to perform.
// OUTPUT:
// --> void
// The repositories matching the "search" string are appended to the specified
// list.
async function showRepos(list, search) {
  const apiErrorEl = document.querySelector('.api-error');
  apiErrorEl.querySelector('p').innerHTML = '';
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${search}`
    );
    const data = await response.json();
    list.innerHTML = '';
    if (data.items) {
      apiErrorEl.style.display = 'none';
      data.items.forEach(repo => {
        // Appends a list of repos as:
        // <li>
        //   <h2><a href="repo.html_url">repo.name</a></h2>
        //   <p>repo.descriptions</p>
        // </li>
        // to the <ul> element.
        let repository = document.createElement('li');
        let repositoryName = document.createElement('h2');
        let repositoryDescription = document.createElement('p');
        let repositoryURL = document.createElement('a');
        repositoryURL.setAttribute('href', repo.html_url);
        repositoryURL.appendChild(document.createTextNode(repo.name));
        repositoryName.appendChild(repositoryURL);
        repositoryDescription.appendChild(
          document.createTextNode(repo.description || '')
        );
        repository.appendChild(repositoryName);
        repository.appendChild(repositoryDescription);
        list.appendChild(repository);
      });
    } else {
      apiErrorEl.style.display = 'block';
      const errorMessage = `Sorry, ${
        data.message && data.message.includes('API rate limit exceeded')
          ? 'API rate limit exceeded, wait a minute to keep searching.'
          : 'no repositories could be found!'
      }.`;
      apiErrorEl
        .querySelector('p')
        .appendChild(document.createTextNode(errorMessage));
    }
  } catch (error) {
    console.error(error);
    apiErrorEl.style.display = 'block';
    apiErrorEl
      .querySelector('p')
      .appendChild(
        'Sorry, a network error occurred. Check your internet connection and try again.'
      );
  }
}

// ------------------------ EVENT HANDLER FUNCTIONS ------------------------- \\

// Executes initialization tasks.
function initialization() {
  repositorySearchEl.value = '';
}

// Debounces showRepos().
const showReposDebounced = debounce(function(event) {
  showRepos(repositoriesEl, event.target.value);
}, 250);

// ------------------------------ EVENT HANDLERS ---------------------------- \\

// initialization() is called when the page finishes loading
// (both HTML and CSS).
window.onload = initialization;

repositorySearchEl.addEventListener('input', showReposDebounced);

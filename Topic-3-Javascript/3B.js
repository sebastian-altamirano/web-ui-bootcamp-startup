'use strict';

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

// Shows a list of JavaScript repositories on the right side of the page.
function showJSRepos(search) {
  const repositories = document.querySelector('ul');
  httpGetJSON(
    `https://api.github.com/search/repositories?q=JavaScript`,
    data => {
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
        repositories.appendChild(repository);
      });
    }
  );
}

showJSRepos('');

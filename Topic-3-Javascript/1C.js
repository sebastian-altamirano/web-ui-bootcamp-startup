import isPalindrome from './1A.js';
import getDayAfter from './1B.js';

// isPalindrome interface

const palindromeForm = document.querySelector('#is-palindrome-heading + form');

function palindromeFormEventHandler(event) {
  event.preventDefault();
  const palindromeString = document.querySelector('#palindrome-string').value;
  try {
    const palindromeResult = document.querySelector(
      '#is-palindrome-heading ~ .result'
    );
    const palindromeResultContent = document.querySelector(
      '#is-palindrome-heading ~ .result p'
    );
    // Empty the previous result.
    palindromeResultContent.innerHTML = '';
    // Run isPalindrome with user input and put the data in the hidden div...
    const quote = document.createElement('q');
    const quoteText = document.createTextNode(palindromeString);
    quote.appendChild(quoteText);
    const isPalindromeResult = document.createTextNode(
      isPalindrome(palindromeString)
        ? 'is a palindrome!'
        : 'is not a palindrome'
    );
    palindromeResultContent.appendChild(quote);
    palindromeResultContent.appendChild(isPalindromeResult);
    // ...then show the div.
    palindromeResult.style.display = 'block';
  } catch (error) {
    console.log(error);
  }
}

palindromeForm.addEventListener('submit', palindromeFormEventHandler);

// getDayAfter interface

const dayAfterForm = document.querySelector('#get-day-after-heading + form');

function dayAfterFormEventHandler(event) {
  event.preventDefault();
  const day = document.querySelector('#day-after-day').value;
  const daysAfter = parseInt(document.querySelector('#day-after-number').value);
  try {
    const dayAfterResult = document.querySelector(
      '#get-day-after-heading ~ .result'
    );
    const dayAfterResultContent = dayAfterResult.querySelector('p');
    // Empty the previous result.
    dayAfterResultContent.innerHTML = '';
    // Run getDayAfter with user input and put the data in the hidden div...
    const getDayAfterResult = document.createTextNode(
      `${daysAfter} days after ${day} it'll be ${getDayAfter(day, daysAfter)}.`
    );
    dayAfterResultContent.appendChild(getDayAfterResult);
    // ...then show the div.
    dayAfterResult.style.display = 'block';
  } catch (error) {
    console.log(error);
  }
}

dayAfterForm.addEventListener('submit', dayAfterFormEventHandler);

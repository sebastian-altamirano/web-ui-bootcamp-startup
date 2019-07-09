import { runTestCase } from './helpers.js';
import isPalindrome from './1A.js';
import getDayAfter from './1B.js';

function isPalindromeTestCases() {
  // Test that the function works as expected with valid values.
  runTestCase(isPalindrome, { phrase: 'Oso' }, true);
  runTestCase(isPalindrome, { phrase: '121' }, true);
  runTestCase(isPalindrome, { phrase: 'carroza' }, false);
  runTestCase(isPalindrome, { phrase: '1911' }, false);
  runTestCase(isPalindrome, { phrase: 'Eva, can I see bees in a cave?' }, true);
  runTestCase(isPalindrome, { phrase: 'word and phrases' }, false);
  runTestCase(isPalindrome, { phrase: 'Le avisará Sara si va él.' }, true);
  // Test that the function produces exceptions when its input has wrong types.
  try {
    isPalindrome('');
  } catch (error) {
    runTestCase(
      function isPalindrome() {
        return error.message;
      },
      { phrase: '' },
      `"phrase" parameter can't be an empty string`
    );
  }
  try {
    isPalindrome(123);
  } catch (error) {
    runTestCase(
      function isPalindrome() {
        return error.message;
      },
      { phrase: 123 },
      `The type: number isn't valid`
    );
  }
}

function getDayAfterTestCases() {
  // Test that the function works as expected with valid values.
  runTestCase(getDayAfter, { day: 'Monday', daysAfter: 4 }, 'Friday');
  runTestCase(getDayAfter, { day: 'saturday', daysAfter: 0 }, 'Saturday');
  runTestCase(getDayAfter, { day: 'Sunday', daysAfter: -6 }, 'Monday');
  runTestCase(getDayAfter, { day: 'Monday', daysAfter: -29 }, 'Sunday');
  // Test that the function produces exceptions when its input has wrong types.
  try {
    getDayAfter(122);
  } catch (error) {
    runTestCase(
      function getDayAfter() {
        return error.message;
      },
      { day: 122, daysAfter: undefined },
      `The parameter day must be of type string, but instead it's of type number.`
    );
  }
  try {
    getDayAfter('sunday', 'monday');
  } catch (error) {
    runTestCase(
      function getDayAfter() {
        return error.message;
      },
      { day: 'sunday', daysAfter: 'monday' },
      `The parameter daysAfter must be of type integer, but instead it's of type string.`
    );
  }
  try {
    getDayAfter('sunday', 10.1);
  } catch (error) {
    runTestCase(
      function getDayAfter() {
        return error.message;
      },
      { day: 'sunday', daysAfter: 10.1 },
      `The parameter daysAfter must be of type integer, but instead it's of type number.`
    );
  }
  try {
    getDayAfter('', 1);
  } catch (error) {
    runTestCase(
      function getDayAfter() {
        return error.message;
      },
      { day: '', daysAfter: 1 },
      `"day" parameter can't be an empty string.`
    );
  }
  try {
    getDayAfter('tortoise', 1);
  } catch (error) {
    runTestCase(
      function getDayAfter() {
        return error.message;
      },
      { day: 'tortoise', daysAfter: 1 },
      `"day" parameter is not a valid day.`
    );
  }
}

(function tests() {
  // Temporally delete alert() so it doesn't fire while the test cases run.
  const alertFnBackup = window.alert;
  window.alert = function() {};
  isPalindromeTestCases();
  getDayAfterTestCases();
  // Restore alert().
  window.alert = alertFnBackup;
})();

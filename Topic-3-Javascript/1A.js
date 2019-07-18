// Takes a word or a phrase (also works with a number if it's in the form of a
// string) and says if it's a palindrome or not.
// INPUT:
// <-- phrase: String
// The phrase or word to determine whether it's a palindrome or not.
// OUTPUT:
// --> Boolean: true
// The phrase or word is a palindrome.
// --> Boolean: false
// The phrase or word is not a palindrome.
// SIDE EFFECTS:
// - An alert is displayed when "phrase" parameter is not of type String.

export default function isPalindrome(phrase) {
  // Check that "phrase" parameter is of type string.
  const phraseType = typeof phrase;
  if (phraseType !== 'string') {
    const error = new TypeError(`The type: ${phraseType} isn't valid`);
    alert(error.message);
    throw error;
  }
  // Remove accents or diacritics from "phrase"...
  let unformattedPhrase = phrase
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  // ...then remove any special characters and white spaces, and finally
  // transform it to lowercase...
  unformattedPhrase = unformattedPhrase
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
  // Check that the unformatted phrase is not an empty string.
  if (unformattedPhrase.length === 0) {
    const error = new RangeError(`"phrase" parameter can't be an empty string`);
    alert(error.message);
    throw error;
  }
  // ...then compare its characters end to end to determine if it's a
  // palindrome.
  for (let i = 0; i < Math.floor(unformattedPhrase.length / 2); i += 1)
    if (
      unformattedPhrase[i] !==
      unformattedPhrase[unformattedPhrase.length - 1 - i]
    )
      return false;
  return true;
}

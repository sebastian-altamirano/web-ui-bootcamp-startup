// Runs a test case through console.assert. If the test case fails, then a
// detailed error message is shown.
// DEFECTS:
// - Doesn't work with objects, since no deep comparison is done.
// INPUT:
// <-- fn: function ** no type checking is applied **
// The function that will be tested.
// <-- input: object ** no type checking is applied **
// An object with the function parameters.
// <-- expectedOutput: !object
// The expected result of the test case.
// OUTPUT
// --> void
// The function worked as expected.
// SIDE EFFECTS:
// - A console assertion is shown if the test case fails.

function runTestCase(fn, input, expectedOutput) {
  const fnArguments = Object.values(input);
  const output = fn(...fnArguments);
  console.assert(
    output === expectedOutput,
    `A test case failed with:
- Function:        ${fn.name}
- Input:           ${Object.entries(input).reduce(
      (inputStr, [argName, argValue]) =>
        `${inputStr}"${argName}": ${argValue}; `,
      ''
    )}
- Output:          ${output}
- Expected output: ${expectedOutput}`
  );
}

// Returns a TypeError with a generic message.
// INPUT:
// <-- parameterName: string ** no type checking is applied **
// The name of the parameter thar causes the type error.
// <-- parameterType: string ** no type checking is applied **
// The type of the parameter that causes the type error.
// <-- parameterExpectedType: string ** no type checking is applied **
// The type that the parameter must have to not cause the type error.
// OUTPUT:
// --> TypeError
// The function worked as expected.

function getTypeError(parameterName, parameterType, parameterExpectedType) {
  return new TypeError(
    `The parameter ${parameterName} must be of type ${parameterExpectedType}, but instead it's of type ${parameterType}.`
  );
}

export { runTestCase, getTypeError };

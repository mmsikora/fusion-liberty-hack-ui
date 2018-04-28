/* eslint-disable no-console */
export default function printObject(thing, index, originalArray) {

  // check to see if value is primitive
  if (typeof thing === 'string' || typeof thing === 'number' || typeof thing === 'boolean') {
    const logMessage = (originalArray.length ? 
      `key - ${originalArray[index]}:  ${String(thing)}` :
      `value: ${String(thing)}`);

    console.info(logMessage);
  }

  // check for Arrays and Objects, call recursively
  if (Array.isArray(thing)) {
    thing.forEach(printObject);
  } else if (typeof thing === 'object') {
    const nextLevelDown = Object.keys(thing);
    nextLevelDown.forEach((key, i, a) => {
      printObject(thing[key], i, a);
    });
  }
}
/* eslint-enable no-console */

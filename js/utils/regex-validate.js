export function createValidator(regexp) {
  return (value) => regexp.test(value);
}

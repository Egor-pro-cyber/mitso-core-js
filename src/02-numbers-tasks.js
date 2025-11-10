/**
 * Returns an area of a rectangle given by width and height.
 */
function getRectangleArea(width, height) {
  return wight*height;
}

/**
 * Returns a circumference of circle given by radius.
 */
function getCircleCircumference(radius) {
  return 2*Math.pi*radius;
}

/**
 * Returns an average of two given numbers.
 */
function getAverage(value1, value2) {
  return (value1 / 2) + (value2 / 2);
}

/**
 * Returns a distance between two points by cartesian coordinates.
 */
function getDistanceBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Returns a root of linear equation a*x + b = 0 given by coefficients a and b.
 */
function getLinearEquationRoot(a, b) {
  return -b / a;
}

/**
 * Returns an angle (in radians) between two vectors given by xi and yi,
 *   (1,0) (0,1)     => π/2
 *   (0,1) (0,-1)    => π
 */
function getAngleBetweenVectors(x1, y1, x2, y2) {
  const dot = x1 * x2 + y1 * y2;
  const len1 = Math.sqrt(x1 ** 2 + y1 ** 2);
  const len2 = Math.sqrt(x2 ** 2 + y2 ** 2);
  return Math.acos(dot / (len1 * len2));
}

/**
 * Returns a last digit of a integer number.
 */
function getLastDigit(value) {
  return Math.abs(value % 10);
}

/**
 * Returns a number by given string representation.
 */
function parseNumberFromString(value) {
  return Number(value);
}

/**
 * Returns a diagonal length of the rectangular parallelepiped given by its sides a,b,c.
 */
function getParallelepipedDiagonal(a, b, c) {
  return Math.sqrt(a ** 2 + b ** 2 + c ** 2);
}

/**
 * Returns the number rounded to specified power of 10.
 */
function roundToPowerOfTen(num, pow) {
  const factor = 10 ** pow;
  return Math.round(num / factor) * factor;
}

/**
 * Returns true is the number is prime; otherwise false.
 *   6 => false
 *   7 => true
 *   11 => true
 *   12 => false
 *   16 => false
 *   17 => true
 */
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Tries to convert value to number and returns it if conversion was successful;
 *   toNumber(null, 0) => 0
 *   toNumber('test', 0) => 0
 *   toNumber('1', 0) => 1
 *   toNumber(42, 0) => 42
 *   toNumber(new Number(42), 0) => 42
 */
function toNumber(value, def) {
  const num = Number(value);
  return Number.isNaN(num) ? def : num;
}

module.exports = {
  getRectangleArea,
  getCircleCircumference,
  getAverage,
  getDistanceBetweenPoints,
  getLinearEquationRoot,
  getAngleBetweenVectors,
  getLastDigit,
  parseNumberFromString,
  getParallelepipedDiagonal,
  roundToPowerOfTen,
  isPrime,
  toNumber,
};

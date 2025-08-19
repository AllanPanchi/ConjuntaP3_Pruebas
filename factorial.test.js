const fac = require('./math.js');

test('Factorial of 0 is 1', () => {
    expect(fac.factorial(0)).toBe(1);
});

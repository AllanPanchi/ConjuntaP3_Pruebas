const fib = require('./math.js');

test(
    'Expect 13 when calculating the 7th Fibonacci number',
    () => {
        expect(fib.fibonacci(7)).toBe(13);
    }
);
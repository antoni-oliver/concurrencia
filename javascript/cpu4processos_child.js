function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fib(n - 1) + fib(n - 2);
}

const n = parseInt(process.argv[2], 10);
const result = fib(n);
process.send(result);   // IPC
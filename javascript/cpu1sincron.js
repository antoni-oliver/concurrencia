import { performance } from 'perf_hooks';

function fib(n) {
    if (n == 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}

function fibmain(n) {
    console.log(`Començant fib(${n})...`);
    const resultat = fib(n);
    console.log(`Acabat fib(${n})`);
    return resultat;
}

function main() {
    const startTime = performance.now();

    // Cream un array de 20 elements.
    // Els seus valors són el resultat de fibmain(35),
    // que són els valors de fib(35)
    const values = Array.from({length: 20}, () => fibmain(35));
    const total = values.reduce((acc, val) => acc + val, 0);

    const duration = (performance.now() - startTime) / 1000;

    console.log(`Computat en ${duration.toFixed(2)} segons: ${total}`);
}

// és molt més ràpid que python.
// desactivar JIT: node --jitless script
// encara és el doble de ràpid
main();
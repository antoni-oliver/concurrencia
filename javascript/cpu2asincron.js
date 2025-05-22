import { performance } from 'perf_hooks';

async function fib(n) { // com que feim await, hem de ser async
    if (n == 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
        return await fib(n - 1) + await fib(n - 2); // hem de fer await
    }
}

function fibmain(n) {
    console.log(`Començant fib(${n})...`);
    const resultat = fib(n);
    console.log(`Acabat fib(${n})`);
    return resultat;
}

async function main() {     // com que feim await, hem de ser async
    const startTime = performance.now();

    // Cream un array de 20 elements.
    // Els seus valors són el resultat de fibmain(35),
    // que són les promises de fib(35)
    const promises = Array.from({length: 20}, () => fibmain(35));
    const values = await Promise.all(promises); // hem d'esperar les tasques
    const total = values.reduce((acc, val) => acc + val, 0);

    const duration = (performance.now() - startTime) / 1000;
    console.log(`Computat en ${duration.toFixed(2)} segons: ${total}`);
}

// és molt més ràpid que python.
// desactivar JIT: node --jitless script
// encara és el doble de ràpid
main();
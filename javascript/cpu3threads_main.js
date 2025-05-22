import { performance } from 'perf_hooks';
import { Worker } from 'worker_threads';    //
import { fileURLToPath } from 'url';        //
import { dirname, join } from 'path';       //

const __dirname = dirname(fileURLToPath(import.meta.url));      //
const workerPath = join(__dirname, 'cpu3threads_worker.js');    //

function runWorker(n) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(workerPath, { workerData: n });
        worker.once('message', resolve);
        worker.once('error', reject);
        worker.once('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

function fibmain(n) {
    console.log(`Començant fib(${n})...`);
    const resultat = runWorker(n);    // És una promise
    console.log(`Acabat fib(${n})`);
    return resultat;
}

async function main() {     // com que feim await, hem de ser async
    const startTime = performance.now();

    // Cream un array de 20 elements.
    // Els seus valors són el resultat de fibmain(35),
    // que són les promises de fib(35)
    const promises = Array.from({length: 20}, () => fibmain(35));
    const values = await Promise.all(promises); // hem d'esperar els threads
    const total = values.reduce((acc, val) => acc + val, 0);

    const duration = (performance.now() - startTime) / 1000;
    console.log(`Computat en ${duration.toFixed(2)} segons: ${total}`);
}

// és molt més ràpid que python.
// desactivar JIT: node --jitless script
// encara és el doble de ràpid
main();
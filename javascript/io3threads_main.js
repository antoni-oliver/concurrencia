import { performance } from 'perf_hooks';
import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerPath = join(__dirname, 'io3threads_worker.js');

function runWorker(url) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(workerPath, { workerData: url });

        worker.on('message', (msg) => {
            if (msg.error) {
                console.error(`${msg.url} error: ${msg.error}`);
                resolve(null); // "catch"
            } else {
                console.log(`${worker.threadId}: ${msg.url} fet: ${msg.text}`);
                resolve(msg.text);
            }
        });

        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

async function downloadAll(urls) {
    const tasks = urls.map(url => runWorker(url));
    await Promise.all(tasks);
}

async function main() {
    const urls = Array.from({ length: 100 })
        .map((_, i) => `http://localhost:3000/${i + 1}`);

    const startTime = performance.now();
    await downloadAll(urls);
    const duration = (performance.now() - startTime) / 1000;

    console.log(`${urls.length} pàgines descarregades en ${duration.toFixed(2)} segons`);
}

main();
import { performance } from 'perf_hooks';
import { fork } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerPath = join(__dirname, 'io4processos_child.js');

function runProcess(url) {
    return new Promise((resolve, reject) => {
        const child = fork(workerPath, [url]);

        child.on('message', (msg) => {
            if (msg.error) {
                console.error(`${msg.url} error: ${msg.error}`);
                resolve(null); // "catch"
            } else {
                console.log(`${child.pid}: ${msg.url} fet: ${msg.text}`);
                resolve(msg.text);
            }
        });

        child.on('error', reject);
        child.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Child process stopped with exit code ${code}`));
        });
    });
}

async function downloadAll(urls) {
    const tasks = urls.map(url => runProcess(url));
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
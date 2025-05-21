import { performance } from 'perf_hooks';

function download(url) {
    return fetch(url)
        .then(response => response.text())
        .then(text => {
            console.log(`${url} fet: ${text}`);
        })
        .catch(err => {
            console.error(`${url} error: ${err.message}`)
        })
}

function downloadAll(urls) {
    const tasks = urls.map(url => download(url));
    return Promise.all(tasks);
}

async function main() {
    const urls = Array.from({ length: 100 })
        .map((_, i) => `http://localhost:3000/${i + 1}`);
    const startTime = performance.now();
    downloadAll(urls)
        .then(() => {
            const duration = (performance.now() - startTime) / 1000;
            console.log(`${urls.length} pàgines descarregades en ${duration.toFixed(2)} segons`);
        })
        .catch(err => {
            console.error(`Error: ${err.message}`);
        });
}

console.log("Abans");
main();
console.log("Després");
import { performance } from 'perf_hooks';

async function download(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        console.log(`${url} fet: ${text}`);
    } catch (err) {
        console.error(`${url} error: ${err.message}`);
    }
}

async function downloadAll(urls) {
    const tasks = urls.map(url => download(url));
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

await main();
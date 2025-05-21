import { performance } from 'perf_hooks';
import fetch from 'sync-fetch'; // qüestionable

function download(url) {
    try {
        const response = fetch(url);
        const text = response.text();
        console.log(`${url} fet: ${text}`);
    } catch (err) {
        console.error(`${url} error: ${err.message}`);
    }
}

function downloadAll(urls) {
    for (const url of urls) {
        download(url);
    }
}

function main() {
    const urls = Array.from({ length: 100 })
        .map((_, i) => `http://localhost:3000/${i + 1}`);
    const startTime = performance.now();
    downloadAll(urls);
    const duration = (performance.now() - startTime) / 1000;
    console.log(`${urls.length} pàgines descarregades en ${duration.toFixed(2)} segons`);
}

main();
import { parentPort, workerData } from 'worker_threads';
import fetch from 'sync-fetch'; // qüestionable

const url = workerData;

try {
    const response = fetch(url);
    const text = response.text();
    parentPort.postMessage({ url, text });
} catch (err) {
    parentPort.postMessage({ url, error: err.message });
}
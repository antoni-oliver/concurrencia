import fetch from 'sync-fetch'; // qüestionable

const url = process.argv[2];

try {
    const response = fetch(url);
    const text = response.text();
    process.send({ url, text }); // IPC
} catch (err) {
    process.send({ url, error: err.message });
}

import time
import requests

import threading #
from concurrent.futures import ThreadPoolExecutor #

def main():
    urls = [f"http://localhost:3000/{i+1}" for i in range(100)]
    
    start_time = time.perf_counter()
    download_all(urls)
    duration = time.perf_counter() - start_time
    print(f"{len(urls)} pàgines descarregades en {duration} segons")

def download_all(urls):
    with ThreadPoolExecutor(max_workers=8) as executor: #
        executor.map(download, urls) #

def download(url):
    with requests.get(url) as response:
        id = threading.get_ident() #
        print(f"{id}: {url} fet: {response.text}") #

if __name__ == "__main__":
    main()
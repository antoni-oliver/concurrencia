import time
import aiohttp #

import asyncio #

async def main(): #
    urls = [f"http://localhost:3000/{i+1}" for i in range(100)]
    
    start_time = time.perf_counter()
    await download_all(urls)
    duration = time.perf_counter() - start_time
    print(f"{len(urls)} pàgines descarregades en {duration} segons")

async def download_all(urls): #
    async with aiohttp.ClientSession() as session: #
        tasks = [download(url, session) for url in urls] #
        await asyncio.gather(*tasks) #

async def download(url, session): #
    async with session.get(url) as response: #
        id = asyncio.current_task().get_name() #
        content = await response.text() #
        print(f"{id}: {url} fet: {content}") #

if __name__ == "__main__":
    asyncio.run(main()) #
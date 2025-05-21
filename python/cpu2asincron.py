import time
import asyncio #

async def fib(n): #
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return await fib(n - 1) + await fib(n - 2) #

async def main(): #
    start_time = time.perf_counter()
    tasks = [fib(35) for _ in range(20)] #
    total = sum(await asyncio.gather(*tasks)) #
    duration = time.perf_counter() - start_time
    print(f"Computat en {duration} segons: {total}")

if __name__ == "__main__":
    asyncio.run(main()) #
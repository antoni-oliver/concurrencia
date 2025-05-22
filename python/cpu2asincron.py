import time
import asyncio # mòdul necessari per fer tasques asíncrones

async def fib(n): # com que feim await, hem de ser async
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return await fib(n - 1) + await fib(n - 2) # hem de fer await

def fibmain(n):
    print(f"Començant fib({n})...")
    resultat = fib(n)
    print(f"Acabat fib({n})")
    return resultat

async def main(): # com que feim await, hem de ser async
    start_time = time.perf_counter()

    # Cream una llista de 20 elements.
    # Els seus elements són el resultat de fibmain(35),
    # que són les tasques asíncrones que calculen fib(35)
    tasks = [fibmain(35) for _ in range(20)]
    total = sum(await asyncio.gather(*tasks)) # hem d'esperar les tasques
    duration = time.perf_counter() - start_time
    print(f"Computat en {duration} segons: {total}")

if __name__ == "__main__":
    asyncio.run(main()) # hem d'executar main al bucle d'asyncio
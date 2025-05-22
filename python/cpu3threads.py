import time
from concurrent.futures import ThreadPoolExecutor #

def fib(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fib(n - 1) + fib(n - 2)

def fibmain(n):
    print(f"Començant fib({n})...")
    resultat = fib(n)
    print(f"Acabat fib({n})")
    return resultat

def main():
    start_time = time.perf_counter()

    # Cream una llista de 20 elements.
    # Els seus elements són el resultat de fibmain(35),
    # que són les execucions en threads que calculen fib(35)
    with ThreadPoolExecutor(max_workers=20) as executor: # una pool de 20 threads
        total = sum(executor.map(fibmain, [35 for _ in range(20)]))
    
    duration = time.perf_counter() - start_time
    print(f"Computat en {duration} segons: {total}")
    
if __name__ == "__main__":
    main()
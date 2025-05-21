import time

def fib(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fib(n - 1) + fib(n - 2)

def main():
    start_time = time.perf_counter()
    total = sum([fib(35) for _ in range(20)])
    duration = time.perf_counter() - start_time
    print(f"Computat en {duration} segons: {total}")

if __name__ == "__main__":
    main()
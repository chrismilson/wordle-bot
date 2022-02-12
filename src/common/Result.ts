export enum Result {
  INCORRECT = "-",
  PARTIAL = "?",
  CORRECT = "!",
}

export function result_from(n: number) -> Result {
    let result: Result[] = [];
    while (n > 0) {
        let r = n % 3;
        result.push([Result.INCORRECT, Result.PARTIAL, Result.CORRECT][r]);
        n = (n - r) / 3;
    }
    return result;
}

export function* all_results(length: number): Generator<Result[]> {
    for (let i = 0; i < Math.pow(3, length); i++) {
        yield result_from(i);
    }
}

import { IPuzzle } from "./index.ts";

export class AutoPuzzle implements IPuzzle {
  /** The number of tries remaining to solve the puzzle */
  private _remaining_tries: number;
  /** The solution to the puzzle */
  private _solution: string;
  /** A set of the characters in the solution */
  private _in_solution: Set<string>;
  /** The list od possible words */
  private _word_list: string[];

  constructor(word_list: string[], solution: string, max_tries: number) {
    if (!word_list.includes(solution)) {
      throw new Error("Solution not in word list.");
    }

    this._word_list = word_list;
    this._remaining_tries = max_tries;

    this._solution = solution;
    this._in_solution = new Set(this._solution);
  }

  get remaining_tries(): number {
    return this._remaining_tries;
  }

  get word_list(): string[] {
    return [...this._word_list];
  }

  guess(word: string): Result[] {
    if (this._remaining_tries == 0) {
      throw new Error("Max tries exceeded.");
    }
    this._remaining_tries -= 1;

    const result: Result[] = [];

    for (let i = 0; i < word.length; i++) {
      const c = word[i];

      if (this._solution[i] === c) {
        result.push(Result.CORRECT);
      } else if (this._in_solution.has(c)) {
        result.push(Result.PARTIAL);
      } else {
        result.push(Result.INCORRECT);
      }
    }

    return result;
  }
}

export class RandomPuzzle extends AutoPuzzle {
  constructor(word_list: string[], max_tries: number) {
    const solution = word_list[Math.floor(Math.random() * word_list.length)];
    super(word_list, solution, max_tries);
  }
}

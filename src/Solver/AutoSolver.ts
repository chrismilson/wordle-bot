import { ISolver } from "./index.ts";
import { IPuzzle } from "../Puzzle/index.ts";
import { Result } from "../common/Result.ts";
import { refine_possibilities } from "../common/reduce.ts";

export class AutoSolver implements ISolver {
  /**
   * @param remaining_words The remaining possible words
   * @param possible_guesses The valid guesses we can make
   */
  private determine_best_guess(
    remaining_words: string[],
    possible_guesses: string[],
  ): string {
    // We want to choose a word such that the expected number of reduced
    // possibilities is the highest. This is hard, so we will do something
    // else.

    // We will count up the frequency of each character in the remaining
    // words. We will then assign a score to each word by taking the sum of
    // the frequencies of the characters the word contains. We will choose the
    // word with the highest score as the guess.
    const count: { [char: string]: number } = {};

    for (const word of remaining_words) {
      for (const char of word) {
        if (!(char in count)) {
          count[char] = 0;
        }
        count[char] += 1;
      }
    }

    const get_score = (word: string) => {
      let result = 0;
      const seen = new Set<string>();
      for (const char of word) {
        if (seen.has(char)) {
          continue;
        }
        seen.add(char);
        result += count[char];
      }
      return result;
    };

    let best_guesses = [];
    let best_score = -1;

    for (let i = 0; i < possible_guesses.length; i++) {
      const word = possible_guesses[i];
      const score = get_score(word);
      if (score > best_score) {
        best_guesses = [];
        best_score = score;
      }
      if (score === best_score) {
        best_guesses.push(word);
      }
    }

    return best_guesses[Math.floor(Math.random() * best_guesses.length)];
  }

  solve(setter: IPuzzle, hard_mode = true): [string, Result[]][] {
    const guesses: [string, Result[]][] = [];
    let remaining_words = setter.word_list;

    while (setter.remaining_tries > 0) {
      const input = this.determine_best_guess(
        remaining_words,
        hard_mode ? remaining_words : setter.word_list,
      );
      const result = setter.guess(input);
      guesses.push([input, result]);
      remaining_words = refine_possibilities(
        remaining_words,
        input,
        result,
      );

      if (result.every((x) => x === Result.CORRECT)) {
        break;
      }
    }

    return guesses;
  }
}

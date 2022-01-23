import { ISolver } from "./index.ts";
import { IPuzzle, Result } from "../Puzzle/index.ts";

export class AutoSolver implements ISolver {
  /**
   * @param remaining_words The remaining possible words
   */
  private determine_best_guess(remaining_words: string[]): string {
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

    for (let i = 0; i < remaining_words.length; i++) {
      const word = remaining_words[i];
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

  /**
   * @param remaining_words The current remaining possible words
   * @param input The guessed input
   * @param result The result from the input
   */
  private refine_possible_words(
    remaining_words: string[],
    input: string,
    result: Result[],
  ): string[] {
    for (let i = 0; i < input.length; i++) {
      switch (result[i]) {
        case Result.INCORRECT:
          remaining_words = remaining_words.filter((word) => {
            // If the word contains an incorrect letter, then it cannot
            // be the solution.
            return !word.includes(input[i]);
          });
          break;
        case Result.PARTIAL:
          remaining_words = remaining_words.filter((word) => {
            // If the word does not include the letter, it cannot be
            // the solution.
            return word.includes(input[i]);
          }).filter((word) => {
            // If the word is equal to the input at index i, the result would
            // have been green, so it cannot be the solution.
            return word[i] !== input[i];
          });
          break;
        case Result.CORRECT:
          remaining_words = remaining_words.filter((word) => {
            // If the word does not equal the input at index i, it
            // cannot be the solution.
            return word[i] === input[i];
          });
          break;
      }
    }
    return remaining_words;
  }

  solve(setter: IPuzzle): [string, Result[]][] {
    const guesses: [string, Result[]][] = [];
    let remaining_words = setter.word_list;

    while (setter.remaining_tries > 0) {
      const input = this.determine_best_guess(remaining_words);
      const result = setter.guess(input);
      guesses.push([input, result]);
      remaining_words = this.refine_possible_words(
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

import { Result } from "./Result.ts";
/**
 * @param remaining_words The current remaining possible words
 * @param input The guessed input
 * @param result The result from the input
 */
export function refine_possibilities(
  original: string[],
  guess: string,
  result: Result[],
): string[] {
  let remaining_words = [...original];

  for (let i = 0; i < guess.length; i++) {
    switch (result[i]) {
      case Result.INCORRECT:
        remaining_words = remaining_words.filter((word) => {
          // If the word contains an incorrect letter, then it cannot
          // be the solution.
          return !word.includes(guess[i]);
        });
        break;
      case Result.PARTIAL:
        remaining_words = remaining_words.filter((word) => {
          // If the word does not include the letter, it cannot be
          // the solution.
          return word.includes(guess[i]);
        }).filter((word) => {
          // If the word is equal to the input at index i, the result would
          // have been green, so it cannot be the solution.
          return word[i] !== guess[i];
        });
        break;
      case Result.CORRECT:
        remaining_words = remaining_words.filter((word) => {
          // If the word does not equal the input at index i, it
          // cannot be the solution.
          return word[i] === guess[i];
        });
        break;
    }
  }

  return remaining_words;
}

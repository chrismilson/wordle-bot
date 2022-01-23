export class MaxTriesExceededError extends Error {
  constructor() {
    super("Maximum tries exceeded for this puzzle.");
  }
}

export enum Result {
  INCORRECT = "-",
  PARTIAL = "?",
  CORRECT = "!",
}

export interface IPuzzle {
  /** The number of tries remaining */
  readonly remaining_tries: number;

  /** The list of all possible words */
  readonly word_list: string[];

  /**
   * Returns a coded string the same length as the guessed word that is a
   * function of the validity of a guess.
   *
   * The resulting string at index, i, will be
   *
   * - '-' if word[i] is not contained in the solution;
   * - '?' if word[i] is contained in the solution, but not at index i; or
   * - '!' if word[i] matches the character at index i in the solution.
   *
   * @param word The word that the solver is guessing
   */
  guess(word: string): Result[];
}

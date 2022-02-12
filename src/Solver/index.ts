import { IPuzzle } from "../Puzzle/index.ts";
import { Result } from "../common/Result.ts";

/**
 * A solver is responsible for interacting with a puzzle and determining the
 * solution.
 */
export interface ISolver {
  /**
   * Attempts to solve the puzzle.
   *
   * @param setter The puzzle setter
   */
  solve(setter: IPuzzle): [string, Result[]][];
}

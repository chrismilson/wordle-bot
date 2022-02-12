import { ISolver } from "./index.ts";
import { IPuzzle } from "../Puzzle/index.ts";
import { format_guess } from "../common/format.ts";
import { Result } from "../common/Result.ts";

/**
 * Allows a human to try and solve puzzles, by taking input from the console.
 */
export class HumanSolver implements ISolver {
  solve(setter: IPuzzle): [string, Result[]][] {
    const guesses: [string, Result[]][] = [];

    while (setter.remaining_tries > 0) {
      const buf = new Uint8Array(1024);
      const n = <number> Deno.stdin.readSync(buf);
      const input = new TextDecoder().decode(buf.subarray(0, n)).trim();

      const result = setter.guess(input);

      guesses.push([input, result]);
      console.log(format_guess(input, result));

      if (result.every((value) => value == Result.CORRECT)) {
        break;
      }
    }

    return guesses;
  }
}

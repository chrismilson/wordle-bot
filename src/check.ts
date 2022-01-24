import { Args, parse } from "https://deno.land/std@0.122.0/flags/mod.ts";
import { AutoSolver } from "./Solver/AutoSolver.ts";
import { format_guess } from "./Solver/index.ts";
import { AutoPuzzle } from "./Puzzle/AutoPuzzle.ts";
import { word_list } from "./words/index.ts"

function main(args: Args): void {
  // Interact with the user to get puzzle input
  const solution = new AutoSolver().solve(
    new AutoPuzzle(word_list, args.word, Infinity),
  );

  console.log(solution.map((x) => format_guess(...x)).join("\n"));
}

main(parse(
  Deno.args,
  {
    alias: { "word": "w" },
    string: ["word"],
  },
));

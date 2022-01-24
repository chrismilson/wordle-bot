import { Args, parse } from "https://deno.land/std@0.122.0/flags/mod.ts";
import { HumanSolver } from "./Solver/HumanSolver.ts";
import { AutoPuzzle } from "./Puzzle/AutoPuzzle.ts";
import { word_list, random_answer } from "./words/index.ts"

function main(args: Args): void {
  const puzzle = "word" in args
    ? new AutoPuzzle(word_list, args.word, args.tries)
    : new AutoPuzzle(word_list, random_answer(), args.tries);

  // Interact with the user to get puzzle input
  new HumanSolver().solve(puzzle);
}

main(parse(
  Deno.args,
  {
    alias: { word: "w", tries: "t" },
    string: ["word"],
    default: { tries: 6 },
  },
));

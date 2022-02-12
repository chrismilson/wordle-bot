import { Args, parse } from "https://deno.land/std@0.122.0/flags/mod.ts";
import { AutoSolver } from "./Solver/AutoSolver.ts";
import { HumanPuzzle } from "./Puzzle/HumanPuzzle.ts";
import { word_list } from "./words/index.ts";

function main(_args: Args): void {
  // Interact with the user to get puzzle input
  new AutoSolver().solve(new HumanPuzzle(word_list, 6));
}

main(parse(Deno.args));

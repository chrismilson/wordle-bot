import { Args, parse } from "https://deno.land/std@0.122.0/flags/mod.ts";
import { AutoSolver } from "./components/Solver/AutoSolver.ts";
import { HumanPuzzle } from "./components/Puzzle/HumanPuzzle.ts";

async function main(_args: Args): Promise<void> {
  const word_list = await fetch(
    "https://gist.githubusercontent.com/cfreshman/cdcdf777450c5b5301e439061d29694c/raw/de1df631b45492e0974f7affe266ec36fed736eb/wordle-allowed-guesses.txt",
  )
    .then(res => res.text())
    .then(text => text.split("\n"));

  // Interact with the user to get puzzle input
  new AutoSolver().solve(new HumanPuzzle(word_list, 6));
}

await main(parse(Deno.args));

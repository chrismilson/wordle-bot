import { Args, parse } from "https://deno.land/std@0.122.0/flags/mod.ts";
import { AutoSolver } from "./components/Solver/AutoSolver.ts";
import { HumanPuzzle } from "./components/Puzzle/HumanPuzzle.ts";

async function main(_args: Args): Promise<void> {
  // Load words from file
  const decoder = new TextDecoder("utf-8");
  const word_data = await Deno.readFile("./word-list.txt");
  const word_list = decoder.decode(word_data).split("\n");

  // Interact with the user to get puzzle input
  new AutoSolver().solve(new HumanPuzzle(word_list, 6));
}

await main(parse(Deno.args));

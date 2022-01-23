import { IPuzzle, Result } from "./index.ts";

function get_input(): string {
  const buf = new Uint8Array(1024);
  const n = Deno.stdin.readSync(buf);

  if (n === null) {
    throw new Error("There was an error reading the input.");
  }

  const input = new TextDecoder().decode(buf.subarray(0, n)).trim();

  return input;
}

export class HumanPuzzle implements IPuzzle {
  private _word_list: string[];
  private _remaining_tries: number;

  constructor(word_list: string[], max_tries: number) {
    this._word_list = word_list;
    this._remaining_tries = max_tries;
  }

  get remaining_tries(): number {
    return this._remaining_tries;
  }

  get word_list(): string[] {
    return [...this._word_list];
  }

  guess(word: string): Result[] {
    this._remaining_tries -= 1;

    console.log("My next guess is: %s", word);
    console.log("What was the result?");
    return [...get_input()] as Result[];
  }
}

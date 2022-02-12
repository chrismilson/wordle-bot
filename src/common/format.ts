import { bgRgb24, white } from "https://deno.land/std@0.122.0/fmt/colors.ts";
import { Result } from "./Result.ts";

const color_by_result = {
  [Result.INCORRECT]: (x: string) => bgRgb24(white(x), { r: 58, g: 58, b: 60 }),
  [Result.PARTIAL]: (x: string) => bgRgb24(white(x), { r: 181, g: 159, b: 59 }),
  [Result.CORRECT]: (x: string) => bgRgb24(white(x), { r: 83, g: 141, b: 78 }),
};

export function format_guess(input: string, result: Result[]): string {
  const output = [];

  for (let i = 0; i < input.length; i++) {
    output.push(
      color_by_result[result[i]](input[i]),
    );
  }

  return output.join("");
}

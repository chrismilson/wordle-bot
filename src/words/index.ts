import { default as possible_answers } from "./answers.json" assert { type: "json" }
import { default as valid_guesses } from "./guesses.json" assert { type: "json" }

export const word_list = [...possible_answers, ...valid_guesses]

export function random_answer(): string {
    return possible_answers[Math.floor(Math.random() * possible_answers.length)]
}

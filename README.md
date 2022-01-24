# Wordle Bot

[Wordle](https://www.powerlanguage.co.uk/wordle/) is an interesting game.

This bot should be pretty good at it.

The word list was obtained from
[cfreshman's
list](https://gist.github.com/cfreshman/cdcdf777450c5b5301e439061d29694c).

## Usage

There are three different programs included:

- **Cheat**
    - The computer will provide guesses, and expects input from the user
      depending on what the result of the guess was.
    - This could be used to attempt the daily puzzle without having to think
      very much for yourself, although this is not advisable.
- **Check**
    - Pass the program a word, and it will simulate a game of wordle with
      itself.
    - This could be used after one had finished the daily puzzle to see whether
      the computer would have got the answer faster than the user.
- **Play**
    - The computer will simulate a game of wordle.
    - There are two modes of play
        - You can pass a word to the program beforehand, and this will be the
          solution to the game.
        - If you do not pass a word, a random word will be chosen.

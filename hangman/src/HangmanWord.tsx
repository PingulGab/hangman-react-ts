type HangManWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

/**
 *
 * `guessedLetters` - value of the `guessedLetters` from the parent component.
 * - *Purpose #1* - Used in a condition statement to check if the letter is visible/hidden.
 * - *Purpose #2* - Used in a condition statement to check if the letter's color (If reveal is true).
 *
 * `wordToGuess` - value of the `wordToGuess` from the parent component.
 * - *Purpose* - Splitted atomically to display each individual letter with an underline.
 *
 * `reveal` - a boolean from the parent component. (Originally: isLoser).
 * - *Purpose* - Used to determine if the answer will be revealed. (Essentially answer will be revealed if isLoser = true which means game over.)
 *
 */
export function HangmanWord({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangManWordProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {/**
       * Splits the word to guess atomically.
       */}
      {wordToGuess.split("").map((letter, index) => (
        <span
          style={{ borderBottom: ".1em solid black" }}
          key={`${letter} ${index}`}
        >
          {/**
           * Happy Path: The letter is included in the guessedLetters, the letter will be visible in black text.
           * Unhappy Path: The reveal is set to true (which means game over). If it is, the letters are revealed but in red text.
           */}
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal ? "red" : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}

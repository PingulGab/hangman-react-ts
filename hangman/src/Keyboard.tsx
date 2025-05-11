const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

import styles from "./Keyboard.module.css";

type KeyboardProps = {
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
  disabled?: boolean;
};

/**
 *
 * `activeLetters` - array of correctly guessed letters.
 * - *Purpose* - Used to add the active style to the button if true.
 *
 * `inactiveLetters` - array of incorrectly guessed letters.
 * - *Purpose* - Used to add the inactive style of the button if true.
 *
 * `addGuessedLetter` - function from the parent component.
 * - *Purpose* - Used to add a new index to the guessedLetters.
 *
 * `disabled` - a boolean from the parent component. (Originally: isWinner or isLoser).
 * - *Purpose* - Used to state that the game is over and all buttons must be disabled.
 *
 */
export function Keyboard({
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  disabled = false,
}: KeyboardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem",
      }}
    >
      {/**
       * isActive: If the letter is in the word to guess and is already inside the `guessedLetters`.
       * isInactive: If the letter is NOT in the word to guess and is already inside the `guessedLetters`.
       */}
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button
            onClick={() => addGuessedLetter(key)}
            className={`${styles.btn} ${isActive ? styles.active : ""}
            ${isInactive ? styles.inactive : ""}`}
            key={key}
            disabled={isInactive || isActive || disabled}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}

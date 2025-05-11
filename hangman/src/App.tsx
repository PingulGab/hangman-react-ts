import React from "react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import words from "./wordList.json";

/**
 * Gets a new word from the wordsList.json.
 */
function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  //Stateful Variables
  const [wordToGuess, setWordToGuess] = React.useState(getWord());
  const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);

  /**
   * Collection of incorrect letters guessed by the user.
   * - **Logic 1**
   *    - The stateful variable: guessedLetters is filtered.
   * - **Logic 2**
   *    - Wherein each of the filtered letters from guessedLetters are passed to `!wordToGuess.includes(letter)` which then checks if the letter is in the `wordToGuess` stateful variable.
   *
   */
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  /**
   * A boolean set to true if the incorrectLetters is equal to or greater than 6.
   */
  const isLoser = incorrectLetters.length >= 6;

  /**
   * A boolean set to true if every letter of the `wordToGuess` stateful variable if included in the `guessedLetters`.
   */
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  /**
   * A callback function that adds a guessed letter in the `guessedLetters` stateful variable using its state updater: `setGuessedLetters`.
   * - **Unhappy Path**
   *    - The provided letter is checked if it is already inside the `guessedLetters` or if isWinner/isLoser booleans are already set to true.
   *      If once of them is true, it simply returns null.
   * - **Happy Path**
   *    - The provided letter is added by creating a new array with the existing guessedLetters and appending the new letter.
   * - **Callback Function Dependency**
   *    - guessedLetters
   *    - isWinner
   *    - isLoser
   *
   * *Why React.useCallback*?
   * React.useCallback is used so that the guessedLetters variable is not stale / in its initial state.
   * - If React.useCallback is NOT used, the same letter would apply a penalty (a body part).
   */
  const addGuessedLetter = React.useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  /**
   * useEffect hook to enable keyboard input for guessing letters.
   *
   * Dependency of the useEffect: addGuessedLetter.
   *
   * *Why add addGuessedLetter as dependency?*
   * - addGuessedLetter is added as a dependency to prevent stale data.
   */
  React.useEffect(() => {
    /**
     * Logic for event handler: Keyboard Event
     * Specifically: For keyboard inputs of alphabets "a" to "z".
     */
    const handler = (e: KeyboardEvent) => {
      //Gets the key from the event.
      const key = e.key;

      /*Checks if the key is a keyboard press from alphabets "a" to "z" through regular expression.
        - Happy Path: Keyboard input is from alphabet "a" to "z" and passes the check.
        - Unhappy Path: Keyboard input is not from the alphabet "a" to "z" and null is returned.
      */
      if (!key.match(/^[a-z]$/)) return;

      //Prevents any default thing that may occur.
      e.preventDefault();

      //Adds the key to the `guessedLetters` using its state updater.
      addGuessedLetter(key);
    };

    //Addition of the logic to the keypress event.
    document.addEventListener("keypress", handler);

    return () => {
      //Cleanup function.
      document.removeEventListener("keypress", handler);
    };
  }, [addGuessedLetter]);

  /**
   * useEffect hook to reset the game via the "Enter" button.
   */
  React.useEffect(() => {
    /**
     * Logic for event handler: Keyboard Event
     * Specifically: For keyboard input "Enter".
     */
    const handler = (e: KeyboardEvent) => {
      //Obtains key from the event.
      const key = e.key;

      /*Checks if the key is a keyboard press from alphabets "a" to "z" through regular expression.
        - Happy Path: Keyboard input is "Enter" and passes the check.
        - Unhappy Path: Keyboard input is not "Enter" and null is returned.
      */
      if (key !== "Enter") return;

      //Prevents any default behaviors of the keyboard input.
      e.preventDefault();

      //Sets the `guessedLetters` to an empty array through its state updater.
      setGuessedLetters([]);

      //Sets a new word to guess.
      setWordToGuess(getWord());
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "You won!"}
        {isLoser && "GAME OVER"}
      </div>
      {/**
       * Each component has their own JSX. Hover to them to see what each of their property(props)'s purpose is.
       */}
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
          disabled={isWinner || isLoser}
        />
      </div>
    </div>
  );
}

export default App;


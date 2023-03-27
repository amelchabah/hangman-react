type HangmanWordProps = {
  //les lettres jouées sont des chaînes de caractères
  playedLetters: string[]
  //de même pour le mot à deviner
  wordToGuess: string
  //il peut être caché ou révélé (booléen)
  reveal?: boolean
}

export function HangmanWord({
  playedLetters,
  wordToGuess,
  reveal = false,
  //par défaut, le mot est caché (reveal=false)
}: HangmanWordProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "2rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        // séparer le mot à deviner par lettres : chaque lettre possède une balise span avec un border-bottom
        <span style={{ borderBottom: ".1em solid white" }} key={index}>
          <span
            style={{
              visibility:
                playedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              //si la lettre jouée est inclue, l'afficher dans le mot, sinon la cacher
              color:
                !playedLetters.includes(letter) && reveal ? "#F37467" : "white",
                //si une lettre n'est pas révélée ni devinée, l'afficher en rouge
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  )
}

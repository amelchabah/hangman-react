import styles from "./Keyboard.module.css"

// constante des clés : touches de clavier (lettres)
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
]


type KeyboardProps = {
  disabled?: boolean
  // dès qu'une clé est disabled, on ne peut pas recliquer dessus (donc booléen)
  activeLetters: string[]
  // chaîne de caractère -> lettre active (mise en évidence)
  inactiveLetters: string[]
  // chaîne de caractère -> lettre inactive
  addPlayedLetters: (letter: string) => void
  // addPlayedLetters : ajouter la lettre séléctionnée dans 
}

// composant du clavier
export function Keyboard({
  activeLetters,
  inactiveLetters,
  addPlayedLetters,
  disabled = false,
}: KeyboardProps) {
  return (
    // création de la div du clavier en grid
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(65px, 1fr))",
        gap: ".5rem",
      }}
    >
      {KEYS.map(key => {
        // constantes de lettres actives ou inactives (active si la lettre jouée est inclue dans les lettres encore actives, inactive si elle a déjà été jouée)
        const isActive = activeLetters.includes(key)
        const isInactive = inactiveLetters.includes(key)
        return (
          // création d'une touche de clavier : au clic du bouton, ajouter la clé (lettre) séléctionnée dans les lettres devinées, attribuer la classe de bouton actif ou inactif en fonction du statut de la lettre, automatiquement désactivée si jouée
          <button
            onClick={() => addPlayedLetters(key)}
            // 
            className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`} disabled={isInactive || isActive || disabled} key={key}>
            {key}
          </button>
        )
      })}
    </div>
  )
}

import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./components/HangmanDrawing"
import { HangmanWord } from "./components/HangmanWord"
import { Keyboard } from "./components/Keyboard"

function App() {
  // déclaration des principales constantes

  // constante adresse de l'API des mots
  const API_URL = 'http://localhost:3001';

  // constante du mot à deviner (séléctionné au hasard depuis la liste)
  const [wordToGuess, setWordToGuess] = useState('')

  // constante des lettres jouées (bonnes ou mauvaises)
  const [playedLetters, setPlayedLetters] = useState<string[]>([])

  // constante estGagnant : séparer le mot à deviner en lettres (split), chaque élément étant une lettre, la lettre entrée étant inclue parmi les lettres du mot
  const isWinner = wordToGuess
    .split("")
    .every(letter => playedLetters.includes(letter))

  // constante lettresIncorrectes : séléctionner toutes les lettres devinées, et filtrer : la lettre entrée n'étant pas inclue dans le mot à deviner
  const incorrectLetters = playedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  // constante estPerdant si le nombre de lettres incorrectes est supérieur ou égal à 6
  const isLoser = incorrectLetters.length >= 6

  // constante : ajout d'une lettre jouée
  const addPlayedLetters = useCallback(
    (letter: string) => {
      if (playedLetters.includes(letter) || isLoser || isWinner) return
      // ajouter les letters jouées dans la data des lettres jouées
      setPlayedLetters(currentLetters => [...currentLetters, letter])
    },
    [playedLetters, isWinner, isLoser]
  )

  // récupérer un mot au hasard depuis l'API
  useEffect(() => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "locale = fr-FR",
    })
      .then((res) => res.json())
      .then((data) => {
        setWordToGuess(data.word);
        console.log(data.word);
      });
  }, []);


  // écrire au clavier du PC --- expérimentale (?), ne fonctionne qu'une fois après avoir entré une lettre au clavier virtuel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      // si la clé entrée (lettre) n'existe pas, ne rien retourner
      if (!key.match(/^[a-z]$/)) return
      e.preventDefault()
      // ajouter la clé entrée aux lettres jouées
      addPlayedLetters(key)
    }
    // lancer la fonction handler au clic du clavier
    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [playedLetters])




  // html de l'application
  return (
    <div
      style={{
        width: '100%',
        maxWidth: "1000px",
        display: "flex",
        flexDirection: "column",
        gap: "1.8rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <h4 style={{ textAlign: "center", color: "white" }}>Let's play Hangman! From 6 errors, you lose :P<br></br>Use your mouse or the keyboard to play.</h4>
      <div style={{ fontSize: "1.5rem", textAlign: "center", fontWeight: "bolder", color: "white"}}>
        {/* générer deux messages différents en fonction du jeu gagné ou perdu */}
        {isWinner && `Won :) Refresh to replay`}
        {isLoser && `Lost, the word was "` + wordToGuess + `" :( Refresh to replay`}
      </div>
      {/* balise correspondant au dessin du pendu, formé en fonction du nombre d'erreurs (lettres incorrectes) (voir le composant HangmanDrawing) */}
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      {/* balise correspondant au mot */}
      <HangmanWord
        // se révélant uniquement au moment ou le jeu est perdu
        reveal={isLoser}
        // avec les lettres devinées
        playedLetters={playedLetters}
        // et bien évidemment le mot à deviner
        wordToGuess={wordToGuess}
      />
      {/* balise correspondant au clavier */}
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          // avec touches désactivées si le jeu est gagné ou perdu (terminé)
          disabled={isWinner || isLoser}
          // avec touches actives pour les lettres correctes (lettres inclues dans le mot à deviner)
          activeLetters={playedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          // avec touches inactives pour les lettres incorrectes
          inactiveLetters={incorrectLetters}
          // et ajout des lettres devinées dans la data des lettres jouées (voir constante addPlayedLetters)
          addPlayedLetters={addPlayedLetters}
        />
      </div>
    </div>
  )
}

export default App
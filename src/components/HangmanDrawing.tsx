import '../App.css';

// création des constantes (html) correspondantes à chaque membre du pendu
const HEAD = (
  <div
    style={{
      width: "40px",
      height: "40px",
      borderRadius: "100%",
      border: "10px solid white",
      position: "absolute",
      top: "25px",
      right: "-25px",
    }}
  />
)

const BODY = (
  <div
    style={{
      width: "10px",
      height: "60px",
      background: "white",
      position: "absolute",
      top: "80px",
      borderBottomRightRadius: "20px",
      borderBottomLeftRadius: "20px",
      right: "0px",
    }}
  />
)

const RIGHT_ARM = (
  <div
    style={{
      width: "50px",
      height: "10px",
      background: "white",
      position: "absolute",
      top: "100px",
      right: "-50px",
      rotate: "-30deg",
      borderBottomRightRadius: "20px",
      borderTopRightRadius: "20px",
      transformOrigin: "left bottom",
    }}
  />
)

const LEFT_ARM = (
  <div
    style={{
      width: "50px",
      height: "10px",
      background: "white",
      position: "absolute",
      top: "100px",
      right: "10px",
      rotate: "30deg",
      borderTopLeftRadius: "20px",
      borderBottomLeftRadius: "20px",
      transformOrigin: "right bottom",
    }}
  />
)

const RIGHT_LEG = (
  <div
    style={{
      width: "60px",
      height: "10px",
      background: "white",
      position: "absolute",
      top: "125px",
      right: "-50px",
      rotate: "60deg",
      borderTopRightRadius: "20px",
      borderBottomRightRadius: "20px",
      transformOrigin: "left bottom",
    }}
  />
)

const LEFT_LEG = (
  <div
    style={{
      width: "60px",
      height: "10px",
      background: "white",
      position: "absolute",
      top: "125px",
      right: 0,
      rotate: "-60deg",
      borderTopLeftRadius: "20px",
      borderBottomLeftRadius: "20px",
      transformOrigin: "right bottom",
    }}
  />
)

// constante correspondant au corps entier affiché
const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

// chaque partie du corps correspond au nombre de lettres incorrectes (de type nombre)
type HangmanDrawingProps = {
  numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div style={{ position: "relative" }}>
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div
        style={{
          borderRadius: "30px",
          height: "30px",
          width: "10px",
          background: "white",
          position: "absolute",
          top: 0,
          right: 0,
        }}
      />
      <div
        style={{
          height: "10px",
          background: "white",
          marginLeft: "50px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "20px",

        }}
      />
      <div
        style={{
          height: "200px",
          width: "10px",
          background: "white",
          marginLeft: "50px",
        }}
      />
      <div style={{ borderRadius: "30px", height: "10px", width: "200px", background: "white" }} />
      <p style={{ textAlign: "center", color: "#90909D", marginTop: "1rem" }}>Wrong guesses : {numberOfGuesses} of 6</p>

    </div>
  )
}

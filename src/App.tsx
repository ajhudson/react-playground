import "./App.css";
import Fader, { useFadeIn } from "./components/fader";
import styled from "styled-components";

const StyledParagraph = styled("p")({
  fontFamily: "Arial",
  fontSize: 30,
});

function App() {
  const { fadeIn, toggleFadeHandler } = useFadeIn();

  const onFadedComplete = () => console.log("Transition completed: ", fadeIn);

  return (
    <div className="App">
      <p>
        Demonstration of an animation component/hook to fade JSX children in and
        out using CSS transitions
      </p>
      <button onClick={toggleFadeHandler}>
        Click here to toggle fade effect
      </button>

      <Fader fadeIn={fadeIn} onFadeEnd={onFadedComplete}>
        <StyledParagraph>What do you like a bit of?</StyledParagraph>
      </Fader>

      <p>fadeIn: {Boolean(fadeIn) ? "True" : "False"}</p>
    </div>
  );
}

export default App;

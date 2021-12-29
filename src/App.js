import logo from "./logo.svg";
import "./App.css";
import { FactoringChallenge } from "./components/FactoringChallenge.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FactoringChallenge />
      </header>
    </div>
  );
}

export default App;

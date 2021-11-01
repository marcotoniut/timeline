import "./index.css";
import Timelinecard from "./components/timelinecard/timelinecard";

function App() {
  return (
    <div className="App" data-testid="App">
      <div className="timeline"> </div>
      <Timelinecard />
    </div>
  );
}

export default App;

import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Demo from "./components/";

import Owner from "./components/Owner";

function App() {
  return (
    <EthProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Demo />}></Route>
            <Route exact path="/Owner" element={<Owner />}></Route>
          </Routes>
        </div>
      </Router>
    </EthProvider>
  );
}

export default App;

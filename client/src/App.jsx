import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainHandler from "./components/";

import Owner from "./components/Owner";

function App() {
  return (
    <EthProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<MainHandler />}></Route>
            <Route exact path="/Owner" element={<Owner />}></Route>
          </Routes>
        </div>
      </Router>
    </EthProvider>
  );
}

export default App;

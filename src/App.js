//@flow
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AdChangeTracker from "./components/AdChangeTracker";

function App() {
  return (
    <Router>
      <AdChangeTracker />
    </Router>
  );
}

export default App;

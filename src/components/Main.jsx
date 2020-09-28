import React from 'react';
import './Main.css';
import { Link } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Link to="/tickets">티켓</Link>
    </div>
  );
}

export default App;

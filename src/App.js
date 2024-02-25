import "./App.css";
import Home from "./pages/home";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="Navbar">
          <Link to="/">Home</Link>
          <Link to="/logout">Logout</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

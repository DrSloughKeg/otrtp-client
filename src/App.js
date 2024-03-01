import "./App.css";
import Home from "./pages/home";
import Menu from "./pages/menu";
import Play from "./pages/play";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./components/AuthContext";
import Navbar from "./components/navBar";

function App() {
  //check if logged in
  const [authState, setAuthState] = useState(false);
  const accessToken = {
    headers: { accessToken: localStorage.getItem("accessToken") },
  };

  useEffect(() => {
    axios.get("http://localhost:3001/users", accessToken).then((response) => {
      if (response.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    });
  }, [accessToken]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playMenu" element={<Menu />} />
            <Route path="*" element={<Home />} />
            <Route path="/play" element={<Play />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

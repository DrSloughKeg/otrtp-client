import "./App.css";
import Home from "./pages/home";
import Menu from "./pages/menu";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./components/AuthContext";

function App() {
  //navigate
  //let navi = useNavigate();

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
  }, []);

  //logout button
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
    //navi("/");
  };
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="Navbar">
            <Link to="/">Home</Link>
            <button onClick={logout}>Logout</button>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playMenu" element={<Menu />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

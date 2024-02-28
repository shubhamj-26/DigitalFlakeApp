import React from "react";
import "./App.css";
import Login from "./Login.js";
import Welcome from "./Welcome.js";
import Register from "./Register.js";
import Forget from "./Forget.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage.js";
function App() {

  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotpassword" element={<Forget />} />
                <Route path="/home" element={<HomePage/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
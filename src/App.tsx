import "./App.css";

import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "./redux/store.ts";

import Navbar from "./components/Navbar/Navbar.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Portfolio from "./pages/Portfolio/Portfolio.tsx";

function App() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio/:id" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

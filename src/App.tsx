import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import NewAudit from "./pages/NewAudit";
import RiskMatrix from "./pages/RiskMatrix";
import Walkthrough from "./pages/Walkthrough";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-audit" element={<NewAudit />} />
        <Route path="/risk-matrix/:id" element={<RiskMatrix />} />
        <Route path="/walkthrough/:id" element={<Walkthrough />} />
      </Routes>
    </>
  );
}

export default App;

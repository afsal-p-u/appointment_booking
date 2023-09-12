import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { token } = useAuthContext();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
      </Routes>

    </>
  );
}

export default App;

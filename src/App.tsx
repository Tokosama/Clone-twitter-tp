// src/App.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SignUpPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { auth } from "./lib/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import UsersPage from "./pages/UsersPage";

function App() {
  const [connectedUser, setConnectedUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listenChange = onAuthStateChanged(auth, (user) => {
      setConnectedUser(user);
      setLoading(false);
    });
    return () => listenChange();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-fit">
          <span className="loading loading-ball loading-xl animate-spin"></span>
          Welcome
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={connectedUser ? <HomePage /> : <Navigate to="/login" />}
        />
         <Route
          path="/users"
          element={connectedUser ? <UsersPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!connectedUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!connectedUser ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

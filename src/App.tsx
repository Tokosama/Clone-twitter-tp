import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SignUpPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./components/Profile/ProfilePage";
import { auth } from "./lib/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import UsersPage from "./pages/UsersPage";

function App() {
  const [connectedUser, setConnectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listenChange = onAuthStateChanged(auth, (user) => {
      setConnectedUser(user);
      setLoading(false);
    });
    return () => listenChange();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center align-middle items-center">
        <div className="w-fit">
          <span className="loading loading-ball loading-xl animate-spin"></span>
          blabla
        </div>
      </div>
    );

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={connectedUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!connectedUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!connectedUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/users"
          element={<UsersPage />} // ⚠️ Supprimer la restriction pour tester
        />
        <Route
          path="/profile/:userId"
          element={<ProfilePage currentUser={connectedUser} />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

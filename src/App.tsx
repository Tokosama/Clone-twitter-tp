import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SignUpPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

import { auth } from "./lib/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

function App() {
  const [connectedUser, setConnectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const listenChange = onAuthStateChanged(auth, (user) => {
      for (let i = 0; i <= 100000; i++) {
        console.log(i);
      }
      setConnectedUser(user);
      console.log(connectedUser);

      setLoading(false);
    });
    return () => listenChange();
  }, []);
  if (loading)
    return (
      <>
        <div className="h-screen w-screen flex justify-center align-middle items-center">
          <div className="w-fit">
            <span className="loading loading-ball loading-xl animate-spin"></span>
            blabla
          </div>
        </div>
      </>
    );
  //crab@gmail.com
  return (
    <>
      <div>
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
        </Routes>{" "}
        <Toaster />
      </div>
    </>
  );
}

export default App;

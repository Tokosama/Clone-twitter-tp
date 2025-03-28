import { useState } from "react";
import { auth } from "../lib/firebase";
import { Loader2 } from "lucide-react";

export const HomePage = () => {
  const [isLoggingOut, setLoggingOut] = useState(false);

  async function Loggout() {
    try {
      setLoggingOut(true);
      await auth.signOut();
    } catch (error) {
      const e = error as Error;
      console.error(e.message);
    } finally {
      setLoggingOut(false);
    }
  }
  return (
    <div className="w-screen h-screen flex justify-center align-middle items-center ">
      HomePage
      <button
        className="btn btn-primary"
        onClick={Loggout}
      >
       {isLoggingOut ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log Out"
              )}
      </button>
    </div>
  );
};

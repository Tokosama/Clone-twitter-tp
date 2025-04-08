import { useState } from "react";
import { auth } from "../lib/firebase";
import { Loader2 } from "lucide-react";
import TweetInput from "../components/TweetInput";
import NewsFeed from "../components/NewsFeed";
import Layout from "../components/layout";

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
    <div className="min-h-screen">
      {/* Header */}
      <header className="b shadow-md py-3 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-500">Twitter Clone</h1>
        </div>
        <button
          onClick={Loggout}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span>Loading...</span>
            </>
          ) : (
            "Log Out"
          )}
        </button>
      </header>

      <Layout>
        <main className="max-w-2xl mx-auto p-4 space-y-4">
          {/* Composant pour créer un tweet */}
          <TweetInput />
          {/* Fil d'actualité */}
          <NewsFeed />
        </main>
      </Layout>

      {/* Contenu principal */}
    </div>
  );
};

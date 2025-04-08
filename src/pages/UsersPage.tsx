// src/pages/UsersPage.tsx
import React from "react";
import UserList from "../components/UserList";
import { useUsers } from "../hooks/useUsers";
import Layout from "../components/layout";
import { Loader2 } from "lucide-react";

const UsersPage: React.FC = () => {
  const { users, loading, handleToggleFollow, setSearch } = useUsers();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 size="20" />
      </div>
    );
  }


  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* <header className="b shadow-md py-3 px-4 flex items-center justify-between">
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
      </header> */}

      <Layout>
        <div className="p-4 max-w-2xl mx-auto">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users"
            className="border p-2 w-full mb-4"
          />
          <UserList
            users={users}
            onToggleFollow={handleToggleFollow}
          />
        </div>
      </Layout>

      {/* Contenu principal */}
    </div>
  );
};

export default UsersPage;

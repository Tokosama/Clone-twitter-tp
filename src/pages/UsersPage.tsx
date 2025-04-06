import { useUsers } from "../hooks/useUsers";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";



const UsersPage = () => {
  const { users, loading, handleToggleFollow, setSearch } = useUsers();

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs</h2>
      <SearchBar onSearch={setSearch} />
      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <UserList users={users} onToggleFollow={handleToggleFollow} />
      )}
    </div>
  );
};

export default UsersPage;

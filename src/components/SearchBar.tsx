type Props = {
    onSearch: (query: string) => void;
  };
  
  const SearchBar = ({ onSearch }: Props) => {
    return (
      <input
        type="text"
        placeholder="Rechercher un utilisateur"
        onChange={(e) => onSearch(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
    );
  };
  
  export default SearchBar;
  
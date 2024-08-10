import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);

  function handleIsOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="icons">
      <BsSearch onClick={handleIsOpen} />
      {isOpen && <SearchBar onIsOpen={handleIsOpen} />}
    </div>
  );
}
function SearchBar({ onIsOpen }) {
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    setSearch("");
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div>
        <input type="submit" value="Buscar" />
      </div>
      <div>
        <input
          type="text"
          placeholder="Faça uma busca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div class="close" onClick={onIsOpen}>
        &times;
      </div>
    </form>
  );
}

import "./App.css";

import { SearchProvider, useSearch } from "./SearchContext";

const SearchInput = () => {
  const { query } = useSearch();
  return (
    <div className="searchInput">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          query(e.target[0].value);
          e.target[0].value = "";
        }}
      >
        <input type="text"></input>
        <button type="submit">search</button>
      </form>
    </div>
  );
};

const SearchMeta = () => {
  const { state, reset } = useSearch();
  return (
    <div style={{ padding: "0.5em 0", height: "3em", display: "flex" }}>
      {state.term && (
        <div className="searchMeta">
          {state.term}
          <button
            style={{ marginLeft: "0.5em" }}
            onClick={() => {
              reset();
            }}
          >
            clear
          </button>
        </div>
      )}
    </div>
  );
};

const SearchResults = () => {
  const {
    state: { results, isLoading },
  } = useSearch();

  return isLoading ? (
    <div className="loader">Loading...</div>
  ) : (
    <div>
      Search results:
      <ul style={{marginLeft: 0, paddingLeft: 0}}>
        {results.map((r) => (
          <li key={r.title}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
};

const HomeComponent = () => {
  const { state } = useSearch();
  return (
    <>
      {state.term ? (
        <div className="searchResults">
          <SearchResults />
        </div>
      ) : (
        <div className="inventory">Products Inventory</div>
      )}
    </>
  );
};

function Homepage() {
  return (
    <SearchProvider>
      <div className="Homepage">
        <h1>All products</h1>
        <SearchInput />
        <SearchMeta />
        <HomeComponent />
      </div>
    </SearchProvider>
  );
}

export default Homepage;

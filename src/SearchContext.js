import { createContext, useContext, useReducer } from "react";

function sleeper(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

const SearchContext = createContext();

const initialState = {
  term: null,
  results: [],
  error: null,
  isLoading: false,
};

function searchReducer(state, action) {
  switch (action.type) {
    case "query": {
      return {
        term: action.payload.term,
        results: [],
        error: null,
        isLoading: true,
      };
    }
    case "querySuccess": {
      return {
        term: state.term,
        results: [{ title: "example 1" }, { title: `example ${state.term} 2` }, { title: `example 3` }],
        error: null,
        isLoading: false,
      };
    }
    case "queryError": {
      return {
        term: state.term,
        results: state.results,
        error: "There was an error",
        isLoading: false,
      };
    }
    case "reset": {
      return initialState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const reset = () => {
    dispatch({ type: "reset" });
  };

  const query = async (term) => {
    try {
      dispatch({ type: "query", payload: { term } });

      await sleeper(1000);

      dispatch({ type: "querySuccess" });
    } catch (error) {
      console.log(error);
    }
  };

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, reset, query };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

export { SearchProvider, useSearch };

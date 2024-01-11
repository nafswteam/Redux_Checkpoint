import { useState, createContext } from "react";
import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";
import NavBar from "./components/ui/NavBar";

// Create a context to manage the filtering state throughout the app
export const FilterContext = createContext();

function App() {
  // State to keep track of the current filter for displaying todo tasks
  const [filterIsDone, setFilterIsDone] = useState("All Todo Task");

  return (
    // Provider used for passing the filtering context to components within the app
    <FilterContext.Provider value={{ filterIsDone, setFilterIsDone }}>
      {/* Navigation bar component */}
      <NavBar />
      {/* Component to add new tasks */}
      <AddTask />
      {/* Component to display and manage the list of tasks */}
      <ListTask />
    </FilterContext.Provider>
  );
}

export default App;

import { useState, useEffect } from "react";
import Header from "./Components/Header.js"; // Import the Header component
import KanbanBoard from "./Components/KanbanBoard.js";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("Status"); // Default grouping
  const [sorting, setSorting] = useState("Priority"); // Default sorting

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Restore saved state from localStorage when the app loads
  useEffect(() => {
    const savedGrouping = localStorage.getItem("grouping");
    const savedSorting = localStorage.getItem("sorting");

    if (savedGrouping) setGrouping(savedGrouping);
    if (savedSorting) setSorting(savedSorting);
  }, []); // Runs only on the first render

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("sorting", sorting);
  }, [grouping, sorting]); // Runs whenever `grouping` or `sorting` changes

  return (
    <div>
      {/* Header Component */}
      <Header
        grouping={grouping}
        setGrouping={setGrouping}
        sorting={sorting}
        setSorting={setSorting}
      />

      {/* KanbanBoard Component */}
      <KanbanBoard
        tickets={tickets}
        users={users}
        grouping={grouping}
        sorting={sorting}
      />
    </div>
  );
}

export default App;

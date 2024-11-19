import { useState, useEffect } from "react";
import Header from "./Components/Header.jsx";
import KanbanBoard from "./Components/KanbanBoard.jsx";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("Status");
  const [sorting, setSorting] = useState("Priority");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );

        const data = await response.json();
        console.log(data);
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const savedGrouping = localStorage.getItem("grouping");
    const savedSorting = localStorage.getItem("sorting");

    if (savedGrouping) setGrouping(savedGrouping);
    if (savedSorting) setSorting(savedSorting);
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("sorting", sorting);
  }, [grouping, sorting]);
  return (
    <div>
      <Header
        grouping={grouping}
        setGrouping={setGrouping}
        sorting={sorting}
        setSorting={setSorting}
      />

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

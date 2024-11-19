import React, { useEffect, useState } from "react";
import "./kanbanBoard.css";
import KanbanCard from "./KanbanCard";

const KanbanBoard = ({ tickets, users }) => {
  const [grouping, setGrouping] = useState("status"); // Default grouping
  const [groupedTickets, setGroupedTickets] = useState({});

  // Load the grouping option from localStorage
  useEffect(() => {
    const savedGrouping = localStorage.getItem("kanbanGrouping");
    if (savedGrouping) {
      setGrouping(savedGrouping);
    }
  }, []);

  // Save grouping option to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("kanbanGrouping", grouping);
    groupTickets(grouping);
  }, [grouping, tickets]);

  // Function to group tickets based on the selected grouping type
  const groupTickets = (type) => {
    const groups = tickets.reduce((acc, ticket) => {
      const key = type === "priority" ? ticket.priority : ticket[type];
      if (!acc[key]) acc[key] = [];
      acc[key].push(ticket);
      return acc;
    }, {});
    setGroupedTickets(groups);
  };

  // Handle dropdown change
  const handleGroupingChange = (e) => {
    const value = e.target.value;
    setGrouping(value); // Update state
  };

  // Map priority levels to meaningful names
  const getPriorityLabel = (priority) => {
    const labels = ["No Priority", "Low", "Medium", "High", "Urgent"];
    return labels[priority] || "Unknown";
  };

  return (
    <div className="kanban-board">
      <div className="kanban-header">
        <div className="dropdown">
          <label htmlFor="grouping">Grouping :</label>
          <select
            id="grouping"
            value={grouping}
            onChange={handleGroupingChange}
          >
            <option value="status">Status</option>
            <option value="priority">Priority</option>
            <option value="userId">User</option>
          </select>
        </div>
      </div>

      <div className="kanban-columns">
        {Object.entries(groupedTickets).map(([key, tickets]) => (
          <div className="kanban-column" key={key}>
            <h2 className="column-title">
              {grouping === "priority" ? getPriorityLabel(Number(key)) : key}
            </h2>
            <div className="column-content">
              {tickets.map((ticket) => (
                <KanbanCard
                  key={ticket.id}
                  ticket={ticket}
                  user={users.find((user) => user.id === ticket.userId)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

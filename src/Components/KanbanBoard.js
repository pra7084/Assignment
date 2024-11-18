import TicketCard from "./TicketCard";
import "./kanbanBoard.css";

const KanbanBoard = ({ tickets, grouping, sorting, users }) => {
  const groupBy = (tickets, key) => {
    return tickets.reduce((acc, ticket) => {
      const groupKey =
        key === "User"
          ? users.find((user) => user.id === ticket.userId)?.name ||
            "Unassigned"
          : ticket[key.toLowerCase()];
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(ticket);
      return acc;
    }, {});
  };

  const sortedTickets = (groupedTickets) => {
    for (const group in groupedTickets) {
      groupedTickets[group].sort((a, b) => {
        if (sorting === "Priority") return b.priority - a.priority;
        if (sorting === "Title") return a.title.localeCompare(b.title);
        return 0;
      });
    }
    return groupedTickets;
  };

  const groupedTickets = groupBy(tickets, grouping);
  const sortedGroupedTickets = sortedTickets(groupedTickets);

  return (
    <div className="kanban-board">
      {Object.keys(sortedGroupedTickets).map((group) => (
        <div key={group} className="kanban-column">
          <h3>{group}</h3>
          {sortedGroupedTickets[group].map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;

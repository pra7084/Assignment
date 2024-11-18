import "./ticketCard.css";
const TicketCard = ({ ticket }) => {
  const priorityLabels = ["No Priority", "Low", "Medium", "High", "Urgent"];
  return (
    <div className="ticket-card">
      <h4>{ticket.title}</h4>
      <p>
        <strong>Status:</strong> {ticket.status}
      </p>
      <p>
        <strong>Priority:</strong> {priorityLabels[ticket.priority]}
      </p>
      <p>
        <strong>User:</strong> {ticket.userId || "Unassigned"}
      </p>
    </div>
  );
};

export default TicketCard;

import React from "react";
import "./kanbanCard.css";

import backlogIcon from "../icons/Backlog.svg";
import todoIcon from "../icons/To-do.svg";
import inProgressIcon from "../icons/in-progress.svg";
import completedIcon from "../icons/Done.svg";
import cancelledIcon from "../icons/Cancelled.svg";

import urgentPriorityIcon from "../icons/urgent.svg";
import highPriorityIcon from "../icons/highp.svg";
import mediumPriorityIcon from "../icons/mediump.svg";
import lowPriorityIcon from "../icons/lowp.svg";
import noPriorityIcon from "../icons/nop.svg";

import placeholderAvatar from "../icons/avatar.svg";

const KanbanCard = ({ ticket, user }) => {
  const priorityIcons = {
    4: urgentPriorityIcon,
    3: highPriorityIcon,
    2: mediumPriorityIcon,
    1: lowPriorityIcon,
    0: noPriorityIcon,
  };
  const statusIcons = {
    Backlog: backlogIcon,
    Todo: todoIcon,
    "In progress": inProgressIcon,
    Completed: completedIcon,
    Cancelled: cancelledIcon,
  };

  // Fallbacks for missing data
  const priorityIcon = priorityIcons[ticket.priority] || noPriorityIcon;
  const statusIcon = statusIcons[ticket.status] || todoIcon;

  return (
    <div className="kanban-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <img
          src={statusIcon}
          alt={`${ticket.status} icon`}
          className="status-icon"
        />
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="card-meta">
        <div className="priority">
          <img
            src={priorityIcon}
            alt={`Priority ${ticket.priority}`}
            className="priority-icon"
          />
        </div>
        <div className="tags">
          {ticket.tag.map((tag, index) => (
            <span className="tag" key={index}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      {user && (
        <div className="user-avatar">
          <img
            src={user.avatar || placeholderAvatar}
            alt={user.name || "User"}
            className="avatar"
          />
          <span className="user-name">{user.name || "Unassigned"}</span>
        </div>
      )}
    </div>
  );
};

export default KanbanCard;

import "./header.css";

const Header = ({ grouping, setGrouping, sorting, setSorting }) => {
  return (
    <div className="header">
      <div className="sorting">
        <label>Sorting:</label>
        <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
          <option value="Priority">Priority</option>
          <option value="Title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default Header;

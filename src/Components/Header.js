import "./header.css";
const Header = ({ grouping, setGrouping, sorting, setSorting }) => {
  return (
    <div className="header">
      <div className="grouping">
        <label>Group By:</label>
        <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
          <option value="Status">Status</option>
          <option value="User">User</option>
          <option value="Priority">Priority</option>
        </select>
      </div>
      <div className="sorting">
        <label>Sort By:</label>
        <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
          <option value="Priority">Priority</option>
          <option value="Title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default Header;

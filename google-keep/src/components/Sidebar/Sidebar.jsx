import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <button type="button" className="sidebar-item sidebar-item-active">
        <span className="material-symbols-outlined">lightbulb</span>
        <span className="sidebar-text">Notes</span>
      </button>
      <button type="button" className="sidebar-item">
        <span className="material-symbols-outlined">notifications</span>
        <span className="sidebar-text">Reminders</span>
      </button>
      <button type="button" className="sidebar-item">
        <span className="material-symbols-outlined">edit</span>
        <span className="sidebar-text">Edit labels</span>
      </button>
      <button type="button" className="sidebar-item">
        <span className="material-symbols-outlined">archive</span>
        <span className="sidebar-text">Archive</span>
      </button>
      <button type="button" className="sidebar-item">
        <span className="material-symbols-outlined">delete</span>
        <span className="sidebar-text">Trash</span>
      </button>
    </aside>
  );
};

export default Sidebar;
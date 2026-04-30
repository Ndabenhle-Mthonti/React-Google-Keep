import "./Navbar.css";

const Navbar = ({
  searchTerm,
  onSearchChange,
  darkMode,
  isGridView,
  onToggleView,
  onRefresh,
  onToggleDarkMode,
}) => {
  return (
    <header className="navbar">
      <div className="logo-area">
        <button className="icon-btn" type="button" aria-label="Menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <img
          className="logo-image"
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          alt="Google Keep"
        />
        <span className="logo-text">Keep</span>
      </div>

      <div className="search-area">
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Search notes"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="settings-area">
        {/* Keep-style quick actions and view/theme controls. */}
        <button
          className="icon-btn"
          type="button"
          onClick={onRefresh}
          aria-label="Refresh"
          title="Refresh"
        >
          <span className="material-symbols-outlined">refresh</span>
        </button>
        <button
          className="icon-btn"
          type="button"
          onClick={onToggleView}
          aria-label="Toggle view"
          title={isGridView ? "List view" : "Grid view"}
        >
          <span className="material-symbols-outlined">
            {isGridView ? "view_agenda" : "grid_view"}
          </span>
        </button>
        <button className="icon-btn" type="button" aria-label="Settings" title="Settings">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button
          className="icon-btn"
          type="button"
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
        >
          <span className="material-symbols-outlined">
            {darkMode ? "light_mode" : "dark_mode"}
          </span>
        </button>
        <button className="icon-btn" type="button" aria-label="Google apps" title="Google apps">
          <span className="material-symbols-outlined">apps</span>
        </button>
        <button className="icon-btn" type="button" aria-label="Account" title="Account">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
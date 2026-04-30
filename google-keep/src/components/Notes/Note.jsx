const Note = ({ note, onDelete, onTogglePin }) => {
  // Each card uses its saved color for quick visual grouping.
  const noteStyle = {
    backgroundColor: note.color || "#ffffff",
  };

  return (
    <article className="note" style={noteStyle}>
      <button
        type="button"
        className="pin-btn"
        onClick={() => onTogglePin(note.id)}
        aria-label="Pin note"
      >
        <span className="material-symbols-outlined">
          {note.pinned ? "keep" : "push_pin"}
        </span>
      </button>

      {note.title && <h3 className="title">{note.title}</h3>}
      {note.text && <p className="text">{note.text}</p>}

      <div className="note-footer">
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(note.id)}
          aria-label="Delete note"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </article>
  );
};

export default Note;

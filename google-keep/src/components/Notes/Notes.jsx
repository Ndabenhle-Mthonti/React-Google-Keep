import "./Notes.css";
import Note from "./Note.jsx";

const Notes = ({ notes, isGridView, onDelete, onTogglePin, onUpdateNote }) => {
  return (
    // Switch between masonry grid and single-column list view.
    <section className={`notes ${isGridView ? "grid-mode" : "list-mode"}`}>
      {notes.length === 0 ? (
        <p className="empty-state">Notes you add appear here</p>
      ) : (
        notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={onDelete}
            onTogglePin={onTogglePin}
            onUpdate={onUpdateNote}
          />
        ))
      )}
    </section>
  );
};

export default Notes;

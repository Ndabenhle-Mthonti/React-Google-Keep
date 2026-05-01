import { useState } from "react";
import Modal from "../Modal/Modal";

const Note = ({ note, onDelete, onTogglePin, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Each card uses its saved color for quick visual grouping.
  const noteStyle = {
    backgroundColor: note.color || "#ffffff",
  };

  const handleSave = (updatedFields) => {
    onUpdate(note.id, updatedFields);
    setIsModalOpen(false);
  };

  return (
    <article
      className="note"
      style={noteStyle}
      onClick={() => setIsModalOpen(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsModalOpen(true);
        }
      }}
      aria-label={`Edit note ${note.title || note.text || ""}`.trim()}
    >
      {note.title && <h3 className="title">{note.title}</h3>}
      {note.text && <p className="text">{note.text}</p>}

      <div className="note-footer">
        <button
          type="button"
          className="pin-btn"
          onClick={(event) => {
            event.stopPropagation();
            onTogglePin(note.id);
          }}
          aria-label={note.pinned ? "Unpin note" : "Pin note"}
        >
          <span className="material-symbols-outlined">
            {note.pinned ? "keep" : "push_pin"}
          </span>
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(note.id);
          }}
          aria-label="Delete note"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        note={note}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </article>
  );
};

export default Note;

import "./Modal.css";
import { useEffect, useState } from "react";

const NOTE_COLORS = ["#ffffff", "#f28b82", "#fdd663", "#fff475", "#ccff90", "#a7ffeb", "#aecbfa", "#d7aefb"];

const Modal = ({ isOpen, note, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    if (!isOpen || !note) {
      return;
    }

    setTitle(note.title || "");
    setText(note.text || "");
    setColor(note.color || "#ffffff");
  }, [isOpen, note]);

  if (!isOpen || !note) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      title: title.trim(),
      text: text.trim(),
      color,
    });
  };

  return (
    <div className="modal open-modal" onClick={onClose} role="presentation">
      <div className="modal-content">
        <div className="form-container active-form">
          <form onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()}>
            <input
              type="text"
              className="note-title"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <textarea
              className="note-text"
              placeholder="Take a note..."
              value={text}
              rows={5}
              onChange={(event) => setText(event.target.value)}
            />

            <div className="form-actions">
              <div className="color-picker">
                {NOTE_COLORS.map((noteColor) => (
                  <button
                    key={noteColor}
                    type="button"
                    className={`color-dot ${color === noteColor ? "selected" : ""}`}
                    style={{ backgroundColor: noteColor }}
                    onClick={() => setColor(noteColor)}
                    aria-label={`Choose ${noteColor} note color`}
                  />
                ))}
              </div>

              <div className="form-buttons">
                <button type="button" className="close-btn" onClick={onClose}>
                  Close
                </button>
                <button type="submit" className="add-btn">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

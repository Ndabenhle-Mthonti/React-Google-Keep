import "./Form.css";
import { useState } from "react";

const NOTE_COLORS = ["#ffffff", "#f28b82", "#fdd663", "#fff475", "#ccff90", "#a7ffeb", "#aecbfa", "#d7aefb"];

const Form = ({ onAddNote }) => {
  // Form starts compact and expands when the user focuses the textarea.
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("#ffffff");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Skip creating empty notes.
    if (!title.trim() && !text.trim()) {
      return;
    }

    onAddNote({ title, text, color });
    setTitle("");
    setText("");
    setColor("#ffffff");
    setIsExpanded(false);
  };

  return (
    <section className={`form-container ${isExpanded ? "active-form" : "inactive-form"}`}>
      <form onSubmit={handleSubmit}>
        {isExpanded && (
          <input
            type="text"
            className="note-title"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        )}

        <textarea
          className="note-text"
          placeholder="Take a note..."
          value={text}
          onFocus={() => setIsExpanded(true)}
          onChange={(event) => setText(event.target.value)}
          rows={isExpanded ? 4 : 1}
        />

        {isExpanded && (
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
              <button type="button" className="close-btn" onClick={() => setIsExpanded(false)}>
                Close
              </button>
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default Form;

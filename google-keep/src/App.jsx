import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Form from "./components/Form/Form.jsx";
import Notes from "./components/Notes/Notes.jsx";

const STORAGE_KEY = "google-keep-notes";
const THEME_STORAGE_KEY = "google-keep-theme";

function App() {
  // Load saved notes once when the app starts.
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (!savedNotes) {
      return [];
    }

    try {
      return JSON.parse(savedNotes);
    } catch (error) {
      console.error("Could not parse saved notes:", error);
      return [];
    }
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem(THEME_STORAGE_KEY) === "dark"
  );
  const [isGridView, setIsGridView] = useState(true);

  // Keep notes persistent between page refreshes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // Save theme choice and apply dark class to <body>.
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, darkMode ? "dark" : "light");
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addNote = ({ title, text, color }) => {
    const note = {
      id: crypto.randomUUID(),
      title: title.trim(),
      text: text.trim(),
      color,
      pinned: false,
      createdAt: Date.now(),
    };

    setNotes((prevNotes) => [note, ...prevNotes]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const togglePin = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const updateNote = (id, updates) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, ...updates } : note))
    );
  };

  // Filter by search text, then keep pinned notes at the top.
  const filteredNotes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const visible = term
      ? notes.filter(
          (note) =>
            note.title.toLowerCase().includes(term) ||
            note.text.toLowerCase().includes(term)
        )
      : notes;

    return [...visible].sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [notes, searchTerm]);

  return (
    <div className="app-shell">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        darkMode={darkMode}
        isGridView={isGridView}
        onToggleView={() => setIsGridView((prev) => !prev)}
        onRefresh={() => setSearchTerm("")}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />
      <div className="layout">
        <Sidebar />
        <main className="content">
          <Form onAddNote={addNote} />
          <Notes
            notes={filteredNotes}
            isGridView={isGridView}
            onDelete={deleteNote}
            onTogglePin={togglePin}
            onUpdateNote={updateNote}
          />
        </main>
      </div>
    </div>
  );
}

export default App;

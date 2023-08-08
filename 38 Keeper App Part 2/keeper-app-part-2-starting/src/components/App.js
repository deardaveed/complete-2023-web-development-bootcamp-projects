import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";

function createNote(entry) {
  return <Note
    key={entry.key}
    name={entry.title}
    content={entry.content}
  />
}

function App() {
  return (
    <div>
      <Header />
      {notes.map(createNote)}
      <Footer />
    </div>
  );
}

export default App;

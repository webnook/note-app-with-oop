const notes = [
  {
    id: 1,
    title: "first note",
    body: "this is first note",
    updated: "2023-04-07T07:19:49.373Z",
  },
  {
    id: 2,
    title: "second note",
    body: "this is second note",
    updated: "2024-02-07T07:19:49.373Z",
  },
  {
    id: 3,
    title: "third note",
    body: "this is third note",
    updated: "2022-02-07T07:19:49.373Z",
  },
];

export default class getNotesAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    return savedNotes.sort((a, b) => {
      return new Date(b.updated) - new Date(a.updated);
    });
  }
  static saveNote(noteToSave) {
    const notes = getNotesAPI.getAllNotes();
    const existedNote = notes.find((note) => note.id == noteToSave.id);
    if (existedNote) {
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
      existedNote.updated = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }
  static deleteNote(id) {
    const notes = getNotesAPI.getAllNotes();
    const filteredNotes = notes.filter((note) => note.id != id);
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}

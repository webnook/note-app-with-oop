import getNotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";
export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());
    this._refreshNotes();
  }
  _refreshNotes() {
    const notes = getNotesAPI.getAllNotes();

    //   set notes
    this._setNotes(notes);
    //   set active notes
    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }
  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }
  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }
  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: "New Note",
          body: "...write you'r notes here",
        };
        getNotesAPI.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (newTitle, newBody) => {
        getNotesAPI.saveNote({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        });
        this._refreshNotes();
      },
      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find((note) => note.id == noteId);
        this._setActiveNote(selectedNote);
      },
      onNoteDelete: (noteId) => {
        getNotesAPI.deleteNote(noteId);
        this._refreshNotes();
      },
    };
  }
}

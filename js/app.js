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
];

class getNotesAPI {
  static getAllNotes() {
    const savedNotes = notes || [];
    return savedNotes.sort((a, b) => {
      return new Date(b.updated) - new Date(a.updated);
    });
  }
  saveNote() {}
  deleteNote() {}
}


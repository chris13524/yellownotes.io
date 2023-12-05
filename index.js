window.addEventListener("load", () => {
  // Redirect old URLs
  const hash = window.location.hash;
  if (hash) {
    window.location = `note.html${hash}`;
  }

  const newNoteAElement = document.getElementById("newNoteA");
  newNoteAElement.href = `note.html#${crypto.randomUUID()}`;

  const newNoteElement = document.getElementById("newNote");
  const notesElement = document.getElementById("notes");
  getNotes().notes.forEach(({ id, content }) => {
    const liElement = document.createElement("li");
    const aElement = document.createElement("a");
    aElement.href = `note.html#${id}`;
    aElement.textContent = content;
    liElement.appendChild(aElement);
    notesElement.insertBefore(liElement, newNoteElement);
  });
});

window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (!hash) {
    window.location = "index.html";
    return;
  }
  const id = hash.slice(1);

  const textarea = document.getElementById("content");
  textarea.focus();

  const initialNote = getNotes().notes.find((note) => note.id === id);
  if (initialNote) {
    textarea.value = initialNote.content;
  }

  let timeout = null;
  textarea.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const data = getNotes();
      const content = textarea.value;
      if (content === "") {
        // Delete the note
        const deleteIndex = data.notes.findIndex((note) => note.id === id);
        if (deleteIndex !== -1) {
          data.notes.splice(deleteIndex, 1);
        }
      } else {
        const note = data.notes.find((note) => note.id === id);
        if (note) {
          // Update the note
          note.content = content;
        } else {
          // Save new note
          data.notes.push({
            id,
            content,
          });
        }
      }

      console.log({ data });
      localStorage["yellownotes"] = JSON.stringify(data);
    }, 200);
  });
});

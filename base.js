function getNotes() {
  try {
    return JSON.parse(localStorage["yellownotes"]);
  } catch (e) {
    localStorage["yellownotes"] = JSON.stringify({ notes: [] });
    return getNotes();
  }
}

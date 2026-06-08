const STORAGE_KEY = "upsk-notes-app";

const form = document.getElementById("note-form");
const titleInput = document.getElementById("note-title");
const bodyInput = document.getElementById("note-body");
const pinnedInput = document.getElementById("note-pinned");
const notesList = document.getElementById("notes-list");
const emptyState = document.getElementById("empty-state");
const noteCount = document.getElementById("note-count");
const pinnedCount = document.getElementById("pinned-count");
const proofCount = document.getElementById("proof-count");

let notes = [
  {
    id: 1,
    title: "Session 1 proof",
    body: "Built the first notes app foundation and captured the system design decisions in docs/proof.",
    pinned: true,
    createdAt: new Date().toISOString(),
  },
];

function loadNotes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return;
  }

  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      notes = parsed;
    }
  } catch {
    notes = [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function updateStats() {
  noteCount.textContent = String(notes.length);
  pinnedCount.textContent = String(notes.filter((note) => note.pinned).length);
  proofCount.textContent = "1";
  emptyState.hidden = notes.length > 0;
}

function renderNotes() {
  notesList.innerHTML = "";

  const sortedNotes = [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned) || new Date(b.createdAt) - new Date(a.createdAt));

  sortedNotes.forEach((note) => {
    const article = document.createElement("article");
    article.className = note.pinned ? "note pinned" : "note";

    const head = document.createElement("div");
    head.className = "note-head";

    const titleBlock = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = note.title || "Untitled note";
    const meta = document.createElement("small");
    meta.textContent = formatDate(note.createdAt);
    titleBlock.append(title, meta);

    const pinLabel = document.createElement("small");
    pinLabel.textContent = note.pinned ? "Pinned" : "Normal";

    head.append(titleBlock, pinLabel);

    const body = document.createElement("p");
    body.className = "note-body";
    body.textContent = note.body;

    const actions = document.createElement("div");
    actions.className = "note-actions";

    const pinButton = document.createElement("button");
    pinButton.type = "button";
    pinButton.textContent = note.pinned ? "Unpin" : "Pin";
    pinButton.addEventListener("click", () => {
      const target = notes.find((item) => item.id === note.id);
      if (!target) {
        return;
      }

      target.pinned = !target.pinned;
      saveNotes();
      renderNotes();
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "danger";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      notes = notes.filter((item) => item.id !== note.id);
      saveNotes();
      renderNotes();
    });

    actions.append(pinButton, deleteButton);
    article.append(head, body, actions);
    notesList.append(article);
  });

  updateStats();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title && !body) {
    return;
  }

  notes.unshift({
    id: Date.now(),
    title: title || "Untitled note",
    body,
    pinned: pinnedInput.checked,
    createdAt: new Date().toISOString(),
  });

  form.reset();
  saveNotes();
  renderNotes();
});

loadNotes();
renderNotes();

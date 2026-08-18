import { useState } from "react";

export default function NoteApp() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([...notes]);
  const [isUpdateNotes, setIsUpdateNotes] = useState({
    isUpdate: false,
    updateId: "",
  });
  const [err, setErr] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🔥 HANDLE SUBMIT");
    const newError = {
      title: "",
      content: "",
    };
    if (formData.title.trim() === "") {
      newError.title = "Title is required";
    }

    console.log(newError);
    if (formData.content.trim() === "") {
      newError.content = "Content is required";
    }
    console.log(newError);

    if (newError.title !== "" || newError.content !== "") {
      setErr(newError);
      return;
    }
    setErr({
      title: "",
      content: "",
    });
    const newNote = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
    };

    console.log(formData);
    setNotes([...notes, newNote]);
    setFilteredNotes([...notes, newNote]);

    setFormData({
      title: "",
      content: "",
    });
  };

  const editNote = (id) => {
    console.log(index);
    const note = notes.find((note) => note.id === id);
    setFormData({
      title: note.title,
      content: note.content,
    });

    setIsUpdateNotes({
      isUpdate: true,
      updateId: id,
    });
  };

  const updateNote = (id) => {
    console.log("🔥 UPDATE NOTE");
    const updatedNotes = notes.map((note, i) =>
      note.id === id
        ? {
            ...note,
            title: formData.title,
            content: formData.content,
          }
        : note,
    );
    console.log("id" + index);

    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);

    setFormData({
      title: "",
      content: "",
    });

    setErr({
      title: "",
      content: "",
    });
    setIsUpdateNotes({
      isUpdate: false,
      updateId: "",
    });
  };

  const deleteNote = (index) => {
    const updatedList = notes.filter((expense, i) => index !== i);
    console.log(updatedList);
    setNotes(updatedList);
    setFilteredNotes(updatedList);
  };

  const filterNote = (searchText) => {
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()),
    );

    setFilteredNotes(filtered);
  };
  return (
    <>
      <input
        type="text"
        id="search"
        placeholder="search"
        onChange={(e) => filterNote(e.target.value)}
      />

      <form onSubmit={handleSubmit}>
        <div className="formField">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Note Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {err.title && <p>{err.title}</p>}
        </div>
        <div className="formField">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            placeholder="Enter Note"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          ></textarea>
          {err.content && <p>{err.content}</p>}
        </div>
        {isUpdateNotes.isUpdate ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              updateNote(isUpdateNotes.updateId);
            }}
          >
            UPDATE NOTE
          </button>
        ) : (
          <button type="submit"> ADD NOTE</button>
        )}
      </form>

      {filteredNotes &&
        filteredNotes.map((filteredNote, index) => {
          return (
            <div key={index}>
              <h2>{filteredNote.title}</h2>
              <p>{filteredNote.content}</p>
              <button onClick={() => editNote(filteredNote.id)}>Edit</button>
              <button onClick={() => deleteNote(filteredNote.id)}>
                Delete
              </button>
            </div>
          );
        })}
    </>
  );
}

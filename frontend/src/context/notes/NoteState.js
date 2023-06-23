import Notecontext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
  let host = "http://localhost:5000"
  const notesinitial = [];
  const [notes, setnotes] = useState(notesinitial);
  //get notes
  const getallnotes = async () => {
    let url = `${host}/api/notes/fetchnotes`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem('authtoken'),
      },
    });
    const json = await response.json();
    setnotes(json);
  }

  // Add note
  const addNote = async (title, description, tag) => {
    //api call
    let url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem('authtoken'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setnotes(notes.concat(note));
  }
  // Delete note
  const deleteNote = async(id) => {
    let url = `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem('authtoken'),
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    const arr = notes.filter((e)=> e._id !== id);
    setnotes(arr);
  }
  // Edit note
  const editNote = async (id, title, description, tag) => {
    console.log(notes);
    //api call
    let url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem('authtoken'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await  response.json();
    console.log(json);

    const index = notes.findIndex((item) => item._id === id);
    if (index < 0) return;
    let tempnotes = [...notes];
    tempnotes[index].title = title;
    tempnotes[index].description = description;
    tempnotes[index].tag = tag;
    setnotes(tempnotes);
  }

  return (
    //we can pass variable and function as a cotext which can be accessed any component in this app  wrapped inside NoteState just need to import the NoteState component 
    <Notecontext.Provider value={{ notes, addNote, editNote, deleteNote ,getallnotes}} >
      {props.children}
    </Notecontext.Provider>
  )
}

export default NoteState;
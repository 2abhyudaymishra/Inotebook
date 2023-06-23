import React,{useContext, useState} from 'react'
import notecontext from '../context/notes/noteContext';

function Addnote() {
    let context= useContext(notecontext);
    const {addNote}=context;
    const [note,setnotes]=useState({title:"",description:"",tag:""});
    const handleclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnotes({title:"",description:"",tag:""});

    }
    const onChange=(e)=>{

        setnotes({...note,[e.target.name]:e.target.value});
    }
    return (
        <div className="container my-3">
            <h1>Add a note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange}  required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}  required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label" >Tag</label>
                    <input type="tag" className="form-control" id="tag" name="tag" onChange={onChange}  required value={note.tag}/>
                </div>
                <button type="submit" disabled={note.title.length<3 || note.description.length<5} className="btn btn-primary" onClick={handleclick}>Submit</button>
            </form>
        </div>
    )
}

export default Addnote

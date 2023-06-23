import { React, useContext, useEffect, useRef,useState } from 'react'
import notecontext from '../context/notes/noteContext';
import Noteitem from './noteitem';
import Addnote from './Addnote';
import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';
import { useNavigate } from 'react-router-dom';

function Notes( {showalert}) {
    let context = useContext(notecontext);

    const { notes, getallnotes, editNote } = context;

    const [modalnote,setmodalnote]=useState({title:"",description:"",tag:"Default"});

    const navigate = useNavigate();
    useEffect(() => {
        
        if(localStorage.getItem('authtoken')){
            getallnotes();
        }
        else{
            navigate("/login");
        }
    }, []);

    const ref = useRef(null);

    const modaltoggle = (currnote) => {
        ref.current.click();
        setmodalnote(currnote);

    }

    const onChange=(e)=>{
        setmodalnote({...modalnote,[e.target.name]:e.target.value});
    }

    const handlemodalsubmit=(e)=>{
        e.preventDefault();
        editNote(modalnote._id,modalnote.title,modalnote.description,modalnote.tag)
        ref.current.click();
    }

    return (
        <>
            <Addnote />
            {<button type="button" className="btn btn-primary d-none " data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
            </button>}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' value={modalnote.title} onChange={onChange}  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" value={modalnote.description} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" value={modalnote.tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={modalnote.title.length<5 || modalnote.description.length<5} className="btn btn-primary" onClick={handlemodalsubmit}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" my-3 row ">
                <h3>Your note</h3>
                {notes.length===0 && <div className="conatiner mx-2 my-2"> <p> No notes to display....</p></div>}
                {
                    notes?.map((item, i) => <Noteitem note={item} key={i} modaltoggle={modaltoggle} />)
                }
            </div>

        </>
    )
}

export default Notes

import React,{useContext} from 'react'
import notecontext from '../context/notes/noteContext';

function Noteitem(props) {
    let context= useContext(notecontext);
    const {deleteNote}=context;
    const { note,modaltoggle} = props;
        
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                <div className="d-flex">
                    <h5 className="card-title flex-grow-1 ">{note.title}</h5>
                    <i className="far fa-trash-alt mx-2 " onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="far fa-edit mx-2" onClick={()=>{modaltoggle(note)}}></i>
                </div>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text fst-italic" >{note.tag}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem

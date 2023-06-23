const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//get all notes
router.get('/fetchnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.send(notes);
})

//add notes
router.post('/addnote',fetchuser,

    [
        body('title', "Enter a valid title").isLength({ min: 3 }),
        body('description', "Password must contain  atleast 8 char").isLength({ min: 8 })
    ],

    async (req, res) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            res.status(400).send(err.array());

        }
        try {
            const { title, description, tag } = req.body;
            const newnote = await Notes.create({
                title,
                description,
                tag,
                user: req.user.id
            })
            res.json(newnote);
        }
        //if caugth a error in try block
        catch (err) {
            res.status(500).send("Internal server error occured" + err);
        }
    })

//update notes
router.put('/updatenote/:id',fetchuser,

    async (req, res) => {
        try{

            const { title, description, tag } = req.body;
    
            let newnote = {};
            if(title){newnote.title=title};
            if(description){newnote.description=description};
            if(tag){newnote.tag=tag};
    
            // checking if the note with that id exist
            const notedata = await Notes.findById(req.params.id);
            if(!notedata){return res.status(500).send("Note not found");}
            // checking if the it is same user as the current user of whom  we have created a token 
            if(notedata.user.toString() != req.user.id){return  res.status(401).send("Unauthorized access");}
            //creating new node

            let note =  await Notes.findByIdAndUpdate(req.params.id,{$set : newnote},{new:true});
            res.json(note);
        }
        catch (err) {
            res.status(500).send("Internal server error occured" + err);
        }
})

//delete note
router.delete('/deletenote/:id',fetchuser,

    async (req, res) => {
        try{
            // checking if the note with that id exist
            const notedata = await Notes.findById(req.params.id);
    
            if(!notedata){return res.status(500).send("Note not found");}
            // checking if the it is same user as the current user of whom  we have created a token 
            if(notedata.user.toString() != req.user.id){return  res.status(401).send("Unauthorized access");}
            //creating new node
            note =  await Notes.findByIdAndDelete(req.params.id);
            res.json("Note has been deleted");
        }
        catch (err) {
            res.status(500).send("Internal server error occured" + err);
        }
    })
module.exports = router;
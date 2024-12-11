const noteModel = require("../models/Notes");
//add notes
const addNotes = async (req, res) => {
    try {
        const { title, category, content } = req.body;
        const newNotes = new noteModel({ title, category, content });
        await newNotes.save();
        res.status(200).json({ message: 'Note added successfully', success: true });
    } catch (error) {
        console.error("Error in adding note:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// updates notes 
const updateNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, content } = req.body;

        const updatedNote = await noteModel.findByIdAndUpdate(
            id,
            { title, category, content },
            { new: true } // Returns the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found", success: false });
        }

        res.status(200).json({ message: 'Note updated successfully', success: true, data: updatedNote });
    } catch (error) {
        console.error("Error in updating note:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// delete notes 
const deleteNotes = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the note
        const deletedNote = await noteModel.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found", success: false });
        }

        res.status(200).json({ message: "Note deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
//get all notes
const getAllNotes = async (req, res) => {
    try {
        const allNotes = await noteModel.find(); // Fetch all notes

        if (allNotes.length === 0) {
            return res.status(404).json({ message: "No notes found", success: false });
        }

        res.status(200).json({
            message: "Notes retrieved successfully",
            success: true,
            data: allNotes
        });

    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// get notes by Id

const getNoteById = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters
        const note = await noteModel.findById(id); // Fetch note by ID

        if (!note) {
            return res.status(404).json({ message: "Note not found", success: false });
        }

        res.status(200).json({
            message: "Note retrieved successfully",
            success: true,
            data: note
        });

    } catch (error) {
        console.error("Error fetching note by ID:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};




module.exports = {
    addNotes,
    updateNotes,
    deleteNotes,
    getAllNotes,
    getNoteById
}
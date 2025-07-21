// backend/controller/noteController.js
import Note from "../models/NoteSchema.js"; // We'll create this model

// @desc    Get all notes for the authenticated user
// @route   GET /api/notes
// @access  Private (view, full)
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ owner: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Get a single note by ID for the authenticated user
// @route   GET /api/notes/:id
// @access  Private (view, full)
export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });
        if (!note) {
            return res.status(404).json({ message: "Note not found or you do not own it." });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note by ID:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private (full)
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Note title is required." });
        }
        const newNote = new Note({
            title,
            content: content || '', // Ensure content is not null
            owner: req.user._id,
        });
        const createdNote = await newNote.save();
        res.status(201).json(createdNote);
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(400).json({ message: "Error creating note", error: error.message });
    }
};

// @desc    Update an existing note
// @route   PUT /api/notes/:id
// @access  Private (full)
export const updateNote = async (req, res) => {
    try {
        const { title, content, isArchived, isTrashed, tags } = req.body;
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id }, // Find by ID and owner
            { title, content, isArchived, isTrashed, tags, updatedAt: Date.now() },
            { new: true, runValidators: true } // Return updated document and run schema validators
        );
        if (!note) {
            return res.status(404).json({ message: "Note not found or you do not own it." });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(400).json({ message: "Error updating note", error: error.message });
    }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private (full)
export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!note) {
            return res.status(404).json({ message: "Note not found or you do not own it." });
        }
        res.status(200).json({ message: "Note deleted successfully." });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
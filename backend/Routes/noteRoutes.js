// backend/Routes/noteRoutes.js
import express from "express";
import {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
} from "../controller/noteController.js"; // We'll create this controller
import userAuth from "../middleware/userAuth.js"; // Assuming your authentication middleware
import { checkNotesAccess } from "../middleware/notesAccessLevel.js"; // We'll create this middleware

const noteRouter = express.Router();

// Get all notes for the authenticated user
noteRouter.get('/notes', userAuth, checkNotesAccess('view'), getNotes);

// Get a single note by ID for the authenticated user
noteRouter.get('/notes/:id', userAuth, checkNotesAccess('view'), getNoteById);

// Create a new note
noteRouter.post('/notes', userAuth, checkNotesAccess('full'), createNote);

// Update an existing note
noteRouter.put('/notes/:id', userAuth, checkNotesAccess('full'), updateNote);

// Delete a note
noteRouter.delete('/notes/:id', userAuth, checkNotesAccess('full'), deleteNote);

export default noteRouter;
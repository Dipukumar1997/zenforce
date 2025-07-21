// backend/models/NoteSchema.js (or Note.js)
import mongoose from 'mongoose'; // Use import for mongoose as well

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        default: ''
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    isTrashed: {
        type: Boolean,
        default: false
    },
    tags: [String]
}, { timestamps: true });

// Change this line to export default
const Note = mongoose.model('Note', noteSchema);
export default Note;